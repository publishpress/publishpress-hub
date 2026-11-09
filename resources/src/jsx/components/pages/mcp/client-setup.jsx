/**
 * React assisted and manual client setup guides.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

import { RadioControl } from '@wordpress/components';
import { __ } from '@publishpress-hub/i18n';
import Button from '../../buttons/button';
import { McpPanel } from './panel';
import { McpConfiguration } from './configuration';

export const McpClientSetup = ({ state, selected, busy, headingRef, onSelect, onFinish }) => {
    const client = state.clientSetups[selected];
    const disabled = busy;
    const passwordLink = <a href={state.profileUrl}>{__('Create an application password', 'publishpress-hub')}</a>;
    return <McpPanel className="mcp-connect-step">
        <div className="mcp-section-heading">
            <h2 ref={headingRef} tabIndex={-1}>{__('Connect your AI app', 'publishpress-hub')}</h2>
            <a href="https://publishpress.com/knowledge-base/hub-mcp/" target="_blank" rel="noopener noreferrer">{__('View the PublishPress AI connection guide', 'publishpress-hub')}</a>
        </div>
        <RadioControl className="mcp-client-choices" label={__('How would you like to connect?', 'publishpress-hub')}
            selected={selected} onChange={onSelect} disabled={disabled}
            options={Object.entries(state.clientSetups).map(([value, item]) => ({
                value, label: <span><strong>{item.label}</strong><span className="mcp-client-description">{item.description}</span></span>,
            }))} />
        <div className="mcp-client-panel" key={selected}>
            <h3>{client.label}</h3>
            <div className="mcp-instruction-box"><ol>
                {selected === 'manual' && <li>{__('Install Node.js LTS if it is not already available.', 'publishpress-hub')} <a href="https://nodejs.org/en/download" target="_blank" rel="noopener noreferrer">{__('Download Node.js', 'publishpress-hub')}</a></li>}
                <li>{passwordLink}. {__('Name it PublishPress AI and copy the password.', 'publishpress-hub')}</li>
                <li>{selected === 'assistant' ? __('Copy the prompt below and paste it into your AI agent.', 'publishpress-hub')
                    : __('Replace the password placeholder in your local configuration. Merge this server using the MCP configuration format for your app, keeping any existing servers. Restart your app and approve the connection.', 'publishpress-hub')}</li>
            </ol><p className="description">{__('Enter the password in your app or configuration file, not in the chat.', 'publishpress-hub')}</p></div>
            <McpConfiguration key={selected} client={client} assistant={selected === 'assistant'} busy={disabled} />
        </div>
        <div className="mcp-instruction-box mcp-connect-complete">
            <Button variant="primary" onClick={onFinish} disabled={disabled}>{__('I have connected my AI app', 'publishpress-hub')}</Button>
            <p className="description">{__('Confirm after your AI app verifies this site and performs a read-only lookup. If you enabled write actions, check that those tools are available too.', 'publishpress-hub')}</p>
        </div>
    </McpPanel>;
};
