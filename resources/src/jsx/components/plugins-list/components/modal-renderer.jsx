/**
 * Modal renderer.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { memo, useMemo } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

import { __, sprintf } from '@publishpress-hub/i18n';
import { store } from '../../../stores/plugins-dashboard';

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
    const { activeModal, currentPluginFamily, closeModal, isModalActive, MODAL_TYPES, currentPluginDisplayName } = modalManager;
    const {
        handleInstallFree,
        handleInstallPro,
        handleUpgradePluginToPro,
        handleUninstallPlugin,
        handleResolveConflictAction,
        handleBuyPlugin,
        handleDeactivateLicense,
        handleActivateLicense,
    } = pluginActions;

    if (!currentPluginFamily || activeModal === MODAL_TYPES.NONE) {
        return null;
    }

    const {
        cleanupError,
    } = useDispatch(store);

    const processedError = useMemo(() => {
        if (!currentPluginState.error) return null;

        const error = { ...currentPluginState.error };
        if (error?.context?.error_message && error.message !== error.context.error_message) {
            error.message = `${error.message} ${error.context.error_message}`;
        }

        return error;
    }, [currentPluginState.error]);

    const modalProps = useMemo(() => {
        return {
            onClose: () => {
                closeModal();
                cleanupError(currentPluginFamily);
            },
            error: processedError,
            buttonInProgress: currentPluginState.inProgress,
        }
    }, [currentPluginFamily, closeModal, cleanupError, currentPluginState.inProgress, processedError]);

    return (
        <>
            {isModalActive(MODAL_TYPES.INSTALLATION_TYPE) && (
                <ModalInstallationType
                    {...modalProps}
                    title={sprintf(__('Install %s', 'publishpress-hub'), currentPluginDisplayName)}
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
                    title={sprintf(__('Install %s Pro', 'publishpress-hub'), currentPluginDisplayName)}
                    onActivate={(licenseKey) => handleInstallPro(currentPluginFamily.slug, licenseKey)}
                />
            )}

            {isModalActive(MODAL_TYPES.LICENSE_INPUT_FOR_UPGRADE) && (
                <ModalLicenseInput
                    {...modalProps}
                    title={sprintf(__('Upgrade %s to Pro', 'publishpress-hub'), currentPluginDisplayName)}
                    onActivate={(licenseKey) => handleUpgradePluginToPro(currentPluginFamily.slug, licenseKey)}
                />
            )}

            {isModalActive(MODAL_TYPES.UNINSTALL_CONFIRMATION) && (
                <ModalConfirmation
                    {...modalProps}
                    title={sprintf(__('Uninstall %s', 'publishpress-hub'), currentPluginDisplayName)}
                    message={sprintf(__('Are you sure you want to uninstall %s?', 'publishpress-hub'), currentPluginDisplayName)}
                    isDanger={true}
                    onConfirm={() => handleUninstallPlugin(currentPluginFamily.slug)}
                    onCancel={closeModal}
                />
            )}

            {isModalActive(MODAL_TYPES.UPGRADE_PLUGIN_TO_PRO) && (
                <ModalUpgrade
                    {...modalProps}
                    title={sprintf(__('Upgrade %s to Pro', 'publishpress-hub'), currentPluginDisplayName)}
                    onLicenseClick={() => modalManager.openModal(MODAL_TYPES.LICENSE_INPUT_FOR_UPGRADE, currentPluginFamily)}
                    onBuyClick={() => handleBuyPlugin(currentPluginFamily.proPlugin.detailsUrl)}
                    proDetailsUrl={currentPluginFamily.proPlugin.detailsUrl}
                    changelogUrl={currentPluginFamily.changelogUrl}
                />
            )}

            {isModalActive(MODAL_TYPES.RESOLVE_CONFLICT) && (
                <ModalResolveConflict
                    {...modalProps}
                    title={sprintf(__('Resolve Conflict for %s', 'publishpress-hub'), currentPluginDisplayName)}
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
                    title={sprintf(__('Manage %s License', 'publishpress-hub'), currentPluginDisplayName)}
                    onActivate={(licenseKey) => handleActivateLicense(currentPluginFamily, licenseKey)}
                    onDeactivate={() => handleDeactivateLicense(currentPluginFamily)}
                    initialLicenseKey={currentPluginFamily.proPlugin.licenseKey}
                />
            )}

            {isModalActive(MODAL_TYPES.LICENSE_INPUT_FOR_ACTIVATING_LICENSE) && (
                <ModalLicenseInput
                    {...modalProps}
                    title={sprintf(__('Activate %s License', 'publishpress-hub'), currentPluginDisplayName)}
                    onActivate={(licenseKey) => handleActivateLicense(currentPluginFamily, licenseKey)}
                />
            )}
        </>
    );
};

export const ModalRenderer = memo(ModalRendererComponent);
