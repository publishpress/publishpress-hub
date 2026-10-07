/**
 * Activate a shared license individually for the selected products.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 */
import { useState } from '@wordpress/element';
import { CheckboxControl, TextControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { __, sprintf } from '@publishpress-hub/i18n';
import { Button } from '../buttons/button';

export const SuiteLicense = ({ plugins, onRefresh, isLoading }) => {
    const [open, setOpen] = useState(window.location.hash === '#suite-license');
    const [key, setKey] = useState('');
    const [selected, setSelected] = useState([]);
    const [busy, setBusy] = useState(false);
    const [results, setResults] = useState([]);
    const [progress, setProgress] = useState('');

    const activate = async event => {
        event.preventDefault();
        if (busy || !key.trim() || !selected.length) return;
        setBusy(true);
        setResults([]);
        const completed = [];
        try {
            for (const plugin of plugins.filter(plugin => selected.includes(plugin.slug))) {
                setProgress(sprintf(__('Checking %s…', 'publishpress-hub'), plugin.name));
                try {
                    const response = await apiFetch({
                        path: `/publishpress-hub/v1/plugins/${encodeURIComponent(plugin.slug)}/activate-license`,
                        method: 'POST',
                        data: { licenseKey: key.trim(), applyToAll: false },
                    });
                    if (!response.success || !response.licensed) {
                        throw new Error(response.error?.message || response.error || __('The license could not be activated for this product.', 'publishpress-hub'));
                    }
                    completed.push({ slug: plugin.slug, name: plugin.name, message: __('License activated.', 'publishpress-hub'), success: true });
                } catch (error) {
                    completed.push({ slug: plugin.slug, name: plugin.name, message: error.message || __('Activation failed. Please try again.', 'publishpress-hub'), success: false });
                }
                setResults([...completed]);
            }
            setProgress(__('License checks complete. Review the results below.', 'publishpress-hub'));
            await onRefresh();
        } catch {
            setProgress(__('License checks complete, but the dashboard could not refresh. Reload this page to see the latest status.', 'publishpress-hub'));
        } finally {
            setKey('');
            setBusy(false);
        }
    };

    return <section id="suite-license" className="pp-hub-suite-license">
        <div className="pp-hub-suite-license__summary">
            <span className="pp-hub-suite-license__icon" aria-hidden="true"><span className="dashicons dashicons-admin-network" /></span>
            <div className="pp-hub-suite-license__copy">
                <h2>{__('PublishPress Bundle', 'publishpress-hub')}</h2>
                <p>{__('Connect your included Pro plugins with one license key.', 'publishpress-hub')}</p>
            </div>
            <Button variant="primary" disabled={busy} aria-expanded={open} aria-controls="pp-hub-suite-form"
                onClick={() => setOpen(!open)}>{open ? __('Close license setup', 'publishpress-hub') : __('Activate Bundle License', 'publishpress-hub')}</Button>
        </div>
        {open && <form id="pp-hub-suite-form" onSubmit={activate}>
            <TextControl label={__('License key', 'publishpress-hub')} type="password" autoComplete="off"
                value={key} onChange={setKey} disabled={busy} />
            <fieldset disabled={busy || isLoading}>
                <legend>{__('Select products included in your subscription', 'publishpress-hub')}</legend>
                <p>{__('This will replace any saved license key for each selected product. This will not install or activate any plugins.', 'publishpress-hub')}</p>
                <div className="pp-hub-suite-products">{plugins.map(plugin => <CheckboxControl key={plugin.slug}
                    label={plugin.name} checked={selected.includes(plugin.slug)}
                    onChange={checked => setSelected(previous => checked ? [...previous, plugin.slug] : previous.filter(slug => slug !== plugin.slug))} />)}</div>
            </fieldset>
            <Button type="submit" variant="primary" isLoading={busy} disabled={isLoading || !key.trim() || !selected.length}>
                {__('Activate license for selected products', 'publishpress-hub')}
            </Button>
            <p role="status">{progress}</p>
            {results.length > 0 && <ul className="pp-hub-suite-results">{results.map(result => <li key={result.slug}>
                <strong>{result.name}: </strong>{result.success ? __('Success', 'publishpress-hub') : __('Failed', 'publishpress-hub')} — {result.message}
            </li>)}</ul>}
        </form>}
    </section>;
};
