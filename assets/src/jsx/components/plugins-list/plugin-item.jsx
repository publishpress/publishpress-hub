import { memo, useMemo, Fragment, useState } from '@wordpress/element';

import classNames from 'classnames';

import { __ } from '@publishpress/hub-i18n';

import { Tooltip } from '../tooltip';
import { StatusFlag } from './status-flag';
import { ActionButton } from './action-button';
import Button from '../buttons/button';

const PluginItemComponent = ({
    pluginFamily,
    pluginIconBaseUrl,
    isInstalling,
    isUninstalling,
    isDeactivating,
    isActivating,
    isUpgrading,
    isResolvingConflict,
    onInstall,
    onActivate,
    onDeactivate,
    onUpgradeToPro,
    onManageLicense,
    onActivateLicense,
    onUninstall,
    onResolveConflict,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const {
        statusFlagClass,
        tooltipText,
        iconSrc,
        displayName,
        inProgress,
        actionButtons,
    } = useMemo(() => {
        const isActive = pluginFamily.hasAnyVersionActive;
        const isInstalled = pluginFamily.hasAnyVersionInstalled;
        const isLicensed = pluginFamily.isLicensed;
        const isPro = pluginFamily.proPlugin.isInstalled;
        const hasConflictingInstallations = pluginFamily.hasConflictingInstallations;

        const inProgress = isInstalling ||
            isUninstalling ||
            isDeactivating ||
            isActivating ||
            isUpgrading ||
            isResolvingConflict;

        const statusFlagClass = classNames({
            'active': isActive,
            'inactive': !isActive,
            'pro': isPro,
            'free': !isPro,
            'licensed': isLicensed,
            'unlicensed': !isLicensed,
            'installed': isInstalled,
            'not-installed': !isInstalled,
        });

        const tooltipText = (() => {
            if (!isInstalled) {
                return __('This plugin is not installed.', 'publishpress-hub');
            }
            return isActive ?
                __('This plugin is active.', 'publishpress-hub') : __('This plugin is not active.', 'publishpress-hub');
        })();

        const iconSrc = `${pluginIconBaseUrl}images/plugin-icons/${pluginFamily.iconPath}-96x96.png`;

        const displayName = isPro ? pluginFamily.proPlugin.name : pluginFamily.freePlugin.name;

        const actionButtons = (() => {
            let buttons = [];

            if (isInstalled && !pluginFamily.hasConflictingInstallations) {
                if (isActive) {
                    buttons.push(
                        <Button
                            variant='link'
                            text={__('Deactivate', 'publishpress-hub')}
                            isLoading={isDeactivating}
                            onClick={() => {
                                onDeactivate(pluginFamily);
                            }}
                        />
                    );
                }

                if (!isActive) {
                    buttons.push(
                        <Button
                            variant='link'
                            text={__('Activate', 'publishpress-hub')}
                            isLoading={isActivating}
                            onClick={() => {
                                onActivate(pluginFamily);
                            }}
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
                            onUninstall(pluginFamily);
                        }}
                    />
                );
            }

            if (!isInstalled && !pluginFamily.hasConflictingInstallations) {
                buttons.push(
                    <Button
                        variant='link'
                        href={pluginFamily.freePlugin.detailsUrl}
                        text={__('Free Details', 'publishpress-hub')}
                    />
                );

                buttons.push(
                    <Button
                        variant='link'
                        href={pluginFamily.proPlugin.detailsUrl}
                        text={__('Pro Details', 'publishpress-hub')}
                    />
                );

            }

            buttons.push(
                <Button
                    variant='link'
                    href={pluginFamily.changelogUrl}
                    text={__('Changelogs', 'publishpress-hub')}
                />
            );

            return buttons;
        })();

        return {
            statusFlagClass,
            tooltipText,
            iconSrc,
            displayName,
            inProgress,
            actionButtons,
        };
    }, [
        pluginFamily,
        pluginIconBaseUrl,
        isInstalling,
        isUninstalling,
        isDeactivating,
        isActivating,
        isUpgrading,
        onDeactivate,
        onActivate,
        onUninstall,
    ]);

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
                <img src={iconSrc} alt={pluginFamily.name} />
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
                    {pluginFamily.description}
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
                <StatusFlag pluginFamily={pluginFamily} isInstalling={isInstalling} isUninstalling={isUninstalling} isUpgrading={isUpgrading} isDeactivating={isDeactivating} isActivating={isActivating} />
                <ActionButton
                    plugin={pluginFamily}
                    inProgress={inProgress}
                    onInstall={onInstall}
                    onResolveConflict={onResolveConflict}
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

