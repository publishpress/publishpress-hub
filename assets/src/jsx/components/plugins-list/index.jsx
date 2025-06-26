import { memo, useCallback, useState, useMemo } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

import { store } from '../../stores/plugins-dashboard';
import { ModalInstallationType } from './modal-installation-type';
import { ModalLicenseInput } from './modal-license-input';
import { PluginItem } from './plugin-item';

const PluginsListComponent = ({
    plugins,
    pluginIconBaseUrl,
}) => {
    const [currentPluginForModal, setCurrentPluginForModal] = useState(null);

    const {
        pluginInstallationInProgress,
        pluginError,
        isLicenseInputModalOpen,
        isInstallationTypeModalOpen,
    } = useSelect((select) => {
        const storeSelect = select(store);
        return {
            pluginInstallationInProgress: storeSelect.getPluginInstallationInProgress(),
            pluginError: storeSelect.getPluginError(),
            isLicenseInputModalOpen: storeSelect.getIsLicenseInputModalOpen(),
            isInstallationTypeModalOpen: storeSelect.getIsInstallationTypeModalOpen(),
        };
    }, []);

    const {
        installFreePlugin,
        installProPlugin,
        setLicenseInputModalOpen,
        setInstallationTypeModalOpen,
        fetchPlugins,
    } = useDispatch(store);

    // Memoized handlers
    const handleInstall = useCallback((plugin) => {
        setInstallationTypeModalOpen(true);
        setCurrentPluginForModal(plugin);
    }, [setInstallationTypeModalOpen]);

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
            installFreePlugin(currentPluginForModal.slugFree).then(fetchPlugins);
        } else if (type === 'pro') {
            setLicenseInputModalOpen(true);
        }
    }, [currentPluginForModal, installFreePlugin, fetchPlugins, setInstallationTypeModalOpen, setLicenseInputModalOpen]);

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

            fetchPlugins().then(() => {
                setLicenseInputModalOpen(false);
                setCurrentPluginForModal(null);
            });
        });
    }, [currentPluginForModal, installProPlugin, fetchPlugins, setLicenseInputModalOpen]);

    const currentPluginState = useMemo(() => {
        if (!currentPluginForModal) return { error: null, inProgress: false };

        return {
            error: pluginError[currentPluginForModal.slugFree] || null,
            inProgress: pluginInstallationInProgress[currentPluginForModal.slugFree] || false,
        };
    }, [currentPluginForModal, pluginError, pluginInstallationInProgress]);

    return (
        <div className="pp-hub-plugins-list">
            {plugins.map((plugin) => {
                const isInstalling = pluginInstallationInProgress[plugin.slugFree] || false;

                return (
                    <PluginItem
                        key={`plugin-${plugin.slugFree}`}
                        plugin={plugin}
                        pluginIconBaseUrl={pluginIconBaseUrl}
                        isInstalling={isInstalling}
                        inProgress={isInstalling}
                        onInstall={handleInstall}
                        onUpgradeToPro={handleUpgradeToPro}
                        onManageLicense={handleManageLicense}
                        onActivateLicense={handleActivateLicense}
                    />
                );
            })}

            {isInstallationTypeModalOpen && currentPluginForModal && (
                <ModalInstallationType onClose={handleInstallationTypeModalClose} />
            )}

            {isLicenseInputModalOpen && currentPluginForModal && (
                <ModalLicenseInput
                    onClose={handleLicenseModalClose}
                    onActivate={handleLicenseActivate}
                    error={currentPluginState.error}
                    buttonInProgress={currentPluginState.inProgress}
                />
            )}
        </div>
    );
};

export const PluginsList = memo(PluginsListComponent);


