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
    const { activeModal, currentPluginFamily, closeModal, isModalActive, MODAL_TYPES } = modalManager;
    const {
        handleInstallFree,
        handleInstallPro,
        handleUpgradePluginToPro,
        handleUninstallPlugin,
        handleResolveConflictAction,
        handleBuyPlugin,
        handleDeactivateLicense,
        handleActivateLicense,
        handleOpenUpgradeToProModal,
    } = pluginActions;

    if (!currentPluginFamily || activeModal === MODAL_TYPES.NONE) {
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
                    onProClick={() => modalManager.openModal(MODAL_TYPES.LICENSE_INPUT_FOR_INSTALLING_PRO, currentPluginFamily)}
                    onFreeClick={() => handleInstallFree(currentPluginFamily.slug)}
                    freeDetailsUrl={currentPluginFamily.freeDetailsUrl}
                    proDetailsUrl={currentPluginFamily.proDetailsUrl}
                    changelogUrl={currentPluginFamily.changelogUrl}
                />
            )}

            {isModalActive(MODAL_TYPES.LICENSE_INPUT_FOR_INSTALLING_PRO) && (
                <ModalLicenseInput
                    {...modalProps}
                    onActivate={(licenseKey) => handleInstallPro(currentPluginFamily.slug, licenseKey)}
                />
            )}

            {isModalActive(MODAL_TYPES.LICENSE_INPUT_FOR_UPGRADE) && (
                <ModalLicenseInput
                    {...modalProps}
                    onActivate={(licenseKey) => handleUpgradePluginToPro(currentPluginFamily.slug, licenseKey)}
                />
            )}

            {isModalActive(MODAL_TYPES.UNINSTALL_CONFIRMATION) && (
                <ModalConfirmation
                    {...modalProps}
                    onConfirm={() => handleUninstallPlugin(currentPluginFamily.slug)}
                    onCancel={closeModal}
                    isDanger={true}
                    title={__('Uninstall Plugin', 'publishpress-hub')}
                    message={__('Are you sure you want to uninstall this plugin?', 'publishpress-hub')}
                />
            )}

            {isModalActive(MODAL_TYPES.UPGRADE_PLUGIN_TO_PRO) && (
                <ModalUpgrade
                    {...modalProps}
                    onLicenseClick={() => modalManager.openModal(MODAL_TYPES.LICENSE_INPUT_FOR_UPGRADE, currentPluginFamily)}
                    onBuyClick={() => handleBuyPlugin(currentPluginFamily.proPlugin.detailsUrl)}
                    proDetailsUrl={currentPluginFamily.proPlugin.detailsUrl}
                    changelogUrl={currentPluginFamily.changelogUrl}
                />
            )}

            {isModalActive(MODAL_TYPES.RESOLVE_CONFLICT) && (
                <ModalResolveConflict
                    {...modalProps}
                    onKeepFreePlugin={() => handleResolveConflictAction(currentPluginFamily, 'free')}
                    onKeepProPlugin={() => handleResolveConflictAction(currentPluginFamily, 'pro')}
                    onCancel={closeModal}
                    pluginsFamily={currentPluginFamily}
                    buttonInProgress={pluginResolveConflictInProgress[currentPluginFamily.slug] || false}
                    selectedPluginForConflictResolution={selectedPluginForConflictResolution}
                />
            )}

            {isModalActive(MODAL_TYPES.LICENSE_MANAGEMENT) && (
                <ModalLicenseManagement
                    {...modalProps}
                    onActivate={(licenseKey) => handleActivateLicense(currentPluginFamily, licenseKey)}
                    onDeactivate={() => handleDeactivateLicense(currentPluginFamily)}
                    initialLicenseKey={currentPluginFamily.proPlugin.licenseKey}
                />
            )}

            {isModalActive(MODAL_TYPES.LICENSE_INPUT_FOR_ACTIVATING_LICENSE) && (
                <ModalLicenseInput
                    {...modalProps}
                    onActivate={(licenseKey) => handleActivateLicense(currentPluginFamily, licenseKey)}
                />
            )}
        </>
    );
};

export const ModalRenderer = memo(ModalRendererComponent);
