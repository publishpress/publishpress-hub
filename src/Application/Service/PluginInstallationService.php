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
     * Site URL for EDD API requests.
     *
     * @since 1.0.0
     * @var string
     */
    private string $storeUrl;

    /**
     * Service initialization status.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $initialized = false;

    /**
     * Constructor.
     *
     * @since 1.0.0
     * @param string $storeUrl The site URL for EDD API requests
     */
    public function __construct(string $storeUrl)
    {
        $this->storeUrl = $storeUrl;
    }

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
     * Install a pro plugin from a private repository.
     *
     * @since 1.0.0
     * @param PluginInterface $plugin The plugin to install
     * @param string $licenseKey The license key for authentication
     * @return bool True on success
     * @throws PluginAlreadyInstalledException If plugin is already installed
     * @throws \Exception If installation fails
     */
    public function installProPlugin(PluginInterface $plugin, string $licenseKey): bool
    {
        if ($plugin->isInstalled()) {
            throw new PluginAlreadyInstalledException($plugin->getSlugFree());
        }

        $this->ensureWordPressRequirements();

        // Get the download URL using EDD Software Licensing API
        $downloadLink = $this->getAuthenticatedDownloadUrl($plugin, $licenseKey);

        return $this->performInstallation($downloadLink);
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

        $install = $upgrader->install($downloadLink, [
            'overwrite_package' => true,
        ]);

        // Clean any buffered output
        ob_end_clean();

        if (is_wp_error($install)) {
            throw new \Exception($install->get_error_message());
        }

        if (is_wp_error($skin->result)) {
            throw new \Exception($skin->result->get_error_message());
        }

        return $install === true;
    }

    /**
     * Get authenticated download URL from EDD Software Licensing API.
     *
     * @since 1.0.0
     * @param PluginInterface $plugin The plugin to get download URL for
     * @param string $licenseKey The license key for authentication
     * @return string The authenticated download URL
     * @throws \Exception If license validation or URL retrieval fails
     */
    private function getAuthenticatedDownloadUrl(PluginInterface $plugin, string $licenseKey): string
    {
        // Get the plugin's EDD item ID - you'll need to map plugin slugs to EDD item IDs
        $itemId = $this->getEddItemId($plugin->getSlugFree());

        if (!$itemId) {
            throw new \Exception('Plugin not found in EDD store mapping');
        }

        // First, validate the license
        $this->validateLicense($$this->storeUrl, $itemId, $licenseKey);

        // Get version information which includes the download link
        $versionData = $this->getVersionInfo($$this->storeUrl, $itemId, $licenseKey);

        if (empty($versionData['download_link'])) {
            throw new \Exception('No download link available for this license');
        }

        return $versionData['download_link'];
    }

    /**
     * Validate license key with EDD Software Licensing API.
     *
     * @since 1.0.0
     * @param string $storeUrl The store URL
     * @param int $itemId The EDD item ID
     * @param string $licenseKey The license key
     * @throws \Exception If license validation fails
     */
    private function validateLicense(string $storeUrl, int $itemId, string $licenseKey): void
    {
        $apiParams = [
            'edd_action' => 'check_license',
            'item_id' => $itemId,
            'license' => $licenseKey,
            'url' => home_url(),
        ];

        $response = wp_remote_post($storeUrl, [
            'body' => $apiParams,
            'timeout' => 15,
            'sslverify' => true,
        ]);

        if (is_wp_error($response)) {
            throw new \Exception('Failed to validate license: ' . $response->get_error_message());
        }

        $licenseData = json_decode(wp_remote_retrieve_body($response), true);

        if (!$licenseData || !isset($licenseData['license'])) {
            throw new \Exception('Invalid response from license server');
        }

        if ($licenseData['license'] !== 'valid') {
            $errorMessage = 'License validation failed';

            if (isset($licenseData['error'])) {
                $errorMessages = [
                    'expired' => 'License has expired',
                    'disabled' => 'License has been disabled',
                    'invalid' => 'Invalid license key',
                    'missing' => 'License key not found',
                    'no_activations_left' => 'No activations left for this license',
                    'key_mismatch' => 'License key does not match this product',
                ];

                $errorMessage = $errorMessages[$licenseData['error']] ?? $errorMessage;
            }

            throw new \Exception($errorMessage);
        }
    }

    /**
     * Get version information and download link from EDD Software Licensing API.
     *
     * @since 1.0.0
     * @param string $storeUrl The store URL
     * @param int $itemId The EDD item ID
     * @param string $licenseKey The license key
     * @return array Version information including download link
     * @throws \Exception If getting version info fails
     */
    private function getVersionInfo(string $storeUrl, int $itemId, string $licenseKey): array
    {
        $apiParams = [
            'edd_action' => 'get_version',
            'item_id' => $itemId,
            'license' => $licenseKey,
            'url' => home_url(),
        ];

        $response = wp_remote_post($storeUrl, [
            'body' => $apiParams,
            'timeout' => 15,
            'sslverify' => true,
        ]);

        if (is_wp_error($response)) {
            throw new \Exception('Failed to get version information: ' . $response->get_error_message());
        }

        $versionData = json_decode(wp_remote_retrieve_body($response), true);

        if (!$versionData) {
            throw new \Exception('Invalid response from version server');
        }

        return $versionData;
    }

    /**
     * Get EDD item ID for a plugin slug.
     *
     * @since 1.0.0
     * @param string $pluginSlug The plugin slug
     * @return int|null The EDD item ID or null if not found
     */
    private function getEddItemId(string $pluginSlug): ?int
    {
        // Default mapping - can be overridden via filter
        $defaultMapping = [
            'publishpress-authors' => 123, // Replace with actual EDD item ID
            'publishpress-checklists' => 456, // Replace with actual EDD item ID
            'capability-manager-enhanced' => 789, // Replace with actual EDD item ID
            'advanced-gutenberg' => 101, // Replace with actual EDD item ID
            'post-expirator' => 102, // Replace with actual EDD item ID
            'press-permit-core' => 103, // Replace with actual EDD item ID
            'revisionary' => 104, // Replace with actual EDD item ID
            'organize-series' => 105, // Replace with actual EDD item ID
            'publishpress' => 106, // Replace with actual EDD item ID
        ];

        /**
         * Filter the plugin slug to EDD item ID mapping.
         *
         * Allows developers to modify or extend the mapping of plugin slugs
         * to EDD item IDs for license validation and download URL generation.
         *
         * @since 1.0.0
         * @param array $mapping Array of plugin_slug => edd_item_id mappings
         */
        $pluginToEddMapping = apply_filters('publishpress_hub_edd_item_mapping', $defaultMapping);

        return $pluginToEddMapping[$pluginSlug] ?? null;
    }
}
