<?php

declare(strict_types=1);

namespace PublishPress\Hub;

use PublishPress\Hub\Application\Service\Access\HubAccessService;

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
        registerAutoloader();
        setupActivationAccessSetup();
        setupActivationWelcomeRedirect();
    });
}

function registerAutoloader() {
    // Load the autoloader for activation hook (runs before plugins_loaded)
    $vendorPath = realpath(__DIR__ . '/../lib/vendor/') . '/';
    if (file_exists($vendorPath . 'autoload.php')) {
        require_once $vendorPath . 'autoload.php';
    }

    if (!class_exists('PublishPress\Hub\Application\Service\Access\HubAccessService')) {
        $autoloaderPath = __DIR__ . '/Infrastructure/Autoloader/Autoloader.php';
        if (file_exists($autoloaderPath)) {
            require_once $autoloaderPath;
            \PublishPress\Hub\Infrastructure\Autoloader\Autoloader::register(
                __NAMESPACE__ . '\\',
                __DIR__ . '/'
            );
        }
    }
}

function setupActivationAccessSetup() {
    // We only setup capability and role if not disabled by the user, to avoid overriding user's customizations.
    if (
        ! defined('PUBLISHPRESS_HUB_DISABLE_ACCESS_SETUP')
        || ! constant('PUBLISHPRESS_HUB_DISABLE_ACCESS_SETUP')
    ) {
        // Setup Hub access capability and viewer role
        HubAccessService::setupCapabilityAndRole();
    }
}

function setupActivationWelcomeRedirect() {
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
}
