<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Plugin;

use PublishPress\Hub\Domain\Plugin\Contract\PluginInterface;
use PublishPress\Hub\Infrastructure\WordPress\Filesystem\WordPressFileSystemAdapter;
use WP_Filesystem_Base;

/**
 * Infrastructure service for checking plugin status in WordPress.
 *
 * @since 1.0.0
 */
class WordPressPluginStatusAdapter
{
    private WordPressFileSystemAdapter $fileSystemAdapter;

    public function __construct(WordPressFileSystemAdapter $fileSystemAdapter)
    {
        $this->fileSystemAdapter = $fileSystemAdapter;
    }

    public function checkIfPluginIsInstalled(PluginInterface $plugin): bool
    {
        $pluginPath = $plugin->getPath();
        $fullPath = WP_PLUGIN_DIR . '/' . $pluginPath;

        return $this->fileSystemAdapter->exists($fullPath);
    }

    public function checkIfPluginIsActive(PluginInterface $plugin): bool
    {
        if (!$this->checkIfPluginIsInstalled($plugin)) {
            return false;
        }

        return is_plugin_active($plugin->getPath());
    }

    public function getPluginVersion(PluginInterface $plugin): ?string
    {
        if (!$this->checkIfPluginIsInstalled($plugin)) {
            return null;
        }

        $pluginPath = $plugin->getPath();
        $pluginData = get_plugin_data(WP_PLUGIN_DIR . '/' . $pluginPath);

        return $pluginData['Version'] ?? null;
    }

    public function getPluginFilePath(PluginInterface $plugin): ?string
    {
        $pluginPath = $plugin->getPath();
        $fullPath = WP_PLUGIN_DIR . '/' . $pluginPath;

        return $this->fileSystemAdapter->exists($fullPath) ? $fullPath : null;
    }
}
