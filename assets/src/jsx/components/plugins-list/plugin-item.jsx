import { memo, useMemo } from '@wordpress/element';

import classNames from 'classnames';

import { __ } from '@publishpress/hub-i18n';

import { Tooltip } from '../tooltip';
import { StatusFlag } from './status-flag';
import { ActionButton } from './action-button';

const PluginItemComponent = ({
    plugin,
    pluginIconBaseUrl,
    isInstalling,
    inProgress,
    onInstall,
    onUpgradeToPro,
    onManageLicense,
    onActivateLicense,
}) => {
    const statusFlagClass = useMemo(() => classNames({
        'active': plugin.isActive,
        'inactive': !plugin.isActive,
        'pro': plugin.isPro,
        'free': !plugin.isPro,
        'licensed': plugin.isLicensed,
        'unlicensed': !plugin.isLicensed,
        'installed': plugin.isInstalled,
        'not-installed': !plugin.isInstalled,
    }), [plugin]);

    const tooltipText = useMemo(() => {
        if (!plugin.isInstalled) {
            return __('This plugin is not installed.', 'publishpress-hub');
        }

        return plugin.isActive
            ? __('This plugin is active.', 'publishpress-hub')
            : __('This plugin is not active.', 'publishpress-hub');
    }, [plugin.isInstalled, plugin.isActive]);

    const iconSrc = useMemo(() =>
        `${pluginIconBaseUrl}images/plugin-icons/${plugin.iconFile}-96x96.png`
    , [pluginIconBaseUrl, plugin.iconFile]);

    const displayName = useMemo(() =>
        `${plugin.name}${plugin.isPro ? ' Pro' : ''}`
    , [plugin.name, plugin.isPro]);

    return (
        <div
            className={`pp-hub-plugins-list-item ${statusFlagClass}`}
        >
            <div className='pp-hub-plugins-list-item-icon'>
                <img src={iconSrc} alt={plugin.name} />
            </div>
            <div className='pp-hub-plugins-list-item-info'>
                <Tooltip
                    text={tooltipText}
                    placement='top'
                    useCustom={true}
                >
                    <div className='pp-hub-plugins-list-item-name'>
                        {displayName}
                    </div>
                </Tooltip>
                <div className='pp-hub-plugins-list-item-description'>
                    {plugin.description}
                </div>
            </div>
            <div className='pp-hub-plugins-list-item-actions'>
                <StatusFlag plugin={plugin} isInstalling={isInstalling} />
                <ActionButton
                    plugin={plugin}
                    inProgress={inProgress}
                    onInstall={onInstall}
                    onUpgradeToPro={onUpgradeToPro}
                    onManageLicense={onManageLicense}
                    onActivateLicense={onActivateLicense}
                />
            </div>
        </div>
    );
}

PluginItemComponent.displayName = 'PluginItem';

export const PluginItem = memo(PluginItemComponent);

