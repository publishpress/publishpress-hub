import { useState, useCallback } from '@wordpress/element';

const MODAL_TYPES = {
    NONE: 'none',
    INSTALLATION_TYPE: 'installation-type',
    LICENSE_INPUT: 'license-input',
    LICENSE_INPUT_FOR_UPGRADE: 'license-input-for-upgrade',
    UNINSTALL_CONFIRMATION: 'uninstall-confirmation',
    UPGRADE: 'upgrade',
    RESOLVE_CONFLICT: 'resolve-conflict',
};

export const useModalManager = () => {
    const [activeModal, setActiveModal] = useState(MODAL_TYPES.NONE);
    const [currentPlugin, setCurrentPlugin] = useState(null);

    const openModal = useCallback((modalType, plugin = null) => {
        setActiveModal(modalType);
        setCurrentPlugin(plugin);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(MODAL_TYPES.NONE);
        setCurrentPlugin(null);
    }, []);

    const isModalActive = useCallback((modalType) => {
        return activeModal === modalType;
    }, [activeModal]);

    return {
        MODAL_TYPES,
        activeModal,
        currentPlugin,
        openModal,
        closeModal,
        isModalActive,
    };
};
