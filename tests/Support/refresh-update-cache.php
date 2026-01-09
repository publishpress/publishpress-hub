<?php

/**
 * Plugin Name: Refresh Update Cache (Test Helper)
 * Plugin URI: https://publishpress.com
 * Description: Clears WordPress update transients and EDD cache when ?refresh_update_cache=1 is set. For testing purposes only.
 * Version: 1.0.0
 * Author: PublishPress
 * Author URI: https://publishpress.com
 * License: GPL v2 or later
 * Text Domain: refresh-update-cache
 *
 * @package Tests\Support
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Refresh WordPress update cache and transients when GET parameter is set.
 *
 * Usage: Add ?refresh_update_cache=1 to any admin URL
 *
 * This will clear:
 * - WordPress core update transients
 * - Plugin update transients
 * - Theme update transients
 * - EDD updater cache options
 *
 * @since 1.0.0
 */
add_action('admin_init', function () {
    // Check if refresh parameter is set
    if (!isset($_GET['refresh_update_cache']) || $_GET['refresh_update_cache'] !== '1') {
        return;
    }

    // Verify user has permission
    if (!current_user_can('update_plugins')) {
        wp_die(
            __('You do not have permission to refresh update cache.', 'refresh-update-cache'),
            __('Permission Denied', 'refresh-update-cache'),
            ['response' => 403]
        );
    }

    $cleared = [];

    // Clear WordPress core update transients
    delete_site_transient('update_core');
    $cleared[] = 'update_core';

    // Clear plugin update transients
    delete_site_transient('update_plugins');
    $cleared[] = 'update_plugins';

    // Clear theme update transients
    delete_site_transient('update_themes');
    $cleared[] = 'update_themes';

    // Clear timeout transients
    delete_site_transient('update_plugins_timeout');
    delete_site_transient('update_themes_timeout');
    delete_site_transient('update_core_timeout');

    // Clear EDD updater cache options (these use wp_options, not transients)
    global $wpdb;
    $edd_cache_keys = $wpdb->get_col(
        "SELECT option_name FROM {$wpdb->options}
        WHERE option_name LIKE 'edd_sl_%'
        OR option_name LIKE 'edd_api_request_%'"
    );

    foreach ($edd_cache_keys as $key) {
        delete_option($key);
        $cleared[] = $key;
    }

    // Clear any cached plugin/theme data
    wp_clean_plugins_cache();
    wp_clean_themes_cache();

    // Force WordPress to check for updates
    wp_update_plugins();
    wp_update_themes();

    // Show success message
    $message = sprintf(
        '<div class="notice notice-success is-dismissible"><p><strong>%s</strong><br>%s</p><ul style="list-style: disc; margin-left: 20px;">%s</ul></div>',
        __('Update Cache Refreshed Successfully!', 'refresh-update-cache'),
        __('The following caches were cleared:', 'refresh-update-cache'),
        '<li>' . implode('</li><li>', array_slice($cleared, 0, 10)) . '</li>' .
        (count($cleared) > 10 ? '<li>... and ' . (count($cleared) - 10) . ' more</li>' : '')
    );

    add_action('admin_notices', function () use ($message) {
        echo $message;
    });

    // Optional: Redirect to remove the query parameter
    if (isset($_GET['redirect_after_clear'])) {
        $redirect_url = remove_query_arg(['refresh_update_cache', 'redirect_after_clear']);
        wp_safe_redirect($redirect_url);
        exit;
    }
}, 1);

/**
 * Add a convenient link to the admin bar for quick access.
 *
 * @since 1.0.0
 */
add_action('admin_bar_menu', function ($wp_admin_bar) {
    if (!current_user_can('update_plugins')) {
        return;
    }

    $wp_admin_bar->add_node([
        'id'    => 'refresh-update-cache',
        'title' => '<span class="ab-icon dashicons dashicons-update"></span> ' . __('Refresh Updates', 'refresh-update-cache'),
        'href'  => add_query_arg('refresh_update_cache', '1'),
        'meta'  => [
            'title' => __('Clear all WordPress and plugin update caches', 'refresh-update-cache'),
        ],
    ]);
}, 999);

/**
 * Add custom styles for the admin bar icon.
 *
 * @since 1.0.0
 */
add_action('admin_head', function () {
    ?>
    <style>
        #wpadminbar #wp-admin-bar-refresh-update-cache .ab-icon:before {
            content: "\f463";
            top: 2px;
        }
        #wpadminbar #wp-admin-bar-refresh-update-cache:hover .ab-icon:before {
            color: #00a32a;
        }
    </style>
    <?php
});

/**
 * Add information to the plugins page.
 *
 * @since 1.0.0
 */
add_filter('plugin_row_meta', function ($links, $file) {
    if (strpos($file, 'refresh-update-cache.php') !== false) {
        $refresh_link = sprintf(
            '<a href="%s" style="color: #00a32a; font-weight: bold;">%s</a>',
            add_query_arg('refresh_update_cache', '1', admin_url('plugins.php')),
            __('Refresh Update Cache Now', 'refresh-update-cache')
        );
        $links[] = $refresh_link;
    }
    return $links;
}, 10, 2);
