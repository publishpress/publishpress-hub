<?php

/**
 * License persistence interface.
 *
 * @package PublishPress\Hub\Infrastructure\License\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\License\Contract;

interface LicensePersistenceInterface
{
    /**
     * Store a license key for a specific download ID.
     *
     * @param int $downloadId The download ID to associate with the license key.
     * @param string $licenseKey The license key to store.
     * @since 1.0.0
     */
    public function storeLicenseKey(int $downloadId, string $licenseKey): void;

    /**
     * Store the license status for a specific download ID.
     *
     * @param int $downloadId The download ID to associate with the license status.
     * @param bool $isLicenseValid The license status to store.
     * @since 1.0.0
     */
    public function storeLicenseStatus(int $downloadId, bool $isLicenseValid): void;

    /**
     * Retrieve a license key for a specific download ID.
     *
     * @param int $downloadId The download ID to look up.
     * @return string|null The license key if found, null otherwise.
     * @since 1.0.0
     */
    public function getLicenseKey(int $downloadId): ?string;

    /**
     * Retrieve the license status for a specific download ID.
     *
     * @param int $downloadId The download ID to look up.
     * @return bool The license status.
     * @since 1.0.0
     */
    public function getLicenseStatus(int $downloadId): bool;

    /**
     * Remove a license key and status for a specific download ID.
     *
     * @param int $downloadId The download ID to remove the license key for.
     * @since 1.0.0
     */
    public function removeLicense(int $downloadId): void;

    /**
     * Check if a license key exists for a specific download ID.
     *
     * @param int $downloadId The download ID to check.
     * @return bool True if a license key exists, false otherwise.
     * @since 1.0.0
     */
    public function hasLicenseKey(int $downloadId): bool;

    /**
     * Find all download IDs that use the specified license key.
     *
     * @param string $licenseKey The license key to search for.
     * @return int[] Array of download IDs that use this license key.
     * @since 1.0.0
     */
    public function getDownloadIdsUsingLicenseKey(string $licenseKey): array;

    /**
     * Store the license expiration date for a specific download ID.
     * The expiration date is stored by license key, so it can be reused across plugins using the same key.
     *
     * @param int $downloadId The download ID to associate with the expiration date.
     * @param string|null $expirationDate The expiration date in ISO format (YYYY-MM-DD) or null.
     * @since 1.0.0
     */
    public function storeLicenseExpirationDate(int $downloadId, ?string $expirationDate): void;

    /**
     * Retrieve the license expiration date for a specific download ID.
     * The expiration date is retrieved by license key, so it's shared across plugins using the same key.
     *
     * @param int $downloadId The download ID to look up.
     * @return string|null The expiration date in ISO format (YYYY-MM-DD) if found, null otherwise.
     * @since 1.0.0
     */
    public function getLicenseExpirationDate(int $downloadId): ?string;

    /**
     * Store the license expiration date for a specific license key.
     * This allows the expiration date to be shared across all plugins using the same license key.
     *
     * @param string $licenseKey The license key to associate with the expiration date.
     * @param string|null $expirationDate The expiration date in ISO format (YYYY-MM-DD) or null.
     * @since 1.0.0
     */
    public function storeLicenseExpirationDateByKey(string $licenseKey, ?string $expirationDate): void;

    /**
     * Retrieve the license expiration date for a specific license key.
     *
     * @param string $licenseKey The license key to look up.
     * @return string|null The expiration date in ISO format (YYYY-MM-DD) if found, null otherwise.
     * @since 1.0.0
     */
    public function getLicenseExpirationDateByKey(string $licenseKey): ?string;

    /**
     * Check if a license is currently from a constant.
     *
     * @param int $downloadId The download ID to check.
     * @return bool True if license is from constant, false otherwise.
     * @since 1.0.0
     */
    public function isLicenseFromConstant(int $downloadId): bool;

    /**
     * Check if a license was ever from a constant (even if constant is now removed).
     *
     * @param int $downloadId The download ID to check.
     * @return bool True if license was from constant, false otherwise.
     * @since 1.0.0
     */
    public function wasLicenseFromConstant(int $downloadId): bool;

    /**
     * Mark a license as from constant or not.
     *
     * @param int $downloadId The download ID to mark.
     * @param bool $fromConstant Whether the license is from constant.
     * @since 1.0.0
     */
    public function markLicenseFromConstant(int $downloadId, bool $fromConstant): void;
}
