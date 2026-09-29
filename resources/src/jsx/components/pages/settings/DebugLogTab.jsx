/**
 * Debug log viewer tab.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages\settings
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { memo, useState, useEffect, useRef, useCallback } from '@wordpress/element';
import { Button, Notice } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

import { __ } from '@publishpress-hub/i18n';
import { RequestsLogView } from './RequestsLogView';

const VIEW_REQUESTS = 'requests';
const VIEW_FULL_LOG = 'full-log';

const REFRESH_INTERVALS = [
    { value: 3,  label: '3s' },
    { value: 5,  label: '5s' },
    { value: 10, label: '10s' },
    { value: 30, label: '30s' },
    { value: 60, label: '60s' },
];

const DebugLogTabComponent = () => {
    const [logContent, setLogContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isClearing, setIsClearing] = useState(false);
    const [notice, setNotice] = useState(null);
    const [viewMode, setViewMode] = useState(VIEW_REQUESTS);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [intervalSeconds, setIntervalSeconds] = useState(5);
    const [countdown, setCountdown] = useState(5);

    // Single timer ref — only one setInterval ever runs at a time.
    const tickRef = useRef(null);

    // Mutable refs so the single 1s tick closure never goes stale.
    // Changing the interval value only updates these refs; the timer is NOT recreated.
    const intervalSecondsRef = useRef(5);
    const countdownValueRef = useRef(5);

    // Tracks the active AbortController so we can cancel in-flight requests.
    const abortControllerRef = useRef(null);

    // Cancel any in-flight request.
    const cancelInFlightRequest = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
    }, []);

    // Abort on unmount so state is never set on an unmounted component.
    useEffect(() => {
        return () => {
            cancelInFlightRequest();
        };
    }, [cancelInFlightRequest]);

    // Silent fetch for auto-refresh — no loading spinner, no error notice.
    const fetchLogSilent = useCallback(async () => {
        cancelInFlightRequest();

        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const response = await apiFetch({
                path: '/publishpress-hub/v1/settings/debug-log',
                signal: controller.signal,
            });

            setLogContent(response.log || '');
        } catch {
            // AbortError or transient network error — silently ignored during polling.
        } finally {
            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }
        }
    }, [cancelInFlightRequest]);

    // Manual fetch — shows loading state and error notice on failure.
    const fetchLog = useCallback(async () => {
        cancelInFlightRequest();
        setIsLoading(true);
        setNotice(null);

        const controller = new AbortController();
        abortControllerRef.current = controller;

        try {
            const response = await apiFetch({
                path: '/publishpress-hub/v1/settings/debug-log',
                signal: controller.signal,
            });

            setLogContent(response.log || '');
        } catch (error) {
            if (error?.name !== 'AbortError') {
                setNotice({
                    status: 'error',
                    message: __('Failed to load the debug log. Please try again.', 'publishpress-hub'),
                });
            }
        } finally {
            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }

            setIsLoading(false);
        }
    }, [cancelInFlightRequest]);

    // Initial load.
    useEffect(() => {
        fetchLog();
    }, [fetchLog]);

    // Auto-refresh: a single 1s tick reads mutable refs so it never goes stale
    // and never needs to be recreated when the interval value changes.
    useEffect(() => {
        if (!autoRefresh) {
            clearInterval(tickRef.current);
            tickRef.current = null;
            countdownValueRef.current = intervalSecondsRef.current;
            setCountdown(intervalSecondsRef.current);
            return;
        }

        // Reset countdown display on enable.
        countdownValueRef.current = intervalSecondsRef.current;
        setCountdown(intervalSecondsRef.current);

        tickRef.current = setInterval(() => {
            countdownValueRef.current -= 1;
            setCountdown(countdownValueRef.current);

            if (countdownValueRef.current <= 0) {
                // Reset and fire.
                countdownValueRef.current = intervalSecondsRef.current;
                setCountdown(intervalSecondsRef.current);
                fetchLogSilent();
            }
        }, 1000);

        return () => {
            clearInterval(tickRef.current);
            tickRef.current = null;
        };
        // intervalSeconds intentionally omitted — changes are handled via refs below.
    }, [autoRefresh, fetchLogSilent]); // eslint-disable-line react-hooks/exhaustive-deps

    // Changing the interval updates refs immediately; the running timer picks up
    // the new value on its next tick without needing to be recreated.
    const handleIntervalChange = (e) => {
        const value = Number(e.target.value);
        setIntervalSeconds(value);
        intervalSecondsRef.current = value;
        countdownValueRef.current = value;
        setCountdown(value);
    };

    const handleClearLog = async () => {
        setIsClearing(true);
        setNotice(null);

        try {
            await apiFetch({
                path: '/publishpress-hub/v1/settings/debug-log/clear',
                method: 'POST',
            });

            setLogContent('');
            setNotice({
                status: 'success',
                message: __('Debug log cleared successfully.', 'publishpress-hub'),
            });
        } catch (error) {
            setNotice({
                status: 'error',
                message: __('Failed to clear the debug log. Please try again.', 'publishpress-hub'),
            });
        } finally {
            setIsClearing(false);
        }
    };

    const handleCopyToClipboard = async () => {
        if (!logContent) {
            return;
        }

        // navigator.clipboard requires a secure context (HTTPS).
        // Fall back to the legacy execCommand approach for HTTP dev environments.
        const copyViaExecCommand = () => {
            const el = document.createElement('textarea');
            el.value = logContent;
            el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
            document.body.appendChild(el);
            el.focus();
            el.select();
            const success = document.execCommand('copy');
            document.body.removeChild(el);
            return success;
        };

        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(logContent);
            } else if (!copyViaExecCommand()) {
                throw new Error('execCommand copy failed');
            }

            setNotice({
                status: 'success',
                message: __('Log copied to clipboard.', 'publishpress-hub'),
            });
        } catch (error) {
            setNotice({
                status: 'error',
                message: __('Failed to copy log to clipboard.', 'publishpress-hub'),
            });
        }
    };

    const isEmpty = !logContent;

    return (
        <div className="pp-hub-debug-log-tab">
            { notice && (
                <Notice
                    status={ notice.status }
                    isDismissible
                    onRemove={ () => setNotice(null) }
                >
                    { notice.message }
                </Notice>
            ) }

            <div className="pp-hub-debug-log-tab__toolbar">
                <div
                    className="pp-hub-debug-log-tab__view-toggle"
                    role="group"
                    aria-label={__('Debug log view', 'publishpress-hub')}
                >
                    <button
                        type="button"
                        className={ `pp-hub-debug-log-tab__view-btn${ viewMode === VIEW_REQUESTS ? ' pp-hub-debug-log-tab__view-btn--active' : '' }` }
                        onClick={ () => setViewMode(VIEW_REQUESTS) }
                        aria-pressed={ viewMode === VIEW_REQUESTS }
                    >
                        { __('Requests', 'publishpress-hub') }
                    </button>
                    <button
                        type="button"
                        className={ `pp-hub-debug-log-tab__view-btn${ viewMode === VIEW_FULL_LOG ? ' pp-hub-debug-log-tab__view-btn--active' : '' }` }
                        onClick={ () => setViewMode(VIEW_FULL_LOG) }
                        aria-pressed={ viewMode === VIEW_FULL_LOG }
                    >
                        { __('Full Log', 'publishpress-hub') }
                    </button>
                </div>

                <div className="pp-hub-debug-log-tab__actions">
                    <div className="pp-hub-debug-log-tab__auto-refresh-group">
                        <button
                            type="button"
                            className={ `pp-hub-debug-log-tab__auto-refresh-btn${ autoRefresh ? ' pp-hub-debug-log-tab__auto-refresh-btn--active' : '' }` }
                            onClick={ () => setAutoRefresh((prev) => !prev) }
                            aria-pressed={ autoRefresh }
                            title={ autoRefresh
                                ? __('Auto-refresh is on — click to stop', 'publishpress-hub')
                                : __('Enable auto-refresh', 'publishpress-hub')
                            }
                        >
                            <span className="pp-hub-debug-log-tab__auto-refresh-dot" aria-hidden="true" />
                            { autoRefresh
                                ? `${ __('Auto-refresh', 'publishpress-hub') } (${ countdown }s)`
                                : __('Auto-refresh', 'publishpress-hub')
                            }
                        </button>

                        <select
                            className="pp-hub-debug-log-tab__interval-select"
                            value={ intervalSeconds }
                            onChange={ handleIntervalChange }
                            aria-label={ __('Auto-refresh interval', 'publishpress-hub') }
                        >
                            { REFRESH_INTERVALS.map(({ value, label }) => (
                                <option key={ value } value={ value }>{ label }</option>
                            )) }
                        </select>
                    </div>

                    <Button
                        variant="secondary"
                        onClick={ fetchLog }
                        isBusy={ isLoading }
                        disabled={ isLoading }
                    >
                        { __('Refresh', 'publishpress-hub') }
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={ handleCopyToClipboard }
                        disabled={ isEmpty || isLoading }
                    >
                        { __('Copy to Clipboard', 'publishpress-hub') }
                    </Button>

                    <Button
                        variant="secondary"
                        isDestructive
                        onClick={ handleClearLog }
                        isBusy={ isClearing }
                        disabled={ isEmpty || isLoading || isClearing }
                    >
                        { __('Clear Log', 'publishpress-hub') }
                    </Button>
                </div>
            </div>

            <div className="pp-hub-debug-log-tab__viewer">
                { isLoading && (
                    <p className="pp-hub-debug-log-tab__loading">
                        { __('Loading log...', 'publishpress-hub') }
                    </p>
                ) }

                { !isLoading && isEmpty && (
                    <p className="pp-hub-debug-log-tab__empty">
                        { __('The debug log is empty. Perform some actions (e.g. activate a license) and refresh to see entries.', 'publishpress-hub') }
                    </p>
                ) }

                { !isLoading && !isEmpty && viewMode === VIEW_REQUESTS && (
                    <RequestsLogView logContent={ logContent } />
                ) }

                { !isLoading && viewMode === VIEW_FULL_LOG && (
                    <textarea
                        className="pp-hub-debug-log-tab__textarea"
                        value={ logContent }
                        readOnly
                        spellCheck={ false }
                        aria-label={ __('Debug log contents', 'publishpress-hub') }
                    />
                ) }
            </div>
        </div>
    );
};

export const DebugLogTab = memo(DebugLogTabComponent);
