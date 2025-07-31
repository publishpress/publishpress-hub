import { memo } from '@wordpress/element';

import { __ } from '@publishpress-hub/i18n';

import { Button } from '../../buttons/button';
import { IconWarning } from '../../icons';

const ACTION_BUTTON_CONFIGS = {
    install: {
        variant: 'secondary',
        text: __('Install', 'publishpress-hub'),
        loadingText: __('Installing...', 'publishpress-hub'),
        icon: 'download',
    },
    upgradeToPro: {
        variant: 'highlight',
        text: __('Upgrade to Pro', 'publishpress-hub'),
        loadingText: __('Upgrading to Pro...', 'publishpress-hub'),
        icon: 'unlock',
    },
    manageLicense: {
        variant: 'secondary',
        text: __('Manage License', 'publishpress-hub'),
        loadingText: __('Managing License...', 'publishpress-hub'),
        icon: 'admin-generic',
    },
    activateLicense: {
        variant: 'secondary',
        text: __('Activate License', 'publishpress-hub'),
        loadingText: __('Activating License...', 'publishpress-hub'),
        icon: 'yes',
    },
    conflict: {
        variant: 'primary',
        text: __('Resolve Conflict', 'publishpress-hub'),
        loadingText: __('Resolving Conflict...', 'publishpress-hub'),
        icon: 'warning',
    },
};

const ActionButtonComponent = ({
    pluginFamily,
    inProgress,
    onInstall,
    onUpgradeToPro,
    onManageLicense,
    onActivateLicense,
    onResolveConflict,
}) => {
    const getButtonProps = () => {
        if (pluginFamily.hasConflictingInstallations) {
            return {
                ...ACTION_BUTTON_CONFIGS.conflict,
                onClick: () => onResolveConflict(pluginFamily),
            };
        }

        if (!pluginFamily.hasAnyVersionInstalled) {
            return {
                ...ACTION_BUTTON_CONFIGS.install,
                onClick: () => onInstall(pluginFamily),
            };
        }

        if (!pluginFamily.proPlugin.isInstalled) {
            return {
                ...ACTION_BUTTON_CONFIGS.upgradeToPro,
                onClick: () => onUpgradeToPro(pluginFamily),
            };
        }

        if (pluginFamily.proPlugin.isInstalled && !pluginFamily.proPlugin.isLicensed) {
            return {
                ...ACTION_BUTTON_CONFIGS.activateLicense,
                onClick: () => onActivateLicense(pluginFamily),
            };
        }

        return {
            ...ACTION_BUTTON_CONFIGS.manageLicense,
            onClick: () => onManageLicense(pluginFamily),
        };
    };

    const buttonProps = getButtonProps();

    if (inProgress) {
        buttonProps.isLoading = true;
        buttonProps.text = buttonProps.loadingText;
    }

    return (
        <Button {...buttonProps} />
    );
}

ActionButtonComponent.displayName = 'ActionButton';

export const ActionButton = memo(ActionButtonComponent);
