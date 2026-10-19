/**
 * AI connection copy controls and unsaved settings protection.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

import { __ } from '@publishpress-hub/i18n';
import { createRoot } from 'react-dom/client';
import { createElement } from '@wordpress/element';
import { dispatch } from '@wordpress/data';
import SnackbarList from './components/notices/SnackbarList';

const page = document.querySelector('.mcp-page');
if (page) {
    const notices = page.querySelector('.mcp-notices');
    if (notices) createRoot(notices).render(createElement(SnackbarList));
    let dirty = false;
    let submitting = false;
    let saving = false;
    let navigationController;
    const changedActions = new Map();
    const form = page.querySelector('#mcp-connection-settings');
    const showStatus = (message, error = false) => {
        const status = page.querySelector('.mcp-save-status');
        if (!status) return;
        status.textContent = message;
        status.classList.toggle('mcp-needed', error);
    };
    const replaceSection = (document, selector) => {
        const current = page.querySelector(selector);
        const next = document.querySelector(selector);
        if (current && next) current.replaceWith(next);
    };
    const applyDraft = () => {
        page.querySelectorAll('[name="enabled_actions[]"]').forEach((input) => {
            if (changedActions.has(input.value)) input.checked = changedActions.get(input.value);
        });
    };
    const parsePage = (html) => {
        const document = new DOMParser().parseFromString(html, 'text/html');
        if (!document.querySelector('.mcp-actions') || !document.querySelector('#mcp-connection-settings')) {
            throw new Error(__('Your session may have expired. Refresh the page and try again.', 'publishpress-hub'));
        }
        return document;
    };
    const navigate = async (url, push = true) => {
        if (saving) return;
        navigationController?.abort();
        const controller = new AbortController();
        navigationController = controller;
        const actions = page.querySelector('.mcp-actions');
        actions?.setAttribute('aria-busy', 'true');
        showStatus(__('Loading actions...', 'publishpress-hub'));
        try {
            const response = await fetch(url, { credentials: 'same-origin', signal: controller.signal });
            if (!response.ok) throw new Error(__('Actions could not be loaded. Try again.', 'publishpress-hub'));
            const document = parsePage(await response.text());
            if (controller.signal.aborted) return;
            const scrollPosition = window.scrollY;
            replaceSection(document, '.mcp-actions');
            applyDraft();
            if (push) window.history.pushState({ mcp: true }, '', url);
            const returnUrl = form.querySelector('[name="return_url"]');
            if (returnUrl) returnUrl.value = url;
            window.scrollTo(0, scrollPosition);
            showStatus(dirty ? __('You have unsaved changes.', 'publishpress-hub') : __('Actions loaded.', 'publishpress-hub'));
        } catch (error) {
            if (error.name !== 'AbortError') showStatus(error.message, true);
        } finally {
            if (navigationController === controller) page.querySelector('.mcp-actions')?.removeAttribute('aria-busy');
        }
    };
    page.addEventListener('change', (event) => {
        if (event.target.form?.id === 'mcp-connection-settings') {
            dirty = true;
            if (event.target.name === 'enabled_actions[]') changedActions.set(event.target.value, event.target.checked);
            showStatus(__('You have unsaved changes.', 'publishpress-hub'));
        }
    });
    page.addEventListener('click', (event) => {
        const link = event.target.closest('.mcp-tabs a, .mcp-pagination a');
        if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigate(link.href);
    });
    page.addEventListener('submit', async (event) => {
        if (event.target.matches('.mcp-filters')) {
            event.preventDefault();
            const url = new URL(event.target.action);
            new FormData(event.target).forEach((value, key) => url.searchParams.set(key, value));
            await navigate(url.toString());
            return;
        }
        if (event.target.id !== 'mcp-connection-settings') return;
        if (!window.ppHubMcpConfig?.ajaxUrl) {
            submitting = true;
            return;
        }
        event.preventDefault();
        if (saving) return;
        navigationController?.abort();
        const data = new FormData(form);
        const selected = new Set(data.getAll('enabled_actions[]'));
        const scope = new Set(data.getAll('displayed_actions[]'));
        changedActions.forEach((checked, name) => {
            scope.add(name);
            if (checked) selected.add(name); else selected.delete(name);
        });
        data.delete('enabled_actions[]');
        data.delete('displayed_actions[]');
        scope.forEach((name) => data.append('displayed_actions[]', name));
        selected.forEach((name) => data.append('enabled_actions[]', name));
        data.set('action', 'publishpress_hub_mcp_save');
        const url = new URL(window.ppHubMcpConfig.ajaxUrl);
        const currentUrl = new URL(window.location.href);
        ['plugin', 'search', 'behavior', 'action_page'].forEach((key) => {
            if (currentUrl.searchParams.has(key)) url.searchParams.set(key, currentUrl.searchParams.get(key));
        });
        const controls = [...page.querySelectorAll('input[form="mcp-connection-settings"], #mcp-connection-settings input, button[form="mcp-connection-settings"], [name="mcp_client"]')];
        const disabled = controls.map((input) => input.disabled);
        controls.forEach((input) => { input.disabled = true; });
        saving = true;
        showStatus(__('Saving changes...', 'publishpress-hub'));
        try {
            const response = await fetch(url, { method: 'POST', credentials: 'same-origin', body: data });
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error(result.data?.message || __('Settings could not be saved. Try again.', 'publishpress-hub'));
            const document = parsePage(result.data.html);
            changedActions.clear();
            dirty = false;
            ['.mcp-actions', '.mcp-checklist', '.mcp-exposure-count', '.mcp-diagnostics', '.mcp-installer-form'].forEach((selector) => replaceSection(document, selector));
            showStatus('');
            dispatch('core/notices').createSuccessNotice(result.data.message, {
                id: 'publishpress-hub-mcp-save',
                type: 'snackbar',
                isDismissible: true,
            });
        } catch (error) {
            showStatus(error instanceof SyntaxError ? __('Settings could not be saved. Your session may have expired. Refresh the page and try again.', 'publishpress-hub') : error.message, true);
        } finally {
            saving = false;
            controls.forEach((input, index) => { input.disabled = disabled[index]; });
        }
    });
    window.addEventListener('popstate', () => navigate(window.location.href, false));
    window.addEventListener('beforeunload', (event) => {
        if (dirty && !submitting) {
            event.preventDefault();
            event.returnValue = '';
        }
    });
    page.querySelectorAll('[name="mcp_client"]').forEach((radio) => {
        radio.addEventListener('change', () => {
            page.querySelectorAll('[data-mcp-client-panel]').forEach((panel) => {
                panel.hidden = panel.dataset.mcpClientPanel !== radio.value;
            });
        });
    });
    page.querySelectorAll('[data-mcp-copy]').forEach((button) => {
        const originalLabel = button.textContent;
        const status = document.createElement('span');
        status.className = 'mcp-copy-feedback';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        button.insertAdjacentElement('afterend', status);
        let resetTimer;
        button.addEventListener('click', async () => {
            const field = document.getElementById(button.dataset.mcpCopy);
            if (!field) return;
            clearTimeout(resetTimer);
            status.textContent = '';
            button.disabled = true;
            try {
                await navigator.clipboard.writeText(field.value);
                button.textContent = __('Copied!', 'publishpress-hub');
                button.classList.add('is-copied');
                status.textContent = __('Copied to clipboard.', 'publishpress-hub');
            } catch (error) {
                field.focus();
                field.select();
                button.textContent = originalLabel;
                button.classList.remove('is-copied');
                status.textContent = __('Select and copy the highlighted text.', 'publishpress-hub');
            } finally {
                button.disabled = false;
            }
            resetTimer = setTimeout(() => {
                button.textContent = originalLabel;
                button.classList.remove('is-copied');
                status.textContent = '';
            }, 3000);
        });
    });
    page.querySelectorAll('[data-mcp-download]').forEach((button) => {
        button.addEventListener('click', () => {
            const field = document.getElementById(button.dataset.mcpDownload);
            if (!field) return;
            const url = URL.createObjectURL(new Blob([field.value], { type: 'text/plain;charset=utf-8' }));
            const link = document.createElement('a');
            link.href = url;
            link.download = button.dataset.filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        });
    });
}
