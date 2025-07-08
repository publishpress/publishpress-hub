import { memo, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import { __ } from '@publishpress/hub-i18n';

import { store } from '../../stores/plugins-dashboard';
import { PluginItem } from './plugin-item';
import { ModalRenderer } from './components/modal-renderer';
import { useModalManager, usePluginActions } from './hooks';

const PluginsListComponent = ({
    plugins,
    pluginIconBaseUrl,
    isLoading,
}) => {
    const modalManager = useModalManager();
    const pluginActions = usePluginActions(modalManager);

    const {
        pluginInstallationInProgress,
        pluginUninstallationInProgress,
        pluginDeactivationInProgress,
        pluginActivationInProgress,
        pluginUpgradeInProgress,
        pluginResolveConflictInProgress,
        selectedPluginForConflictResolution,
        pluginError,
    } = useSelect((select) => {
        const storeSelect = select(store);
        return {
            pluginInstallationInProgress: storeSelect.getPluginInstallationInProgress(),
            pluginUninstallationInProgress: storeSelect.getPluginUninstallationInProgress(),
            pluginDeactivationInProgress: storeSelect.getPluginDeactivationInProgress(),
            pluginActivationInProgress: storeSelect.getPluginActivationInProgress(),
            pluginUpgradeInProgress: storeSelect.getPluginUpgradeInProgress(),
            pluginResolveConflictInProgress: storeSelect.getPluginResolveConflictInProgress(),
            selectedPluginForConflictResolution: storeSelect.getSelectedPluginForConflictResolution(),
            pluginError: storeSelect.getPluginError(),
        };
    }, []);

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

    return (
        <div className="pp-hub-plugins-list">
            {plugins.map((pluginFamily) => {
                const slug = pluginFamily.slug;

                return (
                    <PluginItem
                        key={`plugin-${slug}`}
                        pluginFamily={pluginFamily}
                        pluginIconBaseUrl={pluginIconBaseUrl}
                        isInstalling={pluginInstallationInProgress[slug] || false}
                        isUninstalling={pluginUninstallationInProgress[slug] || false}
                        isDeactivating={pluginDeactivationInProgress[slug] || false}
                        isActivating={pluginActivationInProgress[slug] || false}
                        isUpgrading={pluginUpgradeInProgress[slug] || false}
                        isResolvingConflict={pluginResolveConflictInProgress[slug] || false}
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
            })}

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


