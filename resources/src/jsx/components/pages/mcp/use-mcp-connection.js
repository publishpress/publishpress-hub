/**
 * React state and REST requests for AI connection setup.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@publishpress-hub/i18n';
import { readFilters, requestPath, savedDraft, savePayload } from './connection-state';

export const useMcpConnection = () => {
    const [state, setState] = useState(null);
    const [draft, setDraft] = useState({ enabled: false, readsEnabled: true, writesEnabled: false, client: 'assistant' });
    const [edits, setEdits] = useState({});
    const [filters, setFilters] = useState(() => readFilters(new URL(window.location.href)));
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notice, setNotice] = useState(null);
    const request = useRef(null);
    const sequence = useRef(0);
    const mounted = useRef(true);
    const busy = useRef(false);
    const initialized = useRef(false);
    const dirty = state && (Object.keys(edits).length > 0 || Object.entries(savedDraft(state))
        .some(([key, value]) => draft[key] !== value));

    const load = useCallback(async (nextFilters, replaceDraft = false) => {
        request.current?.abort();
        const controller = new AbortController();
        request.current = controller;
        const id = ++sequence.current;
        setLoading(true);
        try {
            const result = await apiFetch({ path: requestPath(nextFilters), signal: controller.signal });
            if (!mounted.current || id !== sequence.current) return false;
            if (!result.success || !result.state) throw new Error(result.message || __('AI connections could not be loaded.', 'publishpress-hub'));
            setState(result.state);
            setNotice(null);
            setFilters(nextFilters);
            if (!initialized.current || replaceDraft) {
                setDraft(savedDraft(result.state));
                setEdits({});
                initialized.current = true;
            }
            return true;
        } catch (error) {
            if (mounted.current && id === sequence.current && error.name !== 'AbortError') {
                setNotice({ status: 'error', message: error.message || __('AI connections could not be loaded. Try again.', 'publishpress-hub') });
            }
            return false;
        } finally {
            if (mounted.current && id === sequence.current) setLoading(false);
        }
    }, []);

    useEffect(() => {
        mounted.current = true;
        load(readFilters(new URL(window.location.href)));
        const handlePopState = () => {
            if (!busy.current) load(readFilters(new URL(window.location.href)));
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            mounted.current = false;
            request.current?.abort();
            window.removeEventListener('popstate', handlePopState);
        };
    }, [load]);

    useEffect(() => {
        const warn = (event) => {
            if (dirty) {
                event.preventDefault();
                event.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', warn);
        return () => window.removeEventListener('beforeunload', warn);
    }, [dirty]);

    const navigate = async (changes) => {
        if (busy.current) return;
        const next = { ...filters, ...changes };
        if (await load(next)) {
            const url = new URL(window.location.href);
            Object.entries(next).forEach(([key, value]) => url.searchParams.set(key, value));
            window.history.pushState({ mcp: true }, '', url);
        }
    };

    const save = async (overrides = {}) => {
        if (busy.current || !state) return false;
        busy.current = true;
        request.current?.abort();
        ++sequence.current;
        setLoading(false);
        setSaving(true);
        setNotice(null);
        try {
            const result = await apiFetch({
                path: '/publishpress-hub/v1/mcp/connection',
                method: 'POST',
                data: savePayload(state, draft, edits, filters, overrides),
            });
            if (!result.success || !result.state) throw new Error(result.message || __('Changes could not be saved.', 'publishpress-hub'));
            if (!mounted.current) return false;
            setState(result.state);
            setDraft(savedDraft(result.state));
            setEdits({});
            setNotice({ status: 'success', message: result.message });
            return true;
        } catch (error) {
            if (mounted.current) setNotice({ status: 'error', message: error.message || __('Changes could not be saved. Try again.', 'publishpress-hub') });
            return false;
        } finally {
            busy.current = false;
            if (mounted.current) setSaving(false);
        }
    };

    const install = async () => {
        if (busy.current) return;
        busy.current = true;
        setSaving(true);
        setNotice(null);
        try {
            const result = await apiFetch({ path: '/publishpress-hub/v1/mcp/adapter', method: 'POST' });
            if (!result.success) throw new Error(result.message || __('MCP Adapter could not be installed or activated.', 'publishpress-hub'));
            // Activation registers capabilities and routes on the next WordPress request.
            const refreshed = await load(filters);
            if (refreshed && mounted.current) setNotice({ status: 'success', message: result.message });
        } catch (error) {
            if (mounted.current) setNotice({ status: 'error', message: error.message || __('Use the MCP Adapter plugin page or contact your host.', 'publishpress-hub') });
        } finally {
            busy.current = false;
            if (mounted.current) setSaving(false);
        }
    };

    return {
        state, draft, edits, loading, saving, dirty, notice, setNotice,
        setDraft: (values) => setDraft((current) => ({ ...current, ...values })),
        setAction: (name, checked) => setEdits((current) => {
            const next = { ...current };
            if (checked === !state.disabledActions.includes(name)) delete next[name];
            else next[name] = checked;
            return next;
        }),
        navigate, save, install, refresh: () => !busy.current && load(filters, !dirty),
    };
};
