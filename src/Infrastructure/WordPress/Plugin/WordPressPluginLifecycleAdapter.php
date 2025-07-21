<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Plugin;

class WordPressPluginLifecycleAdapter
{
    public function installPlugin(string $slug): bool
    {
        if (!function_exists('plugins_api')) {
            require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
        }

        if (!function_exists('download_url')) {
            require_once ABSPATH . 'wp-admin/includes/file.php';
        }

        $allowedPlugins = [
            'publishpress-authors',
            'advanced-gutenberg',
            'capability-manager-enhanced',
            'publishpress-checklists',
            'post-expirator',
            'press-permit-core',
            'revisionary',
            'organize-series',
            'publishpress'
        ];

        if (!in_array($slug, $allowedPlugins, true)) {
            throw new \InvalidArgumentException('Plugin not allowed: ' . $slug);
        }

        $api = plugins_api('plugin_information', [
            'slug' => $slug,
            'fields' => [
                'short_description' => false,
                'sections' => false,
                'requires' => false,
                'rating' => false,
                'ratings' => false,
                'downloaded' => false,
                'last_updated' => false,
                'added' => false,
                'tags' => false,
                'compatibility' => false,
                'homepage' => false,
                'donate_link' => false,
            ],
        ]);

        if (is_wp_error($api)) {
            throw new \RuntimeException('Failed to get plugin information: ' . $api->get_error_message());
        }

        $tmpFile = download_url($api->download_link);

        if (is_wp_error($tmpFile)) {
            throw new \RuntimeException('Failed to download plugin: ' . $tmpFile->get_error_message());
        }

        global $wp_filesystem;

        WP_Filesystem();

        // Delete the plugin folder if exists
        if (file_exists(WP_PLUGIN_DIR . '/' . $slug)) {
            $wp_filesystem->delete(WP_PLUGIN_DIR . '/' . $slug, true);
        }

        $unzipfile = unzip_file($tmpFile, WP_PLUGIN_DIR);
        @unlink($tmpFile);

        if (!$unzipfile) {
            throw new \RuntimeException('Failed to unzip plugin file');
        }

        return true;
    }

    public function activatePlugin(string $pluginPath): bool
    {
        $result = activate_plugin($pluginPath);

        if (is_wp_error($result)) {
            throw new \RuntimeException('Failed to activate plugin: ' . $result->get_error_message());
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
            throw new \RuntimeException('Failed to delete plugin: ' . $result->get_error_message());
        }

        return true;
    }
}
