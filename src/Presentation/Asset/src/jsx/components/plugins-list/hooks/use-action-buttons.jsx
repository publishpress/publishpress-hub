import { useMemo } from '@wordpress/element';

import { __ } from '@publishpress-hub/i18n';

export const useActionButtons = (
    pluginFamily,
    status,
    loadingStates,
    handlers
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
            buttons.push({
                key: 'uninstall',
                variant: 'link',
                text: __('Uninstall', 'publishpress-hub'),
                isLoading: isUninstalling,
                className: 'is-danger',
                onClick: () => onUninstall(pluginFamily),
            });
        }

        if (!isInstalled && !hasConflictingInstallations) {
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
    ]);
};
