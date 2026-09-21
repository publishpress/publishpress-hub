<?php

/**
 * License option handler interface.
 *
 * @package PublishPress\Hub\Infrastructure\License\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\License\Contract;
defined( 'ABSPATH' ) || exit;

interface LicenseOptionHandlerInterface
{
    /**
     * Store the license key for a specific download ID.
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
     * Get the license key for a specific download ID.
     *
     * @param int $downloadId The download ID to look up.
     * @return string|null The license key if found, null otherwise.
     * @since 1.0.0
     */
    public function getLicenseKey(int $downloadId): ?string;

    /**
     * Get the license status for a specific download ID.
     *
     * @param int $downloadId The download ID to look up.
     * @return bool The license status.
     * @since 1.0.0
     */
    public function getLicenseStatus(int $downloadId): bool;

    /**
     * Remove the license key and status for a specific download ID.
     *
     * @param int $downloadId The download ID to remove the license key for.
     * @since 1.0.0
     */
    public function remove(int $downloadId): void;

    /**
     * Store the license expiration date for a specific download ID.
     *
     * @param int $downloadId The download ID to associate with the expiration date.
     * @param string|null $expirationDate The expiration date in ISO format (YYYY-MM-DD) or null.
     * @since 1.0.0
     */
    public function storeLicenseExpirationDate(int $downloadId, ?string $expirationDate): void;

    /**
     * Retrieve the license expiration date for a specific download ID.
     *
     * @param int $downloadId The download ID to look up.
     * @return string|null The expiration date in ISO format (YYYY-MM-DD) if found, null otherwise.
     * @since 1.0.0
     */
    public function getLicenseExpirationDate(int $downloadId): ?string;
}
