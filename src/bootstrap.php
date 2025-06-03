<?php
/**
 * Bootstrap file for the PublishPress Hub library.
 *
 * @package PublishPress\Hub
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

namespace PublishPress\Hub;

defined('ABSPATH') or die('Direct access not allowed.');

/*
 * Check if the PHP and WP versions are compatible.
 */
global $wp_version;

$minPHPVersion = '7.4';
$minWPVersion  = '6.7';

// If the PHP or WP version is not compatible, terminate the plugin execution.
$invalidPHPVersion = version_compare(phpversion(), $minPHPVersion, '<');
$invalidWPVersion = version_compare($wp_version, $minWPVersion, '<');

if ($invalidPHPVersion || $invalidWPVersion) {
    return;
}

/*
 * Load the library.
 */
require_once __DIR__ . '/Hub.php';

$publishpressHub = new \PublishPress\Hub\Hub();
$publishpressHub->init();

return $publishpressHub;
