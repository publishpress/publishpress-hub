<?php

/**
 * WordPress.org plugin API adapter.
 *
 * @package PublishPress\Hub\Infrastructure\WPOrg\Api
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WPOrg\Api;

use RuntimeException;

\defined('ABSPATH') || exit;

class WPOrgPluginApiAdapter
{
    /**
     * Get the last version information for a plugin.
     *
     * @param string $slug The plugin slug.
     * @return array<string, mixed> The plugin information.
     * @since 1.0.0
     */
    public function getLastVersionInfo(string $slug): array
    {
        if (!function_exists('plugins_api')) {
            require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
        }

        $pluginInfo = plugins_api('plugin_information', [
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

        if (is_wp_error($pluginInfo)) {
            throw new RuntimeException(
                sprintf(
                    // translators: %s is the error message
                    esc_html__('Failed to get plugin information: %s', 'publishpress-hub'),
                    esc_html($pluginInfo->get_error_message())
                )
            );
        }

        if (is_object($pluginInfo)) {
            $encodedPluginInfo = wp_json_encode($pluginInfo);

            $pluginInfo = $encodedPluginInfo !== false ? json_decode($encodedPluginInfo, true) : [];
        }

        return $pluginInfo;
    }
}
