/**
 * Action selection, filtering and pagination using React controls.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

import { useEffect, useState } from '@wordpress/element';
import { CheckboxControl, PanelBody, SearchControl, SelectControl, Spinner, TabPanel } from '@wordpress/components';
import { __, sprintf } from '@publishpress-hub/i18n';
import Button from '../../buttons/button';
import Badge from '../../badge/badge';
import { McpPanel } from './panel';
import { isSelected, selectedCount } from './connection-state';

export const McpActions = ({ state, edits, busy, onAction, onNavigate }) => {
    const view = state.actionView;
    const [search, setSearch] = useState(view.search);
    const [behavior, setBehavior] = useState(view.behavior);
    useEffect(() => { setSearch(view.search); setBehavior(view.behavior); }, [view.search, view.behavior]);
    const tabs = Object.entries(view.groups).map(([name, group]) => ({
        name,
        title: <>{group.label}<span className="mcp-tab-count">{selectedCount(name, group, edits, state.disabledActions)}/{group.total}</span></>,
    }));
    return (
        <McpPanel className="mcp-actions" aria-busy={busy}>
            <div className="mcp-section-heading"><h2>{__('Plugin actions', 'publishpress-hub')}</h2>{busy && <Spinner />}</div>
            <p>{__('Choose actions for each plugin. Your selections are kept while you browse. Save changes to apply them.', 'publishpress-hub')}</p>
            <fieldset className="mcp-action-controls" disabled={busy}>
            <TabPanel
                key={view.plugin}
                className="mcp-tabs"
                tabs={tabs}
                initialTabName={view.plugin}
                onSelect={(plugin) => !busy && plugin !== view.plugin && onNavigate({ plugin, action_page: 1 })}
            >
                {() => <>
                    <form className="mcp-filters" onSubmit={(event) => {
                        event.preventDefault();
                        onNavigate({ search, behavior, action_page: 1 });
                    }}>
                        <SearchControl label={__('Search actions', 'publishpress-hub')} value={search} onChange={setSearch} disabled={busy} />
                        <SelectControl label={__('Action type', 'publishpress-hub')} value={behavior} onChange={setBehavior} disabled={busy} options={[
                            { value: '', label: __('All actions', 'publishpress-hub') },
                            { value: 'read', label: __('Read only', 'publishpress-hub') },
                            { value: 'write', label: __('Changes site data', 'publishpress-hub') },
                            { value: 'destructive', label: __('Potentially destructive', 'publishpress-hub') },
                        ]} />
                        <Button variant="secondary" type="submit" disabled={busy}>{__('Filter', 'publishpress-hub')}</Button>
                    </form>
                    <table className="widefat striped mcp-action-table">
                        <thead><tr><th>{__('Selected', 'publishpress-hub')}</th><th>{__('Action', 'publishpress-hub')}</th><th>{__('Behavior', 'publishpress-hub')}</th></tr></thead>
                        <tbody>
                            {!view.actions.length && <tr><td colSpan="3">{__('No actions match these filters.', 'publishpress-hub')}</td></tr>}
                            {view.actions.map((action) => <tr key={action.name}>
                                <td><CheckboxControl
                                    label={<span className="screen-reader-text">{sprintf(__('Select %s', 'publishpress-hub'), action.label)}</span>}
                                    checked={isSelected(action.name, edits, state.disabledActions)}
                                    onChange={(checked) => onAction(action.name, checked)}
                                    disabled={busy}
                                /></td>
                                <td>{action.label}<PanelBody className="mcp-action-details" title={__('Details', 'publishpress-hub')} initialOpen={false}>
                                    <code>{action.name}</code><p>{action.description}</p>
                                </PanelBody></td>
                                <td><Badge className="mcp-badge">{action.readonly ? __('Read only', 'publishpress-hub') : __('Changes site data', 'publishpress-hub')}</Badge>
                                    {!action.readonly && action.destructive && <p className="description">{__('Potentially destructive', 'publishpress-hub')}</p>}
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                    <div className="mcp-pagination">
                        <span>{sprintf(__('Page %1$d of %2$d - %3$d actions', 'publishpress-hub'), view.page, view.pages, view.total)}</span>
                        {view.page > 1 && <Button variant="secondary" disabled={busy} onClick={() => onNavigate({ action_page: view.page - 1 })}>{__('Previous', 'publishpress-hub')}</Button>}
                        {view.page < view.pages && <Button variant="secondary" disabled={busy} onClick={() => onNavigate({ action_page: view.page + 1 })}>{__('Next', 'publishpress-hub')}</Button>}
                    </div>
                </>}
            </TabPanel>
            </fieldset>
        </McpPanel>
    );
};
