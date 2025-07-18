import { memo } from '@wordpress/element';

import { __ } from '@publishpress-hub/i18n';

import { ModalConfirmation } from './modal-confirmation';
import { ModalInstallationType } from './modal-installation-type';
import { ModalLicenseInput } from './modal-license-input';
import { ModalResolveConflict } from './modal-resolve-conflict';
import { ModalUpgrade } from './modal-upgrade';

const ModalRendererComponent = ({
    modalManager,
    pluginActions,
    currentPluginState,
    selectedPluginForConflictResolution,
    pluginResolveConflictInProgress,
}) => {
    const { activeModal, currentPlugin, closeModal, isModalActive, MODAL_TYPES } = modalManager;
    const {
        handleInstallFree,
        handleInstallPro,
        handleUpgradePlugin,
        handleUninstallConfirm,
        handleResolveConflictAction,
        handleBuyPlugin,
    } = pluginActions;

    if (!currentPlugin || activeModal === MODAL_TYPES.NONE) {
        return null;
    }

    const modalProps = {
        onClose: closeModal,
        error: currentPluginState.error,
        buttonInProgress: currentPluginState.inProgress,
    };

    return (
        <>
            {isModalActive(MODAL_TYPES.INSTALLATION_TYPE) && (
                <ModalInstallationType
                    {...modalProps}
                    onProClick={() => modalManager.openModal(MODAL_TYPES.LICENSE_INPUT, currentPlugin)}
                    onFreeClick={() => handleInstallFree(currentPlugin.slug)}
                    freeDetailsUrl={currentPlugin.freeDetailsUrl}
                    proDetailsUrl={currentPlugin.proDetailsUrl}
                    changelogUrl={currentPlugin.changelogUrl}
                />
            )}

            {isModalActive(MODAL_TYPES.LICENSE_INPUT) && (
                <ModalLicenseInput
                    {...modalProps}
                    onActivate={(licenseKey) => handleInstallPro(currentPlugin.slug, licenseKey)}
                />
            )}

            {isModalActive(MODAL_TYPES.LICENSE_INPUT_FOR_UPGRADE) && (
                <ModalLicenseInput
                    {...modalProps}
                    onActivate={(licenseKey) => handleUpgradePlugin(currentPlugin.slug, licenseKey)}
                />
            )}

            {isModalActive(MODAL_TYPES.UNINSTALL_CONFIRMATION) && (
                <ModalConfirmation
                    {...modalProps}
                    onConfirm={() => handleUninstallConfirm(currentPlugin.slug)}
                    onCancel={closeModal}
                    isDanger={true}
                    title={__('Uninstall Plugin', 'publishpress-hub')}
                    message={__('Are you sure you want to uninstall this plugin?', 'publishpress-hub')}
                />
            )}

            {isModalActive(MODAL_TYPES.UPGRADE) && (
                <ModalUpgrade
                    {...modalProps}
                    onLicenseClick={() => modalManager.openModal(MODAL_TYPES.LICENSE_INPUT_FOR_UPGRADE, currentPlugin)}
                    onBuyClick={() => handleBuyPlugin(currentPlugin.proPlugin.detailsUrl)}
                    proDetailsUrl={currentPlugin.proPlugin.detailsUrl}
                    changelogUrl={currentPlugin.changelogUrl}
                />
            )}

            {isModalActive(MODAL_TYPES.RESOLVE_CONFLICT) && (
                <ModalResolveConflict
                    {...modalProps}
                    onKeepFreePlugin={() => handleResolveConflictAction(currentPlugin, 'free')}
                    onKeepProPlugin={() => handleResolveConflictAction(currentPlugin, 'pro')}
                    onCancel={closeModal}
                    pluginsFamily={currentPlugin}
                    buttonInProgress={pluginResolveConflictInProgress[currentPlugin.slug] || false}
                    selectedPluginForConflictResolution={selectedPluginForConflictResolution}
                />
            )}
        </>
    );
};

export const ModalRenderer = memo(ModalRendererComponent);
