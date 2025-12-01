<?php

/**
 * Plugin Name: PublishPress Hub
 * Description: Centralized management hub for all PublishPress plugins - install, update, and manage licenses from one dashboard.
 * Version: 1.0.0-beta.3
 * Author: PublishPress
 * Author URI: https://publishpress.com
 * License: GPL2
 * Text Domain: publishpress-hub
 * Domain Path: /languages
 * Requires at least: 6.7
 * Requires PHP: 7.4
 */

require_once __DIR__ . '/src/include.php';

if (! defined('PUBLISHPRESS_HUB_ACTIVATION_REDIRECT_TRANSIENT')) {
    define('PUBLISHPRESS_HUB_ACTIVATION_REDIRECT_TRANSIENT', 'publishpress_hub_activation_redirect');
}

/**
 * Handle plugin activation - set transient for welcome page redirect.
 *
 * This must be in the main plugin file because register_activation_hook
 * needs to be called during plugin load, before any hooks fire.
 */
register_activation_hook(__FILE__, function () {
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
