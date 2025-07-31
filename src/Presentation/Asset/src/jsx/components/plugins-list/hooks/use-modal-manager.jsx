import { useState, useCallback } from '@wordpress/element';

const MODAL_TYPES = {
    NONE: 'none',
    INSTALLATION_TYPE: 'installation-type',
    LICENSE_INPUT_FOR_INSTALLING_PRO: 'license-input-for-installing-pro',
    LICENSE_INPUT_FOR_UPGRADE: 'license-input-for-upgrade',
    LICENSE_INPUT_FOR_ACTIVATING_LICENSE: 'license-input-for-activating-license',
    UNINSTALL_CONFIRMATION: 'uninstall-confirmation',
    UPGRADE_PLUGIN_TO_PRO: 'upgrade-plugin-to-pro',
    RESOLVE_CONFLICT: 'resolve-conflict',
    LICENSE_MANAGEMENT: 'license-management',
};

export const useModalManager = () => {
    const [activeModal, setActiveModal] = useState(MODAL_TYPES.NONE);
    const [currentPluginFamily, setCurrentPluginFamily] = useState(null);

    const openModal = useCallback((modalType, plugin = null) => {
        setActiveModal(modalType);
        setCurrentPluginFamily(plugin);
        console.log('openModal', modalType, plugin);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(MODAL_TYPES.NONE);
        setCurrentPluginFamily(null);
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
    };
};
