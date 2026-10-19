const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../../resources/src/jsx/mcp-page.jsx'), 'utf8')
    .replace(/^import .*;$/gm, '');

function fixture(rejectClipboard = false) {
    const timers = new Map();
    const handlers = {};
    const classes = new Set();
    let sequence = 0;
    let clipboard;
    const field = { value: 'fixture configuration', focus() { this.focused = true; }, select() { this.selected = true; } };
    const button = {
        textContent: 'Copy configuration', dataset: { mcpCopy: 'configuration' },
        classList: { add: (value) => classes.add(value), remove: (value) => classes.delete(value) },
        addEventListener: (name, callback) => { handlers.copy = callback; },
        insertAdjacentElement: (position, status) => { button.status = status; },
    };
    const radio = { value: 'assistant', addEventListener: (name, callback) => { handlers.client = callback; } };
    const panels = ['desktop', 'assistant'].map((value) => ({ dataset: { mcpClientPanel: value }, hidden: false }));
    const page = {
        querySelector: () => null,
        addEventListener: (name, callback) => { handlers[name] = callback; },
        querySelectorAll: (selector) => ({
            '[data-mcp-copy]': [button], '[name="mcp_client"]': [radio],
            '[data-mcp-client-panel]': panels, '[data-mcp-download]': [],
        }[selector] || []),
    };
    vm.runInNewContext(source, {
        document: { querySelector: () => page, getElementById: () => field, createElement: () => ({ setAttribute() {} }) },
        window: { addEventListener: (name, callback) => { handlers[name] = callback; } },
        navigator: { clipboard: { writeText: async (value) => {
            if (rejectClipboard) throw new Error('Clipboard denied');
            clipboard = value;
        } } },
        dispatch: () => ({ createSuccessNotice: (message, options) => { globalThis.lastMcpNotice = { message, options }; } }),
        __: (text) => text,
        setTimeout: (callback) => { timers.set(++sequence, callback); return sequence; },
        clearTimeout: (id) => timers.delete(id),
    });
    return { button, classes, field, handlers, panels, timers, get clipboard() { return clipboard; } };
}

test('copy gives immediate button and adjacent accessible feedback, then restores its label', async () => {
    const ui = fixture();
    await ui.handlers.copy();
    assert.equal(ui.clipboard, ui.field.value);
    assert.equal(ui.button.textContent, 'Copied!');
    assert.equal(ui.button.status.textContent, 'Copied to clipboard.');
    assert.ok(ui.classes.has('is-copied'));
    assert.equal(ui.button.disabled, false);
    await ui.handlers.copy();
    assert.equal(ui.timers.size, 1);
    [...ui.timers.values()][0]();
    assert.equal(ui.button.textContent, 'Copy configuration');
    assert.equal(ui.classes.has('is-copied'), false);
    assert.equal(ui.button.status.textContent, '');
});

test('clipboard denial selects the text and gives actionable feedback', async () => {
    const ui = fixture(true);
    await ui.handlers.copy();
    assert.equal(ui.field.selected, true);
    assert.equal(ui.button.textContent, 'Copy configuration');
    assert.equal(ui.button.status.textContent, 'Select and copy the highlighted text.');
    assert.equal(ui.button.disabled, false);
});

