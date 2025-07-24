<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Plugin;

use InvalidArgumentException;
use PublishPress\Hub\Infrastructure\WordPress\Filesystem\WordPressFileSystemAdapter;
use RuntimeException;

class WordPressPluginLifecycleAdapter
{
    private WordPressFileSystemAdapter $fileSystemAdapter;

    public function __construct(WordPressFileSystemAdapter $fileSystemAdapter)
    {
        $this->fileSystemAdapter = $fileSystemAdapter;
    }

    public function installPlugin(string $slug, string $downloadUrl): bool
    {
        $tmpFile = download_url($downloadUrl);

        if (!function_exists('download_url')) {
            require_once ABSPATH . 'wp-admin/includes/file.php';
        }

        if (is_wp_error($tmpFile)) {
            throw new RuntimeException('Failed to download plugin: ' . $tmpFile->get_error_message());
        }

        // Delete the plugin folder if exists
        if ($this->fileSystemAdapter->exists(WP_PLUGIN_DIR . '/' . $slug)) {
            $this->fileSystemAdapter->delete(WP_PLUGIN_DIR . '/' . $slug, true);
        }

        $unzipfile = $this->fileSystemAdapter->unzip($tmpFile, WP_PLUGIN_DIR);
        $this->fileSystemAdapter->delete($tmpFile);

        if (!$unzipfile) {
            throw new RuntimeException('Failed to unzip plugin file');
        }

        return true;
    }

    public function activatePlugin(string $pluginPath): bool
    {
        $result = activate_plugin($pluginPath);

        if (is_wp_error($result)) {
            throw new RuntimeException('Failed to activate plugin: ' . $result->get_error_message());
        }

        return true;
    }

    public function deactivatePlugin(string $pluginPath): bool
    {
        deactivate_plugins($pluginPath);
        return true;
    }

    public function deletePlugin(string $pluginPath): bool
    {
        if (!function_exists('delete_plugins')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }

        $result = delete_plugins([$pluginPath]);

        if (is_wp_error($result)) {
            throw new RuntimeException('Failed to delete plugin: ' . $result->get_error_message());
        }

        return true;
    }
}
