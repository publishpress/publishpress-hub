/**
 * Debug log viewer tab.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages\settings
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { memo, useState, useEffect, useCallback } from '@wordpress/element';
import { Button, Notice } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

import { __ } from '@publishpress-hub/i18n';

const DebugLogTabComponent = () => {
    const [logContent, setLogContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isClearing, setIsClearing] = useState(false);
    const [notice, setNotice] = useState(null);

    const fetchLog = useCallback(async () => {
        setIsLoading(true);
        setNotice(null);

        try {
            const response = await apiFetch({
                path: '/publishpress-hub/v1/settings/debug-log',
            });

            setLogContent(response.log || '');
        } catch (error) {
            setNotice({
                status: 'error',
                message: __('Failed to load the debug log. Please try again.', 'publishpress-hub'),
            });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLog();
    }, [fetchLog]);

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

        try {
            await navigator.clipboard.writeText(logContent);
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
            {notice && (
                <Notice
                    status={notice.status}
                    isDismissible
                    onRemove={() => setNotice(null)}
                >
                    {notice.message}
                </Notice>
            )}

            <div className="pp-hub-debug-log-tab__toolbar">
                <Button
                    variant="secondary"
                    onClick={fetchLog}
                    isBusy={isLoading}
                    disabled={isLoading}
                >
                    {__('Refresh', 'publishpress-hub')}
                </Button>

                <Button
                    variant="secondary"
                    onClick={handleCopyToClipboard}
                    disabled={isEmpty || isLoading}
                >
                    {__('Copy to Clipboard', 'publishpress-hub')}
                </Button>

                <Button
                    variant="secondary"
                    isDestructive
                    onClick={handleClearLog}
                    isBusy={isClearing}
                    disabled={isEmpty || isLoading || isClearing}
                >
                    {__('Clear Log', 'publishpress-hub')}
                </Button>
            </div>

            <div className="pp-hub-debug-log-tab__viewer">
                {isLoading && (
                    <p className="pp-hub-debug-log-tab__loading">
                        {__('Loading log...', 'publishpress-hub')}
                    </p>
                )}

                {!isLoading && isEmpty && (
                    <p className="pp-hub-debug-log-tab__empty">
                        {__('The debug log is empty. Perform some actions (e.g. activate a license) and refresh to see entries.', 'publishpress-hub')}
                    </p>
                )}

                <textarea
                    className="pp-hub-debug-log-tab__textarea"
                    value={logContent}
                    readOnly
                    spellCheck={false}
                    aria-label={__('Debug log contents', 'publishpress-hub')}
                />
            </div>
        </div>
    );
};

export const DebugLogTab = memo(DebugLogTabComponent);
