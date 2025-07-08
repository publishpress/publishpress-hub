import { useMemo } from '@wordpress/element';
import classNames from 'classnames';

import { __ } from '@publishpress/hub-i18n';

export const usePluginStatus = (pluginFamily) => {
    return useMemo(() => {
        const isActive = pluginFamily.hasAnyVersionActive;
        const isInstalled = pluginFamily.hasAnyVersionInstalled;
        const isLicensed = pluginFamily.isLicensed;
        const isPro = pluginFamily.proPlugin.isInstalled;
        const hasConflictingInstallations = pluginFamily.hasConflictingInstallations;

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
                __('This plugin is active.', 'publishpress-hub') :
                __('This plugin is not active.', 'publishpress-hub');
        })();

        return {
            isActive,
            isInstalled,
            isLicensed,
            isPro,
            hasConflictingInstallations,
            statusFlagClass,
            tooltipText,
        };
    }, [pluginFamily]);
};
