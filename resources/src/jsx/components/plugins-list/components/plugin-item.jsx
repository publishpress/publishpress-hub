/**
 * Plugin item.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import {
    memo,
    useMemo,
    Fragment,
    useState,
    useCallback
} from '@wordpress/element';
import {
    ToggleControl,
    __experimentalVStack as VStack
} from '@wordpress/components';

import { __, sprintf } from '@publishpress-hub/i18n';

import { Tooltip } from '../../tooltip';
import { StatusFlag } from './status-flag';
import { ActionButton } from './action-button';
import { Button } from '../../buttons/button';
import {
    usePluginStatus,
    useActionButtons,
    usePluginDisplayInfo,
    useScreenSize
} from '../hooks';

const PluginItemComponent = ({
    pluginFamily,
    pluginIconBaseUrl,
    progressStates,
    onInstall,
    onActivate,
    onDeactivate,
    onUpgradeToPro,
    onManageLicense,
    onActivateLicense,
    onUninstall,
    onResolveConflict,
    onDeactivateLicense,
    onUpdate,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const { isSmallMobile, isMobile } = useScreenSize();

    // Extract individual progress states for backwards compatibility
    const {
        isInstalling,
        isUninstalling,
        isDeactivating,
        isActivating,
        isUpgrading,
        isUpdating,
        isResolvingConflict,
        isActivatingLicense,
        isDeactivatingLicense,
    } = progressStates;

    const status = usePluginStatus(pluginFamily);
    const { iconSrc, displayName } = usePluginDisplayInfo(pluginFamily, pluginIconBaseUrl, status);

    const loadingStates = useMemo(() => ({
        isDeactivating,
        isActivating,
        isUninstalling,
        isUpdating,
        isUpgrading,
        isResolvingConflict,
        isActivatingLicense,
        isDeactivatingLicense,
    }), [isDeactivating, isActivating, isUninstalling, isUpdating, isActivatingLicense, isDeactivatingLicense]);

    const handlers = useMemo(() => ({
        onDeactivate,
        onActivate,
        onUninstall,
        onDeactivateLicense,
    }), [onDeactivate, onActivate, onUninstall, onDeactivateLicense]);

    const actionButtonsData = useActionButtons(pluginFamily, status, loadingStates, handlers, onUpdate, isUpdating);

    const inProgress = useMemo(() =>
        isInstalling || isUpgrading || isResolvingConflict,
        [isInstalling, isUpgrading, isResolvingConflict]
    );

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    const { statusFlagClass, tooltipText } = status;

    // Responsive class names
    const responsiveClasses = useMemo(() => {
        const classes = ['pp-hub-plugins-list-item', statusFlagClass];

        if (isHovered) {
            classes.push('hovered');
        }

        if (isSmallMobile) {
            classes.push('is-small-mobile');
        } else if (isMobile) {
            classes.push('is-mobile');
        }

        return classes.join(' ');
    }, [statusFlagClass, isHovered, isSmallMobile, isMobile]);

    // Show toggle control based on screen size
    const shouldShowToggle = useMemo(() => {
        // Hide toggle on small mobile screens
        if (isSmallMobile) {
            return false;
        }

        // Show toggle on larger screens
        return status.isInstalled && !status.hasConflictingInstallations;
    }, [status.isInstalled, isSmallMobile]);

    // Get current installed version for update badge
    const getUpdateBadgeInfo = useMemo(() => {
        if (!pluginFamily.hasUpdate || !pluginFamily.hasAnyVersionInstalled) {
            return null;
        }

        const installedPlugin = pluginFamily.freePlugin.isInstalled
            ? pluginFamily.freePlugin
            : pluginFamily.proPlugin;
        const currentVersion = installedPlugin.version || __('Unknown', 'publishpress-hub');
        const availableVersion = pluginFamily.availableVersion || __('New version available', 'publishpress-hub');

        return { currentVersion, availableVersion };
    }, [pluginFamily]);

    const installedVersionLabel = useMemo(() => {
        if (!status.isInstalled || status.hasConflictingInstallations) {
            return null;
        }

        const installedPlugin = pluginFamily.freePlugin.isInstalled
            ? pluginFamily.freePlugin
            : (pluginFamily.proPlugin.isInstalled ? pluginFamily.proPlugin : null);

        if (!installedPlugin || !installedPlugin.version) {
            return null;
        }

        // translators: %s is the installed version number
        return sprintf(__('Installed version: %s', 'publishpress-hub'), installedPlugin.version);
    }, [pluginFamily, status.isInstalled, status.hasConflictingInstallations]);

    return (
        <div
            className={responsiveClasses}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='pp-hub-plugins-list-item-content'>
                <div className='pp-hub-plugins-list-item-icon'>
                    <img src={iconSrc} alt={pluginFamily.name} />
                </div>
                <div className='pp-hub-plugins-list-item-info'>
                    <div className='pp-hub-plugins-list-item-name'>
                        {shouldShowToggle && (
                            <ToggleControl
                                disabled={status.hasConflictingInstallations}
                                checked={pluginFamily.hasAnyVersionActive}
                                onChange={(newValue) => {
                                    if (newValue) {
                                        onActivate(pluginFamily);
                                    } else {
                                        onDeactivate(pluginFamily);
                                    }
                                }}
                            />
                        )}
                        <Tooltip
                            text={tooltipText}
                            placement='top'
                            useCustom={true}
                        >
                            <span>{displayName}</span>
                        </Tooltip>
                        <StatusFlag
                            pluginFamily={pluginFamily}
                            isInstalling={isInstalling}
                            isUninstalling={isUninstalling}
                            isUpgrading={isUpgrading}
                            isDeactivating={isDeactivating}
                            isActivating={isActivating}
                            hasUpdate={pluginFamily.hasUpdate && pluginFamily.hasAnyVersionInstalled}
                            updateBadgeTooltip={getUpdateBadgeInfo ? sprintf(__('Update available: %s → %s', 'publishpress-hub'), getUpdateBadgeInfo.currentVersion, getUpdateBadgeInfo.availableVersion) : null}
                        />
                    </div>
                    <div className='pp-hub-plugins-list-item-description'>
                        {pluginFamily.description}
                    </div>
                    <div className='pp-hub-plugins-list-item-inline-actions'>
                        {actionButtonsData.map((buttonProps, index) => {
                            if (buttonProps.key === 'activate' && !isSmallMobile) {
                                return null;
                            }

                            if (buttonProps.key === 'deactivate' && !isSmallMobile) {
                                return null;
                            }

                            return (
                                <Fragment key={buttonProps.key}>
                                    {buttonProps.variant === 'label' && (
                                        <>
                                            <span>&bull;</span>
                                            <span className={buttonProps.className}>{buttonProps.text}</span>
                                        </>
                                    )}
                                    {buttonProps.variant !== 'label' && (
                                        <Button {...buttonProps} />
                                    )}
                                </Fragment>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className='pp-hub-plugins-list-item-actions'>
                <VStack>
                    <ActionButton
                        pluginFamily={pluginFamily}
                        inProgress={inProgress}
                        onInstall={onInstall}
                        onResolveConflict={onResolveConflict}
                        onUpgradeToPro={onUpgradeToPro}
                        onManageLicense={onManageLicense}
                        onActivateLicense={onActivateLicense}
                        onUpdate={onUpdate}
                    />
                </VStack>
            </div>
        </div>
    );
}

PluginItemComponent.displayName = 'PluginItem';

export const PluginItem = memo(PluginItemComponent);
