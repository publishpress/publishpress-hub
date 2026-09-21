<?php

/**
 * License management service interface.
 *
 * @package PublishPress\Hub\Application\Service\License\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\License\Contract;
defined( 'ABSPATH' ) || exit;

interface LicenseManagementServiceInterface
{
    /**
     * Activate license via API and store it locally.
     *
     * @param string $licenseKey The license key to activate
     * @param int $downloadId The download ID for the plugin
     * @param bool $force Whether to force the activation
     * @return bool True if activation and storage were successful
     */
    public function activateAndStoreLicense(string $licenseKey, int $downloadId, bool $force = false): bool;

    /**
     * Deactivate license via API and remove it from local storage.
     *
     * @param string $licenseKey The license key to deactivate
     * @param int $downloadId The download ID for the plugin
     * @return bool True if deactivation was successful
     */
    public function deactivateAndRemoveLicense(string $licenseKey, int $downloadId): bool;

    /**
     * Deactivate license via API and remove it from ALL plugins using this license key.
     *
     * This implements the business rule: "When a license is deactivated,
     * it should be removed from all plugins that use the same license key"
     *
     * @param string $licenseKey The license key to deactivate
     * @param int $downloadId The primary download ID that requested deactivation
     * @return bool True if deactivation was successful
     */
    public function deactivateAndRemoveLicenseFromAllPlugins(string $licenseKey, int $downloadId): bool;

    /**
     * Validate license and activate if not already active, then store locally.
     * Used for scenarios where we need to ensure license is valid and active.
     *
     * @param string $licenseKey The license key to validate and activate
     * @param int $downloadId The download ID for the plugin
     * @param bool $force Whether to force validation
     * @return bool True if license is valid and active (and stored locally)
     */
    public function validateAndEnsureActiveLicense(string $licenseKey, int $downloadId, bool $force = false): bool;

    /**
     * Get stored license key for a download ID.
     *
     * @param int $downloadId The download ID
     * @return string|null The stored license key or null if not found
     */
    public function getStoredLicenseKey(int $downloadId): ?string;

    /**
     * Get stored license status for a download ID.
     *
     * @param int $downloadId The download ID
     * @return bool The stored license status
     */
    public function getStoredLicenseStatus(int $downloadId): bool;

    /**
     * Get stored license expiration date for a download ID.
     *
     * @param int $downloadId The download ID
     * @return string|null The stored expiration date in ISO format (YYYY-MM-DD) or null if not found
     */
    public function getStoredLicenseExpirationDate(int $downloadId): ?string;

    /**
     * Check if a license key is stored locally.
     *
     * @param int $downloadId The download ID
     * @return bool True if license key is stored
     */
    public function hasStoredLicense(int $downloadId): bool;

    /**
     * Get license information from API.
     *
     * @param string $licenseKey The license key
     * @param int $downloadId The download ID
     * @param bool $force Whether to force refresh
     * @return array License information
     */
    public function getLicenseInfo(string $licenseKey, int $downloadId, bool $force = false): array;

    /**
     * Get last version information from API.
     *
     * @param string $licenseKey The license key
     * @param int $downloadId The download ID
     * @param bool $force Whether to force refresh
     * @return array Version information including download link
     */
    public function getLastVersionInfo(string $licenseKey, int $downloadId, bool $force = false): array;

    /**
     * Check if license is valid via API.
     *
     * @param string $licenseKey The license key
     * @param int $downloadId The download ID
     * @param bool $force Whether to force check
     * @return bool True if license is valid
     */
    public function isLicenseValid(string $licenseKey, int $downloadId, bool $force = false): bool;

    /**
     * Check if license is active via API.
     *
     * @param string $licenseKey The license key
     * @param int $downloadId The download ID
     * @param bool $force Whether to force check
     * @return bool True if license is active
     */
    public function isLicenseActive(string $licenseKey, int $downloadId, bool $force = false): bool;

    /**
     * Get all download IDs that would be affected by deactivating a license key.
     *
     * Useful for logging, UI feedback, or confirmation dialogs.
     *
     * @param string $licenseKey The license key to check
     * @return int[] Array of download IDs that use this license key
     */
    public function getPluginsAffectedByLicenseDeactivation(string $licenseKey): array;
}
