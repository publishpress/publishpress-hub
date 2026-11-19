/**
 * AI connection draft and filter operations.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

export const connectionPath = '/publishpress-hub/v1/mcp/connection';

export const readFilters = (url) => ({
    plugin: url.searchParams.get('plugin') || '',
    search: url.searchParams.get('search') || '',
    behavior: url.searchParams.get('behavior') || '',
    action_page: Math.max(1, parseInt(url.searchParams.get('action_page'), 10) || 1),
    per_page: [10, 25, 50, 100].includes(Number(url.searchParams.get('per_page'))) ? Number(url.searchParams.get('per_page')) : 10,
});

export const requestPath = (filters) => `${connectionPath}?${new URLSearchParams(filters)}`;

export const savedDraft = (state) => ({
    enabled: state.connectionEnabled,
    readsEnabled: state.readsEnabled !== false,
    writesEnabled: state.writesEnabled,
    client: state.selectedClient,
});

export const isSelected = (name, edits, disabled) => Object.prototype.hasOwnProperty.call(edits, name)
    ? edits[name] : !disabled.includes(name);

export const savePayload = (state, draft, edits, filters, overrides = {}) => {
    const scope = [...new Set([...state.actionView.actions.map((action) => action.name), ...Object.keys(edits)])];
    return {
        ...filters,
        ...draft,
        setupComplete: state.setupComplete,
        reviewActions: state.setupStage === 'access' && !Object.prototype.hasOwnProperty.call(overrides, 'enabled'),
        displayedActions: scope,
        selectedActions: scope.filter((name) => isSelected(name, edits, state.disabledActions)),
        ...overrides,
    };
};

export const selectedCount = (plugin, group, edits, disabled) => group.selected + Object.entries(edits)
    .filter(([name]) => name.startsWith(`${plugin}/`))
    .reduce((total, [name, checked]) => total + Number(checked) - Number(!disabled.includes(name)), 0);
