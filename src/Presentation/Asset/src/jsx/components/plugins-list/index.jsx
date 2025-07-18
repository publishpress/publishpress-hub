import { memo, useMemo, useCallback } from '@wordpress/element';
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
        pluginResolveConflictInProgress: storeSelect.getPluginResolveConflictInProgress(),
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
    const pluginActions = usePluginActions(modalManager);

    const progressStates = useSelect(selectProgressStates, []);
    const modalStates = useSelect(selectModalStates, []);

    const {
        pluginInstallationInProgress,
        pluginUninstallationInProgress,
        pluginDeactivationInProgress,
        pluginActivationInProgress,
        pluginUpgradeInProgress,
        pluginResolveConflictInProgress,
    } = progressStates;

    const {
        selectedPluginForConflictResolution,
        pluginError,
    } = modalStates;

    const currentPluginState = useMemo(() => {
        const { currentPlugin } = modalManager;
        if (!currentPlugin) return { error: null, inProgress: false };

        const slug = currentPlugin.slug;
        return {
            error: pluginError[slug] || null,
            inProgress: Boolean(
                pluginInstallationInProgress[slug] ||
                pluginUninstallationInProgress[slug] ||
                pluginDeactivationInProgress[slug] ||
                pluginActivationInProgress[slug] ||
                pluginUpgradeInProgress[slug] ||
                pluginResolveConflictInProgress[slug]
            ),
        };
    }, [
        modalManager.currentPlugin,
        pluginError,
        pluginInstallationInProgress,
        pluginUninstallationInProgress,
        pluginDeactivationInProgress,
        pluginActivationInProgress,
        pluginUpgradeInProgress,
        pluginResolveConflictInProgress,
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
            isResolvingConflict: pluginResolveConflictInProgress[slug] || false,
        };

        return (
            <PluginItem
                key={`plugin-${slug}`}
                pluginFamily={pluginFamily}
                pluginIconBaseUrl={pluginIconBaseUrl}
                progressStates={pluginProgressStates}
                onInstall={pluginActions.handleInstall}
                onResolveConflict={pluginActions.handleResolveConflict}
                onActivate={pluginActions.handleActivate}
                onDeactivate={pluginActions.handleDeactivate}
                onUpgradeToPro={pluginActions.handleUpgradeToPro}
                onManageLicense={pluginActions.handleManageLicense}
                onActivateLicense={pluginActions.handleActivateLicense}
                onUninstall={pluginActions.handleUninstall}
            />
        );
    }, [
        pluginIconBaseUrl,
        pluginInstallationInProgress,
        pluginUninstallationInProgress,
        pluginDeactivationInProgress,
        pluginActivationInProgress,
        pluginUpgradeInProgress,
        pluginResolveConflictInProgress,
        pluginActions,
    ]);

    return (
        <div className="pp-hub-plugins-list">
            {plugins.map(renderPluginItem)}

            {plugins.length === 0 && !isLoading && (
                <div className="pp-hub-plugins-list-message">
                    <p>{__('No plugins found.', 'publishpress-hub')}</p>
                </div>
            )}

            {isLoading && plugins.length === 0 && (
                <div className="pp-hub-plugins-list-message">
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
    );
};

export const PluginsList = memo(PluginsListComponent);


