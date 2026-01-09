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

declare(strict_types=1);

namespace PublishPress\Hub;

use PublishPress\Hub\Infrastructure\Autoloader\Autoloader;
use PublishPress\Hub\Infrastructure\Container\AbstractDependencies;
use PublishPress\Hub\Infrastructure\Container\DependencyContainer;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;

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
define('PUBLISHPRESS_HUB_VERSION', '1.0.1');
define('PUBLISHPRESS_HUB_SRC_PATH', __DIR__ . '/');
define('PUBLISHPRESS_HUB_PATH', realpath(PUBLISHPRESS_HUB_SRC_PATH . '/../') . '/');
define('PUBLISHPRESS_HUB_PLUGIN_FILE', PUBLISHPRESS_HUB_PATH . 'publishpress-hub.php');
define('PUBLISHPRESS_HUB_URL', plugin_dir_url(PUBLISHPRESS_HUB_PATH . 'publishpress-hub.php'));
define('PUBLISHPRESS_HUB_VENDOR_PATH', realpath(PUBLISHPRESS_HUB_PATH . '/lib/vendor/') . '/');

/*
 * Load the dependencies.
 *
 * We do not use composer's autoload because it do not allow loading
 * the same library multiple times, so we can't asure the only the
 * most recent version is loaded.
 */
require_once PUBLISHPRESS_HUB_VENDOR_PATH . 'publishpress/psr-container/lib/include.php';

/*
 * Load Actions Scheduler library.
 *
 * This must be loaded early so that its functions are available
 * when the plugin services try to use them.
 */
if (file_exists(PUBLISHPRESS_HUB_VENDOR_PATH . 'woocommerce/action-scheduler/action-scheduler.php')) {
    require_once PUBLISHPRESS_HUB_VENDOR_PATH . 'woocommerce/action-scheduler/action-scheduler.php';
}

/*
 * Load the autoloader and register the plugin's namespace.
 */
if (! class_exists(__NAMESPACE__ . '\\Infrastructure\\Autoloader\\Autoloader')) {
    require_once PUBLISHPRESS_HUB_SRC_PATH . 'Infrastructure/Autoloader/Autoloader.php';
}

Autoloader::register(__NAMESPACE__ . '\\', PUBLISHPRESS_HUB_SRC_PATH);

/*
 * Enable HTTP mocking for tests (only when PP_HUB_ENABLE_HTTP_MOCK is set).
 * This intercepts HTTP requests to publishpress.com and returns mock responses.
 */
if (defined('PP_HUB_ENABLE_HTTP_MOCK') && PP_HUB_ENABLE_HTTP_MOCK) {
    $httpMockPath = PUBLISHPRESS_HUB_PATH . 'tests/Support/HttpMock.php';
    if (file_exists($httpMockPath)) {
        require_once $httpMockPath;
        \Tests\Support\HttpMock::enable();
    }
}

/*
 * Load the plugin.
 */
add_action(AbstractHooks::ACTION_PLUGINS_LOADED, function () {
    $serviceDefinitions = require_once PUBLISHPRESS_HUB_SRC_PATH . 'definitions.php';
    $container = new DependencyContainer($serviceDefinitions);

    $pluginBootstrapService = $container->get(AbstractDependencies::HUB_BOOTSTRAP_SERVICE);
    $pluginBootstrapService->load();
}, 5);
