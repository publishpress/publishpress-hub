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
     * Retrieve a license key for a specific download ID.
     *
     * @param int $downloadId The download ID to look up.
     * @return string|null The license key if found, null otherwise.
     * @since 1.0.0
     */
    public function getLicenseKey(int $downloadId): ?string;

    /**
     * Remove a license key for a specific download ID.
     *
     * @param int $downloadId The download ID to remove the license key for.
     * @since 1.0.0
     */
    public function removeLicenseKey(int $downloadId): void;

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
}
