import { memo, useMemo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';

import { Badge } from '../badge/badge';

const STATUS_BADGE_CONFIGS = {
    installing: {
        text: __('Installing', 'publishpress-hub'),
        className: 'installing',
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
    },
    upgrading: {
        text: __('Upgrading', 'publishpress-hub'),
        className: 'upgrading',
    },
    deactivating: {
        text: __('Deactivating', 'publishpress-hub'),
        className: 'deactivating',
    },
    activating: {
        text: __('Activating', 'publishpress-hub'),
        className: 'activating',
    },
};

const StatusFlagComponent = ({
    plugin,
    isInstalling,
    isUninstalling,
    isUpgrading,
    isDeactivating,
    isActivating,
}) => {
    const props = useMemo(() => {
        if (!plugin.isInstalled && isInstalling) {
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

        if (!plugin.isInstalled) {
            return STATUS_BADGE_CONFIGS.notInstalled;
        }

        if (!plugin.isPro) {
            return STATUS_BADGE_CONFIGS.free;
        }

        if (plugin.isLicensed) {
            return STATUS_BADGE_CONFIGS.licensed;
        }

        return STATUS_BADGE_CONFIGS.unlicensed;
    }, [plugin, isInstalling, isUninstalling]);

    if (!props) {
        return null;
    }

    return <Badge {...props}>{props.text}</Badge>;
}

StatusFlagComponent.displayName = 'StatusFlag';

export const StatusFlag = memo(StatusFlagComponent);
