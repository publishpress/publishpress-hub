import { memo, useMemo, Fragment, useState, useCallback } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

import { __ } from '@publishpress-hub/i18n';

import { Tooltip } from '../../tooltip';
import { StatusFlag } from './status-flag';
import { ActionButton } from './action-button';
import { Button } from '../../buttons/button';
import { usePluginStatus, useActionButtons, usePluginDisplayInfo } from '../hooks';

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

    return (
        <div
            className={`pp-hub-plugins-list-item ${statusFlagClass} ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
                        {status.isInstalled && (
                            <ToggleControl
                                disabled={!pluginFamily.hasAnyVersionInstalled}
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
                    </div>
                </Tooltip>
                <div className='pp-hub-plugins-list-item-description'>
                    {pluginFamily.description}
                </div>
                <div className='pp-hub-plugins-list-item-inline-actions'>
                    {actionButtonsData.map((buttonProps, index) => (
                        <Fragment key={buttonProps.key}>
                            <Button {...buttonProps} />
                            {index < actionButtonsData.length - 1 && (
                                <span>|</span>
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
            <div className='pp-hub-plugins-list-item-actions'>
                <StatusFlag
                    pluginFamily={pluginFamily}
                    isInstalling={isInstalling}
                    isUninstalling={isUninstalling}
                    isUpgrading={isUpgrading}
                    isDeactivating={isDeactivating}
                    isActivating={isActivating}
                />
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

