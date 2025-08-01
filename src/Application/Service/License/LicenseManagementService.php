<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\License;

use PublishPress\Hub\Infrastructure\License\Contract\LicenseApiServiceInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;

class LicenseManagementService
{
    private LicenseApiServiceInterface $licenseApiService;
    private LicensePersistenceInterface $licensePersistence;

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
        }

        return $activated;
    }

    /**
     * Deactivate license via API and remove it from local storage.
     *
     * @param string $licenseKey The license key to deactivate
     * @param int $downloadId The download ID for the plugin
     * @return bool True if deactivation was successful
     */
    public function deactivateAndRemoveLicense(string $licenseKey, int $downloadId): bool
    {
        $deactivated = $this->licenseApiService->deactivateLicense($licenseKey, $downloadId);

        if ($deactivated) {
            $this->licensePersistence->removeLicenseKey($downloadId);
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
        // First validate the license
        $isValid = $this->licenseApiService->isLicenseValid($licenseKey, $downloadId, $force);

        if (!$isValid) {
            return false;
        }

        // Check if already active
        $isActive = $this->licenseApiService->isLicenseActive($licenseKey, $downloadId, $force);

        if (!$isActive) {
            // Activate if not active
            $activated = $this->licenseApiService->activateLicense($licenseKey, $downloadId, $force);

            if (!$activated) {
                return false;
            }
        }

        // Store the license key locally
        $this->licensePersistence->storeLicenseKey($downloadId, $licenseKey);

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
}
