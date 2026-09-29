/**
 * Plugins list.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

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

    return (
        <div className="pp-hub-plugins-list" aria-busy={(isLoading && plugins.length > 0) || undefined}>
            {plugins.map(renderPluginItem)}

            {plugins.length === 0 && !isLoading && (
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
    );
};

export const PluginsList = memo(PluginsListComponent);

