<?php

/**
 * Plugin Name: PublishPress Hub
 * Description: Centralized management hub for all PublishPress plugins - install, update, and manage licenses from one dashboard.
 * Version: 1.2.0
 * Author: PublishPress
 * Author URI: https://publishpress.com
 * License: GPL2
 * Text Domain: publishpress-hub
 * Domain Path: /languages
 * Requires at least: 6.7
 * Requires PHP: 8.2
 */

defined('ABSPATH') || exit;

/*
 * Check if the PHP and WP versions are compatible.
 */
$minPHPVersion = '8.2';
$minWPVersion  = '6.7';

global $wp_version;

/*
 * If the PHP or WP version is not compatible, terminate the plugin execution.
 */
if (version_compare(PHP_VERSION, $minPHPVersion, '<')) {
    return;
}

if (empty($wp_version) || version_compare($wp_version, $minWPVersion, '<')) {
    return;
}

if (! defined('ComposerAutoloaderInitPublishPressHub')) {
    require_once __DIR__ . '/lib/vendor/autoload.php';
}

require_once __DIR__ . '/src/include.php';
require_once __DIR__ . '/src/activation.php';

\PublishPress\Hub\registerActivationHook(__FILE__);
