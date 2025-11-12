/**
 * Use action buttons.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { useMemo } from '@wordpress/element';

import { __ } from '@publishpress-hub/i18n';

export const useActionButtons = (
    pluginFamily,
    status,
    loadingStates,
    handlers,
    onOpenPluginInfo
) => {
    const {
        isActive,
        isInstalled,
        hasConflictingInstallations
    } = status;

    const {
        isDeactivating,
        isActivating,
        isUninstalling
    } = loadingStates;

    const {
        onDeactivate,
        onActivate,
        onUninstall
    } = handlers;

    return useMemo(() => {
        const buttons = [];

        if (isInstalled && !hasConflictingInstallations) {
            if (isActive) {
                buttons.push({
                    key: 'deactivate',
                    variant: 'link',
                    text: __('Deactivate', 'publishpress-hub'),
                    isLoading: isDeactivating,
                    onClick: () => onDeactivate(pluginFamily),
                });
            } else {
                buttons.push({
                    key: 'activate',
                    variant: 'link',
                    text: __('Activate', 'publishpress-hub'),
                    isLoading: isActivating,
                    onClick: () => onActivate(pluginFamily),
                });
            }

            buttons.push({
                key: 'uninstall',
                variant: 'link',
                text: __('Uninstall', 'publishpress-hub'),
                isLoading: isUninstalling,
                className: 'is-danger',
                onClick: () => onUninstall(pluginFamily),
            });
        }

        if (!isInstalled) {
            buttons.push({
                key: 'free-details',
                variant: 'link',
                href: pluginFamily.freePlugin.detailsUrl,
                text: __('Free Details', 'publishpress-hub'),
            });

            buttons.push({
                key: 'pro-details',
                variant: 'link',
                href: pluginFamily.proPlugin.detailsUrl,
                text: __('Pro Details', 'publishpress-hub'),
            });
        }

        buttons.push({
            key: 'changelogs',
            variant: 'link',
            href: pluginFamily.changelogUrl,
            text: __('Changelogs', 'publishpress-hub'),
        });

        if (isInstalled && !hasConflictingInstallations && onOpenPluginInfo) {
            buttons.push({
                key: 'more-info',
                variant: 'link',
                text: __('More Info', 'publishpress-hub'),
                onClick: () => onOpenPluginInfo(pluginFamily),
            });
        }

        return buttons;
    }, [
        isInstalled,
        isActive,
        hasConflictingInstallations,
        isDeactivating,
        isActivating,
        isUninstalling,
        pluginFamily,
        onDeactivate,
        onActivate,
        onUninstall,
        onOpenPluginInfo,
    ]);
};
