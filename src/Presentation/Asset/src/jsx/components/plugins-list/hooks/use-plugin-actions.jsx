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
    } = useDispatch(store);

    const handleOpenInstallationTypeModal = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.INSTALLATION_TYPE, pluginFamily);
    }, [openModal, MODAL_TYPES.INSTALLATION_TYPE]);

    const handleOpenResolveConflictModal = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.RESOLVE_CONFLICT, pluginFamily);
    }, [openModal, MODAL_TYPES.RESOLVE_CONFLICT]);

    const handleOpenUpgradeModal = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.UPGRADE, pluginFamily);
    }, [openModal, MODAL_TYPES.UPGRADE]);

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

    return {
        // Primary actions
        handleOpenInstallationTypeModal,
        handleOpenResolveConflictModal,
        handleActivatePlugin,
        handleDeactivatePlugin,
        handleOpenUpgradeModal,
        handleOpenUninstallConfirmationModal,
        handleOpenLicenseManagementModal,
        handleOpenLicenseInputForInstallingProModal,
        handleOpenLicenseInputForActivatingLicenseModal,
        handleDeactivateLicense,
        // Modal-specific actions
        handleInstallFree,
        handleInstallPro,
        handleUpgradePluginToPro,
        handleUninstallPlugin,
        handleResolveConflictAction,
        handleBuyPlugin,
    };
};
