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
            throw new RuntimeException(
                sprintf(
                    // translators: %s is the error message
                    esc_html__('Failed to download plugin: %s', 'publishpress-hub'),
                    esc_html($tmpFile->get_error_message())
                )
            );
        }

        // Delete the plugin folder if exists
        if ($this->fileSystemAdapter->exists(WP_PLUGIN_DIR . '/' . $slug)) {
            $this->fileSystemAdapter->delete(WP_PLUGIN_DIR . '/' . $slug, true);
        }

        $unzipfile = $this->fileSystemAdapter->unzip($tmpFile, WP_PLUGIN_DIR);
        $this->fileSystemAdapter->delete($tmpFile);

        if (!$unzipfile) {
            throw new RuntimeException(
                esc_html__('Failed to unzip plugin file', 'publishpress-hub')
            );
        }

        return true;
    }

    public function activatePlugin(string $pluginPath): bool
    {
        $result = activate_plugin($pluginPath);

        if (is_wp_error($result)) {
            throw new RuntimeException(
                sprintf(
                    // translators: %s is the error message
                    esc_html__('Failed to activate plugin: %s', 'publishpress-hub'),
                    esc_html($result->get_error_message())
                )
            );
        }

        return true;
    }

    public function deactivatePlugin(string $pluginPath): bool
    {
        deactivate_plugins($pluginPath);
        return true;
    }

    /**
     * Run the uninstallation process for a plugin executing the uninstall.php file
     * or registered uninstall hook.
     *
     * This function will run the uninstallation process for a plugin.
     * It will not delete the plugin from the filesystem.
     *
     * @param string $pluginPath
     * @return bool True if the uninstall.php file has been found and included, false otherwise.
     * @throws RuntimeException
     * @see https://developer.wordpress.org/reference/functions/uninstall_plugin/
     * @see https://developer.wordpress.org/reference/functions/register_uninstall_hook/
     */
    public function uninstallPlugin(string $pluginPath): bool
    {
        if (!function_exists('uninstall_plugin')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }

        $result = uninstall_plugin($pluginPath);

        return $result === true;
    }

    /**
     * Delete a plugin from the filesystem.
     *
     * This function will delete a plugin from the filesystem.
     * It will not run the uninstallation process.
     *
     * @param string $pluginPath
     * @return bool True if the plugin has been deleted, false otherwise.
     * @throws RuntimeException
     * @see https://developer.wordpress.org/reference/functions/delete_plugins/
     */
    public function deletePlugin(string $pluginPath): bool
    {
        if (!function_exists('delete_plugins')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }

        $result = delete_plugins([$pluginPath]);

        if (is_wp_error($result)) {
            throw new RuntimeException(
                sprintf(
                    // translators: %s is the error message
                    esc_html__('Failed to delete plugin: %s', 'publishpress-hub'),
                    esc_html($result->get_error_message())
                )
            );
        }

        return true;
    }
}
