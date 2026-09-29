<?php

/**
 * Plugin Name: PublishPress Hub
 * Description: Centralized management hub for all PublishPress plugins - install, update, and manage licenses from one dashboard.
 * Version: 1.0.7
 * Author: PublishPress
 * Author URI: https://publishpress.com
 * License: GPL2
 * Text Domain: publishpress-hub
 * Domain Path: /languages
 * Requires at least: 6.7
 * Requires PHP: 7.4
 */

defined('ABSPATH') || exit;

use function PublishPress\Hub\registerActivationHook;

/*
 * Check if the PHP and WP versions are compatible.
 */
$minPHPVersion = '7.4';
$minWPVersion  = '6.7';

global $wp_version;

/*
 * If the PHP or WP version is not compatible, terminate the plugin execution.
 */
$invalidPHPVersion = version_compare(phpversion(), $minPHPVersion, '<');
$invalidWPVersion = empty($wp_version) || version_compare($wp_version, $minWPVersion, '<');

if ($invalidPHPVersion || $invalidWPVersion) {
    return;
}

if (! defined('ComposerAutoloaderInitPublishPressHub')) {
    require_once __DIR__ . '/lib/vendor/autoload.php';
}

require_once __DIR__ . '/src/include.php';
require_once __DIR__ . '/src/activation.php';

registerActivationHook(__FILE__);
