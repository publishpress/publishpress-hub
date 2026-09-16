/**
 * Modal renderer.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { memo, useMemo } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

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
        handleReuseLicenseForAllPlugins,
    } = pluginActions;

    const {
        cleanupError,
    } = useDispatch(store);

    const plugins = useSelect((select) => select(store).getPlugins(), []);

    const currentProPluginDisplayName = useMemo(() => {
        const proPluginName = currentPluginFamily?.proPlugin?.name;

        if (proPluginName) {
            return proPluginName;
        }

        const basePluginName = (currentPluginDisplayName || '')
            .replace(/\s+Free$/i, '')
            .replace(/\s+Pro$/i, '');

        return basePluginName ? `${basePluginName} Pro` : '';
    }, [currentPluginFamily, currentPluginDisplayName]);

    const processedError = useMemo(() => {
        if (!currentPluginState.error) return null;

        const error = { ...currentPluginState.error };
        if (error?.context?.error_message && error.message !== error.context.error_message) {
            error.message = `${error.message} ${error.context.error_message}`;
        }

        return error;
    }, [currentPluginState.error]);

    const existingLicensePluginName = useMemo(() => {
        const existingLicensePlugin = plugins.find((pluginFamily) => (
            pluginFamily.slug !== currentPluginFamily?.slug
            && pluginFamily.proPlugin?.hasLicenseKey
            && !pluginFamily.proPlugin?.isLicenseKeyFromConstant
        ));

        return existingLicensePlugin?.proPlugin?.name || existingLicensePlugin?.name || '';
    }, [plugins, currentPluginFamily]);

    const modalProps = useMemo(() => {
        const hasActiveModal = currentPluginFamily && activeModal !== MODAL_TYPES.NONE;

        return {
            onClose: () => {
                closeModal();
                if (currentPluginFamily) {
                    cleanupError(currentPluginFamily);
                }
            },
            error: hasActiveModal ? processedError : null,
            buttonInProgress: currentPluginState.inProgress,
        }
    }, [currentPluginFamily, activeModal, closeModal, cleanupError, currentPluginState.inProgress, processedError, MODAL_TYPES.NONE]);

    if (!currentPluginFamily || activeModal === MODAL_TYPES.NONE) {
        return null;
    }

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
                    title={sprintf(__('Install %s', 'publishpress-hub'), currentProPluginDisplayName)}
                    onActivate={(licenseKey, applyToAll) =>
                        handleInstallPro(currentPluginFamily.slug, licenseKey, applyToAll)
                    }
                    onUseExistingLicense={() =>
                        handleInstallPro(currentPluginFamily.slug, '', false, true)
                    }
                    showApplyToAll={true}
                    existingLicensePluginName={existingLicensePluginName}
                />
            )}

            {isModalActive(MODAL_TYPES.LICENSE_INPUT_FOR_UPGRADE) && (
                <ModalLicenseInput
                    {...modalProps}
                    title={sprintf(__('Upgrade %s', 'publishpress-hub'), currentProPluginDisplayName)}
                    onActivate={(licenseKey, applyToAll) =>
                        handleUpgradePluginToPro(currentPluginFamily.slug, licenseKey, applyToAll)
                    }
                    onUseExistingLicense={() =>
                        handleUpgradePluginToPro(currentPluginFamily.slug, '', false, true)
                    }
                    showApplyToAll={true}
                    existingLicensePluginName={existingLicensePluginName}
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
                    title={sprintf(__('Upgrade %s', 'publishpress-hub'), currentProPluginDisplayName)}
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
                    onActivate={(licenseKey, applyToAll) =>
                        handleActivateLicense(currentPluginFamily, licenseKey, applyToAll)
                    }
                    onDeactivate={() => handleDeactivateLicense(currentPluginFamily)}
                    onReuseLicenseForAll={() => handleReuseLicenseForAllPlugins(currentPluginFamily)}
                    hasLicenseKey={currentPluginFamily.proPlugin.hasLicenseKey}
                    initialLicenseKeyMasked={currentPluginFamily.proPlugin.licenseKeyMasked}
                    isLicenseKeyFromConstant={currentPluginFamily.proPlugin.isLicenseKeyFromConstant}
                />
            )}

            {isModalActive(MODAL_TYPES.LICENSE_INPUT_FOR_ACTIVATING_LICENSE) && (
                <ModalLicenseInput
                    {...modalProps}
                    title={sprintf(__('Activate %s License', 'publishpress-hub'), currentPluginDisplayName)}
                    buttonLabel={__('Activate the license key', 'publishpress-hub')}
                    onActivate={(licenseKey, applyToAll) =>
                        handleActivateLicense(currentPluginFamily, licenseKey, applyToAll)
                    }
                    showApplyToAll={true}
                />
            )}

        </>
    );
};

export const ModalRenderer = memo(ModalRendererComponent);
