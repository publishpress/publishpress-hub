const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const babel = require('@babel/core');

const element = (type, props, ...children) => ({ type, props: { ...props, children } });
const flatten = node => !node || typeof node !== 'object' ? [] : [node, ...(node.props?.children || []).flat(Infinity).flatMap(flatten)];

function load(relativePath, window, apiFetch = () => {}) {
    let states = [], cursor = 0;
    const hooks = {
        useState(initial) {
            const slot = cursor++;
            if (!(slot in states)) states[slot] = typeof initial === 'function' ? initial() : initial;
            return [states[slot], value => { states[slot] = typeof value === 'function' ? value(states[slot]) : value; }];
        },
        useCallback: callback => callback,
        useRef: initial => ({ current: initial }),
        useEffect: () => {},
    };
    const module = { exports: {} };
    const code = babel.transformSync(fs.readFileSync(path.resolve(__dirname, '../..', relativePath), 'utf8'), {
        babelrc: false, configFile: false,
        presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-react'],
    }).code;
    vm.runInNewContext(code, {
        module, exports: module.exports, window, React: { createElement: element },
        require(name) {
            if (name === '@wordpress/element') return hooks;
            if (name === '@wordpress/components') return { CheckboxControl: 'Checkbox', TextControl: 'Text', ToggleControl: 'Toggle', Spinner: 'Spinner' };
            if (name === '@wordpress/api-fetch') return { __esModule: true, default: apiFetch };
            if (name === '@publishpress-hub/i18n') return { __: text => text, sprintf: (text, name) => text.replace('%s', name) };
            if (name.endsWith('/buttons/button')) return { Button: 'Button' };
            if (name === './action-button') return { ActionButton: 'ActionButton' };
            throw Error(name);
        },
    });
    return { exports: module.exports, render(callback) { cursor = 0; return callback(module.exports); } };
}

async function main() {
    const stored = new Map();
    const window = {
        ppHubPluginsDashboardConfig: { preferencesKey: '1:7' },
        location: { hash: '#suite-license' },
        localStorage: { getItem: key => stored.get(key), setItem: (key, value) => stored.set(key, value) },
    };
    const preferences = load('resources/src/jsx/components/plugins-list/hooks/use-dashboard-preferences.js', window);
    stored.set('pp-hub-dashboard:1:7', 'invalid JSON');
    assert.equal(preferences.exports.readPreferences().layout, 'cards');
    assert.equal(preferences.exports.readPreferences().grouped, true);
    let state = preferences.render(module => module.useDashboardPreferences());
    state.toggleFavorite('statuses');
    state = preferences.render(module => module.useDashboardPreferences());
    assert.equal(state.preferences.favorites[0], 'statuses');
    state.updatePreferences({ layout: 'cards' });
    assert.equal(JSON.parse(stored.get('pp-hub-dashboard:1:7')).layout, 'cards');
    window.ppHubPluginsDashboardConfig.preferencesKey = '1:8';
    assert.equal(preferences.exports.readPreferences().favorites.length, 0);
    window.localStorage.getItem = () => { throw Error('Storage disabled'); };
    assert.equal(preferences.exports.readPreferences().layout, 'cards');

    const requests = [];
    let refreshed = 0;
    const suite = load('resources/src/jsx/components/pages/suite-license.jsx', window, async request => {
        requests.push(request);
        if (request.path.includes('statuses')) throw Error('Product not covered');
        return { success: true, licensed: true };
    });
    const render = () => suite.render(module => module.SuiteLicense({
        plugins: [{ slug: 'statuses', name: 'Statuses' }, { slug: 'planner', name: 'Planner' }],
        onRefresh: async () => { refreshed++; }, isLoading: false,
    }));
    let tree = render();
    flatten(tree).find(node => node.type === 'Text').props.onChange('test-key');
    flatten(tree).filter(node => node.type === 'Checkbox').forEach(node => node.props.onChange(true));
    tree = render();
    await flatten(tree).find(node => node.type === 'form').props.onSubmit({ preventDefault() {} });
    assert.equal(requests.length, 2, 'A failure must not prevent checking another selected product');
    assert.ok(requests.every(request => request.path.endsWith('/activate-license') && request.data.applyToAll === false));
    assert.equal(refreshed, 1);
    tree = render();
    assert.equal(flatten(tree).find(node => node.type === 'Text').props.value, '', 'Do not retain the entered key after completion');
    const output = JSON.stringify(tree);
    assert.ok(output.includes('Product not covered') && output.includes('License activated.'));

    window.ppHubPluginsDashboardConfig.pluginNavigation = {
        statuses: { primary: { label: 'Open Statuses', url: '/wp-admin/admin.php?page=publishpress-statuses' }, secondary: [{label: 'Settings', url: '/wp-admin/admin.php?page=statuses-settings'}] },
    };
    const cards = load('resources/src/jsx/components/plugins-list/components/plugin-card.jsx', window);
    let deactivated = false;
    const cardProps = {
        pluginFamily: { slug: 'statuses', hasAnyVersionActive: true, hasAnyVersionInstalled: true },
        displayName: 'PublishPress Statuses Pro', iconSrc: '/statuses.png',
        progressStates: {}, actionButtons: [], onDeactivate: () => { deactivated = true; },
    };
    let card = cards.exports.PluginCard(cardProps);
    assert.ok(JSON.stringify(card).includes('Open Statuses'));
    assert.ok(JSON.stringify(card).includes('statuses-settings'));
    const activating = cards.exports.PluginCard({ ...cardProps, progressStates: { isActivating: true } });
    assert.ok(flatten(activating).some(node => node.type === 'Spinner'));
    window.ppHubPluginsDashboardConfig.pluginNavigation.statuses.primary = null;
    card = cards.exports.PluginCard(cardProps);
    assert.ok(JSON.stringify(card).includes('statuses-settings'), 'Removing the primary link preserves secondary links');
    assert.ok(!JSON.stringify(card).includes('Open Statuses'));

    flatten(card).find(node => node.type === 'Toggle').props.onChange(false);
    assert.equal(deactivated, true, 'Card deactivation uses the existing confirmation handler');
    card = cards.exports.PluginCard({ ...cardProps, progressStates: { isUpdating: true } });
    assert.equal(flatten(card).find(node => node.type === 'Toggle').props.disabled, true);
    assert.ok(flatten(card).filter(node => node.type === 'ActionButton').every(node => node.props.disabled));
    card = cards.exports.PluginCard({ ...cardProps, pluginFamily: { ...cardProps.pluginFamily, hasConflictingInstallations: true } });
    assert.equal(flatten(card).some(node => node.type === 'Toggle'), false);
    assert.equal(flatten(card).some(node => node.props?.href?.startsWith('/wp-admin/')), false);
    console.log('Passed: card deactivation handler, busy controls, and conflict navigation protection.');
    console.log('Passed: preference persistence, user isolation, unavailable storage, partial license failure, individual validation, and key clearing.');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
