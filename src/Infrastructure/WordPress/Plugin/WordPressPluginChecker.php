<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Plugin;

use PublishPress\Hub\Domain\Plugin\Contract\PluginInterface;

/**
 * Infrastructure service for checking plugin status in WordPress.
 *
 * @since 1.0.0
 */
class WordPressPluginChecker
{
    /**
     * Check if a plugin is actually installed in WordPress.
     */
    public function checkIfPluginIsInstalled(PluginInterface $plugin): bool
    {
        $pluginPath = $plugin->getPath();
        $fullPath = WP_PLUGIN_DIR . '/' . $pluginPath;

        return file_exists($fullPath);
    }

    /**
     * Check if a plugin is actually active in WordPress.
     */
    public function checkIfPluginIsActive(PluginInterface $plugin): bool
    {
        if (!$this->checkIfPluginIsInstalled($plugin)) {
            return false;
        }

        $activePlugins = get_option('active_plugins', []);
        $pluginPath = $plugin->getPath();

        return in_array($pluginPath, $activePlugins, true);
    }

    /**
     * Get the actual version of an installed plugin.
     */
    public function getPluginVersion(PluginInterface $plugin): ?string
    {
        if (!$this->checkIfPluginIsInstalled($plugin)) {
            return null;
        }

        $pluginPath = $plugin->getPath();
        $pluginData = get_plugin_data(WP_PLUGIN_DIR . '/' . $pluginPath);

        return $pluginData['Version'] ?? null;
    }

    /**
     * Get the actual file path of an installed plugin.
     */
    public function getPluginFilePath(PluginInterface $plugin): ?string
    {
        $pluginPath = $plugin->getPath();
        $fullPath = WP_PLUGIN_DIR . '/' . $pluginPath;

        return file_exists($fullPath) ? $fullPath : null;
    }
}
