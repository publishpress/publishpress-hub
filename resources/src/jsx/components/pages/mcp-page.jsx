/**
 * AI Connections page rendered through Hub's shared React layout.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

import { memo, useEffect, useRef, useState } from '@wordpress/element';
import { CheckboxControl, Notice, PanelBody, ToggleControl } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { __ } from '@publishpress-hub/i18n';
import { AdminPageLayout } from '../admin-page';
import Button from '../buttons/button';
import SnackbarList from '../notices/SnackbarList';
import { McpPanel, McpSkeleton } from './mcp/panel';
import { McpActions } from './mcp/actions';
import { McpClientSetup } from './mcp/client-setup';
import { useMcpConnection } from './mcp/use-mcp-connection';

const config = window.ppHubMcpConfig || {};

const McpPageComponent = () => {
    const connection = useMcpConnection();
    const { state, draft, edits, loading, saving, dirty, notice } = connection;
    const { createSuccessNotice } = useDispatch('core/notices');
    const [transitioning, setTransitioning] = useState(false);
    const journey = useRef(null);
    const stepHeading = useRef(null);
    const movedToStep = useRef(false);
    const transitionLock = useRef(false);
    const busy = loading || saving;
    const stage = state?.setupStage;

    useEffect(() => {
        if (notice?.status === 'success') {
            createSuccessNotice(notice.message, { type: 'snackbar', isDismissible: true });
            connection.setNotice(null);
        }
    }, [notice, createSuccessNotice, connection.setNotice]);

    useEffect(() => {
        if (transitioning) {
            movedToStep.current = true;
            journey.current?.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
                block: 'start',
            });
        } else if (movedToStep.current) {
            movedToStep.current = false;
            stepHeading.current?.focus({ preventScroll: true });
        }
    }, [transitioning]);

    const runStep = async (action) => {
        if (transitionLock.current || busy) return;
        transitionLock.current = true;
        setTransitioning(true);
        try {
            await action();
        } finally {
            transitionLock.current = false;
            setTransitioning(false);
        }
    };

    const save = () => stage === 'access' ? runStep(() => connection.save()) : connection.save();
    const nextStep = state?.nextStep;

    useEffect(() => {
        if (stage !== 'prerequisite' || nextStep?.key !== 'adapter') return;
        const checkStatus = () => connection.refresh();
        window.addEventListener('focus', checkStatus);
        return () => window.removeEventListener('focus', checkStatus);
    }, [stage, nextStep?.key, connection.refresh]);

    return <AdminPageLayout logoUrl={config.logoUrl}>
        <div className="mcp-page">
            <section className="mcp-welcome" aria-labelledby="mcp-overview-heading">
                <div className="mcp-welcome-copy">
                    <span className="mcp-eyebrow">{__('AI Connections', 'publishpress-hub')}</span>
                    <h1 id="mcp-overview-heading">{__('Allow PublishPress to connect with your favorite AI service', 'publishpress-hub')}</h1>
                    <p>{__('Use your AI to work with PublishPress plugins on this site.', 'publishpress-hub')}</p>
                    <ToggleControl className="mcp-connection-toggle" label={__('Enable AI connections', 'publishpress-hub')}
                        checked={draft.enabled} disabled={busy || !state}
                        onChange={(enabled) => enabled ? runStep(() => connection.save({ enabled })) : connection.save({ enabled })} />
                </div>
                <div className="mcp-welcome-art" aria-hidden="true"><img src={config.welcomeImageUrl} alt="" /></div>
            </section>
            {notice && notice.status !== 'success' && <Notice status={notice.status} onRemove={() => connection.setNotice(null)}>{notice.message}</Notice>}
            <div className="mcp-journey" ref={journey} aria-busy={busy}>
                {transitioning || (!state && loading) ? <McpSkeleton /> : <>
                    {!state && !loading && <McpPanel><Button variant="secondary" onClick={connection.refresh}>{__('Try again', 'publishpress-hub')}</Button></McpPanel>}
                    {stage === 'prerequisite' && nextStep && <McpPanel className="mcp-next-step">
                        <h2 ref={stepHeading} tabIndex={-1}>{nextStep.label}</h2><p>{nextStep.description}</p>
                        {nextStep.key === 'adapter' ? <div className="mcp-step-actions">
                            {state.canInstallAdapter && <Button variant="primary" disabled={busy} isLoading={saving} onClick={() => runStep(connection.install)}>
                                {state.adapterInstalled ? __('Activate MCP Adapter', 'publishpress-hub') : __('Install and activate MCP Adapter', 'publishpress-hub')}
                            </Button>}
                            <Button variant="secondary" href="https://wordpress.org/plugins/mcp-adapter/" target="_blank" rel="noopener noreferrer">{__('MCP Adapter plugin page', 'publishpress-hub')}</Button>
                            {state.adapterInstalled && <Button variant="secondary" href={state.pluginsUrl} target="_self">{__('Manage plugins', 'publishpress-hub')}</Button>}
                        </div> : <>
                            <Button variant="secondary" href={nextStep.url} target="_self">{nextStep.action}</Button>
                            <p><Button variant="secondary" disabled={busy} onClick={() => runStep(connection.refresh)}>{__('Check again', 'publishpress-hub')}</Button></p>
                        </>}
                    </McpPanel>}
                    {stage === 'connect' && <McpClientSetup headingRef={stepHeading} state={state} selected={draft.client} busy={busy}
                        onSelect={(client) => connection.setDraft({ client })}
                        onFinish={() => runStep(() => connection.save({ setupComplete: true }))} />}
                    {stage === 'manage' && <McpPanel className="mcp-manage-summary">
                        <div className="mcp-section-heading"><h2 ref={stepHeading} tabIndex={-1}>{__('Your AI connection is enabled', 'publishpress-hub')}</h2>
                            <Button variant="secondary" disabled={busy} onClick={() => runStep(() => connection.save({ setupComplete: false }))}>{__('Connect another AI app', 'publishpress-hub')}</Button>
                        </div>
                        <p>{__('Manage the actions your AI can use below. To set up another app or computer, open the connection steps again.', 'publishpress-hub')}</p>
                    </McpPanel>}
                    {(stage === 'access' || stage === 'manage') && <>
                        <McpPanel>
                            <h2 ref={stage === 'access' ? stepHeading : undefined} tabIndex={stage === 'access' ? -1 : undefined}>{__('Control what your AI can do', 'publishpress-hub')}</h2>
                            <CheckboxControl label={__('Allow AI to read site data', 'publishpress-hub')} checked={draft.readsEnabled}
                                onChange={(readsEnabled) => connection.setDraft({ readsEnabled })} disabled={busy} />
                            <CheckboxControl label={__('Allow AI to change site data', 'publishpress-hub')} checked={draft.writesEnabled}
                                onChange={(writesEnabled) => connection.setDraft({ writesEnabled })} disabled={busy} />
                            <p>{__('You can change these choices at any time. Turn off change access to let your AI only read site data.', 'publishpress-hub')}</p>
                        </McpPanel>
                        <McpActions state={state} edits={edits} busy={busy} onAction={connection.setAction} onNavigate={connection.navigate} />
                        <McpPanel className="mcp-diagnostics"><PanelBody title={__('Connection diagnostics', 'publishpress-hub')} initialOpen={false}>
                            <table className="widefat striped"><tbody>{Object.entries(state.diagnostics).map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody></table>
                        </PanelBody></McpPanel>
                    </>}
                </>}
            </div>
            {state && !transitioning && ['access', 'manage', 'connect'].includes(stage) && <div className="mcp-save-bar">
                <span className="mcp-save-status" role="status">{dirty && __('You have unsaved changes.', 'publishpress-hub')}</span>
                <Button variant="primary" disabled={busy || (!dirty && stage !== 'access')} isLoading={saving} onClick={save}>
                    {stage === 'access' ? __('Save and continue', 'publishpress-hub') : __('Save Changes', 'publishpress-hub')}
                </Button>
                <Button variant="secondary" disabled={busy} onClick={connection.refresh}>{__('Refresh status', 'publishpress-hub')}</Button>
            </div>}
        </div>
        <SnackbarList />
    </AdminPageLayout>;
};

export const McpPage = memo(McpPageComponent);
