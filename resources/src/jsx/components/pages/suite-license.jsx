/**
 * Activate a shared license individually for the selected products.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 */
import { useRef, useState } from '@wordpress/element';
import { CheckboxControl, TextControl, ToggleControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { __, _n, sprintf } from '@publishpress-hub/i18n';
import { Button } from '../buttons/button';

export const SuiteLicense = ({ plugins, onRefresh, isLoading }) => {
    const [open, setOpen] = useState(window.location.hash === '#suite-license');
    const dismissalKey = `pp-hub-bundle-dismissed:${window.ppHubPluginsDashboardConfig?.preferencesKey || 'default'}`;
    const [dismissed, setDismissed] = useState(() => {
        try { return window.localStorage.getItem(dismissalKey) === 'true'; } catch { return false; }
    });
    const activationLock = useRef(false);
    const [key, setKey] = useState('');
    const [selected, setSelected] = useState([]);
    const [selectSpecific, setSelectSpecific] = useState(false);
    const [busy, setBusy] = useState(false);
    const [results, setResults] = useState([]);
    const [progress, setProgress] = useState('');

    const targetPlugins = selectSpecific
        ? plugins.filter(plugin => selected.includes(plugin.slug))
        : plugins;

    const licensedCount = new Set([
        ...plugins.filter(plugin => plugin.proPlugin?.isLicensed).map(plugin => plugin.slug),
        ...results.filter(result => result.success).map(result => result.slug),
    ]).size;
    const dismiss = () => {
        setDismissed(true);
        setOpen(false);
        try { window.localStorage.setItem(dismissalKey, 'true'); } catch { /* Keep dismissal usable without storage. */ }
    };
    const show = () => {
        setDismissed(false);
        setOpen(true);
        try { window.localStorage.setItem(dismissalKey, 'false'); } catch { /* Keep setup usable without storage. */ }
    };

    const activate = async event => {
        event.preventDefault();
        if (activationLock.current || busy || isLoading || !key.trim() || !targetPlugins.length) return;
        activationLock.current = true;
        setBusy(true);
        setResults([]);
        const completed = new Map();
        let next = 0;
        const checkNext = async () => {
            while (next < targetPlugins.length) {
                const plugin = targetPlugins[next++];
                let result;
                try {
                    const response = await apiFetch({
                        path: `/publishpress-hub/v1/plugins/${encodeURIComponent(plugin.slug)}/activate-license`,
                        method: 'POST',
                        data: { licenseKey: key.trim(), applyToAll: false },
                    });
                    if (!response.success || !response.licensed) {
                        throw new Error(response.error?.message || response.error || __('The license could not be activated for this product.', 'publishpress-hub'));
                    }
                    result = { slug: plugin.slug, name: plugin.name, message: __('Pro license active for this site.', 'publishpress-hub'), success: true };
                } catch (error) {
                    result = { slug: plugin.slug, name: plugin.name, message: error.message || __('Activation failed. Please try again.', 'publishpress-hub'), success: false };
                }
                completed.set(plugin.slug, result);
                setResults(targetPlugins.filter(item => completed.has(item.slug)).map(item => completed.get(item.slug)));
                setProgress(sprintf(__('Checked %1$d of %2$d products.', 'publishpress-hub'), completed.size, targetPlugins.length));
            }
        };
        setProgress(__('Activating Pro licenses…', 'publishpress-hub'));
        try {
            await Promise.all(Array.from({ length: Math.min(3, targetPlugins.length) }, checkNext));
            setProgress(__('License activation complete. Review each product below.', 'publishpress-hub'));
            const refreshed = await onRefresh();
            if (refreshed?.success === false) throw new Error('Dashboard refresh failed');
        } catch {
            setProgress(__('License checks complete, but the dashboard could not refresh. Reload this page to see the latest status.', 'publishpress-hub'));
        } finally {
            activationLock.current = false;
            setKey('');
            setBusy(false);
        }
    };

    if (dismissed && !open) {
        return <Button variant="link" onClick={show}>{__('Set up a bundle license', 'publishpress-hub')}</Button>;
    }

    return <section id="suite-license" className="pp-hub-suite-license">
        <div className="pp-hub-suite-license__summary">
            <span className="pp-hub-suite-license__icon" aria-hidden="true"><span className="dashicons dashicons-admin-network" /></span>
            <div className="pp-hub-suite-license__copy">
                <h2>{__('PublishPress Bundle', 'publishpress-hub')}</h2>
                <p>{__('A PublishPress Bundle includes multiple Pro plugins with one license key.', 'publishpress-hub')}</p>
                {licensedCount > 0 && <p role="status">{sprintf(_n('Pro license active for %d product.', 'Pro licenses active for %d products.', licensedCount, 'publishpress-hub'), licensedCount)}</p>}
            </div>
            <Button variant="primary" disabled={busy} aria-expanded={open} aria-controls="pp-hub-suite-form"
                onClick={() => setOpen(!open)}>{open ? __('Close license setup', 'publishpress-hub') : (licensedCount ? __('Manage licenses', 'publishpress-hub') : __('Activate Bundle License', 'publishpress-hub'))}</Button>
            {!open && <Button variant="link" disabled={busy} onClick={dismiss}
                aria-label={__('Dismiss bundle license setup', 'publishpress-hub')}>{__('Dismiss', 'publishpress-hub')}</Button>}
        </div>
        {open && <form id="pp-hub-suite-form" onSubmit={activate}>
            <TextControl label={__('License key', 'publishpress-hub')} type="password" autoComplete="off"
                value={key} onChange={setKey} disabled={busy} />
            <p>{selectSpecific
                ? __('This will replace any saved license key for each selected product. This will not install or activate any plugins.', 'publishpress-hub')
                : __('This will apply your license key to all products, replacing any saved license keys. This will not install or activate any plugins.', 'publishpress-hub')}</p>
            <ToggleControl label={__('Select specific plugins', 'publishpress-hub')}
                checked={selectSpecific} disabled={busy || isLoading}
                onChange={enabled => {
                    setSelectSpecific(enabled);
                    if (enabled) setSelected(plugins.map(plugin => plugin.slug));
                }} />
            {selectSpecific && <fieldset disabled={busy || isLoading}>
                <legend>{__('Select products included in your subscription', 'publishpress-hub')}</legend>
                <div className="pp-hub-suite-products">{plugins.map(plugin => <CheckboxControl key={plugin.slug}
                    label={plugin.name} checked={selected.includes(plugin.slug)}
                    onChange={checked => setSelected(previous => checked ? [...previous, plugin.slug] : previous.filter(slug => slug !== plugin.slug))} />)}</div>
            </fieldset>}
            <Button type="submit" variant="primary" isLoading={busy} disabled={busy || isLoading || !key.trim() || !targetPlugins.length}>
                {__('Activate license key', 'publishpress-hub')}
            </Button>
            <p role="status">{progress}</p>
            {results.length > 0 && <ul className="pp-hub-suite-results">{results.map(result => <li key={result.slug}>
                <strong>{result.name}: </strong>{result.success ? __('Success', 'publishpress-hub') : __('Failed', 'publishpress-hub')} â€” {result.message}
            </li>)}</ul>}
        </form>}
    </section>;
};
