import { memo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';

import { Button } from '../buttons/button';

const ACTION_BUTTON_CONFIGS = {
    install: {
        variant: 'secondary',
        text: __('Install', 'publishpress-hub'),
        loadingText: __('Installing...', 'publishpress-hub'),
    },
    upgradeToPro: {
        variant: 'highlight',
        text: __('Upgrade to Pro', 'publishpress-hub'),
        loadingText: __('Upgrading to Pro...', 'publishpress-hub'),
    },
    manageLicense: {
        variant: 'secondary',
        text: __('Manage License', 'publishpress-hub'),
        loadingText: __('Managing License...', 'publishpress-hub'),
    },
    activateLicense: {
        variant: 'secondary',
        text: __('Activate License', 'publishpress-hub'),
        loadingText: __('Activating License...', 'publishpress-hub'),
    },
    conflict: {
        variant: 'primary',
        text: __('Resolve Conflict', 'publishpress-hub'),
        loadingText: __('Resolving Conflict...', 'publishpress-hub'),
    },
};

const ActionButtonComponent = ({
    plugin,
    inProgress,
    onInstall,
    onUpgradeToPro,
    onManageLicense,
    onActivateLicense,
    onResolveConflict,
}) => {
    const getButtonProps = () => {
        if (plugin.hasConflictingInstallations) {
            return {
                ...ACTION_BUTTON_CONFIGS.conflict,
                onClick: () => onResolveConflict(plugin),
            };
        }

        if (!plugin.hasAnyVersionInstalled) {
            return {
                ...ACTION_BUTTON_CONFIGS.install,
                onClick: () => onInstall(plugin),
            };
        }

        if (!plugin.proPlugin.isInstalled) {
            return {
                ...ACTION_BUTTON_CONFIGS.upgradeToPro,
                onClick: () => onUpgradeToPro(plugin),
            };
        }

        if (plugin.proPlugin.isInstalled && !plugin.proPlugin.isLicensed) {
            return {
                ...ACTION_BUTTON_CONFIGS.manageLicense,
                onClick: () => onManageLicense(plugin),
            };
        }

        return {
            ...ACTION_BUTTON_CONFIGS.activateLicense,
            onClick: () => onActivateLicense(plugin),
        };
    };

    const buttonProps = getButtonProps();

    return (
        <Button
            variant={buttonProps.variant}
            onClick={buttonProps.onClick}
            isLoading={inProgress}
        >
            {inProgress ? buttonProps.loadingText : buttonProps.text}
        </Button>
    );
}

ActionButtonComponent.displayName = 'ActionButton';

export const ActionButton = memo(ActionButtonComponent);
