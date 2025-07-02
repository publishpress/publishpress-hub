import { memo, useMemo, Fragment, useState } from '@wordpress/element';

import classNames from 'classnames';

import { __ } from '@publishpress/hub-i18n';

import { Tooltip } from '../tooltip';
import { StatusFlag } from './status-flag';
import { ActionButton } from './action-button';
import Button from '../buttons/button';

const PluginItemComponent = ({
    plugin,
    pluginIconBaseUrl,
    isInstalling,
    isUninstalling,
    inProgress,
    onInstall,
    onUpgradeToPro,
    onManageLicense,
    onActivateLicense,
    onUninstall,
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

    const [isHovered, setIsHovered] = useState(false);

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

    const actionButtons = useMemo(() => {
        let buttons = [];

        if (plugin.isInstalled) {
            if (plugin.isActive) {
                buttons.push(
                    <Button
                        variant='link'
                        text={__('Deactivate', 'publishpress-hub')}
                    />
                );
            }

            if (!plugin.isActive) {
                buttons.push(
                    <Button
                        variant='link'
                        text={__('Activate', 'publishpress-hub')}
                    />
                );
            }

            buttons.push(
                <Button
                    variant='link'
                    text={__('Uninstall', 'publishpress-hub')}
                    isLoading={isUninstalling}
                    className='is-danger'
                    onClick={() => {
                        onUninstall(plugin);
                    }}
                />
            );
        }

        if (!plugin.isInstalled) {
            buttons.push(
                <Button variant='link' href={plugin.freeDetailsUrl} text={__('Free Details', 'publishpress-hub')} />
            );

            buttons.push(
                <Button variant='link' href={plugin.proDetailsUrl} text={__('Pro Details', 'publishpress-hub')} />
            );

        }

        buttons.push(
            <Button variant='link' href={plugin.changelogUrl} text={__('Changelogs', 'publishpress-hub')} />
        );

        return buttons;
    }, [plugin, isUninstalling]);

    return (
        <div
            className={`pp-hub-plugins-list-item ${statusFlagClass} ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => {
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
            }}
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
                <div className='pp-hub-plugins-list-item-inline-actions'>
                    <>
                        {actionButtons.map((button, index) => (
                            <Fragment key={index}>
                                {button}
                                {index < actionButtons.length - 1 && (
                                    <span>|</span>
                                )}
                            </Fragment>
                        ))}
                    </>
                </div>

            </div>
            <div className='pp-hub-plugins-list-item-actions'>
                <StatusFlag plugin={plugin} isInstalling={isInstalling} isUninstalling={isUninstalling} />
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

