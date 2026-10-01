/**
 * Plugins list.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { memo, useMemo, useCallback, useState } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';
import { useDashboardPreferences } from './hooks/use-dashboard-preferences';
import { useSelect } from '@wordpress/data';

import { __ } from '@publishpress-hub/i18n';

import { store } from '../../stores/plugins-dashboard';
import {
    PluginItem,
    ModalRenderer,
} from './components';
import { useModalManager, usePluginActions } from './hooks';

// Split selectors for better performance
const selectProgressStates = (select) => {
    const storeSelect = select(store);
    return {
        pluginInstallationInProgress: storeSelect.getPluginInstallationInProgress(),
        pluginUninstallationInProgress: storeSelect.getPluginUninstallationInProgress(),
        pluginDeactivationInProgress: storeSelect.getPluginDeactivationInProgress(),
        pluginActivationInProgress: storeSelect.getPluginActivationInProgress(),
        pluginUpgradeInProgress: storeSelect.getPluginUpgradeInProgress(),
        pluginUpdateInProgress: storeSelect.getPluginUpdateInProgress(),
        pluginResolveConflictInProgress: storeSelect.getPluginResolveConflictInProgress(),
        pluginLicenseActivationInProgress: storeSelect.getPluginLicenseActivationInProgress(),
        pluginLicenseDeactivationInProgress: storeSelect.getPluginLicenseDeactivationInProgress(),
    };
};

const selectModalStates = (select) => {
    const storeSelect = select(store);
    return {
        selectedPluginForConflictResolution: storeSelect.getSelectedPluginForConflictResolution(),
        pluginError: storeSelect.getPluginError(),
    };
};

const PluginsListComponent = ({
    plugins,
    pluginIconBaseUrl,
    isLoading,
}) => {
    const modalManager = useModalManager();
    const { preferences, updatePreferences, toggleFavorite } = useDashboardPreferences();
    const [favoritesOnly, setFavoritesOnly] = useState(false);
    const pluginActions = usePluginActions(modalManager);

    const progressStates = useSelect(selectProgressStates, []);
    const modalStates = useSelect(selectModalStates, []);

    const {
        pluginInstallationInProgress,
        pluginUninstallationInProgress,
        pluginDeactivationInProgress,
        pluginActivationInProgress,
        pluginUpgradeInProgress,
        pluginUpdateInProgress,
        pluginResolveConflictInProgress,
        pluginLicenseActivationInProgress,
        pluginLicenseDeactivationInProgress,
    } = progressStates;


    const {
        selectedPluginForConflictResolution,
        pluginError,
    } = modalStates;

    const currentPluginState = useMemo(() => {
        const { currentPluginFamily, currentPluginDisplayName } = modalManager;
        if (!currentPluginFamily) return { error: null, inProgress: false };

        const slug = currentPluginFamily.slug;

        return {
            pluginDisplayName: currentPluginDisplayName,
            error: pluginError[slug] || null,
            inProgress: Boolean(
                pluginInstallationInProgress[slug] ||
                pluginUninstallationInProgress[slug] ||
                pluginDeactivationInProgress[slug] ||
                pluginActivationInProgress[slug] ||
                pluginUpgradeInProgress[slug] ||
                pluginUpdateInProgress[slug] ||
                pluginResolveConflictInProgress[slug] ||
                pluginLicenseActivationInProgress[slug] ||
                pluginLicenseDeactivationInProgress[slug]
            ),
        };
    }, [
        modalManager,
        pluginError,
        progressStates
    ]);

    // Memoize the plugin item renderer to prevent recreation
    const renderPluginItem = useCallback((pluginFamily) => {
        const slug = pluginFamily.slug;

        // Create progress states object for this plugin
        const pluginProgressStates = {
            isInstalling: pluginInstallationInProgress[slug] || false,
            isUninstalling: pluginUninstallationInProgress[slug] || false,
            isDeactivating: pluginDeactivationInProgress[slug] || false,
            isActivating: pluginActivationInProgress[slug] || false,
            isUpgrading: pluginUpgradeInProgress[slug] || false,
            isUpdating: pluginUpdateInProgress[slug] || false,
            isResolvingConflict: pluginResolveConflictInProgress[slug] || false,
            isActivatingLicense: pluginLicenseActivationInProgress[slug] || false,
            isDeactivatingLicense: pluginLicenseDeactivationInProgress[slug] || false,
        };

        return (
            <PluginItem
                key={`plugin-${slug}`}
                pluginFamily={pluginFamily}
                layout={preferences.layout}
                isFavorite={preferences.favorites.includes(slug)}
                onToggleFavorite={toggleFavorite}
                pluginIconBaseUrl={pluginIconBaseUrl}
                progressStates={pluginProgressStates}
                onInstall={pluginActions.handleOpenInstallationTypeModal}
                onResolveConflict={pluginActions.handleOpenResolveConflictModal}
                onActivate={pluginActions.handleActivatePlugin}
                onDeactivate={pluginActions.handleDeactivatePlugin}
                onUpgradeToPro={pluginActions.handleOpenUpgradeToProModal}
                onManageLicense={pluginActions.handleOpenLicenseManagementModal}
                onActivateLicense={pluginActions.handleOpenLicenseInputForActivatingLicenseModal}
                onUninstall={pluginActions.handleOpenUninstallConfirmationModal}
                onDeactivateLicense={pluginActions.handleDeactivateLicense}
                onUpdate={pluginActions.handleUpdatePlugin}
            />
        );
    }, [
        pluginIconBaseUrl,
        preferences.favorites,
        preferences.layout,
        toggleFavorite,
        pluginInstallationInProgress,
        pluginUninstallationInProgress,
        pluginDeactivationInProgress,
        pluginActivationInProgress,
        pluginUpgradeInProgress,
        pluginUpdateInProgress,
        pluginResolveConflictInProgress,
        pluginLicenseActivationInProgress,
        pluginLicenseDeactivationInProgress,
        pluginActions,
    ]);

    const visiblePlugins = favoritesOnly
        ? plugins.filter(plugin => preferences.favorites.includes(plugin.slug))
        : plugins;
    const groups = preferences.grouped ? [
        { title: __('Editorial process', 'publishpress-hub'), slugs: ['planner', 'checklists', 'statuses', 'revisions'] },
        { title: __('Additional publishing tools', 'publishpress-hub'), slugs: ['permissions', 'capabilities', 'authors', 'blocks', 'future', 'series', 'shortlinks'] },
    ] : [];
    if (preferences.grouped) {
        const knownSlugs = groups.flatMap(group => group.slugs);
        groups.push({ title: __('Other plugins', 'publishpress-hub'), slugs: visiblePlugins.filter(plugin => !knownSlugs.includes(plugin.slug)).map(plugin => plugin.slug) });
    }

    return (
        <>
            <div className="pp-hub-view-controls">
                <div className="pp-hub-layout-switch" role="group" aria-label={__('Plugin layout', 'publishpress-hub')}>
                    {['cards', 'list'].map(layout => <button type="button" key={layout}
                        aria-pressed={preferences.layout === layout} onClick={() => updatePreferences({ layout })}>
                        <span className={`dashicons dashicons-${layout === 'cards' ? 'grid-view' : 'list-view'}`} aria-hidden="true" />
                        {layout === 'cards' ? __('Cards', 'publishpress-hub') : __('List', 'publishpress-hub')}
                    </button>)}
                </div>
                <CheckboxControl label={__('Group by purpose', 'publishpress-hub')} checked={preferences.grouped}
                    onChange={grouped => updatePreferences({ grouped })} />
                <CheckboxControl label={__('Favorites only', 'publishpress-hub')} checked={favoritesOnly}
                    onChange={setFavoritesOnly} />
            </div>
        <div className={`pp-hub-plugins-list pp-hub-view-${preferences.layout}`} aria-busy={(isLoading && plugins.length > 0) || undefined}>
            {preferences.grouped ? groups.map(group => {
                const members = group.slugs.map(slug => visiblePlugins.find(plugin => plugin.slug === slug)).filter(Boolean);
                return members.length > 0 && <section className="pp-hub-plugin-group" key={group.title}>
                    <h2>{group.title}</h2>
                    <div className="pp-hub-plugin-group-items">{members.map(renderPluginItem)}</div>
                </section>;
            }) : visiblePlugins.map(renderPluginItem)}

            {visiblePlugins.length === 0 && !isLoading && (
                <div className="pp-hub-plugins-list-message" role="status" aria-live="polite">
                    <p>{__('No plugins found.', 'publishpress-hub')}</p>
                </div>
            )}

            {isLoading && plugins.length === 0 && (
                <div className="pp-hub-plugins-list-message" role="status" aria-live="polite">
                    <p>{__('Loading plugins...', 'publishpress-hub')}</p>
                </div>
            )}

            <ModalRenderer
                modalManager={modalManager}
                pluginActions={pluginActions}
                currentPluginState={currentPluginState}
                selectedPluginForConflictResolution={selectedPluginForConflictResolution}
                pluginResolveConflictInProgress={pluginResolveConflictInProgress}
            />
        </div>
        </>
    );
};

export const PluginsList = memo(PluginsListComponent);

