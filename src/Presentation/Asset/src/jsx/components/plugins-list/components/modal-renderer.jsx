import { memo } from '@wordpress/element';

import { __ } from '@publishpress-hub/i18n';

import { ModalConfirmation } from './modal-confirmation';
import { ModalInstallationType } from './modal-installation-type';
import { ModalLicenseInput } from './modal-license-input';
import { ModalLicenseManagement } from './modal-license-management';
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
        handleUninstallPlugin,
        handleResolveConflictAction,
        handleBuyPlugin,
        handleDeactivateLicense,
        handleActivateLicense,
    } = pluginActions;

    if (!currentPlugin || activeModal === MODAL_TYPES.NONE) {
        return null;
    }

    const error = currentPluginState.error ? { ...currentPluginState.error } : null;

    // Add the error message from the context to the error message
    if (error && error.context && error.context.error_message) {
        error.message += ` ${error.context.error_message}`;
    }

    const modalProps = {
        onClose: closeModal,
        error: error,
        buttonInProgress: currentPluginState.inProgress,
    };

    return (
        <>
            {isModalActive(MODAL_TYPES.INSTALLATION_TYPE) && (
                <ModalInstallationType
                    {...modalProps}
                    onProClick={() => modalManager.openModal(MODAL_TYPES.LICENSE_INPUT_FOR_INSTALLING_PRO, currentPlugin)}
                    onFreeClick={() => handleInstallFree(currentPlugin.slug)}
                    freeDetailsUrl={currentPlugin.freeDetailsUrl}
                    proDetailsUrl={currentPlugin.proDetailsUrl}
                    changelogUrl={currentPlugin.changelogUrl}
                />
            )}

            {isModalActive(MODAL_TYPES.LICENSE_INPUT_FOR_INSTALLING_PRO) && (
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
                    onConfirm={() => handleUninstallPlugin(currentPlugin.slug)}
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

            {isModalActive(MODAL_TYPES.LICENSE_MANAGEMENT) && (
                <ModalLicenseManagement
                    {...modalProps}
                    onActivate={() => handleManageLicense(currentPlugin.slug)}
                    onDeactivate={() => handleDeactivateLicense(currentPlugin)}
                    initialLicenseKey={currentPlugin.proPlugin.licenseKey}
                />
            )}

            {isModalActive(MODAL_TYPES.LICENSE_INPUT_FOR_ACTIVATING_LICENSE) && (
                <ModalLicenseInput
                    {...modalProps}
                    onActivate={(licenseKey) => handleActivateLicense(currentPlugin.slug, licenseKey)}
                />
            )}
        </>
    );
};

export const ModalRenderer = memo(ModalRendererComponent);
