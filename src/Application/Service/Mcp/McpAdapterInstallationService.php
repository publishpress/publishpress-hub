<?php

/**
 * Install the optional MCP dependency using Hub's plugin adapters.
 *
 * @package PublishPress\Hub\Application\Service\Mcp
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Mcp;

defined('ABSPATH') || exit;

use PublishPress\Hub\Application\Service\Access\HubAccessService;
use PublishPress\Hub\Infrastructure\WP\Plugin\WPPluginLifecycleAdapter;
use PublishPress\Hub\Infrastructure\WPOrg\Api\WPOrgPluginApiAdapter;

class McpAdapterInstallationService
{
    public const PLUGIN_SLUG = 'mcp-adapter';

    public const PLUGIN_FILE = 'mcp-adapter/mcp-adapter.php';

    private WPPluginLifecycleAdapter $pluginLifecycle;

    private WPOrgPluginApiAdapter $freePluginApi;

    /**
     * Constructor.
     *
     * @param WPPluginLifecycleAdapter $pluginLifecycle
     * @param WPOrgPluginApiAdapter $freePluginApi
     * @since 1.2.0
     */
    public function __construct(
        WPPluginLifecycleAdapter $pluginLifecycle,
        WPOrgPluginApiAdapter $freePluginApi
    ) {
        $this->pluginLifecycle = $pluginLifecycle;
        $this->freePluginApi = $freePluginApi;
    }

    /**
     * Install and activate the adapter when the current host permits it.
     *
     * @return bool Whether installation and activation succeeded.
     * @throws \RuntimeException When a plugin adapter cannot complete the operation.
     * @since 1.2.0
     */
    public function install(): bool
    {
        if (
            !HubAccessService::canManageMcp()
            || !current_user_can('activate_plugins')
            || !function_exists('wp_get_abilities')
        ) {
            return false;
        }

        require_once ABSPATH . 'wp-admin/includes/plugin.php';
        require_once ABSPATH . 'wp-admin/includes/file.php';

        if (!file_exists(WP_PLUGIN_DIR . '/' . self::PLUGIN_FILE)) {
            if (
                !current_user_can('install_plugins')
                || !wp_is_file_mod_allowed('plugins')
                || 'direct' !== get_filesystem_method()
            ) {
                return false;
            }

            $pluginInfo = $this->freePluginApi->getLastVersionInfo(self::PLUGIN_SLUG);

            if (!$this->pluginLifecycle->installPlugin(self::PLUGIN_SLUG, $pluginInfo['download_link'])) {
                return false;
            }
        }

        return $this->pluginLifecycle->activatePlugin(self::PLUGIN_FILE);
    }
}
