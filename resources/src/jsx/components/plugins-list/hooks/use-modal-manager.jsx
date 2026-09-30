/**
 * Use modal manager.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { useState, useCallback } from '@wordpress/element';

const MODAL_TYPES = {
    NONE: 'none',
    INSTALLATION_TYPE: 'installation-type',
    LICENSE_INPUT_FOR_INSTALLING_PRO: 'license-input-for-installing-pro',
    LICENSE_INPUT_FOR_UPGRADE: 'license-input-for-upgrade',
    LICENSE_INPUT_FOR_ACTIVATING_LICENSE: 'license-input-for-activating-license',
    UNINSTALL_CONFIRMATION: 'uninstall-confirmation',
    DEACTIVATE_CONFIRMATION: 'deactivate-confirmation',
    UPGRADE_PLUGIN_TO_PRO: 'upgrade-plugin-to-pro',
    RESOLVE_CONFLICT: 'resolve-conflict',
    LICENSE_MANAGEMENT: 'license-management',
};

export const useModalManager = () => {
    const [activeModal, setActiveModal] = useState(MODAL_TYPES.NONE);
    const [currentPluginFamily, setCurrentPluginFamily] = useState(null);
    const [currentPluginDisplayName, setCurrentPluginDisplayName] = useState(null);

    const openModal = useCallback((modalType, pluginFamily = null) => {
        setActiveModal(modalType);
        setCurrentPluginFamily(pluginFamily);

        const isPro = pluginFamily.proPlugin.isInstalled;
        setCurrentPluginDisplayName(isPro ? pluginFamily.proPlugin.name : pluginFamily.freePlugin.name);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(MODAL_TYPES.NONE);
        setCurrentPluginFamily(null);
        setCurrentPluginDisplayName(null);
    }, []);

    const isModalActive = useCallback((modalType) => {
        return activeModal === modalType;
    }, [activeModal]);

    return {
        MODAL_TYPES,
        activeModal,
        currentPluginFamily,
        openModal,
        closeModal,
        isModalActive,
        currentPluginDisplayName,
    };
};
