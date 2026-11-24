/**
 * Copyable configuration and prompt downloads with accessible feedback.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

import { useEffect, useRef, useState } from '@wordpress/element';
import { TextareaControl } from '@wordpress/components';
import { __ } from '@publishpress-hub/i18n';
import Button from '../../buttons/button';

export const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export const McpConfiguration = ({ client, assistant, busy }) => {
    const field = useRef(null);
    const timer = useRef(null);
    const [feedback, setFeedback] = useState('');
    const [copied, setCopied] = useState(false);
    useEffect(() => () => clearTimeout(timer.current), []);
    const copy = async () => {
        clearTimeout(timer.current);
        try {
            await navigator.clipboard.writeText(client.content);
            setCopied(true);
            setFeedback(__('Copied to clipboard.', 'publishpress-hub'));
        } catch (error) {
            field.current?.focus();
            field.current?.select();
            setFeedback(__('Select and copy the highlighted text.', 'publishpress-hub'));
        }
        timer.current = setTimeout(() => { setCopied(false); setFeedback(''); }, 3000);
    };
    return <div className="mcp-instruction-box mcp-configuration">
        <TextareaControl ref={field} label={assistant ? __('Your setup prompt', 'publishpress-hub') : __('Server configuration', 'publishpress-hub')}
            value={client.content} readOnly rows={12} spellCheck={false} />
        <div className="mcp-artifact-actions">
            <Button variant="secondary" onClick={copy} disabled={busy}>{copied ? __('Copied!', 'publishpress-hub')
                : (assistant ? __('Copy setup prompt', 'publishpress-hub') : __('Copy configuration', 'publishpress-hub'))}</Button>
            <Button variant="secondary" disabled={busy} onClick={() => downloadFile(new Blob([client.content], { type: 'text/plain;charset=utf-8' }), client.filename)}>
                {assistant ? __('Download prompt', 'publishpress-hub') : __('Download configuration', 'publishpress-hub')}
            </Button>
        </div>
        <span className="mcp-copy-feedback" role="status" aria-live="polite">{feedback}</span>
    </div>;
};
