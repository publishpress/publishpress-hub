/**
 * Structured requests log view — shows request/response pairs as expandable cards.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages\settings
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { memo, useState, useMemo } from '@wordpress/element';
import { __, sprintf } from '@publishpress-hub/i18n';
import { parseLogEntries, groupIntoPairs } from './DebugLogParser';

const METHOD_CLASS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    PATCH: 'patch',
    DELETE: 'delete',
};

const getStatusClass = (statusCode, isError) => {
    if (isError || !statusCode) {
        return 'error';
    }

    if (statusCode >= 500) {
        return 'server-error';
    }

    if (statusCode >= 400) {
        return 'client-error';
    }

    if (statusCode >= 200) {
        return 'success';
    }

    return 'unknown';
};

const truncateUrl = (url, maxLength = 72) => {
    if (!url || url.length <= maxLength) {
        return url;
    }

    return url.substring(0, maxLength) + '…';
};

const CodeBlock = ({ data }) => (
    <pre className="pp-hub-request-card__code">
        { JSON.stringify(data, null, 2) }
    </pre>
);

const RequestCardComponent = ({ pair }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { request, response } = pair;

    const method = request?.data?.method || '???';
    const url = request?.data?.url || '';
    const timestamp = request?.data?.timestamp || '';
    const statusCode = response?.data?.status_code;
    const isError = response?.data?.error === true;

    const methodClass = METHOD_CLASS[method.toUpperCase()] || 'other';
    const statusClass = getStatusClass(statusCode, isError);
    const statusDisplay = isError
        ? __('ERR', 'publishpress-hub')
        : (statusCode || '—');

    return (
        <div className={ `pp-hub-request-card pp-hub-request-card--${ isExpanded ? 'expanded' : 'collapsed' }` }>
            <button
                type="button"
                className="pp-hub-request-card__summary"
                onClick={ () => setIsExpanded(!isExpanded) }
                aria-expanded={ isExpanded }
            >
                <span className={ `pp-hub-request-card__method pp-hub-request-card__method--${ methodClass }` }>
                    { method }
                </span>

                <span className="pp-hub-request-card__url" title={ url }>
                    { truncateUrl(url) }
                </span>

                <span className={ `pp-hub-request-card__status pp-hub-request-card__status--${ statusClass }` }>
                    { statusDisplay }
                </span>

                <span className="pp-hub-request-card__timestamp">
                    { timestamp }
                </span>

                <span className="pp-hub-request-card__chevron" aria-hidden="true">
                    { isExpanded ? '▲' : '▼' }
                </span>
            </button>

            { isExpanded && (
                <div className="pp-hub-request-card__details">
                    <div className="pp-hub-request-card__section">
                        <div className="pp-hub-request-card__section-header pp-hub-request-card__section-header--request">
                            →&nbsp;{ __('Request', 'publishpress-hub') }
                        </div>
                        <CodeBlock data={ request?.data } />
                    </div>

                    <div className="pp-hub-request-card__section">
                        <div className="pp-hub-request-card__section-header pp-hub-request-card__section-header--response">
                            ←&nbsp;{ __('Response', 'publishpress-hub') }
                        </div>
                        { response ? (
                            <CodeBlock data={ response?.data } />
                        ) : (
                            <p className="pp-hub-request-card__no-response">
                                { __('No response recorded for this request.', 'publishpress-hub') }
                            </p>
                        ) }
                    </div>
                </div>
            ) }
        </div>
    );
};

const RequestCard = memo(RequestCardComponent);

const RequestsLogViewComponent = ({ logContent }) => {
    const pairs = useMemo(() => {
        const entries = parseLogEntries(logContent);
        return groupIntoPairs(entries);
    }, [logContent]);

    if (!logContent) {
        return null;
    }

    if (pairs.length === 0) {
        return (
            <p className="pp-hub-debug-log-tab__empty" role="status" aria-live="polite">
                { __('No requests found in the log.', 'publishpress-hub') }
            </p>
        );
    }

    return (
        <div className="pp-hub-requests-log">
            <p className="pp-hub-requests-log__count">
                { pairs.length === 1
                    ? __('1 request recorded', 'publishpress-hub')
                    : sprintf(
                        __('%d requests recorded', 'publishpress-hub'),
                        pairs.length
                    )
                }
            </p>

            <div className="pp-hub-requests-log__list">
                { pairs.map((pair) => (
                    <RequestCard key={ pair.id } pair={ pair } />
                )) }
            </div>
        </div>
    );
};

export const RequestsLogView = memo(RequestsLogViewComponent);
