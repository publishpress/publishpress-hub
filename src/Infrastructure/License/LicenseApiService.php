<?php

/**
 * License API service.
 *
 * @package PublishPress\Hub\Infrastructure\License
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\License;
defined( 'ABSPATH' ) || exit;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\License\Contract\LicenseAdapterInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicenseApiServiceInterface;

class LicenseApiService implements LicenseApiServiceInterface, BootableInterface
{
    use BootableTrait;

    private LicenseAdapterInterface $licenseAdapter;

    /**
     * @param LicenseAdapterInterface $licenseAdapter
     * @since 1.0.0
     */
    public function __construct(
        LicenseAdapterInterface $licenseAdapter
    ) {
        $this->licenseAdapter = $licenseAdapter;
    }

    /**
     * Called when the component is loaded.
     *
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
    }

    /**
     * Called when the component is initialized.
     *
     * @since 1.0.0
     */
    protected function onInit(): void
    {
    }

    /**
     * Check if the license is valid.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Force the check.
     * @return bool True if the license is valid, false otherwise.
     * @since 1.0.0
     */
    public function isLicenseValid(string $licenseKey, int $downloadId, bool $force = false): bool
    {
        return $this->licenseAdapter->isLicenseValid($licenseKey, $downloadId, $force);
    }

    /**
     * Check if the license is active.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Force the check.
     * @return bool True if the license is active, false otherwise.
     * @since 1.0.0
     */
    public function isLicenseActive(string $licenseKey, int $downloadId, bool $force = false): bool
    {
        return $this->licenseAdapter->isLicenseActive($licenseKey, $downloadId, $force);
    }

    /**
     * Activate the license.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Force the activation.
     * @return bool True if the license is activated, false otherwise.
     * @since 1.0.0
     */
    public function activateLicense(string $licenseKey, int $downloadId, bool $force = false): bool
    {
        return $this->licenseAdapter->activateLicense($licenseKey, $downloadId, $force);
    }

    /**
     * Deactivate the license.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @return bool True if the license is deactivated, false otherwise.
     * @since 1.0.0
     */
    public function deactivateLicense(string $licenseKey, int $downloadId): bool
    {
        return $this->licenseAdapter->deactivateLicense($licenseKey, $downloadId);
    }

    /**
     * Get the license info.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Force the check.
     * @return array The license info.
     * @since 1.0.0
     */
    public function getLicenseInfo(string $licenseKey, int $downloadId, bool $force = false): array
    {
        return $this->licenseAdapter->getLicenseInfo($licenseKey, $downloadId, $force);
    }

    /**
     * Get the last version info.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Force the check.
     * @return array The last version info.
     * @since 1.0.0
     */
    public function getLastVersionInfo(string $licenseKey, int $downloadId, bool $force = false): array
    {
        return $this->licenseAdapter->getLastVersionInfo($licenseKey, $downloadId, $force);
    }
}
