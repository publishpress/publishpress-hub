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
            if (name === '@publishpress-hub/i18n') return { __: text => text, _n: (single, plural, count) => count === 1 ? single : plural, sprintf: (text, ...values) => { let index = 0; return text.replace(/%(?:(\d+)\$)?[sd]/g, (match, position) => String(values[position ? Number(position) - 1 : index++])); } };
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
    assert.equal(preferences.exports.readPreferences().layout, 'list');
    stored.set('pp-hub-dashboard:1:7', JSON.stringify({ layout: 'unknown' }));
    assert.equal(preferences.exports.readPreferences().layout, 'list');
    stored.set('pp-hub-dashboard:1:7', 'invalid JSON');
    assert.equal(preferences.exports.readPreferences().layout, 'list');
    assert.equal(preferences.exports.readPreferences().grouped, true);
    let state = preferences.render(module => module.useDashboardPreferences());
    state.toggleFavorite('statuses');
    state = preferences.render(module => module.useDashboardPreferences());
    assert.equal(state.preferences.favorites[0], 'statuses');
    state.updatePreferences({ layout: 'cards' });
    assert.equal(JSON.parse(stored.get('pp-hub-dashboard:1:7')).layout, 'cards');
    assert.equal(preferences.exports.readPreferences().layout, 'cards');
    window.ppHubPluginsDashboardConfig.preferencesKey = '1:8';
    assert.equal(preferences.exports.readPreferences().favorites.length, 0);
    window.localStorage.getItem = () => { throw Error('Storage disabled'); };
    assert.equal(preferences.exports.readPreferences().layout, 'list');

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
    assert.ok(output.includes('Product not covered') && output.includes('Pro license active for this site.'));

    window.localStorage.getItem = key => stored.get(key);
    window.location.hash = '';
    const closedProps = { plugins: [], onRefresh: async () => {}, isLoading: false };
    const dismissedSuite = load('resources/src/jsx/components/pages/suite-license.jsx', window);
    tree = dismissedSuite.render(module => module.SuiteLicense(closedProps));
    flatten(tree).find(node => node.props?.['aria-label'] === 'Dismiss bundle license setup').props.onClick();
    const reloadedSuite = load('resources/src/jsx/components/pages/suite-license.jsx', window);
    tree = reloadedSuite.render(module => module.SuiteLicense(closedProps));
    assert.ok(JSON.stringify(tree).includes('Set up a bundle license'));
    tree.props.onClick();
    tree = reloadedSuite.render(module => module.SuiteLicense(closedProps));
    assert.ok(flatten(tree).some(node => node.type === 'form'));
    stored.set('pp-hub-bundle-dismissed:1:8', 'false');
    const licensedSuite = load('resources/src/jsx/components/pages/suite-license.jsx', window);
    tree = licensedSuite.render(module => module.SuiteLicense({ ...closedProps,
        plugins: [{ slug: 'planner', proPlugin: { isLicensed: true } }] }));
    assert.ok(JSON.stringify(tree).includes('Pro license active for 1 product.'));
    assert.ok(JSON.stringify(tree).includes('Manage licenses'));

    window.location.hash = '#suite-license';
    const pending = [];
    let active = 0;
    let maximum = 0;
    const parallelSuite = load('resources/src/jsx/components/pages/suite-license.jsx', window, () => {
        active++;
        maximum = Math.max(maximum, active);
        return new Promise(resolve => pending.push(() => { active--; resolve({ success: true, licensed: true }); }));
    });
    const parallelProps = { ...closedProps, plugins: Array.from({ length: 5 }, (_, index) => ({ slug: `fixture-${index}`, name: `Fixture ${index}` })) };
    tree = parallelSuite.render(module => module.SuiteLicense(parallelProps));
    flatten(tree).find(node => node.type === 'Text').props.onChange('test-key');
    tree = parallelSuite.render(module => module.SuiteLicense(parallelProps));
    const form = flatten(tree).find(node => node.type === 'form');
    const activation = form.props.onSubmit({ preventDefault() {} });
    await form.props.onSubmit({ preventDefault() {} });
    assert.equal(pending.length, 3, 'At most three activation requests run together and duplicate submission is blocked');
    while (pending.length) {
        pending.shift()();
        await new Promise(resolve => setImmediate(resolve));
    }
    await activation;
    assert.equal(maximum, 3);
    tree = parallelSuite.render(module => module.SuiteLicense(parallelProps));
    assert.equal(flatten(tree).filter(node => node.type === 'li').length, 5);

    const cards = load('resources/src/jsx/components/plugins-list/components/plugin-card.jsx', window);
    let deactivated = false;
    const cardProps = {
        pluginFamily: { slug: 'statuses', hasAnyVersionActive: true, hasAnyVersionInstalled: true },
        displayName: 'PublishPress Statuses Pro', iconSrc: '/statuses.png',
        progressStates: {}, actionButtons: [], onDeactivate: () => { deactivated = true; },
    };
    let card = cards.exports.PluginCard(cardProps);
    assert.equal(flatten(card).filter(node => node.type === 'ActionButton').length, 1);
    assert.equal(flatten(card).some(node => node.type === 'nav'), false);
    const activating = cards.exports.PluginCard({ ...cardProps, progressStates: { isActivating: true } });
    assert.ok(flatten(activating).some(node => node.type === 'Spinner'));

    flatten(card).find(node => node.type === 'Toggle').props.onChange(false);
    assert.equal(deactivated, true, 'Card deactivation uses the existing confirmation handler');
    card = cards.exports.PluginCard({ ...cardProps, progressStates: { isUpdating: true } });
    const busyToggle = flatten(card).find(node => node.type === 'Toggle');
    assert.equal(busyToggle.props['aria-disabled'], true);
    deactivated = false;
    busyToggle.props.onChange(false);
    assert.equal(deactivated, false, 'A focusable busy toggle must not trigger deactivation');
    assert.ok(flatten(card).filter(node => node.type === 'ActionButton').every(node => node.props.disabled));
    card = cards.exports.PluginCard({ ...cardProps, pluginFamily: { ...cardProps.pluginFamily, hasConflictingInstallations: true } });
    assert.equal(flatten(card).some(node => node.type === 'Toggle'), false);
    assert.equal(flatten(card).some(node => node.props?.href?.startsWith('/wp-admin/')), false);
    console.log('Passed: card deactivation handler, busy controls, and conflict controls.');
    console.log('Passed: preference persistence, user isolation, unavailable storage, partial license failure, individual validation, and key clearing.');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
