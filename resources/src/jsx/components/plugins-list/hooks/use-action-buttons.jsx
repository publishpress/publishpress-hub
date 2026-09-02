/**
 * Use action buttons.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { useMemo } from '@wordpress/element';

import { __, sprintf } from '@publishpress-hub/i18n';

export const useActionButtons = (
    pluginFamily,
    status,
    loadingStates,
    handlers,
    onUpdate,
    isUpdating
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

        // Add renewal link if license is expired (show first in row actions)
        if (
            pluginFamily.proPlugin.isInstalled &&
            pluginFamily.proPlugin.isExpired &&
            pluginFamily.proPlugin.detailsUrl
        ) {
            buttons.push({
                key: 'renew',
                variant: 'link',
                href: pluginFamily.proPlugin.detailsUrl,
                className: 'is-renew-link',
                text: __('Renew', 'publishpress-hub'),
                disabled: isUpdating ? false : undefined,
            });
        }
        // Add renewal link if license is expiring within 30 days
        else if (
            pluginFamily.proPlugin.isInstalled &&
            pluginFamily.proPlugin.isLicensed &&
            !pluginFamily.proPlugin.isExpired &&
            pluginFamily.proPlugin.daysUntilExpiration !== undefined &&
            pluginFamily.proPlugin.daysUntilExpiration >= 0 &&
            pluginFamily.proPlugin.daysUntilExpiration <= 30 &&
            pluginFamily.proPlugin.detailsUrl
        ) {
            buttons.push({
                key: 'renew',
                variant: 'link',
                href: pluginFamily.proPlugin.detailsUrl,
                className: 'is-renew-link',
                text: __('Renew', 'publishpress-hub'),
                disabled: isUpdating ? false : undefined,
            });
        }

        if (isInstalled && !hasConflictingInstallations) {
            if (isActive) {
                buttons.push({
                    key: 'deactivate',
                    variant: 'link',
                    text: __('Deactivate', 'publishpress-hub'),
                    isLoading: isDeactivating,
                    disabled: isUpdating ? false : undefined,
                    onClick: () => onDeactivate(pluginFamily),
                });
            } else {
                buttons.push({
                    key: 'activate',
                    variant: 'link',
                    text: __('Activate', 'publishpress-hub'),
                    isLoading: isActivating,
                    disabled: isUpdating ? false : undefined,
                    onClick: () => onActivate(pluginFamily),
                });
            }

            buttons.push({
                key: 'uninstall',
                variant: 'link',
                text: __('Uninstall', 'publishpress-hub'),
                isLoading: isUninstalling,
                disabled: isUpdating ? false : undefined,
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
                disabled: isUpdating ? false : undefined,
            });

            buttons.push({
                key: 'pro-details',
                variant: 'link',
                href: pluginFamily.proPlugin.detailsUrl,
                text: __('Pro Details', 'publishpress-hub'),
                disabled: isUpdating ? false : undefined,
            });
        }

        buttons.push({
            key: 'changelogs',
            variant: 'link',
            href: pluginFamily.changelogUrl,
            text: __('Changelogs', 'publishpress-hub'),
            disabled: isUpdating ? false : undefined,
        });

        // Add update button if update is available (show first in row actions)
        if (
            isInstalled &&
            !hasConflictingInstallations &&
            pluginFamily.hasUpdate &&
            pluginFamily.hasAnyVersionInstalled &&
            onUpdate
        ) {
            const installedPlugin = pluginFamily.freePlugin.isInstalled
                ? pluginFamily.freePlugin
                : pluginFamily.proPlugin;
            const currentVersion = installedPlugin.version || __('Unknown', 'publishpress-hub');
            const availableVersion = pluginFamily.availableVersion || __('latest', 'publishpress-hub');

            buttons.push({
                key: 'update',
                variant: 'link',
                text: sprintf(__('Update to v%s', 'publishpress-hub'), availableVersion),
                isLoading: isUpdating,
                onClick: () => onUpdate(pluginFamily),
            });
        }

        if (isInstalled) {
            const installedPlugin = pluginFamily.freePlugin.isInstalled
                ? pluginFamily.freePlugin
                : pluginFamily.proPlugin;
            const currentVersion = installedPlugin.version || __('Unknown', 'publishpress-hub');
            const availableVersion = pluginFamily.availableVersion || __('latest', 'publishpress-hub');

            buttons.push({
                key: 'current-version',
                variant: 'label',
                className: 'pp-hub-plugin-current-version',
                text: sprintf(__('v%s', 'publishpress-hub'), currentVersion)
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
        isUpdating,
        pluginFamily,
        onDeactivate,
        onActivate,
        onUninstall,
        onUpdate,
    ]);
};
