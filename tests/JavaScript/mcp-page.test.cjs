/**
 * Verify React AI connection rendering, request state and draft preservation.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const babel = require('@babel/core');
// Use the matching React and renderer installed with WordPress element.
const elementDirectory = path.dirname(require.resolve('@wordpress/element'));
const React = require(require.resolve('react', { paths: [elementDirectory] }));
const { renderToStaticMarkup } = require(require.resolve('react-dom/server', { paths: [elementDirectory] }));
const root = path.resolve(__dirname, '../../resources/src/jsx');
const i18n = { __: (value) => value, sprintf: (value, ...args) => {
    let index = 0;
    return value.replace(/%(?:(\d+)\$)?[sd]/g, (match, position) => String(args[position ? Number(position) - 1 : index++]));
} };

function moduleLoader(overrides = {}) {
    const cache = new Map();
    return function load(filename) {
        const absolute = path.resolve(filename);
        const file = [absolute, absolute + '.js', absolute + '.jsx', path.join(absolute, 'index.jsx')].find((item) => fs.existsSync(item) && fs.statSync(item).isFile());
        if (!file) throw new Error('Missing module: ' + filename);
        if (overrides[file]) return overrides[file];
        if (cache.has(file)) return cache.get(file).exports;
        const module = { exports: {} };
        cache.set(file, module);
        const code = babel.transformFileSync(file, {
            configFile: false, babelrc: false,
            presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-react'],
        }).code;
        const resolve = (name) => {
            if (overrides[name]) return overrides[name];
            if (name === '@wordpress/element') return React;
            if (name === '@wordpress/escape-html') return require(name);
            if (name === '@publishpress-hub/i18n') return i18n;
            if (name.startsWith('.')) return load(path.resolve(path.dirname(file), name));
            throw new Error('Unexpected dependency: ' + name);
        };
        new Function('require', 'module', 'exports', 'React', 'window', code)(resolve, module, module.exports, React, overrides.window || {});
        return module.exports;
    };
}
const stateFile = path.join(root, 'components/pages/mcp/connection-state.js');
const hookFile = path.join(root, 'components/pages/mcp/use-mcp-connection.js');
const stateHelpers = moduleLoader()(stateFile);
const fixture = (stage = 'manage', plugin = 'first') => ({
    connectionEnabled: true, readsEnabled: true, writesEnabled: false, selectedClient: 'assistant', setupComplete: stage === 'manage',
    disabledActions: [], setupStage: stage, diagnostics: { HTTPS: 'Available' },
    profileUrl: '/profile.php', pluginsUrl: '/plugins.php',
    actionView: { plugin, search: '', behavior: '', page: 1, pages: 2, total: 11,
        actions: [{ name: plugin + '/read', plugin, label: 'Read item', description: 'Read fixture', readonly: true, destructive: false }],
        groups: { first: { label: 'First', selected: 10, total: 10 }, second: { label: 'Second', selected: 1, total: 1 } } },
    clientSetups: {
        assistant: { label: 'Ask my AI to help', description: 'Get a script.', content: 'Fixture setup prompt', filename: 'prompt.txt' },
        manual: { label: 'Set up manually', description: 'Copy configuration.', content: '{"mcpServers":{}}', filename: 'config.json' },
    },
});

test('save payload retains edits from other pages and preserves unchanged visible actions', () => {
    const state = fixture('access', 'second');
    const data = stateHelpers.savePayload(state, stateHelpers.savedDraft(state), { 'first/read': false }, {});
    assert.deepEqual(data.displayedActions, ['second/read', 'first/read']);
    assert.deepEqual(data.selectedActions, ['second/read']);
    assert.equal(data.reviewActions, true);
    assert.equal(stateHelpers.savePayload(state, stateHelpers.savedDraft(state), {}, {}, { enabled: false }).reviewActions, false);
});

test('filter parsing and plugin selection counts account for unsaved edits', () => {
    assert.equal(stateHelpers.readFilters(new URL('https://fixture.test/?action_page=bad')).action_page, 1);
    assert.equal(stateHelpers.selectedCount('first', { selected: 2 }, { 'first/one': false, 'second/two': false }, []), 1);
});

// Exercise the hook with deterministic effects and deferred network replies, without a browser DOM.
function hookFixture() {
    const slots = [];
    const pendingEffects = [];
    const events = new Map();
    const requests = [];
    let cursor = 0;
    let current;
    const depsChanged = (previous, next) => !previous || !next || previous.length !== next.length || next.some((item, index) => !Object.is(item, previous[index]));
    const hooks = {
        useState(initial) {
            const index = cursor++;
            if (!slots[index]) slots[index] = { value: typeof initial === 'function' ? initial() : initial };
            return [slots[index].value, (value) => {
                const next = typeof value === 'function' ? value(slots[index].value) : value;
                if (!Object.is(next, slots[index].value)) { slots[index].value = next; render(); }
            }];
        },
        useRef(value) { const index = cursor++; return slots[index] || (slots[index] = { current: value }); },
        useCallback(callback, deps) {
            const index = cursor++;
            if (!slots[index] || depsChanged(slots[index].deps, deps)) slots[index] = { value: callback, deps };
            return slots[index].value;
        },
        useEffect(callback, deps) {
            const index = cursor++;
            if (!slots[index] || depsChanged(slots[index].deps, deps)) {
                const previous = slots[index];
                slots[index] = { deps, cleanup: previous?.cleanup };
                pendingEffects.push(() => { previous?.cleanup?.(); slots[index].cleanup = callback(); });
            }
        },
    };
    const window = {
        location: { href: 'https://fixture.test/wp-admin/admin.php?page=publishpress-hub-mcp' },
        addEventListener: (name, callback) => events.set(name, callback),
        removeEventListener: (name, callback) => { if (events.get(name) === callback) events.delete(name); },
        history: { pushState(unused, title, url) { window.location.href = String(url); } },
    };
    const apiFetch = (options) => new Promise((resolve, reject) => requests.push({ options, resolve, reject }));
    const { useMcpConnection } = moduleLoader({ '@wordpress/element': hooks, '@wordpress/api-fetch': apiFetch, window })(hookFile);
    function render() { cursor = 0; current = useMcpConnection(); }
    render();
    const flush = async () => {
        while (pendingEffects.length) pendingEffects.shift()();
        await new Promise(setImmediate);
        while (pendingEffects.length) pendingEffects.shift()();
    };
    return { requests, window, events, flush, get current() { return current; },
        async start(state = fixture()) { await flush(); requests[0].resolve({ success: true, state }); await flush(); },
    };
}

test('React hook preserves edits and draft settings through filtered page loads and failed saves', async () => {
    const ui = hookFixture();
    await ui.start();
    ui.current.setAction('first/read', false);
    ui.current.setDraft({ readsEnabled: false, writesEnabled: true, client: 'manual' });
    const navigating = ui.current.navigate({ plugin: 'second', action_page: 2 });
    ui.requests[1].resolve({ success: true, state: fixture('manage', 'second') });
    await navigating;
    assert.equal(ui.current.draft.writesEnabled, true);
    assert.equal(ui.current.draft.readsEnabled, false);
    assert.equal(ui.current.edits['first/read'], false);
    const saving = ui.current.save();
    assert.equal(ui.requests[2].options.method, 'POST');
    assert.deepEqual(ui.requests[2].options.data.displayedActions, ['second/read', 'first/read']);
    ui.requests[2].reject(new Error('Save failed'));
    await saving;
    assert.equal(ui.current.dirty, true);
    assert.equal(ui.current.notice.status, 'error');
    assert.equal(ui.current.edits['first/read'], false);
    const retry = ui.current.save();
    ui.requests[3].resolve({ success: true, message: 'Saved', state: { ...fixture('manage', 'second'), writesEnabled: true, selectedClient: 'manual', disabledActions: ['first/read'] } });
    await retry;
    assert.equal(ui.current.dirty, false);
    assert.equal(ui.current.notice.message, 'Saved');
});

test('unsaved edits remain protected while an asynchronous save is pending', async () => {
    const ui = hookFixture();
    await ui.start();
    ui.current.setAction('first/read', false);
    await ui.flush();
    const saving = ui.current.save();
    let warned = false;
    ui.events.get('beforeunload')({ preventDefault() { warned = true; } });
    assert.equal(warned, true);
    ui.requests[1].reject(new Error('Save failed'));
    await saving;
    assert.equal(ui.current.edits['first/read'], false);
});

test('stale filter responses cannot overwrite newer results or browser history', async () => {
    const ui = hookFixture();
    await ui.start();
    const first = ui.current.navigate({ search: 'old' });
    const second = ui.current.navigate({ search: 'new' });
    ui.requests[2].resolve({ success: true, state: { ...fixture(), actionView: { ...fixture().actionView, search: 'new' } } });
    await second;
    ui.requests[1].resolve({ success: true, state: { ...fixture(), actionView: { ...fixture().actionView, search: 'old' } } });
    await first;
    assert.equal(ui.current.state.actionView.search, 'new');
    assert.match(ui.window.location.href, /search=new/);
});

test('adapter installation is followed by a fresh REST state request without navigation', async () => {
    const ui = hookFixture();
    await ui.start(fixture('prerequisite'));
    const installing = ui.current.install();
    assert.equal(ui.requests[1].options.path, '/publishpress-hub/v1/mcp/adapter');
    ui.requests[1].resolve({ success: true, message: 'Activated' });
    await ui.flush();
    assert.match(ui.requests[2].options.path, /mcp\/connection/);
    ui.requests[2].resolve({ success: true, state: fixture('access') });
    await installing;
    assert.equal(ui.current.state.setupStage, 'access');
    assert.equal(ui.current.notice.message, 'Activated');
});

test('initial request errors can be retried and successful refresh clears the error', async () => {
    const ui = hookFixture();
    await ui.flush();
    ui.requests[0].reject(new Error('Network error'));
    await ui.flush();
    assert.equal(ui.current.notice.status, 'error');
    const retry = ui.current.refresh();
    ui.requests[1].resolve({ success: true, state: fixture() });
    await retry;
    assert.equal(ui.current.state.setupStage, 'manage');
    assert.equal(ui.current.notice, null);
});

const h = React.createElement;
const WP = {
    SnackbarList: () => null,
    Button: React.forwardRef(({ children, href, className, disabled, onClick, type, target, rel }, ref) => h(href ? 'a' : 'button', { ref, href, className, disabled, onClick, type, target, rel }, children)),
    Card: ({ children, className, ...props }) => h('div', { className, ...props }, children),
    CardBody: ({ children }) => h('div', { className: 'components-card__body' }, children),
    Notice: ({ children, status }) => h('div', { role: 'alert', 'data-status': status }, children),
    Spinner: () => h('span', { role: 'status' }, 'Loading'),
    ToggleControl: ({ label, checked, disabled, onChange }) => h('label', null, h('input', { type: 'checkbox', role: 'switch', checked, disabled, onChange }), label),
    CheckboxControl: ({ label, checked, disabled, onChange }) => h('label', null, h('input', { type: 'checkbox', checked, disabled, onChange }), label),
    TextareaControl: React.forwardRef(({ label, value, readOnly, rows }, ref) => h('label', null, label, h('textarea', { ref, value, readOnly, rows }))),
    SearchControl: ({ label, value, onChange }) => h('label', null, label, h('input', { value, onChange })),
    SelectControl: ({ label, value, onChange, options }) => h('label', null, label, h('select', { value, onChange }, options.map((item) => h('option', { key: item.value, value: item.value }, item.label)))),
    RadioControl: ({ label, options, selected, onChange }) => h('fieldset', null, h('legend', null, label), options.map((option) => h('label', { key: option.value }, h('input', { type: 'radio', value: option.value, checked: selected === option.value, onChange }), option.label))),
    PanelBody: ({ title, children }) => h('details', null, h('summary', null, title), children),
    TabPanel: ({ tabs, children, initialTabName }) => h('div', null, tabs.map((tab) => h('span', { key: tab.name }, tab.title)), children(tabs.find((tab) => tab.name === initialTabName))),
    SlotFillProvider: ({ children }) => h(React.Fragment, null, children),
    Popover: { Slot: () => null },
};
function renderPage(state, draftValues = {}) {
    const load = moduleLoader({
        '@wordpress/components': WP,
        '@wordpress/data': { useDispatch: () => ({ createSuccessNotice() {} }), useSelect: () => [] },
        'lodash/filter': (items, values) => items.filter((item) => Object.entries(values).every(([key, value]) => item[key] === value)),
        [hookFile]: { useMcpConnection: () => ({ state, draft: { enabled: state?.connectionEnabled || false, readsEnabled: true, writesEnabled: false, client: 'assistant', ...draftValues }, edits: {}, loading: !state, saving: false, dirty: false }) },
        window: { ppHubMcpConfig: { logoUrl: '/logo.png', welcomeImageUrl: '/welcome.png' } },
    });
    return renderToStaticMarkup(h(load(path.join(root, 'components/pages/mcp-page.jsx')).McpPage));
}

test('React renders the shared layout and action review before client setup', () => {
    const html = renderPage(fixture('access'));
    assert.match(html, /pp-hub-admin-page-layout/);
    assert.match(html, /Save and continue/);
    assert.match(html, /Allow AI to read site data/);
    assert.match(html, /Allow AI to change site data/);
    assert.doesNotMatch(html, /Choose actions for your AI|Manage application passwords|Every action also checks/);
    assert.doesNotMatch(html, /How would you like to connect/);
});

test('React renders assisted and manual guides without an installer', () => {
    const state = fixture('connect');
    const assistant = renderPage(state, { client: 'assistant' });
    assert.match(assistant, /Fixture setup prompt/);
    assert.doesNotMatch(assistant, /Download installer/);
    const manual = renderPage(state, { client: 'manual' });
    assert.match(manual, /Server configuration/);
    assert.match(manual, /readonly/i);
});

test('React renders management controls after setup and hides them while disabled', () => {
    assert.match(renderPage(fixture('manage')), /Connect another AI app/);
    const disabled = renderPage({ ...fixture('disabled'), connectionEnabled: false });
    assert.doesNotMatch(disabled, /Plugin actions|Connect your AI app|Save Changes/);
    assert.match(disabled, /Enable AI connections/);
});

test('React renders prerequisite checks and the static loading state', () => {
    const state = { ...fixture('prerequisite'), canInstallAdapter: true, nextStep: { key: 'adapter', label: 'Install adapter', description: 'Official adapter' } };
    assert.match(renderPage(state), /Install and activate MCP Adapter/);
    assert.doesNotMatch(renderPage(state), /Check again/);
    assert.match(renderPage(state), /MCP Adapter plugin page/);
    assert.match(renderPage(null), /mcp-skeleton/);
});

test('React escapes action metadata and configuration instead of interpreting HTML', () => {
    const state = fixture('manage');
    state.actionView.actions[0].label = '<script>alert(1)</script>';
    const html = renderPage(state);
    assert.match(html, /&lt;script&gt;/);
    assert.doesNotMatch(html, /<script>/);
});


test('action page size survives navigation and saves without losing unsaved selections', async () => {
    assert.equal(stateHelpers.readFilters(new URL('https://fixture.test/?per_page=50')).per_page, 50);
    assert.equal(stateHelpers.readFilters(new URL('https://fixture.test/?per_page=999')).per_page, 10);
    const ui = hookFixture();
    await ui.start();
    ui.current.setAction('first/read', false);
    const navigation = ui.current.navigate({ per_page: 50, action_page: 1 });
    assert.match(ui.requests[1].options.path, /per_page=50/);
    ui.requests[1].resolve({ success: true, state: fixture() });
    await navigation;
    assert.equal(new URL(ui.window.location.href).searchParams.get('per_page'), '50');
    assert.equal(ui.current.edits['first/read'], false);
    const saving = ui.current.save();
    assert.equal(ui.requests[2].options.data.per_page, 50);
    ui.requests[2].resolve({ success: true, state: fixture(), message: 'Saved' });
    await saving;
    assert.match(renderPage(fixture()), /Actions per page/);
});


test('read access defaults on for existing settings and is saved independently of writes', () => {
    const state = fixture('manage');
    delete state.readsEnabled;
    assert.equal(stateHelpers.savedDraft(state).readsEnabled, true);
    const draft = { ...stateHelpers.savedDraft(state), readsEnabled: false, writesEnabled: true };
    const payload = stateHelpers.savePayload(state, draft, {}, {});
    assert.equal(payload.readsEnabled, false);
    assert.equal(payload.writesEnabled, true);
});


test('connection toggle sends false and remains off when adapter setup is incomplete', async () => {
    const ui = hookFixture();
    await ui.start(fixture('prerequisite'));
    const saving = ui.current.save({ enabled: false });
    assert.equal(ui.requests[1].options.data.enabled, false);
    const disabled = { ...fixture('disabled'), connectionEnabled: false };
    ui.requests[1].resolve({ success: true, message: 'Changes saved.', state: disabled });
    await saving;
    assert.equal(ui.current.draft.enabled, false);
    assert.equal(ui.current.state.setupStage, 'disabled');
    assert.equal(ui.current.dirty, false);
});


test('background adapter status checks keep the toggle usable and cannot overwrite a disable save', async () => {
    const ui = hookFixture();
    await ui.start(fixture('prerequisite'));
    const checking = ui.current.refresh({ background: true });
    assert.equal(ui.current.loading, false, 'A focus-triggered check must not disable the toggle');
    const saving = ui.current.save({ enabled: false });
    assert.equal(ui.requests[2].options.method, 'POST');
    assert.equal(ui.requests[2].options.data.enabled, false);
    ui.requests[2].resolve({ success: true, message: 'Changes saved.', state: { ...fixture('disabled'), connectionEnabled: false } });
    await saving;
    ui.requests[1].resolve({ success: true, state: fixture('prerequisite') });
    await checking;
    assert.equal(ui.current.draft.enabled, false);
    assert.equal(ui.current.state.connectionEnabled, false);
});
