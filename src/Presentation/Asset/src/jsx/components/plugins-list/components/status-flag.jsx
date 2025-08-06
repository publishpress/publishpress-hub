import { memo, useMemo } from '@wordpress/element';

import { __ } from '@publishpress-hub/i18n';

import { Badge } from '../../badge/badge';

const STATUS_BADGE_CONFIGS = {
    installing: {
        text: __('Installing', 'publishpress-hub'),
        className: 'installing',
        icon: <span className="dashicons dashicons-update" />,
    },
    notInstalled: {
        text: __('Not Installed', 'publishpress-hub'),
        className: 'not-installed',
    },
    free: {
        text: __('Free', 'publishpress-hub'),
        className: 'free',
    },
    licensed: {
        text: __('Licensed', 'publishpress-hub'),
        className: 'licensed',
    },
    unlicensed: {
        text: __('Unlicensed', 'publishpress-hub'),
        className: 'unlicensed',
    },
    uninstalling: {
        text: __('Uninstalling', 'publishpress-hub'),
        className: 'uninstalling',
        icon: <span className="dashicons dashicons-update" />,
    },
    upgrading: {
        text: __('Upgrading', 'publishpress-hub'),
        className: 'upgrading',
        icon: <span className="dashicons dashicons-update" />,
    },
    deactivating: {
        text: __('Deactivating', 'publishpress-hub'),
        className: 'deactivating',
        icon: <span className="dashicons dashicons-update" />,
    },
    activating: {
        text: __('Activating', 'publishpress-hub'),
        className: 'activating',
        icon: <span className="dashicons dashicons-update" />,
    },
    hasConflictingInstallations: {
        text: __('Conflicting Installations', 'publishpress-hub'),
        className: 'conflicting-installations',
    },
};

const StatusFlagComponent = ({
    pluginFamily,
    isInstalling,
    isUninstalling,
    isUpgrading,
    isDeactivating,
    isActivating,
}) => {
    // Extract the countInstalledPlugins calculation to avoid nesting useMemo hooks
    const countInstalledPlugins = useMemo(() => {
        let count = 0;
        if (pluginFamily.freePlugin.isInstalled) {
            count += 1;
        }
        if (pluginFamily.proPlugin.isInstalled) {
            count += 1;
        }

        return count;
    }, [pluginFamily]);

    const props = useMemo(() => {
        if (pluginFamily.hasConflictingInstallations) {
            return STATUS_BADGE_CONFIGS.hasConflictingInstallations;
        }

        if (isInstalling) {
            return STATUS_BADGE_CONFIGS.installing;
        }

        if (isUninstalling) {
            return STATUS_BADGE_CONFIGS.uninstalling;
        }

        if (isUpgrading) {
            return STATUS_BADGE_CONFIGS.upgrading;
        }

        if (isDeactivating) {
            return STATUS_BADGE_CONFIGS.deactivating;
        }

        if (isActivating) {
            return STATUS_BADGE_CONFIGS.activating;
        }

        if (countInstalledPlugins === 0) {
            return STATUS_BADGE_CONFIGS.notInstalled;
        }

        if (pluginFamily.proPlugin.isInstalled) {
            return pluginFamily.proPlugin.isLicensed ? STATUS_BADGE_CONFIGS.licensed : STATUS_BADGE_CONFIGS.unlicensed;
        }

        return STATUS_BADGE_CONFIGS.free;
    }, [pluginFamily, isInstalling, isUninstalling, isUpgrading, isDeactivating, isActivating, countInstalledPlugins]);

    if (!props) {
        return null;
    }

    return <Badge {...props}>{props.text}</Badge>;
}

StatusFlagComponent.displayName = 'StatusFlag';

export const StatusFlag = memo(StatusFlagComponent);
