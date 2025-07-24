import { memo, useMemo, Fragment, useState, useCallback, useEffect } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

import { __ } from '@publishpress-hub/i18n';

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
        isResolvingConflict,
    } = progressStates;

    const status = usePluginStatus(pluginFamily);
    const { iconSrc, displayName } = usePluginDisplayInfo(pluginFamily, pluginIconBaseUrl, status);

    const loadingStates = useMemo(() => ({
        isDeactivating,
        isActivating,
        isUninstalling,
    }), [isDeactivating, isActivating, isUninstalling]);

    const handlers = useMemo(() => ({
        onDeactivate,
        onActivate,
        onUninstall,
    }), [onDeactivate, onActivate, onUninstall]);

    const actionButtonsData = useActionButtons(pluginFamily, status, loadingStates, handlers);

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
        return status.isInstalled;
    }, [status.isInstalled, isSmallMobile]);

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
                    <Tooltip
                        text={tooltipText}
                        placement='top'
                        useCustom={true}
                    >
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
                            <span>{displayName}</span>
                            <StatusFlag
                                pluginFamily={pluginFamily}
                                isInstalling={isInstalling}
                                isUninstalling={isUninstalling}
                                isUpgrading={isUpgrading}
                                isDeactivating={isDeactivating}
                                isActivating={isActivating}
                            />
                        </div>
                    </Tooltip>
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
                                    <Button {...buttonProps} />
                                    {index < actionButtonsData.length - 1 && (
                                        <span>|</span>
                                    )}
                                </Fragment>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className='pp-hub-plugins-list-item-actions'>
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

