<?php

/**
 * License API service interface.
 *
 * @package PublishPress\Hub\Infrastructure\License\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\License\Contract;

defined('ABSPATH') || exit;

interface LicenseApiServiceInterface
{
    /**
     * Check if the license is valid.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Force the check.
     * @return bool True if the license is valid, false otherwise.
     * @since 1.0.0
     */
    public function isLicenseValid(string $licenseKey, int $downloadId, bool $force = false): bool;

    /**
     * Check if the license is active.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Force the check.
     * @return bool True if the license is active, false otherwise.
     * @since 1.0.0
     */
    public function isLicenseActive(string $licenseKey, int $downloadId, bool $force = false): bool;

    /**
     * Activate the license.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Force the activation.
     * @return bool True if the license is activated, false otherwise.
     * @since 1.0.0
     */
    public function activateLicense(string $licenseKey, int $downloadId, bool $force = false): bool;

    /**
     * Deactivate the license.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @return bool True if the license is deactivated, false otherwise.
     * @since 1.0.0
     */
    public function deactivateLicense(string $licenseKey, int $downloadId): bool;

    /**
     * Get the license info.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Force the check.
     * @return array The license info.
     * @since 1.0.0
     */
    public function getLicenseInfo(string $licenseKey, int $downloadId, bool $force = false): array;

    /**
     * Get the last version info.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Force the check.
     * @return array The last version info.
     * @since 1.0.0
     */
    public function getLastVersionInfo(string $licenseKey, int $downloadId, bool $force = false): array;
}
