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
    } = useDispatch(store);

    const handleInstall = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.INSTALLATION_TYPE, pluginFamily);
    }, [openModal, MODAL_TYPES.INSTALLATION_TYPE]);

    const handleResolveConflict = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.RESOLVE_CONFLICT, pluginFamily);
    }, [openModal, MODAL_TYPES.RESOLVE_CONFLICT]);

    const handleActivate = useCallback((pluginFamily) => {
        activatePlugin(pluginFamily.slug);
    }, [activatePlugin]);

    const handleDeactivate = useCallback((pluginFamily) => {
        deactivatePlugin(pluginFamily.slug);
    }, [deactivatePlugin]);

    const handleUpgradeToPro = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.UPGRADE, pluginFamily);
    }, [openModal, MODAL_TYPES.UPGRADE]);

    const handleUninstall = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.UNINSTALL_CONFIRMATION, pluginFamily);
    }, [openModal, MODAL_TYPES.UNINSTALL_CONFIRMATION]);

    const handleManageLicense = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.LICENSE_MANAGEMENT, pluginFamily);
    }, [openModal, MODAL_TYPES.LICENSE_MANAGEMENT]);

    const handleActivateLicense = useCallback((pluginFamily) => {
        openModal(MODAL_TYPES.LICENSE_INPUT, pluginFamily);
    }, [openModal, MODAL_TYPES.LICENSE_INPUT]);

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

    const handleUpgradePlugin = useCallback(async (pluginSlug, licenseKey) => {
        const result = await upgradePluginToPro(pluginSlug, licenseKey);
        if (result.success && !result.error) {
            closeModal();
        }
        return result;
    }, [upgradePluginToPro, closeModal]);

    const handleUninstallConfirm = useCallback((pluginSlug) => {
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
        handleInstall,
        handleResolveConflict,
        handleActivate,
        handleDeactivate,
        handleUpgradeToPro,
        handleUninstall,
        handleManageLicense,
        handleActivateLicense,

        // Modal-specific actions
        handleInstallFree,
        handleInstallPro,
        handleUpgradePlugin,
        handleUninstallConfirm,
        handleResolveConflictAction,
        handleBuyPlugin,
    };
};
