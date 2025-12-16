<?php

/**
 * Service for managing licenses.
 *
 * @package PublishPress\Hub\Application\Service\License
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\License;

use PublishPress\Hub\Application\Service\License\Contract\LicenseManagementServiceInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicenseApiServiceInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;

class LicenseManagementService implements LicenseManagementServiceInterface
{
    private LicenseApiServiceInterface $licenseApiService;
    private LicensePersistenceInterface $licensePersistence;

    /**
     * @since 1.0.0
     */
    public function __construct(
        LicenseApiServiceInterface $licenseApiService,
        LicensePersistenceInterface $licensePersistence
    ) {
        $this->licenseApiService = $licenseApiService;
        $this->licensePersistence = $licensePersistence;
    }

    /**
     * Activate license via API and store it locally.
     *
     * @param string $licenseKey The license key to activate
     * @param int $downloadId The download ID for the plugin
     * @param bool $force Whether to force the activation
     * @return bool True if activation and storage were successful
     */
    public function activateAndStoreLicense(string $licenseKey, int $downloadId, bool $force = false): bool
    {
        $activated = $this->licenseApiService->activateLicense($licenseKey, $downloadId, $force);

        if ($activated) {
            $this->licensePersistence->storeLicenseKey($downloadId, $licenseKey);
            $this->licensePersistence->storeLicenseStatus($downloadId, true);
            $this->storeExpirationDateFromApi($licenseKey, $downloadId, $force);
        }

        return $activated;
    }

    /**
     * Deactivate license via API and remove it from local storage.
     *
     * @param string $licenseKey The license key to deactivate
     * @param int $downloadId The download ID for the plugin
     * @return bool True if deactivation was successful
     * @throws \Exception If license is from constant
     */
    public function deactivateAndRemoveLicense(string $licenseKey, int $downloadId): bool
    {
        if ($this->isLicenseFromConstant($downloadId)) {
            throw new \Exception(
                __('This license key is managed via wp-config.php constant and cannot be deactivated.', 'publishpress-hub')
            );
        }

        $deactivated = $this->licenseApiService->deactivateLicense($licenseKey, $downloadId);

        if ($deactivated) {
            $this->licensePersistence->removeLicense($downloadId);
            $this->licensePersistence->storeLicenseStatus($downloadId, false);
        }

        return $deactivated;
    }

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
    public function deactivateAndRemoveLicenseFromAllPlugins(string $licenseKey, int $downloadId): bool
    {
        $deactivated = $this->licenseApiService->deactivateLicense($licenseKey, $downloadId);

        if ($deactivated) {
            // Business Rule: Remove license from ALL plugins using this key
            $allDownloadIdsUsingLicense = $this->licensePersistence->getDownloadIdsUsingLicenseKey($licenseKey);

            foreach ($allDownloadIdsUsingLicense as $affectedDownloadId) {
                $this->licensePersistence->removeLicense($affectedDownloadId);
                $this->licensePersistence->storeLicenseStatus($affectedDownloadId, false);
            }
        }

        return $deactivated;
    }

    /**
     * Validate license and activate if not already active, then store locally.
     * Used for scenarios where we need to ensure license is valid and active.
     *
     * @param string $licenseKey The license key to validate and activate
     * @param int $downloadId The download ID for the plugin
     * @param bool $force Whether to force validation
     * @return bool True if license is valid and active (and stored locally)
     */
    public function validateAndEnsureActiveLicense(string $licenseKey, int $downloadId, bool $force = false): bool
    {
        $activated = $this->licenseApiService->activateLicense($licenseKey, $downloadId, $force);

        if (!$activated) {
            return false;
        }

        // Store the license key locally
        $this->licensePersistence->storeLicenseKey($downloadId, $licenseKey);
        $this->licensePersistence->storeLicenseStatus($downloadId, true);
        $this->storeExpirationDateFromApi($licenseKey, $downloadId, $force);

        return true;
    }

    /**
     * Get stored license key for a download ID.
     *
     * @param int $downloadId The download ID
     * @return string|null The stored license key or null if not found
     */
    public function getStoredLicenseKey(int $downloadId): ?string
    {
        return $this->licensePersistence->getLicenseKey($downloadId);
    }

    /**
     * Get stored license status for a download ID.
     *
     * @param int $downloadId The download ID
     * @return bool The stored license status
     */
    public function getStoredLicenseStatus(int $downloadId): bool
    {
        return $this->licensePersistence->getLicenseStatus($downloadId);
    }

    /**
     * Check if a license key is stored locally.
     *
     * @param int $downloadId The download ID
     * @return bool True if license key is stored
     */
    public function hasStoredLicense(int $downloadId): bool
    {
        return $this->licensePersistence->hasLicenseKey($downloadId);
    }

    /**
     * Get license information from API.
     *
     * @param string $licenseKey The license key
     * @param int $downloadId The download ID
     * @param bool $force Whether to force refresh
     * @return array License information
     */
    public function getLicenseInfo(string $licenseKey, int $downloadId, bool $force = false): array
    {
        return $this->licenseApiService->getLicenseInfo($licenseKey, $downloadId, $force);
    }

    /**
     * Get last version information from API.
     *
     * @param string $licenseKey The license key
     * @param int $downloadId The download ID
     * @param bool $force Whether to force refresh
     * @return array Version information including download link
     */
    public function getLastVersionInfo(string $licenseKey, int $downloadId, bool $force = false): array
    {
        return $this->licenseApiService->getLastVersionInfo($licenseKey, $downloadId, $force);
    }

    /**
     * Check if license is valid via API.
     *
     * @param string $licenseKey The license key
     * @param int $downloadId The download ID
     * @param bool $force Whether to force check
     * @return bool True if license is valid
     */
    public function isLicenseValid(string $licenseKey, int $downloadId, bool $force = false): bool
    {
        return $this->licenseApiService->isLicenseValid($licenseKey, $downloadId, $force);
    }

        /**
     * Check if license is active via API.
     *
     * @param string $licenseKey The license key
     * @param int $downloadId The download ID
     * @param bool $force Whether to force check
     * @return bool True if license is active
     */
    public function isLicenseActive(string $licenseKey, int $downloadId, bool $force = false): bool
    {
        return $this->licenseApiService->isLicenseActive($licenseKey, $downloadId, $force);
    }

    /**
     * Get all download IDs that would be affected by deactivating a license key.
     *
     * Useful for logging, UI feedback, or confirmation dialogs.
     *
     * @param string $licenseKey The license key to check
     * @return int[] Array of download IDs that use this license key
     */
    public function getPluginsAffectedByLicenseDeactivation(string $licenseKey): array
    {
        return $this->licensePersistence->getDownloadIdsUsingLicenseKey($licenseKey);
    }

    /**
     * Get stored license expiration date for a download ID.
     *
     * @param int $downloadId The download ID
     * @return string|null The stored expiration date in ISO format (YYYY-MM-DD) or null if not found
     */
    public function getStoredLicenseExpirationDate(int $downloadId): ?string
    {
        return $this->licensePersistence->getLicenseExpirationDate($downloadId);
    }

    /**
     * Store expiration date from API response.
     * The expiration date is stored by license key, so it can be reused across plugins using the same key.
     *
     * @param string $licenseKey The license key
     * @param int $downloadId The download ID
     * @param bool $force Whether to force refresh
     * @return void
     */
    private function storeExpirationDateFromApi(string $licenseKey, int $downloadId, bool $force = false): void
    {
        try {
            // First check if we already have an expiration date for this license key
            $existingExpirationDate = $this->licensePersistence->getLicenseExpirationDateByKey($licenseKey);

            // If we have an existing expiration date and we're not forcing, reuse it
            if ($existingExpirationDate !== null && !$force) {
                $this->licensePersistence->storeLicenseExpirationDate($downloadId, $existingExpirationDate);
                return;
            }

            // Otherwise, fetch from API
            $licenseInfo = $this->licenseApiService->getLicenseInfo($licenseKey, $downloadId, $force);

            if (isset($licenseInfo['expires'])) {
                $expirationDate = $this->convertExpirationToIsoFormat($licenseInfo['expires']);

                if ($expirationDate !== null) {
                    // Store by license key so it can be reused
                    $this->licensePersistence->storeLicenseExpirationDateByKey($licenseKey, $expirationDate);
                    // Also store by download ID for backward compatibility
                    $this->licensePersistence->storeLicenseExpirationDate($downloadId, $expirationDate);
                }
            }
        } catch (\Exception $e) {
            // Silently fail if we can't get expiration date - license is still activated
        }
    }

    /**
     * Check if a license is from a constant.
     *
     * @param int $downloadId The download ID
     * @return bool True if license is from constant
     * @since 1.0.0
     */
    public function isLicenseFromConstant(int $downloadId): bool
    {
        return $this->licensePersistence->isLicenseFromConstant($downloadId);
    }

    /**
     * Sync license from constant without API validation.
     * Stores the license key and marks it as licensed/active.
     *
     * @param string $licenseKey The license key from constant
     * @param int $downloadId The download ID for the plugin
     * @return void
     * @since 1.0.0
     */
    public function syncLicenseFromConstant(string $licenseKey, int $downloadId): void
    {
        // Store license key and mark as licensed (no API validation)
        $this->licensePersistence->storeLicenseKey($downloadId, $licenseKey);
        $this->licensePersistence->storeLicenseStatus($downloadId, true);
        $this->licensePersistence->markLicenseFromConstant($downloadId, true);
    }

    /**
     * Convert expiration date from API format to ISO format (YYYY-MM-DD).
     *
     * @param mixed $expires The expiration value from API (could be timestamp, date string, or 'lifetime')
     * @return string|null The expiration date in ISO format or null if lifetime/invalid
     */
    private function convertExpirationToIsoFormat($expires): ?string
    {
        if (empty($expires) || $expires === 'lifetime' || $expires === 'never') {
            return null;
        }

        // If it's a numeric timestamp
        if (is_numeric($expires)) {
            $timestamp = (int) $expires;
            // Check if it's a valid timestamp (not year 1970 or before)
            if ($timestamp > 0 && $timestamp < 2147483647) {
                return gmdate('Y-m-d', $timestamp);
            }
        }

        // If it's already a date string, try to parse it
        if (is_string($expires)) {
            $timestamp = strtotime($expires);
            if ($timestamp !== false && $timestamp > 0) {
                return gmdate('Y-m-d', $timestamp);
            }
        }

        return null;
    }
}
