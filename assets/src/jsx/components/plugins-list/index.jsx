import { memo, useCallback, useState } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

import { __ } from '@publishpress/hub-i18n';
import classNames from 'classnames';

import { Tooltip } from '../tooltip';
import { Button } from '../buttons/button';
import { Badge } from '../badge/badge';
import { store } from '../../stores/plugins-dashboard';
import { ModalInstallationType } from './modal-installation-type';
import { ModalLicenseInput } from './modal-license-input';

const PluginsListComponent = ({
    plugins,
    pluginIconBaseUrl,
}) => {
    const [currentPluginForModal, setCurrentPluginForModal] = useState(null);

    const getStatusFlagClass = (plugin) => classNames({
        'active': plugin.isActive,
        'inactive': !plugin.isActive,
        'pro': plugin.isPro,
        'free': !plugin.isPro,
        'licensed': plugin.isLicensed,
        'unlicensed': !plugin.isLicensed,
        'installed': plugin.isInstalled,
        'not-installed': !plugin.isInstalled,
    });

    const {
        pluginInstallationInProgress,
        pluginError,
        isLicenseInputModalOpen,
        isInstallationTypeModalOpen,
    } = useSelect((select) => {
        return {
            pluginInstallationInProgress: select(store).getPluginInstallationInProgress(),
            pluginError: select(store).getPluginError(),
            isLicenseInputModalOpen: select(store).getIsLicenseInputModalOpen(),
            isInstallationTypeModalOpen: select(store).getIsInstallationTypeModalOpen(),
        }
    }, []);

    const {
        installFreePlugin,
        installProPlugin,
        setLicenseInputModalOpen,
        setInstallationTypeModalOpen,
    } = useDispatch(store);

    const getStatusFlagTooltipText = useCallback((plugin) => {
        if (!plugin.isInstalled) {
            return __('This plugin is not installed.', 'publishpress-hub');
        }

        if (plugin.isActive) {
            return __('This plugin is active.', 'publishpress-hub');
        }

        if (!plugin.isActive) {
            return __('This plugin is not active.', 'publishpress-hub');
        }
    }, []);

    const onClickInstall = useCallback((plugin) => {
        setInstallationTypeModalOpen(true);
        setCurrentPluginForModal(plugin);
    }, []);

    const onClickManageLicense = useCallback((plugin) => {
        setCurrentPluginForModal(plugin);
    }, []);

    const onClickActivateLicense = useCallback((plugin) => {
        setCurrentPluginForModal(plugin);
    }, []);

    const onClickUpgradeToPro = useCallback((plugin) => {
        setCurrentPluginForModal(plugin);
    }, []);

    const getActionButton = useCallback(({variant, onClick, text, inProgress}) => {
        return (
            <Button
                variant={variant}
                onClick={onClick}
                isLoading={inProgress}
            >
                {text}
            </Button>
        );
    }, []);

    const ActionButton = useCallback(({ plugin }) => {
        const inProgress = pluginInstallationInProgress[plugin.slugFree] || false;

        if (!plugin.isInstalled) {
            return getActionButton({
                variant: 'secondary',
                onClick: () => onClickInstall(plugin),
                text: __('Install', 'publishpress-hub'),
                inProgress,
            });
        }

        if (!plugin.isPro) {
            return getActionButton({
                variant: 'highlight',
                onClick: () => onClickUpgradeToPro(plugin),
                text: __('Upgrade to Pro', 'publishpress-hub'),
                inProgress,
            });
        }

        if (plugin.isLicensed) {
            return getActionButton({
                variant: 'secondary',
                onClick: () => onClickManageLicense(plugin),
                text: __('Manage License', 'publishpress-hub'),
                inProgress,
            });
        }

        if (!plugin.isLicensed) {
            return getActionButton({
                variant: 'secondary',
                onClick: () => onClickActivateLicense(plugin),
                text: __('Activate License', 'publishpress-hub'),
                inProgress,
            });
        }

        return null;
    }, []);

    const StatusFlag = useCallback(({ plugin }) => {
        if (!plugin.isInstalled && pluginInstallationInProgress[plugin.slugFree]) {
            return (
                <Badge text={__('Installing', 'publishpress-hub')} className='installing' />
            )
        }

        if (!plugin.isInstalled) {
            return (
                <Badge text={__('Not Installed', 'publishpress-hub')} className='not-installed' />
            )
        }

        if (!plugin.isPro) {
            return (
                <Badge text={__('Free', 'publishpress-hub')} className='free' />
            );
        }

        if (plugin.isLicensed) {
            return (
                <Badge text={__('Licensed', 'publishpress-hub')} className='licensed' />
            );
        }

        if (!plugin.isLicensed) {
            return (
                <Badge text={__('Unlicensed', 'publishpress-hub')} className='unlicensed' />
            );
        }

        return null;
    }, []);

    return (
        <div className="pp-hub-plugins-list">
            {plugins.map((plugin) => {
                return (
                    <div
                        key={`plugin-${plugin.slugFree}`}
                        className={`pp-hub-plugins-list-item ${getStatusFlagClass(plugin)}`}
                    >
                        <div className='pp-hub-plugins-list-item-icon'>
                            <img src={`${pluginIconBaseUrl}images/plugin-icons/${plugin.iconFile}-96x96.png`} alt={plugin.name} />
                        </div>
                        <div className='pp-hub-plugins-list-item-info'>
                            <Tooltip
                                text={getStatusFlagTooltipText(plugin)}
                                placement='top'
                                useCustom={true}
                            >
                                <div className='pp-hub-plugins-list-item-name'>
                                    {plugin.name}{plugin.isPro && ' Pro'}
                                </div>
                            </Tooltip>
                            <div className='pp-hub-plugins-list-item-description'>{plugin.description}</div>
                        </div>
                        <div className='pp-hub-plugins-list-item-actions'>
                            <StatusFlag plugin={plugin} />
                            <ActionButton plugin={plugin} />
                        </div>
                    </div>
                );
            })}
            {isInstallationTypeModalOpen && currentPluginForModal && (
                <ModalInstallationType
                    onClose={(type) => {
                        setInstallationTypeModalOpen(false);
                        if (type === 'free') {
                            installFreePlugin(currentPluginForModal.slugFree);
                            setCurrentPluginForModal(null);
                        }

                        if (type === 'pro') {
                            setLicenseInputModalOpen(true);
                        }
                    }}
                />
            )}

            {isLicenseInputModalOpen && currentPluginForModal && (
                <ModalLicenseInput
                    onClose={() => {
                        setLicenseInputModalOpen(false);
                        setCurrentPluginForModal(null);
                    }}
                    onActivate={(licenseKey) => {
                        installProPlugin(
                            currentPluginForModal.slugFree,
                            licenseKey,
                        );
                    }}
                    error={pluginError[currentPluginForModal.slugFree] || null}
                    buttonInProgress={pluginInstallationInProgress[currentPluginForModal.slugFree] || false}
                />
            )}
        </div>
    );
};

export const PluginsList = memo(PluginsListComponent);


