<?php

/**
 * Plugin Installation Service.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use Plugin_Upgrader;
use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;
use PublishPress\Hub\Application\Service\RestApi\QuietUpgradeSkin;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginInterface;
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;

/**
 * Plugin Installation Service.
 *
 * Handles the business logic for installing plugins from WordPress.org repository.
 * Follows Domain Driven Development principles by separating concerns.
 *
 * @since 1.0.0
 */
class PluginInstallationService implements ServiceInterface
{
    /**
     * Service initialization status.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $initialized = false;

    /**
     * Initialize the service.
     *
     * @since 1.0.0
     * @return self
     */
    public function initialize(): self
    {
        $this->initialized = true;
        return $this;
    }

    /**
     * Check if the service is initialized.
     *
     * @since 1.0.0
     * @return bool
     */
    public function isInitialized(): bool
    {
        return $this->initialized;
    }

    /**
     * Install a free plugin from WordPress.org repository.
     *
     * @since 1.0.0
     * @param PluginInterface $plugin The plugin to install
     * @return bool True on success
     * @throws PluginAlreadyInstalledException If plugin is already installed
     * @throws \Exception If installation fails
     */
    public function installFreePlugin(PluginInterface $plugin): bool
    {
        if ($plugin->isInstalled()) {
            throw new PluginAlreadyInstalledException($plugin->getSlugFree());
        }

        $this->ensureWordPressRequirements();

        $api = plugins_api('plugin_information', [
            'slug' => $plugin->getSlugFree(),
            'fields' => [
                'downloadlink' => true,
            ],
        ]);

        if (is_wp_error($api)) {
            throw new \Exception('Failed to get plugin information: ' . $api->get_error_message());
        }

        return $this->performInstallation($api->download_link);
    }

    /**
     * Ensure WordPress requirements are loaded.
     *
     * @since 1.0.0
     * @return void
     */
    private function ensureWordPressRequirements(): void
    {
        if (!function_exists('plugins_api')) {
            require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
        }

        if (!function_exists('get_file_description')) {
            require_once ABSPATH . 'wp-admin/includes/file.php';
        }

        if (!function_exists('got_url_rewrite')) {
            require_once ABSPATH . 'wp-admin/includes/misc.php';
        }

        if (!function_exists('get_plugin_data')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }

        if (!class_exists('WP_Upgrader')) {
            require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
        }
    }

    /**
     * Perform the actual plugin installation.
     *
     * @since 1.0.0
     * @param string $downloadLink The plugin download URL
     * @return bool True on success
     * @throws \Exception If installation fails
     */
    private function performInstallation(string $downloadLink): bool
    {
        // Start output buffering to catch any remaining HTML output
        ob_start();

        $skin = new QuietUpgradeSkin();
        $upgrader = new Plugin_Upgrader($skin);

        $install = $upgrader->install($downloadLink);

        // Clean any buffered output
        ob_end_clean();

        if (is_wp_error($install)) {
            throw new \Exception($install->get_error_message());
        }

        return $install === true;
    }
}
