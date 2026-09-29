<?php

declare(strict_types=1);

namespace PublishPress\Hub;
defined( 'ABSPATH' ) || exit;

use PublishPress\Hub\Application\Service\Access\HubAccessService;
use PublishPress\Hub\Application\Service\RewriteRulesService;
use PublishPress\Hub\Application\Service\VersionService;
use PublishPress\Hub\Infrastructure\WP\Options\WPOptionsAdapter;

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
function registerActivationHook($pluginFile)
{
    register_activation_hook($pluginFile, function () {
        registerAutoloader();
        setupActivationAccessSetup();
        setupActivationWelcomeRedirect();
        setupActivationRewriteRulesFlush();
    });
}

function registerAutoloader()
{
    // Load the autoloader for activation hook (runs before plugins_loaded)
    // autoload.php handles both constant definition AND autoloader registration
    if (!defined('PUBLISHPRESS_HUB_PATH')) {
        // Load vendor autoloader first for third-party dependencies
        $vendorPath = realpath(__DIR__ . '/../lib/vendor/') . '/';
        if (file_exists($vendorPath . 'autoload.php')) {
            require_once $vendorPath . 'autoload.php';
        }

        // Load our autoload.php which defines constants and registers our autoloader
        require_once __DIR__ . '/autoload.php';
    }
}

function setupActivationAccessSetup()
{
    // Initialize version service (manually since we're outside DI context)
    $optionsAdapter = new WPOptionsAdapter();
    $currentVersion = defined('PUBLISHPRESS_HUB_VERSION') ? PUBLISHPRESS_HUB_VERSION : '1.0.0';
    $versionService = new VersionService($optionsAdapter, $currentVersion);

    // Determine installation state
    if ($versionService->isFreshInstall()) {
        // Fresh installation: Setup capabilities and store version
        HubAccessService::setupCapabilityAndRole();
        $versionService->storeCurrentVersion();
    } elseif ($versionService->isReactivation()) {
        // Reactivation: Skip capability setup to preserve user customizations
        // Version already stored, no action needed
        return;
    } elseif ($versionService->isUpdate()) {
        // Update: Run migrations if needed (future implementation)
        if (
            version_compare($currentVersion, '1.0.6', '>=')
            && version_compare($versionService->getStoredVersionForMigration(), '1.0.6', '<')
        ) {
            HubAccessService::addViewerRoleCapability();
        }

        $versionService->storeCurrentVersion();
    }
}

function setupActivationWelcomeRedirect()
{
    // Check if redirect is disabled via constant
    if (
        defined('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE_REDIRECT')
        && constant('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE_REDIRECT')
    ) {
        return;
    }

    // Check if welcome page is disabled
    if (
        defined('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE')
        && constant('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE')
    ) {
        return;
    }

    // Set transient to trigger redirect on next admin page load
    set_transient(PUBLISHPRESS_HUB_ACTIVATION_REDIRECT_TRANSIENT, true, 30);
}

/**
 * Set flag to flush rewrite rules after REST routes are registered.
 *
 * WordPress best practice is to NOT flush rewrite rules directly during activation,
 * but to set a flag and flush after routes are registered. The RewriteRulesService
 * hooks into AbstractHooks::ACTION_REST_ROUTES_REGISTERED to flush only when
 * the flag is set, ensuring routes are available before flushing.
 */
function setupActivationRewriteRulesFlush()
{
    RewriteRulesService::setFlushOption();
}
