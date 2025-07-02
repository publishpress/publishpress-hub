import { memo, useCallback, useState, useMemo } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

import { __ } from '@publishpress/hub-i18n';

import { store } from '../../stores/plugins-dashboard';
import { ModalInstallationType } from './modal-installation-type';
import { ModalLicenseInput } from './modal-license-input';
import { PluginItem } from './plugin-item';
import { ModalConfirmation } from './modal-confirmation';

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
        pluginError,
        isLicenseInputModalOpen,
        isInstallationTypeModalOpen,
    } = useSelect((select) => {
        const storeSelect = select(store);
        return {
            pluginInstallationInProgress: storeSelect.getPluginInstallationInProgress(),
            pluginUninstallationInProgress: storeSelect.getPluginUninstallationInProgress(),
            pluginDeactivationInProgress: storeSelect.getPluginDeactivationInProgress(),
            pluginActivationInProgress: storeSelect.getPluginActivationInProgress(),
            pluginError: storeSelect.getPluginError(),
            isLicenseInputModalOpen: storeSelect.getIsLicenseInputModalOpen(),
            isInstallationTypeModalOpen: storeSelect.getIsInstallationTypeModalOpen(),
        };
    }, []);

    const [isUninstallConfirmationModalOpen, setIsUninstallConfirmationModalOpen] = useState(false);

    const {
        installFreePlugin,
        installProPlugin,
        setLicenseInputModalOpen,
        setInstallationTypeModalOpen,
        uninstallPlugin,
        activatePlugin,
        deactivatePlugin,
    } = useDispatch(store);

    // Memoized handlers
    const handleInstall = useCallback((plugin) => {
        setInstallationTypeModalOpen(true);
        setCurrentPluginForModal(plugin);
    }, [setInstallationTypeModalOpen]);

    const handleActivate = useCallback((plugin) => {
        activatePlugin(plugin.slugFree);
    }, [activatePlugin]);

    const handleDeactivate = useCallback((plugin) => {
        deactivatePlugin(plugin.slugFree);
    }, [deactivatePlugin]);

    const handleManageLicense = useCallback((plugin) => {
        setCurrentPluginForModal(plugin);
    }, []);

    const handleActivateLicense = useCallback((plugin) => {
        setCurrentPluginForModal(plugin);
    }, []);

    const handleUpgradeToPro = useCallback((plugin) => {
        setCurrentPluginForModal(plugin);
    }, []);

    const handleInstallationTypeModalClose = useCallback((type) => {
        setInstallationTypeModalOpen(false);

        if (type === 'free' && currentPluginForModal) {
            installFreePlugin(currentPluginForModal.slugFree);
        } else if (type === 'pro') {
            setLicenseInputModalOpen(true);
        }
    }, [currentPluginForModal, installFreePlugin, setInstallationTypeModalOpen, setLicenseInputModalOpen]);

    const handleLicenseModalClose = useCallback(() => {
        setLicenseInputModalOpen(false);
        setCurrentPluginForModal(null);
    }, [setLicenseInputModalOpen]);

    const handleLicenseActivate = useCallback((licenseKey) => {
        if (!currentPluginForModal) return;

        installProPlugin(
            currentPluginForModal.slugFree,
            licenseKey,
        ).then((result) => {
            if (!result.success || result.error) {
                console.error('Installation failed:', result.error);
                return;
            }

            setLicenseInputModalOpen(false);
            setCurrentPluginForModal(null);
        });
    }, [currentPluginForModal, installProPlugin, setLicenseInputModalOpen]);

    const handleUninstall = useCallback((plugin) => {
        setIsUninstallConfirmationModalOpen(true);
        setCurrentPluginForModal(plugin);
    }, [setIsUninstallConfirmationModalOpen, setCurrentPluginForModal]);

    const currentPluginState = useMemo(() => {
        if (!currentPluginForModal) return { error: null, inProgress: false };

        return {
            error: pluginError[currentPluginForModal.slugFree] || null,
            inProgress: pluginInstallationInProgress[currentPluginForModal.slugFree] || false,
        };
    }, [currentPluginForModal, pluginError, pluginInstallationInProgress]);

    const handleUninstallConfirmationConfirm = useCallback(() => {
        setIsUninstallConfirmationModalOpen(false);
        uninstallPlugin(currentPluginForModal.slugFree);
    }, [currentPluginForModal, uninstallPlugin]);

    const handleUninstallConfirmationCancel = useCallback(() => {
        setIsUninstallConfirmationModalOpen(false);
    }, []);

    const handleUninstallConfirmationModalClose = useCallback(() => {
        setIsUninstallConfirmationModalOpen(false);
    }, []);

    return (
        <div className="pp-hub-plugins-list">
            {plugins.map((plugin) => {
                const isInstalling = pluginInstallationInProgress[plugin.slugFree] || false;
                const isUninstalling = pluginUninstallationInProgress[plugin.slugFree] || false;

                return (
                    <PluginItem
                        key={`plugin-${plugin.slugFree}`}
                        plugin={plugin}
                        pluginIconBaseUrl={pluginIconBaseUrl}
                        isInstalling={isInstalling}
                        isUninstalling={isUninstalling}
                        isDeactivating={pluginDeactivationInProgress[plugin.slugFree] || false}
                        isActivating={pluginActivationInProgress[plugin.slugFree] || false}
                        inProgress={isInstalling}
                        onInstall={handleInstall}
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
        </div>
    );
};

export const PluginsList = memo(PluginsListComponent);


