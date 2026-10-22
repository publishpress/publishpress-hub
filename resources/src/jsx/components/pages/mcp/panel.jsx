/**
 * Shared card and loading presentation for AI connection steps.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

import { Card, CardBody } from '@wordpress/components';
import { __ } from '@publishpress-hub/i18n';

export const McpPanel = ({ children, className = '', ...props }) => (
    <Card className={`mcp-panel ${className}`} {...props}><CardBody>{children}</CardBody></Card>
);

export const McpSkeleton = () => (
    <McpPanel className="mcp-step-loading" role="status" aria-live="polite">
        <span className="screen-reader-text">{__('Loading the next step...', 'publishpress-hub')}</span>
        <div className="mcp-skeleton mcp-skeleton-heading" aria-hidden="true" />
        <div className="mcp-skeleton" aria-hidden="true" />
        <div className="mcp-skeleton" aria-hidden="true" />
        <div className="mcp-skeleton-choices" aria-hidden="true"><span /><span /><span /></div>
    </McpPanel>
);
