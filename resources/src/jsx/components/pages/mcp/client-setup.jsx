/**
 * React client setup guides and authenticated desktop extension download.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

import { useState } from '@wordpress/element';
import { RadioControl } from '@wordpress/components';
import { __ } from '@publishpress-hub/i18n';
import Button from '../../buttons/button';
import { McpPanel } from './panel';
import { downloadFile, McpConfiguration } from './configuration';

export const McpClientSetup = ({ state, selected, busy, config, headingRef, onSelect, onFinish, onNotice }) => {
    const [downloading, setDownloading] = useState(false);
    const client = state.clientSetups[selected];
    const disabled = busy || downloading;
    const downloadInstaller = async () => {
        setDownloading(true);
        try {
            const body = new URLSearchParams({ action: 'publishpress_hub_mcp_installer', _wpnonce: config.installerNonce });
            const response = await fetch(config.installerUrl, { method: 'POST', credentials: 'same-origin', body });
            if (!response.ok || !response.headers.get('Content-Type')?.includes('application/octet-stream')) {
                throw new Error(__('The installer could not be downloaded. Refresh the connection status and try again.', 'publishpress-hub'));
            }
            const filename = /filename="([^"]+)"/.exec(response.headers.get('Content-Disposition') || '')?.[1] || 'publishpress.mcpb';
            downloadFile(await response.blob(), filename);
        } catch (error) {
            onNotice({ status: 'error', message: error.message || __('The installer could not be downloaded.', 'publishpress-hub') });
        } finally {
            setDownloading(false);
        }
    };
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
            {selected === 'desktop' ? <>
                <div className="mcp-instruction-box">
                    <p><a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer">{__('Get Claude Desktop if it is not installed.', 'publishpress-hub')}</a></p>
                    <ol>
                        <li><p>{__('Download the installer for this site.', 'publishpress-hub')}</p>
                            <Button variant="secondary" onClick={downloadInstaller} disabled={disabled || !state.installerAvailable} isLoading={downloading}>{__('Download installer', 'publishpress-hub')}</Button>
                            {!state.installerAvailable && <p className="description">{__('The installer requires an enabled connection, application passwords and the PHP ZIP extension. Choose another setup option if it is unavailable.', 'publishpress-hub')}</p>}
                        </li>
                        <li>{__('In Claude Desktop, go to Settings > Extensions > Advanced settings > Install Extension. Select the downloaded .mcpb file and confirm installation.', 'publishpress-hub')}</li>
                        <li>{__('Turn on the PublishPress extension. If it says Disabled, click its toggle to enable it.', 'publishpress-hub')}</li>
                        <li>{__('Start a new chat and ask: "List the available PublishPress actions."', 'publishpress-hub')}</li>
                    </ol>
                </div>
                <div className="mcp-instruction-box mcp-password-note">
                    <p>{__('Each download creates a new application password for your account and includes it in the installer file.', 'publishpress-hub')}</p>
                    <p>{__('Delete the downloaded file after setup because it contains an application password. You can revoke access in your WordPress profile by removing its PublishPress - Claude Desktop application password.', 'publishpress-hub')}</p>
                </div>
            </> : <>
                <div className="mcp-instruction-box"><ol>
                    {selected === 'manual' && <li>{__('Install Node.js LTS if it is not already available.', 'publishpress-hub')} <a href="https://nodejs.org/en/download" target="_blank" rel="noopener noreferrer">{__('Download Node.js', 'publishpress-hub')}</a></li>}
                    <li>{passwordLink}. {__('Name it PublishPress AI and copy the password.', 'publishpress-hub')}</li>
                    <li>{selected === 'assistant' ? __('Copy the prompt below and paste it into your AI agent.', 'publishpress-hub')
                        : __('Replace the password placeholder in your local configuration. Merge this server using the MCP configuration format for your app, keeping any existing servers. Restart your app and approve the connection.', 'publishpress-hub')}</li>
                </ol><p className="description">{__('Enter the password in your app or configuration file, not in the chat.', 'publishpress-hub')}</p></div>
                <McpConfiguration key={selected} client={client} assistant={selected === 'assistant'} busy={disabled} />
            </>}
        </div>
        <div className="mcp-instruction-box mcp-connect-complete">
            <Button variant="primary" onClick={onFinish} disabled={disabled}>{__('I have connected my AI app', 'publishpress-hub')}</Button>
            <p className="description">{__('Confirm after your AI app can list the available PublishPress actions. Hub cannot check the app connection for you.', 'publishpress-hub')}</p>
        </div>
    </McpPanel>;
};
