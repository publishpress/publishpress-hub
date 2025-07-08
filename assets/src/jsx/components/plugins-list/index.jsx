import { memo, useCallback, useState, useMemo } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

import { __ } from '@publishpress/hub-i18n';

import { store } from '../../stores/plugins-dashboard';
import { ModalInstallationType } from './modal-installation-type';
import { ModalLicenseInput } from './modal-license-input';
import { PluginItem } from './plugin-item';
import { ModalConfirmation } from './modal-confirmation';
import { ModalResolveConflict } from './modal-resolve-conflict';
import { ModalUpgrade } from './modal-upgrade';

const MODAL_NONE = 'none';
const MODAL_INSTALLATION_TYPE = 'installation-type';
const MODAL_LICENSE_INPUT = 'license-input';
const MODAL_LICENSE_INPUT_FOR_UPGRADE = 'license-input-for-upgrade';
const MODAL_UNINSTALL_CONFIRMATION = 'uninstall-confirmation';
const MODAL_UPGRADE = 'upgrade';
const MODAL_RESOLVE_CONFLICT = 'resolve-conflict';

const PluginsListComponent = ({
    plugins,
    pluginIconBaseUrl,
    isLoading,
}) => {
    const [activeModal, setActiveModal] = useState(MODAL_NONE);
    const [currentPluginForModal, setCurrentPluginForModal] = useState(null);

    const {
        pluginInstallationInProgress,
        pluginUninstallationInProgress,
        pluginDeactivationInProgress,
        pluginActivationInProgress,
        pluginUpgradeInProgress,
        pluginResolveConflictInProgress,
        selectedPluginForConflictResolution,
        pluginError
    } = useSelect((select) => {
        const storeSelect = select(store);
        return {
            pluginInstallationInProgress: storeSelect.getPluginInstallationInProgress(),
            pluginUninstallationInProgress: storeSelect.getPluginUninstallationInProgress(),
            pluginDeactivationInProgress: storeSelect.getPluginDeactivationInProgress(),
            pluginActivationInProgress: storeSelect.getPluginActivationInProgress(),
            pluginUpgradeInProgress: storeSelect.getPluginUpgradeInProgress(),
            pluginResolveConflictInProgress: storeSelect.getPluginResolveConflictInProgress(),
            selectedPluginForConflictResolution: storeSelect.getSelectedPluginForConflictResolution(),
            pluginError: storeSelect.getPluginError(),
        };
    }, []);

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
        setCurrentPluginForModal(pluginFamily);
        setActiveModal(MODAL_INSTALLATION_TYPE);
    }, [setActiveModal, setCurrentPluginForModal]);

    const handleResolveConflict = useCallback((pluginFamily) => {
        setCurrentPluginForModal(pluginFamily);
        setActiveModal(MODAL_RESOLVE_CONFLICT);
    }, [setCurrentPluginForModal, setActiveModal]);

    const handleActivate = useCallback((pluginFamily) => {
        activatePlugin(pluginFamily.slug);
    }, [activatePlugin]);

    const handleDeactivate = useCallback((pluginFamily) => {
        deactivatePlugin(pluginFamily.slug);
    }, [deactivatePlugin]);

    const handleManageLicense = useCallback((pluginFamily) => {
        // setCurrentPluginForModal(pluginFamily);
        // TODO: Implement license management modal
    }, [setCurrentPluginForModal]);

    const handleActivateLicense = useCallback((pluginFamily) => {
        setCurrentPluginForModal(pluginFamily);
    }, [setCurrentPluginForModal]);

    const handleUpgradeToPro = useCallback((pluginFamily) => {
        setActiveModal(MODAL_UPGRADE);
        setCurrentPluginForModal(pluginFamily);
    }, [setCurrentPluginForModal, setActiveModal]);

    const handleUpgradeModalClose = useCallback((option) => {
        setActiveModal(MODAL_NONE);
        setCurrentPluginForModal(null);
    }, [setCurrentPluginForModal, setActiveModal]);

    const handleUpgradeModalLicenseClick = useCallback(() => {
        setActiveModal(MODAL_LICENSE_INPUT_FOR_UPGRADE);
    }, [setActiveModal]);

    const handleUpgradeModalBuyClick = useCallback(() => {
        console.log('handleUpgradeModalBuyClick');
        window.open(currentPluginForModal.proPlugin.detailsUrl, '_blank');
        setActiveModal(MODAL_NONE);
        setCurrentPluginForModal(null);
    }, [currentPluginForModal, setActiveModal, setCurrentPluginForModal]);

    const handleInstallationTypeModalClose = useCallback((type) => {
        setActiveModal(MODAL_NONE);
        setCurrentPluginForModal(null);
    }, [currentPluginForModal, installFreePlugin, setActiveModal, setCurrentPluginForModal]);

    const handleInstallationTypeModalProClick = useCallback(() => {
        setActiveModal(MODAL_LICENSE_INPUT);
    }, [setActiveModal]);

    const handleInstallationTypeModalFreeClick = useCallback(() => {
        installFreePlugin(currentPluginForModal.slug);
        setCurrentPluginForModal(null);
        setActiveModal(MODAL_NONE);
    }, [currentPluginForModal, installFreePlugin, setActiveModal, setCurrentPluginForModal]);

    const handleLicenseModalClose = useCallback(() => {
        setActiveModal(MODAL_NONE);
        setCurrentPluginForModal(null);
    }, [setActiveModal, setCurrentPluginForModal]);

    const handleLicenseInputModalCloseForUpgrade = useCallback(() => {
        setActiveModal(MODAL_NONE);
        setCurrentPluginForModal(null);
    }, [setActiveModal, setCurrentPluginForModal]);

    const handleResolveConflictModalClose = useCallback(() => {
        setActiveModal(MODAL_NONE);
        setCurrentPluginForModal(null);
    }, [setActiveModal, setCurrentPluginForModal]);

    const handleResolveConflictKeepFree = useCallback(() => {
        resolveConflict(currentPluginForModal, 'free').then((result) => {
            if (result.success) {
                setActiveModal(MODAL_NONE);
                setCurrentPluginForModal(null);
            }
        });
    }, [resolveConflict, currentPluginForModal, setActiveModal, setCurrentPluginForModal]);

    const handleResolveConflictKeepPro = useCallback(() => {
        resolveConflict(currentPluginForModal, 'pro').then((result) => {
            if (result.success) {
                setActiveModal(MODAL_NONE);
                setCurrentPluginForModal(null);
            }
        });
    }, [resolveConflict, currentPluginForModal, setActiveModal, setCurrentPluginForModal]);

    const handleResolveConflictCancel = useCallback(() => {
        setActiveModal(MODAL_NONE);
        setCurrentPluginForModal(null);
    }, [setActiveModal, setCurrentPluginForModal]);

    const handleLicenseActivate = useCallback((licenseKey) => {
        if (!currentPluginForModal) return;

        installProPlugin(
            currentPluginForModal.slug,
            licenseKey,
        ).then((result) => {
            if (!result.success || result.error) {
                console.error('Installation failed:', result.error);
                return;
            }

            setActiveModal(MODAL_NONE);
            setCurrentPluginForModal(null);
        });
    }, [currentPluginForModal, installProPlugin, setActiveModal, setCurrentPluginForModal]);

    const handlePluginUpgrade = useCallback((licenseKey) => {
        if (!currentPluginForModal) return;

        upgradePluginToPro(
            currentPluginForModal.slug,
            licenseKey,
        ).then((result) => {
            if (!result.success || result.error) {
                console.error('Upgrade failed:', result.error);
                return;
            }

            setActiveModal(MODAL_NONE);
            setCurrentPluginForModal(null);
        });
    }, [currentPluginForModal, upgradePluginToPro, setActiveModal, setCurrentPluginForModal]);

    const handleUninstall = useCallback((pluginFamily) => {
        setActiveModal(MODAL_UNINSTALL_CONFIRMATION);
        setCurrentPluginForModal(pluginFamily);
    }, [setActiveModal, setCurrentPluginForModal]);

    const currentPluginState = useMemo(() => {
        if (!currentPluginForModal) return { error: null, inProgress: false };

        return {
            error: pluginError[currentPluginForModal.slug] || null,
            inProgress: pluginInstallationInProgress[currentPluginForModal.slug] ||
                pluginUninstallationInProgress[currentPluginForModal.slug] ||
                pluginDeactivationInProgress[currentPluginForModal.slug] ||
                pluginActivationInProgress[currentPluginForModal.slug] ||
                pluginUpgradeInProgress[currentPluginForModal.slug] ||
                pluginResolveConflictInProgress[currentPluginForModal.slug] ||
                false,
        };
    }, [
        currentPluginForModal,
        pluginError,
        pluginInstallationInProgress,
        pluginUninstallationInProgress,
        pluginDeactivationInProgress,
        pluginActivationInProgress,
        pluginUpgradeInProgress,
        pluginResolveConflictInProgress,
    ]);

    const handleUninstallConfirmationConfirm = useCallback(() => {
        setActiveModal(MODAL_NONE);
        uninstallPlugin(currentPluginForModal.slug);
        setCurrentPluginForModal(null);
    }, [currentPluginForModal, uninstallPlugin, setActiveModal, setCurrentPluginForModal]);

    const handleUninstallConfirmationCancel = useCallback(() => {
        setActiveModal(MODAL_NONE);
        setCurrentPluginForModal(null);
    }, [setCurrentPluginForModal, setActiveModal]);

    const handleUninstallConfirmationModalClose = useCallback(() => {
        setActiveModal(MODAL_NONE);
        setCurrentPluginForModal(null);
    }, [setCurrentPluginForModal, setActiveModal]);

    return (
        <div className="pp-hub-plugins-list">
            {plugins.map((pluginFamily) => {
                const isInstalling = pluginInstallationInProgress[pluginFamily.slug] || false;
                const isUninstalling = pluginUninstallationInProgress[pluginFamily.slug] || false;
                const isDeactivating = pluginDeactivationInProgress[pluginFamily.slug] || false;
                const isActivating = pluginActivationInProgress[pluginFamily.slug] || false;
                const isUpgrading = pluginUpgradeInProgress[pluginFamily.slug] || false;
                const isResolvingConflict = pluginResolveConflictInProgress[pluginFamily.slug] || false;

                return (
                    <PluginItem
                        key={`plugin-${pluginFamily.slug}`}
                        pluginFamily={pluginFamily}
                        pluginIconBaseUrl={pluginIconBaseUrl}
                        isInstalling={isInstalling}
                        isUninstalling={isUninstalling}
                        isDeactivating={isDeactivating}
                        isActivating={isActivating}
                        isUpgrading={isUpgrading}
                        isResolvingConflict={isResolvingConflict}
                        onInstall={handleInstall}
                        onResolveConflict={handleResolveConflict}
                        onActivate={handleActivate}
                        onDeactivate={handleDeactivate}
                        onUpgradeToPro={handleUpgradeToPro}
                        onManageLicense={handleManageLicense}
                        onActivateLicense={handleActivateLicense}
                        onUninstall={handleUninstall}
                    />
                );
            })}

            {plugins.length === 0 && !isLoading && (
                <div className="pp-hub-plugins-list-message">
                    <p>{__('No plugins found.', 'publishpress-hub')}</p>
                </div>
            )}

            {isLoading && plugins.length === 0 && (
                <div className="pp-hub-plugins-list-message">
                    <p>{__('Loading plugins...', 'publishpress-hub')}</p>
                </div>
            )}

            {activeModal === MODAL_INSTALLATION_TYPE && currentPluginForModal && (
                <ModalInstallationType
                    onClose={handleInstallationTypeModalClose}
                    onProClick={handleInstallationTypeModalProClick}
                    onFreeClick={handleInstallationTypeModalFreeClick}
                    freeDetailsUrl={currentPluginForModal.freeDetailsUrl}
                    proDetailsUrl={currentPluginForModal.proDetailsUrl}
                    changelogUrl={currentPluginForModal.changelogUrl}
                />
            )}

            {activeModal === MODAL_LICENSE_INPUT && currentPluginForModal && (
                <ModalLicenseInput
                    onClose={handleLicenseModalClose}
                    onActivate={handleLicenseActivate}
                    error={currentPluginState.error}
                    buttonInProgress={currentPluginState.inProgress}
                />
            )}

            {activeModal === MODAL_LICENSE_INPUT_FOR_UPGRADE && currentPluginForModal && (
                <ModalLicenseInput
                    onClose={handleLicenseInputModalCloseForUpgrade}
                    onActivate={handlePluginUpgrade}
                    error={currentPluginState.error}
                    buttonInProgress={currentPluginState.inProgress}
                />
            )}

            {activeModal === MODAL_UNINSTALL_CONFIRMATION && currentPluginForModal && (
                <ModalConfirmation
                    onClose={handleUninstallConfirmationModalClose}
                    onConfirm={handleUninstallConfirmationConfirm}
                    onCancel={handleUninstallConfirmationCancel}
                    isDanger={true}
                    title={__('Uninstall Plugin', 'publishpress-hub')}
                    message={__('Are you sure you want to uninstall this plugin?', 'publishpress-hub')}
                />
            )}

            {activeModal === MODAL_UPGRADE && currentPluginForModal && (
                <ModalUpgrade
                    onClose={handleUpgradeModalClose}
                    onLicenseClick={handleUpgradeModalLicenseClick}
                    onBuyClick={handleUpgradeModalBuyClick}
                    proDetailsUrl={currentPluginForModal.proPlugin.detailsUrl}
                    changelogUrl={currentPluginForModal.changelogUrl}
                />
            )}

            {activeModal === MODAL_RESOLVE_CONFLICT && currentPluginForModal && (
                <ModalResolveConflict
                    onClose={handleResolveConflictModalClose}
                    onKeepFreePlugin={handleResolveConflictKeepFree}
                    onKeepProPlugin={handleResolveConflictKeepPro}
                    onCancel={handleResolveConflictCancel}
                    pluginsFamily={currentPluginForModal}
                    error={currentPluginState.error}
                    buttonInProgress={pluginResolveConflictInProgress[currentPluginForModal.slug] || false}
                    selectedPluginForConflictResolution={selectedPluginForConflictResolution}
                />
            )}
        </div>
    );
};

export const PluginsList = memo(PluginsListComponent);


