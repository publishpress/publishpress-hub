import { memo } from '@wordpress/element';

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
};

const StatusFlagComponent = ({ plugin, isInstalling }) => {
    if (!plugin.isInstalled && isInstalling) {
        return <Badge {...STATUS_BADGE_CONFIGS.installing} />;
    }

    if (!plugin.isInstalled) {
        return <Badge {...STATUS_BADGE_CONFIGS.notInstalled} />;
    }

    if (!plugin.isPro) {
        return <Badge {...STATUS_BADGE_CONFIGS.free} />;
    }

    if (plugin.isLicensed) {
        return <Badge {...STATUS_BADGE_CONFIGS.licensed} />;
    }

    return <Badge {...STATUS_BADGE_CONFIGS.unlicensed} />;
}

StatusFlagComponent.displayName = 'StatusFlag';

export const StatusFlag = memo(StatusFlagComponent);
