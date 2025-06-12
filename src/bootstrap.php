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

ray(__LINE__);

/*
 * Check if the PHP and WP versions are compatible.
 */
global $wp_version;

$minPHPVersion = '7.4';
$minWPVersion  = '6.7';

if (empty($wp_version)) {
    return;
}

// If the PHP or WP version is not compatible, terminate the plugin execution.
$invalidPHPVersion = version_compare(phpversion(), $minPHPVersion, '<');
$invalidWPVersion = version_compare($wp_version, $minWPVersion, '<');

if ($invalidPHPVersion || $invalidWPVersion) {
    return;
}

require_once __DIR__ . '/include.php';
