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
use PublishPress\Hub\Application\Service\Exception\FetchingPluginInformationException;
use PublishPress\Hub\Application\Service\Exception\LicenseDisabledException;
use PublishPress\Hub\Application\Service\Exception\LicenseExpiredException;
use PublishPress\Hub\Application\Service\Exception\LicenseInvalidException;
use PublishPress\Hub\Application\Service\Exception\LicenseInvalidItemIdException;
use PublishPress\Hub\Application\Service\Exception\LicenseInvalidItemNameException;
use PublishPress\Hub\Application\Service\Exception\LicenseKeyMismatchException;
use PublishPress\Hub\Application\Service\Exception\LicenseMissingException;
use PublishPress\Hub\Application\Service\Exception\LicenseMissingUrlException;
use PublishPress\Hub\Application\Service\Exception\LicenseNoActivationsLeftException;
use PublishPress\Hub\Application\Service\Exception\LicenseNotActivableException;
use PublishPress\Hub\Application\Service\Exception\LicenseServerException;
use PublishPress\Hub\Application\Service\Exception\LicenseSiteInactiveException;
use PublishPress\Hub\Application\Service\Exception\PluginInstallationException;
use PublishPress\Hub\Application\Service\Exception\ServiceException;
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
     * Home URL for EDD API requests.
     *
     * @since 1.0.0
     * @var string
     */
    private string $homeUrl;

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
     * @param string $homeUrl The home URL for EDD API requests
     */
    public function __construct(string $storeUrl, string $homeUrl)
    {
        $this->storeUrl = $storeUrl;
        $this->homeUrl = $homeUrl;
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
            throw new FetchingPluginInformationException('Failed to get plugin information: ' . $api->get_error_message());
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
     * @throws LicenseServerException If license server error occurs
     * @throws LicenseMissingException If license is missing
     * @throws LicenseMissingUrlException If license is missing
     * @throws LicenseNotActivableException If license is not activable
     * @throws LicenseDisabledException If license is disabled
     * @throws LicenseNoActivationsLeftException If license has no activations left
     * @throws LicenseExpiredException If license is expired
     * @throws LicenseInvalidException If license is invalid
     * @throws LicenseKeyMismatchException If license does not match the product
     * @throws LicenseInvalidItemIdException If license item ID is invalid
     * @throws LicenseInvalidItemNameException If license item name is invalid
     * @throws LicenseSiteInactiveException If license site is inactive
     * @throws LicenseServerException If license server error occurs
     * @throws PluginInstallationException If no download link is available
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
     * @throws PluginInstallationException If installation fails
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
            throw new PluginInstallationException($install->get_error_message());
        }

        if (is_wp_error($skin->result)) {
            throw new PluginInstallationException($skin->result->get_error_message());
        }

        return $install === true;
    }

    /**
     * Get an authenticated download URL for a plugin.
     *
     * @since 1.0.0
     * @param PluginInterface $plugin The plugin to install
     * @param string $licenseKey The license key for authentication
     * @return string The authenticated download URL
     * @throws LicenseServerException If license server error occurs
     * @throws LicenseMissingException If license is missing
     * @throws LicenseMissingUrlException If license is missing
     * @throws LicenseNotActivableException If license is not activable
     * @throws LicenseDisabledException If license is disabled
     * @throws LicenseNoActivationsLeftException If license has no activations left
     * @throws LicenseExpiredException If license is expired
     * @throws LicenseInvalidException If license is invalid
     * @throws LicenseKeyMismatchException If license does not match the product
     * @throws LicenseInvalidItemIdException If license item ID is invalid
     * @throws LicenseInvalidItemNameException If license item name is invalid
     * @throws LicenseSiteInactiveException If license site is inactive
     * @throws LicenseServerException If license server error occurs
     * @throws PluginInstallationException If no download link is available
     */
    private function getAuthenticatedDownloadUrl(PluginInterface $plugin, string $licenseKey): string
    {
        // Get the plugin's EDD item ID directly from the plugin
        $itemId = $plugin->getEddItemId();

        // First, validate the license
        $this->validateLicense($this->storeUrl, $itemId, $licenseKey);

        // Get version information which includes the download link
        $versionData = $this->getVersionInfo($this->storeUrl, $itemId, $licenseKey);

        if (empty($versionData['download_link'])) {
            throw new PluginInstallationException('No download link available for this license');
        }

        return $versionData['download_link'];
    }

    /**
     * Validate a license.
     *
     * @since 1.0.0
     * @param string $storeUrl
     * @param int $itemId
     * @param string $licenseKey
     * @return void
     * @throws LicenseServerException
     * @throws LicenseMissingException
     * @throws LicenseMissingUrlException
     * @throws LicenseNotActivableException
     * @throws LicenseDisabledException
     * @throws LicenseNoActivationsLeftException
     * @throws LicenseExpiredException
     * @throws LicenseKeyMismatchException
     * @throws LicenseInvalidItemIdException
     * @throws LicenseInvalidItemNameException
     * @throws LicenseSiteInactiveException
     * @throws LicenseInvalidException
     */
    private function validateLicense(string $storeUrl, int $itemId, string $licenseKey): void
    {
        $apiParams = [
            'edd_action' => 'check_license',
            'item_id' => $itemId,
            'license' => $licenseKey,
            'url' => $this->homeUrl,
        ];

        $response = wp_remote_post($storeUrl, [
            'body' => $apiParams,
            'timeout' => 15,
            'sslverify' => true,
        ]);

        if (is_wp_error($response)) {
            throw new LicenseServerException('Failed to validate license: ' . $response->get_error_message());
        }

        $licenseData = json_decode(wp_remote_retrieve_body($response), true);

        if (!$licenseData || !isset($licenseData['license'])) {
            throw new LicenseServerException('Invalid response from license server');
        }

        $this->validateLicenseData($licenseData, ['valid', 'inactive', 'site_inactive']);

        if ($licenseData['license'] === 'inactive' || $licenseData['license'] === 'site_inactive') {
            // Does the user have enough activations left?
            if ($licenseData['activations_left'] > 0) {
                // Activate the license
                $this->activateLicense($storeUrl, $itemId, $licenseKey);

                return;
            }

            throw new LicenseNoActivationsLeftException();
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
            'url' => $this->homeUrl,
        ];

        $response = wp_remote_post($storeUrl, [
            'body' => $apiParams,
            'timeout' => 15,
            'sslverify' => true,
        ]);

        if (is_wp_error($response)) {
            throw new LicenseServerException('Failed to get version information: ' . $response->get_error_message());
        }

        $versionData = json_decode(wp_remote_retrieve_body($response), true);

        if (!$versionData) {
            throw new LicenseServerException('Invalid response from version server');
        }

        return $versionData;
    }

    /**
     * Activate a license.
     *
     * @since 1.0.0
     * @param string $storeUrl
     * @param int $itemId
     * @param string $licenseKey
     * @return void
     * @throws LicenseServerException
     * @throws LicenseMissingException
     * @throws LicenseMissingUrlException
     * @throws LicenseNotActivableException
     * @throws LicenseDisabledException
     * @throws LicenseNoActivationsLeftException
     * @throws LicenseExpiredException
     * @throws LicenseKeyMismatchException
     * @throws LicenseInvalidItemIdException
     * @throws LicenseInvalidItemNameException
     * @throws LicenseSiteInactiveException
     * @throws LicenseInvalidException
     */
    private function activateLicense(string $storeUrl, int $itemId, string $licenseKey): void
    {
        $apiParams = [
            'edd_action' => 'activate_license',
            'item_id' => $itemId,
            'license' => $licenseKey,
            'url' => $this->homeUrl,
        ];

        $response = wp_remote_post($storeUrl, [
            'body' => $apiParams,
            'timeout' => 15,
            'sslverify' => true,
        ]);

        if (is_wp_error($response)) {
            throw new LicenseServerException('Failed to activate license: ' . $response->get_error_message());
        }

        $licenseData = json_decode(wp_remote_retrieve_body($response), true);

        if (!$licenseData || !isset($licenseData['license'])) {
            throw new LicenseServerException('Invalid response from license server');
        }

        $this->validateLicenseData($licenseData, ['valid']);
    }

    /**
     * Validate license data.
     *
     * @since 1.0.0
     * @param array $licenseData The license data
     * @param array $acceptableResults The results to accept
     * @return void
     * @throws LicenseMissingException
     * @throws LicenseMissingUrlException
     * @throws LicenseNotActivableException
     * @throws LicenseDisabledException
     * @throws LicenseNoActivationsLeftException
     * @throws LicenseExpiredException
     * @throws LicenseKeyMismatchException
     * @throws LicenseInvalidItemIdException
     * @throws LicenseInvalidItemNameException
     * @throws LicenseSiteInactiveException
     * @throws LicenseInvalidException
     * @throws LicenseServerException
     */
    private function validateLicenseData(array $licenseData, array $acceptableResults = []): void
    {
        if (in_array($licenseData['license'], $acceptableResults)) {
            return;
        }

        switch ($licenseData['license']) {
            case 'missing':
                throw new LicenseMissingException();
            case 'missing_url':
                throw new LicenseMissingUrlException();
            case 'license_not_activable':
                throw new LicenseNotActivableException();
            case 'disabled':
                throw new LicenseDisabledException();
            case 'no_activations_left':
                throw new LicenseNoActivationsLeftException();
            case 'expired':
                throw new LicenseExpiredException();
            case 'key_mismatch':
                throw new LicenseKeyMismatchException();
            case 'invalid_item_id':
                throw new LicenseInvalidItemIdException();
            case 'item_name_mismatch':
                throw new LicenseInvalidItemNameException();
            // TODO: Check if this is really an issue, since we should activate the license if it's inactive
            case 'site_inactive':
                throw new LicenseSiteInactiveException();
            case 'invalid':
                throw new LicenseInvalidException();

            default:
                throw new LicenseServerException('Unknown license error: ' . $licenseData['license']);
        }
    }
}