test('choosing an app shows only its setup panel', () => {
    const ui = fixture();
    ui.handlers.client();
    assert.equal(ui.panels[0].hidden, true);
    assert.equal(ui.panels[1].hidden, false);
    let warned = false;
    ui.handlers.beforeunload({ preventDefault() { warned = true; } });
    assert.equal(warned, false);
    ui.handlers.change({ target: { form: { id: 'mcp-connection-settings' } } });
    ui.handlers.beforeunload({ preventDefault() { warned = true; } });
    assert.equal(warned, true);
});
function asyncFixture() {
    const handlers = {};
    const requests = [];
    const status = { textContent: '', classList: { toggle() {} } };
    const returnUrl = { value: '' };
    const form = { querySelector: () => returnUrl };
    const makeAction = (name, checked) => ({ name: 'enabled_actions[]', value: name, checked, disabled: false, form: { id: 'mcp-connection-settings' } });
    let actions = [makeAction('fixture/first', true)];
    let currentSection;
    const makeSection = (next) => ({
        setAttribute() {}, removeAttribute() {},
        replaceWith(section) { currentSection = section; actions = section.actions; },
        actions: next,
    });
    currentSection = makeSection(actions);
    const page = {
        addEventListener: (name, callback) => { handlers[name] = callback; },
        querySelector: (selector) => ({ '#mcp-connection-settings': form, '.mcp-save-status': status, '.mcp-actions': currentSection, '.mcp-installer-form': { replaceWith(section) { state.installerAvailable = section.available; } } }[selector] || null),
        querySelectorAll: (selector) => selector === '[name="enabled_actions[]"]' || selector.startsWith('input[form=') ? actions : [],
    };
    const location = { href: 'https://fixture.test/wp-admin/admin.php?page=publishpress-hub-mcp' };
    const history = { pushState(state, unused, url) { location.href = String(url); } };
    class FixtureFormData {
        constructor() {
            this.values = new Map([
                ['displayed_actions[]', actions.map((action) => action.value)],
                ['enabled_actions[]', actions.filter((action) => action.checked).map((action) => action.value)],
            ]);
        }
        getAll(key) { return this.values.get(key) || []; }
        delete(key) { this.values.delete(key); }
        append(key, value) { this.values.set(key, [...this.getAll(key), value]); }
        set(key, value) { this.values.set(key, [value]); }
    }
    class FixtureParser {
        parseFromString(html) {
            const section = makeSection([makeAction(html === 'first' ? 'fixture/first' : 'fixture/second', true)]);
            return { querySelector: (selector) => ({ '.mcp-actions': section, '#mcp-connection-settings': form, '.mcp-installer-form': { available: true } }[selector] || null) };
        }
    }
    const state = { failSave: false, failLoad: false, scroll: 520, installerAvailable: false };
    vm.runInNewContext(source, {
        document: { querySelector: () => page },
        window: { addEventListener: (name, callback) => { handlers[name] = callback; }, location, history,
            ppHubMcpConfig: { ajaxUrl: 'https://fixture.test/wp-admin/admin-ajax.php' },
            scrollY: 520, scrollTo(x, y) { state.scroll = y; } },
        DOMParser: FixtureParser, FormData: FixtureFormData, AbortController, URL,
        fetch: async (url, options) => {
            requests.push({ url: String(url), options });
            return { ok: options.method === 'POST' ? !state.failSave : !state.failLoad,
                text: async () => String(url).includes('action_page=2') ? 'second' : 'first',
                json: async () => state.failSave ? { success: false, data: { message: 'Save failed' } }
                    : { success: true, data: { html: 'second', message: 'Saved' } } };
        },
        dispatch: () => ({ createSuccessNotice: (message, options) => { globalThis.lastMcpNotice = { message, options }; } }),
        __: (text) => text,
    });
    return { handlers, requests, state, status, get actions() { return actions; },
        change(checked) { actions[0].checked = checked; handlers.change({ target: actions[0] }); },
        async navigate(second = true) {
            const href = 'https://fixture.test/wp-admin/admin.php?page=publishpress-hub-mcp' + (second ? '&action_page=2' : '');
            handlers.click({ target: { closest: () => ({ href }) }, button: 0, preventDefault() {} });
            await new Promise(setImmediate);
        },
        async save() { await handlers.submit({ target: { id: 'mcp-connection-settings', matches: () => false }, preventDefault() {} }); },
    };
}

test('background action navigation preserves drafts and scroll position', async () => {
    const ui = asyncFixture();
    ui.change(false);
    await ui.navigate();
    assert.equal(ui.actions[0].value, 'fixture/second');
    assert.equal(ui.state.scroll, 520);
    await ui.navigate(false);
    assert.equal(ui.actions[0].checked, false);
});

test('background save submits edits from other pages and clears the draft only on success', async () => {
    const ui = asyncFixture();
    ui.change(false);
    await ui.navigate();
    ui.state.failSave = true;
    await ui.save();
    assert.equal(ui.status.textContent, 'Save failed');
    let warned = false;
    ui.handlers.beforeunload({ preventDefault() { warned = true; } });
    assert.equal(warned, true);
    ui.state.failSave = false;
    await ui.save();
    const body = ui.requests.at(-1).options.body;
    assert.ok(body.getAll('displayed_actions[]').includes('fixture/first'));
    assert.equal(body.getAll('enabled_actions[]').includes('fixture/first'), false);
    assert.equal(ui.status.textContent, '');
    assert.equal(ui.state.installerAvailable, true);
    assert.equal(globalThis.lastMcpNotice.message, 'Saved');
    assert.equal(globalThis.lastMcpNotice.options.type, 'snackbar');
    assert.equal(globalThis.lastMcpNotice.options.isDismissible, true);
    warned = false;
    ui.handlers.beforeunload({ preventDefault() { warned = true; } });
    assert.equal(warned, false);
});

test('failed background navigation keeps the current action page and draft', async () => {
    const ui = asyncFixture();
    ui.change(false);
    ui.state.failLoad = true;
    await ui.navigate();
    assert.equal(ui.actions[0].value, 'fixture/first');
    assert.equal(ui.actions[0].checked, false);
    assert.match(ui.status.textContent, /could not be loaded/);
});
