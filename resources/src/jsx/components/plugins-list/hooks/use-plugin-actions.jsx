/**
 * Use plugin actions.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { useCallback } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

import { store } from '../../../stores/plugins-dashboard';

export const usePluginActions = (modalManager) => {
    const { openModal, closeModal, MODAL_TYPES } = modalManager;

    const {
        installFreePlugin,
        installProPlugin,
        uninstallPlugin,
        activatePlugin,
        deactivatePlugin,
        upgradePluginToPro,
        resolveConflict,
        deactivateLicense,
        activateLicense,
        updatePlugin,
        fetchPlugins,
    } = useDispatch(store);

    const handleOpenInstallationTypeModal = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.INSTALLATION_TYPE, pluginFamily);
    }, [openModal, MODAL_TYPES]);

    const handleOpenResolveConflictModal = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.RESOLVE_CONFLICT, pluginFamily);
    }, [openModal, MODAL_TYPES.RESOLVE_CONFLICT]);

    const handleOpenUpgradeToProModal = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.UPGRADE_PLUGIN_TO_PRO, pluginFamily);
    }, [openModal, MODAL_TYPES.UPGRADE_PLUGIN_TO_PRO]);

    const handleOpenUninstallConfirmationModal = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.UNINSTALL_CONFIRMATION, pluginFamily);
    }, [openModal, MODAL_TYPES.UNINSTALL_CONFIRMATION]);

    const handleOpenLicenseManagementModal = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.LICENSE_MANAGEMENT, pluginFamily);
    }, [openModal, MODAL_TYPES.LICENSE_MANAGEMENT]);

    const handleOpenLicenseInputForInstallingProModal = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.LICENSE_INPUT_FOR_INSTALLING_PRO, pluginFamily);
    }, [openModal, MODAL_TYPES.LICENSE_INPUT_FOR_INSTALLING_PRO]);

    const handleOpenLicenseInputForActivatingLicenseModal = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.LICENSE_INPUT_FOR_ACTIVATING_LICENSE, pluginFamily);
    }, [openModal, MODAL_TYPES.LICENSE_INPUT_FOR_ACTIVATING_LICENSE]);

    const handleActivatePlugin = useCallback((pluginFamily) => {
        activatePlugin(pluginFamily.slug);
    }, [activatePlugin]);

    const handleDeactivatePlugin = useCallback((pluginFamily) => {
        deactivatePlugin(pluginFamily.slug);
    }, [deactivatePlugin]);

    const handleDeactivateLicense = useCallback(async (pluginFamily) => {
        const result = await deactivateLicense(pluginFamily);
        if (result.success && !result.error) {
            closeModal();
        }
        return result;
    }, [deactivateLicense]);

    const handleActivateLicense = useCallback(async (pluginFamily, licenseKey) => {
        const result = await activateLicense(pluginFamily, licenseKey);
        if (result.success && !result.error) {
            closeModal();
        }
        return result;
    }, [activateLicense]);

    // Modal-specific actions
    const handleInstallFree = useCallback((pluginSlug) => {
        installFreePlugin(pluginSlug);
        closeModal();
    }, [installFreePlugin, closeModal]);

    const handleInstallPro = useCallback(async (pluginSlug, licenseKey) => {
        const result = await installProPlugin(pluginSlug, licenseKey);
        if (result.success && !result.error) {
            closeModal();
        }
        return result;
    }, [installProPlugin, closeModal]);

    const handleUpgradePluginToPro = useCallback(async (pluginSlug, licenseKey) => {
        const result = await upgradePluginToPro(pluginSlug, licenseKey);
        if (result.success && !result.error) {
            closeModal();
        }
        return result;
    }, [upgradePluginToPro, closeModal]);

    const handleUninstallPlugin = useCallback((pluginSlug) => {
        uninstallPlugin(pluginSlug);
        closeModal();
    }, [uninstallPlugin, closeModal]);

    const handleResolveConflictAction = useCallback(async (plugin, type) => {
        const result = await resolveConflict(plugin, type);
        if (result.success) {
            closeModal();
        }
        return result;
    }, [resolveConflict, closeModal]);

    const handleBuyPlugin = useCallback((detailsUrl) => {
        window.open(detailsUrl, '_blank');
        closeModal();
    }, [closeModal]);

    const handleOpenPluginInfoModal = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.PLUGIN_INFO, pluginFamily);
    }, [openModal, MODAL_TYPES.PLUGIN_INFO]);

    const handleUpdatePlugin = useCallback(async (pluginFamily) => {
        const pluginFamilySlug = typeof pluginFamily === 'string' ? pluginFamily : pluginFamily.slug;
        const result = await updatePlugin(pluginFamilySlug);
        if (result.success && !result.error) {
            closeModal();
        }
        return result;
    }, [updatePlugin, closeModal]);

    const handleCheckForUpdates = useCallback(async () => {
        // Force refresh the plugins list to check for updates
        const result = await fetchPlugins(true);
        return result;
    }, [fetchPlugins]);

    return {
        // Primary actions
        handleOpenInstallationTypeModal,
        handleOpenResolveConflictModal,
        handleActivatePlugin,
        handleDeactivatePlugin,
        handleOpenUpgradeToProModal,
        handleOpenUninstallConfirmationModal,
        handleOpenLicenseManagementModal,
        handleOpenLicenseInputForInstallingProModal,
        handleOpenLicenseInputForActivatingLicenseModal,
        handleDeactivateLicense,
        handleActivateLicense,
        // Modal-specific actions
        handleInstallFree,
        handleInstallPro,
        handleUpgradePluginToPro,
        handleUninstallPlugin,
        handleResolveConflictAction,
        handleBuyPlugin,
        handleOpenPluginInfoModal,
        handleUpdatePlugin,
        handleCheckForUpdates,
    };
};
