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

/*
 * If the PHP or WP version is not compatible, terminate the plugin execution.
 */
$invalidPHPVersion = version_compare(phpversion(), $minPHPVersion, '<');
$invalidWPVersion = empty($wp_version) || version_compare($wp_version, $minWPVersion, '<');

if ($invalidPHPVersion || $invalidWPVersion) {
    return;
}

/*
 * Do not load the plugin twice.
 */
if (defined('PUBLISHPRESS_HUB_PATH')) {
    return;
}

/*
 * Define the plugin constants.
 */
define('PUBLISHPRESS_HUB_PATH', realpath(__DIR__ . '/../') . '/');
define('PUBLISHPRESS_HUB_URL', plugin_dir_url(PUBLISHPRESS_HUB_PATH . 'publishpress-hub.php'));
define('PUBLISHPRESS_HUB_ASSETS_PATH', PUBLISHPRESS_HUB_PATH . 'assets/');
define('PUBLISHPRESS_HUB_ASSETS_URL', PUBLISHPRESS_HUB_URL . 'assets/');
define('PUBLISHPRESS_HUB_VERSION', '1.0.0-alpha.2');
define('PUBLISHPRESS_HUB_VENDOR_PATH', realpath(__DIR__ . '/../lib/vendor/') . '/');
define('PUBLISHPRESS_HUB_SRC_PATH', __DIR__ . '/');
define('PUBLISHPRESS_HUB_LANGUAGES_PATH', PUBLISHPRESS_HUB_PATH . 'languages/');
define('PUBLISHPRESS_HUB_TEMPLATES_PATH', PUBLISHPRESS_HUB_SRC_PATH . 'templates/');


/*
 * Load the dependencies.
 *
 * We do not use composer's autoload because it do not allow loading
 * the same library multiple times, so we can't asure the only the
 * most recent version is loaded.
 */
require_once PUBLISHPRESS_HUB_VENDOR_PATH . 'publishpress/psr-container/lib/include.php';

/*
 * Load the autoloader and register the plugin's namespace.
 */
if (! class_exists(__NAMESPACE__ . '\\Infrastructure\\Autoloader\\Autoloader')) {
    require_once PUBLISHPRESS_HUB_SRC_PATH . 'Infrastructure/Autoloader/Autoloader.php';
}

Autoloader::register(__NAMESPACE__, PUBLISHPRESS_HUB_SRC_PATH);

/*
 * Initialize the plugin.
 */
add_action(InfrastructureHooks::ACTION_PLUGINS_LOADED, function () {
    $serviceDefinitions = require_once PUBLISHPRESS_HUB_SRC_PATH . 'Infrastructure/Container/definitions.php';

    $container = ServiceContainer::getInstance($serviceDefinitions);
    $coreHubService = $container->get(Services::CORE_HUB_SERVICE);

    $coreHubService->initialize();
}, 5);
