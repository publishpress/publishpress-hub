import { memo, useCallback, useState, useMemo } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

import { __ } from '@publishpress/hub-i18n';

import { store } from '../../stores/plugins-dashboard';
import { ModalInstallationType } from './modal-installation-type';
import { ModalLicenseInput } from './modal-license-input';
import { PluginItem } from './plugin-item';
import { ModalConfirmation } from './modal-confirmation';
import { ModalResolveConflict } from './modal-resolve-conflict';

const PluginsListComponent = ({
    plugins,
    pluginIconBaseUrl,
    isLoading,
}) => {
    const [currentPluginForModal, setCurrentPluginForModal] = useState(null);

    const {
        pluginInstallationInProgress,
        pluginUninstallationInProgress,
        pluginDeactivationInProgress,
        pluginActivationInProgress,
        pluginUpgradeInProgress,
        pluginResolveConflictInProgress,
        selectedPluginForConflictResolution,
        pluginError,
        isLicenseInputModalOpen,
        isInstallationTypeModalOpen,
        isUninstallConfirmationModalOpen,
        isUpgradeModalOpen,
        isResolveConflictModalOpen,
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
            isLicenseInputModalOpen: storeSelect.getIsLicenseInputModalOpen(),
            isInstallationTypeModalOpen: storeSelect.getIsInstallationTypeModalOpen(),
            isUninstallConfirmationModalOpen: storeSelect.getIsUninstallConfirmationModalOpen(),
            isUpgradeModalOpen: storeSelect.getIsUpgradeModalOpen(),
            isResolveConflictModalOpen: storeSelect.getIsResolveConflictModalOpen(),
        };
    }, []);

    const {
        installFreePlugin,
        installProPlugin,
        setLicenseInputModalOpen,
        setInstallationTypeModalOpen,
        setIsUninstallConfirmationModalOpen,
        setIsUpgradeModalOpen,
        setIsResolveConflictModalOpen,
        uninstallPlugin,
        activatePlugin,
        deactivatePlugin,
        upgradePluginToPro,
        resolveConflict,
    } = useDispatch(store);

    // Memoized handlers
    const handleInstall = useCallback((pluginFamily) => {
        setCurrentPluginForModal(pluginFamily);
        setInstallationTypeModalOpen(true);
    }, [setInstallationTypeModalOpen]);

    const handleResolveConflict = useCallback((pluginFamily) => {
        setCurrentPluginForModal(pluginFamily);
        setIsResolveConflictModalOpen(true);
    }, [setCurrentPluginForModal, setIsResolveConflictModalOpen]);

    const handleActivate = useCallback((pluginFamily) => {
        activatePlugin(pluginFamily.slug);
    }, [activatePlugin]);

    const handleDeactivate = useCallback((pluginFamily) => {
        deactivatePlugin(pluginFamily.slug);
    }, [deactivatePlugin]);

    const handleManageLicense = useCallback((pluginFamily) => {
        setCurrentPluginForModal(pluginFamily);
    }, []);

    const handleActivateLicense = useCallback((pluginFamily) => {
        setCurrentPluginForModal(pluginFamily);
    }, []);

    const handleUpgradeToPro = useCallback((pluginFamily) => {
        setIsUpgradeModalOpen(true);
        setCurrentPluginForModal(pluginFamily);
    }, [setIsUpgradeModalOpen, setCurrentPluginForModal]);

    const handleUpgradeModalClose = useCallback(() => {
        setIsUpgradeModalOpen(false);
        setCurrentPluginForModal(null);
    }, [setIsUpgradeModalOpen, setCurrentPluginForModal]);

    const handleInstallationTypeModalClose = useCallback((type) => {
        setInstallationTypeModalOpen(false);

        if (type === 'free' && currentPluginForModal) {
            installFreePlugin(currentPluginForModal.slug);
        } else if (type === 'pro') {
            setLicenseInputModalOpen(true);
        }
    }, [currentPluginForModal, installFreePlugin, setInstallationTypeModalOpen, setLicenseInputModalOpen]);

    const handleLicenseModalClose = useCallback(() => {
        setLicenseInputModalOpen(false);
        setCurrentPluginForModal(null);
    }, [setLicenseInputModalOpen]);

    const handleResolveConflictModalClose = useCallback(() => {
        setIsResolveConflictModalOpen(false);
        setCurrentPluginForModal(null);
    }, [setIsResolveConflictModalOpen]);

    const handleResolveConflictKeepFree = useCallback(() => {
        resolveConflict(currentPluginForModal, 'free').then((result) => {
            if (result.success) {
                setIsResolveConflictModalOpen(false);
                setCurrentPluginForModal(null);
            }
        });
    }, [resolveConflict, currentPluginForModal]);

    const handleResolveConflictKeepPro = useCallback(() => {
        resolveConflict(currentPluginForModal, 'pro').then((result) => {
            if (result.success) {
                setIsResolveConflictModalOpen(false);
                setCurrentPluginForModal(null);
            }
        });
    }, [resolveConflict, currentPluginForModal]);

    const handleResolveConflictCancel = useCallback(() => {
        setIsResolveConflictModalOpen(false);
        setCurrentPluginForModal(null);
    }, [setIsResolveConflictModalOpen, setCurrentPluginForModal]);

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

            setLicenseInputModalOpen(false);
            setCurrentPluginForModal(null);
        });
    }, [currentPluginForModal, installProPlugin, setLicenseInputModalOpen, setCurrentPluginForModal]);

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

            setIsUpgradeModalOpen(false);
            setCurrentPluginForModal(null);
        });
    }, [currentPluginForModal, installProPlugin, setIsUpgradeModalOpen, setCurrentPluginForModal]);

    const handleUninstall = useCallback((pluginFamily) => {
        setIsUninstallConfirmationModalOpen(true);
        setCurrentPluginForModal(pluginFamily);
    }, [setIsUninstallConfirmationModalOpen, setCurrentPluginForModal]);

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
        setIsUninstallConfirmationModalOpen(false);
        uninstallPlugin(currentPluginForModal.slug);
    }, [currentPluginForModal, uninstallPlugin]);

    const handleUninstallConfirmationCancel = useCallback(() => {
        setIsUninstallConfirmationModalOpen(false);
    }, []);

    const handleUninstallConfirmationModalClose = useCallback(() => {
        setIsUninstallConfirmationModalOpen(false);
    }, []);

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

            {isInstallationTypeModalOpen && currentPluginForModal && (
                <ModalInstallationType
                    onClose={handleInstallationTypeModalClose}
                    freeDetailsUrl={currentPluginForModal.freeDetailsUrl}
                    proDetailsUrl={currentPluginForModal.proDetailsUrl}
                    changelogUrl={currentPluginForModal.changelogUrl}
                />
            )}

            {isLicenseInputModalOpen && currentPluginForModal && (
                <ModalLicenseInput
                    onClose={handleLicenseModalClose}
                    onActivate={handleLicenseActivate}
                    error={currentPluginState.error}
                    buttonInProgress={currentPluginState.inProgress}
                />
            )}

            {isUninstallConfirmationModalOpen && currentPluginForModal && (
                <ModalConfirmation
                    onClose={handleUninstallConfirmationModalClose}
                    onConfirm={handleUninstallConfirmationConfirm}
                    onCancel={handleUninstallConfirmationCancel}
                    title={__('Uninstall Plugin', 'publishpress-hub')}
                    message={__('Are you sure you want to uninstall this plugin?', 'publishpress-hub')}
                />
            )}

            {isUpgradeModalOpen && currentPluginForModal && (
                <ModalLicenseInput
                    onClose={handleUpgradeModalClose}
                    onActivate={handlePluginUpgrade}
                    error={currentPluginState.error}
                    buttonInProgress={currentPluginState.inProgress}
                />
            )}

            {isResolveConflictModalOpen && currentPluginForModal && (
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


