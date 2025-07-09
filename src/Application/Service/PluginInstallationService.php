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
use PublishPress\Hub\Application\Service\Contracts\LicenseServiceInterface;
use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;
use PublishPress\Hub\Application\Service\Contracts\WPOrgPluginsServiceInterface;
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
use PublishPress\Hub\Application\Service\RestApi\QuietUpgradeSkin;
use PublishPress\Hub\Domain\Plugin\Contracts\EddPluginInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\FreePluginInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotActivatedException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotInstalledException;

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
     * License service.
     *
     * @since 1.0.0
     * @var LicenseServiceInterface
     */
    private LicenseServiceInterface $licenseService;

    /**
     * WordPress.org plugins service.
     *
     * @since 1.0.0
     * @var WPOrgPluginsServiceInterface
     */
    private WPOrgPluginsServiceInterface $wpOrgPluginsService;

    /**
     * Constructor.
     *
     * @since 1.0.0
     * @param LicenseServiceInterface $licenseService
     * @param WPOrgPluginsServiceInterface $wpOrgPluginsService
     */
    public function __construct(LicenseServiceInterface $licenseService, WPOrgPluginsServiceInterface $wpOrgPluginsService)
    {
        $this->licenseService = $licenseService;
        $this->wpOrgPluginsService = $wpOrgPluginsService;
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
     * @param FreePluginInterface $plugin The plugin to install
     * @return bool True on success
     * @throws PluginAlreadyInstalledException If plugin is already installed
     * @throws FetchingPluginInformationException If getting plugin information fails
     * @throws \Exception If installation fails
     */
    public function installFreePlugin(FreePluginInterface $plugin): bool
    {
        if ($plugin->isInstalled()) {
            throw new PluginAlreadyInstalledException($plugin->getSlug());
        }

        $this->ensureWordPressRequirements();

        $pluginInfo = $this->wpOrgPluginsService->getPluginInformationFromWpOrg($plugin->getSlug());

        $result = $this->performInstallation($pluginInfo->download_link);

        if ($result) {
            $plugin->setInstalled($pluginInfo->version, $plugin->getPath(true));
        }

        return $result;
    }

    /**
     * Install a pro plugin from a private repository.
     *
     * @since 1.0.0
     * @param EddPluginInterface $plugin The plugin to install
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
    public function installProPlugin(EddPluginInterface $plugin, string $licenseKey): bool
    {
        if ($plugin->isInstalled()) {
            throw new PluginAlreadyInstalledException($plugin->getSlug());
        }

        $this->licenseService->validateAndActivateLicense($plugin->getEddItemId(), $licenseKey);

        $this->ensureWordPressRequirements();

        // Get the download URL using EDD Software Licensing API
        $downloadLink = $this->getAuthenticatedDownloadUrl($plugin, $licenseKey);

        return $this->performInstallation($downloadLink);
    }

    /**
     * Upgrade a plugin to Pro.
     *
     * @since 1.0.0
     * @param FreePluginInterface $freePlugin The free plugin to upgrade
     * @param string $licenseKey The license key for authentication
     * @return bool True on success
     * @throws PluginNotInstalledException If plugin is not installed
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
    public function upgradePluginToPro(FreePluginInterface $freePlugin, string $licenseKey): bool
    {
        if (! $freePlugin->isInstalled(true)) {
            throw new PluginNotInstalledException($freePlugin->getSlug());
        }

        $proPlugin = $freePlugin->getFamily()->getProPlugin();

        if ($proPlugin->isInstalled(true)) {
            throw new PluginAlreadyInstalledException($proPlugin->getSlug());
        }

        $this->licenseService->validateAndActivateLicense($proPlugin->getEddItemId(), $licenseKey);

        $this->ensureWordPressRequirements();

        // Get the download URL using EDD Software Licensing API
        $downloadLink = $this->getAuthenticatedDownloadUrl($proPlugin, $licenseKey);

        return $this->performUpgradeToPro($freePlugin, $downloadLink);
    }

    /**
     * Uninstall a plugin.
     *
     * @since 1.0.0
     * @param FreePluginInterface $plugin The plugin to uninstall
     * @return bool True on success
     * @throws PluginNotInstalledException If plugin is not installed
     */
    public function uninstallPlugin(FreePluginInterface $plugin): bool
    {
        if (!$plugin->isInstalled()) {
            throw new PluginNotInstalledException($plugin->getSlug());
        }

        $this->ensureWordPressRequirements();

        return $this->performUninstallation($plugin);
    }

    /**
     * Activate a plugin.
     *
     * @since 1.0.0
     * @param FreePluginInterface $plugin The plugin to activate
     * @return bool True on success
     * @throws PluginNotInstalledException If plugin is not installed
     */
    public function activatePlugin(FreePluginInterface $plugin): bool
    {
        if (!$plugin->isInstalled()) {
            throw new PluginNotInstalledException($plugin->getSlug());
        }

        $this->ensureWordPressRequirements();

        return $this->performActivation($plugin);
    }

    /**
     * Deactivate a plugin.
     *
     * @since 1.0.0
     * @param FreePluginInterface $plugin The plugin to deactivate
     * @return bool True on success
     * @throws PluginNotInstalledException If plugin is not installed
     */
    public function deactivatePlugin(FreePluginInterface $plugin): bool
    {
        if (!$plugin->isInstalled()) {
            throw new PluginNotInstalledException($plugin->getSlug());
        }

        if (!$plugin->isActive()) {
            throw new PluginNotActivatedException($plugin->getSlug());
        }

        $this->ensureWordPressRequirements();

        return $this->performDeactivation($plugin);
    }

    /**
     * Resolve a conflict.
     *
     * @since 1.0.0
     * @param PluginFamilyInterface $pluginFamily The plugin family to resolve conflict
     * @param string $pluginToKeep The plugin to keep
     * @return bool True on success
     * @throws PluginInstallationException If plugin family has conflicting installations
     */
    public function resolveConflict(PluginFamilyInterface $pluginFamily, string $pluginToKeep): bool
    {
        $result = false;

        if ($pluginToKeep === 'free') {
            $result = $this->performUninstallation($pluginFamily->getProPlugin());
        } elseif ($pluginToKeep === 'pro') {
            $result = $this->performUninstallation($pluginFamily->getFreePlugin());
        } else {
            throw new PluginInstallationException('Invalid plugin to keep');
        }

        return $result;
    }

    /**
     * Ensure WordPress requirements are loaded.
     *
     * @since 1.0.0
     * @return void
     */
    private function ensureWordPressRequirements(): void
    {
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
     * Perform the actual plugin upgrade to Pro.
     *
     * @since 1.0.0
     * @param FreePluginInterface $freePlugin The free plugin to upgrade
     * @param string $downloadLink The plugin download URL
     * @return bool True on success
     * @throws PluginInstallationException If installation fails
     */
    private function performUpgradeToPro(FreePluginInterface $freePlugin, string $downloadLink): bool
    {
        $result = $this->performUninstallation($freePlugin);

        if (!$result) {
            throw new PluginInstallationException('Failed to uninstall plugin');
        }

        $result = $this->performInstallation($downloadLink);

        return $result === true;
    }

    /**
     * Perform the actual plugin uninstallation.
     *
     * @since 1.0.0
     * @param FreePluginInterface $plugin The plugin to uninstall
     * @return bool True on success
     * @throws PluginNotInstalledException If plugin is not installed
     * @throws PluginInstallationException If uninstallation fails
     */
    private function performUninstallation(FreePluginInterface $plugin): bool
    {
        $pluginRelativePath = $plugin->getPath();

        if ($plugin->isActive()) {
            $this->performDeactivation($plugin);
        }

        global $wp_filesystem;

        if (empty($wp_filesystem)) {
            require_once(ABSPATH . '/wp-admin/includes/file.php');
            WP_Filesystem();
        }

        $result = delete_plugins([$pluginRelativePath]);

        if (is_wp_error($result)) {
            throw new PluginInstallationException('Failed to uninstall plugin: ' . $result->get_error_message());
        }

        return $result === true;
    }

    /**
     * Perform the actual plugin activation.
     *
     * @since 1.0.0
     * @param FreePluginInterface $plugin The plugin to activate
     * @return bool True on success
     * @throws PluginInstallationException If plugin activation fails
     */
    private function performActivation(FreePluginInterface $plugin): bool
    {
        $pluginRelativePath = $plugin->getPath();

        $result = activate_plugin($pluginRelativePath, false);

        if (is_wp_error($result)) {
            throw new PluginInstallationException('Failed to activate plugin: ' . $result->get_error_message());
        }

        if (!$plugin->isActive(true)) {
            throw new PluginInstallationException('Failed to activate plugin');
        }

        return $result === null;
    }

    /**
     * Perform the actual plugin deactivation.
     *
     * @since 1.0.0
     * @param FreePluginInterface $plugin The plugin to deactivate
     * @return bool True on success
     * @throws PluginInstallationException If plugin deactivation fails
     */
    private function performDeactivation(FreePluginInterface $plugin): bool
    {
        $pluginRelativePath = $plugin->getPath();

        deactivate_plugins([$pluginRelativePath]);

        if ($plugin->isActive(true)) {
            throw new PluginInstallationException('Failed to deactivate plugin');
        }

        return true;
    }

    /**
     * Get an authenticated download URL for a plugin.
     *
     * @since 1.0.0
     * @param EddPluginInterface $proPlugin The plugin to install
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
    private function getAuthenticatedDownloadUrl(EddPluginInterface $proPlugin, string $licenseKey): string
    {
        $itemId = $proPlugin->getEddItemId();

        $versionData = $this->licenseService->getVersionInfo($itemId, $licenseKey);

        if (empty($versionData['download_link'])) {
            throw new PluginInstallationException('No download link available for this license');
        }

        return $versionData['download_link'];
    }
}
