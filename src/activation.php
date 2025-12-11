<?php

declare(strict_types=1);

namespace PublishPress\Hub;

if (! defined('PUBLISHPRESS_HUB_ACTIVATION_REDIRECT_TRANSIENT')) {
    define('PUBLISHPRESS_HUB_ACTIVATION_REDIRECT_TRANSIENT', 'publishpress_hub_activation_redirect');
}

/**
 * Handle plugin activation - set transient for welcome page redirect.
 *
 * This must be called from the main plugin file because register_activation_hook
 * needs to be called during plugin load, before any hooks fire.
 *
 * @param string $pluginFile The main plugin file path.
 */
function registerActivationHook($pluginFile) {
    register_activation_hook($pluginFile, function () {
        // Check if redirect is disabled via constant
        if (defined('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE_REDIRECT')
            && constant('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE_REDIRECT')) {
            return;
        }

        // Check if welcome page is disabled
        if (defined('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE')
            && constant('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE')) {
            return;
        }

        // Set transient to trigger redirect on next admin page load
        set_transient(PUBLISHPRESS_HUB_ACTIVATION_REDIRECT_TRANSIENT, true, 30);
    });
}
