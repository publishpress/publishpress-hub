<?php

/**
 * WordPress plugin status adapter.
 *
 * @package PublishPress\Hub\Infrastructure\WP\Plugin
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WP\Plugin;
defined( 'ABSPATH' ) || exit;

use PublishPress\Hub\Domain\Plugin\Contract\PluginInterface;
use PublishPress\Hub\Infrastructure\WP\Filesystem\WPFileSystemAdapter;
use WP_Filesystem_Base;

/**
 * Infrastructure service for checking plugin status in WordPress.
 *
 * @since 1.0.0
 */
class WPPluginStatusAdapter
{
    private WPFileSystemAdapter $fileSystemAdapter;

    /**
     * @param WPFileSystemAdapter $fileSystemAdapter The file system adapter.
     * @since 1.0.0
     */
    public function __construct(WPFileSystemAdapter $fileSystemAdapter)
    {
        $this->fileSystemAdapter = $fileSystemAdapter;
    }

    /**
     * Check if a plugin is installed.
     *
     * @param PluginInterface $plugin The plugin.
     * @return bool True if the plugin is installed, false otherwise.
     * @since 1.0.0
     */
    public function checkIfPluginIsInstalled(PluginInterface $plugin): bool
    {
        $pluginPath = $plugin->getPath();
        $fullPath = WP_PLUGIN_DIR . '/' . $pluginPath;

        try {
            return $this->fileSystemAdapter->exists($fullPath);
        } catch (\InvalidArgumentException $e) {
            // If path validation fails (e.g. parent directory doesn't exist),
            // the plugin is not installed
            return false;
        }
    }

    /**
     * Check if a plugin is active.
     *
     * @param PluginInterface $plugin The plugin.
     * @return bool True if the plugin is active, false otherwise.
     * @since 1.0.0
     */
    public function checkIfPluginIsActive(PluginInterface $plugin): bool
    {
        if (!$this->checkIfPluginIsInstalled($plugin)) {
            return false;
        }

        return is_plugin_active($plugin->getPath());
    }

    /**
     * Get the plugin version.
     *
     * @param PluginInterface $plugin The plugin.
     * @return string|null The plugin version.
     * @since 1.0.0
     */
    public function getPluginVersion(PluginInterface $plugin): ?string
    {
        if (!$this->checkIfPluginIsInstalled($plugin)) {
            return null;
        }

        $pluginPath = $plugin->getPath();
        $pluginData = get_plugin_data(WP_PLUGIN_DIR . '/' . $pluginPath);

        return $pluginData['Version'];
    }

    /**
     * Get the plugin file path.
     *
     * @param PluginInterface $plugin The plugin.
     * @return string|null The plugin file path.
     * @since 1.0.0
     */
    public function getPluginFilePath(PluginInterface $plugin): ?string
    {
        $pluginPath = $plugin->getPath();
        $fullPath = WP_PLUGIN_DIR . '/' . $pluginPath;

        try {
            return $this->fileSystemAdapter->exists($fullPath) ? $fullPath : null;
        } catch (\InvalidArgumentException $e) {
            // If path validation fails, the plugin file doesn't exist
            return null;
        }
    }
}
