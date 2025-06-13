<?php

/**
 * Autoload file for the PublishPress Hub library.
 *
 * @package PublishPress\Hub
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

namespace PublishPress\Hub;

use PublishPress\Hub\Infrastructure\Autoloader\Autoloader;
use PublishPress\Hub\Infrastructure\Container\ServiceContainer;
use PublishPress\Hub\Infrastructure\Container\Services;
use PublishPress\Hub\Infrastructure\Hooks as InfrastructureHooks;

/*
 * Check if the PHP and WP versions are compatible.
 */
$minPHPVersion = '7.4';
$minWPVersion  = '6.7';

global $wp_version;

// If the PHP or WP version is not compatible, terminate the plugin execution.
$invalidPHPVersion = version_compare(phpversion(), $minPHPVersion, '<');
$invalidWPVersion = empty($wp_version) || version_compare($wp_version, $minWPVersion, '<');

if ($invalidPHPVersion || $invalidWPVersion) {
    return;
}

if (defined('PUBLISHPRESS_HUB_PATH')) {
    return;
}

define('PUBLISHPRESS_HUB_PATH', __DIR__ . '/');
define('PUBLISHPRESS_HUB_URL', plugin_dir_url(__FILE__));
define('PUBLISHPRESS_HUB_VERSION', '1.0.0');
define('PUBLISHPRESS_HUB_VENDOR_PATH', __DIR__ . '/../lib/vendor/');
define('PUBLISHPRESS_HUB_SRC_PATH', __DIR__ . '/');
define('PUBLISHPRESS_HUB_LANGUAGES_PATH', __DIR__ . '/languages');

require_once PUBLISHPRESS_HUB_VENDOR_PATH . 'autoload.php';

if (! class_exists(__NAMESPACE__ . '\\Infrastructure\\Autoloader\\Autoloader')) {
    require_once PUBLISHPRESS_HUB_SRC_PATH . 'Infrastructure/Autoloader/Autoloader.php';
}

Autoloader::register(__NAMESPACE__, PUBLISHPRESS_HUB_SRC_PATH);

add_action(InfrastructureHooks::ACTION_PLUGINS_LOADED, function () {
    $serviceDefinitions = require_once PUBLISHPRESS_HUB_SRC_PATH . 'Infrastructure/Container/definitions.php';

    $container = ServiceContainer::getInstance($serviceDefinitions);
    $hubService = $container->get(Services::HUB_SERVICE);

    $hubService->initialize();
});
