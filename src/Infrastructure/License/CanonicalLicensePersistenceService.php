<?php

/**
 * License persistence service.
 *
 * @package PublishPress\Hub\Infrastructure\License
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\License;

use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;
use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;

class CanonicalLicensePersistenceService implements LicensePersistenceInterface
{
    private const OPTION_SUFFIX_STATUS = '_status';

    private WPOptionsAdapterInterface $optionsAdapter;

    private string $optionPrefix;

    /**
     * @param WPOptionsAdapterInterface $optionsAdapter The options adapter.
     * @param string $optionPrefix The option prefix.
     * @since 1.0.0
     */
    public function __construct(WPOptionsAdapterInterface $optionsAdapter, string $optionPrefix)
    {
        $this->optionsAdapter = $optionsAdapter;
        $this->optionPrefix = $optionPrefix;
    }

    /**
     * Store the license key.
     *
     * @param int $downloadId The download ID.
     * @param string $licenseKey The license key.
     * @since 1.0.0
     */
    public function storeLicenseKey(int $downloadId, string $licenseKey): void
    {
        $optionName = $this->buildOptionName($downloadId);
        $this->optionsAdapter->updateOption($optionName, $licenseKey, true);
    }

    /**
     * Store the license status.
     *
     * @param int $downloadId The download ID.
     * @param bool $isLicenseValid The license status.
     * @since 1.0.0
     */
    public function storeLicenseStatus(int $downloadId, bool $isLicenseValid): void
    {
        $optionName = $this->buildOptionName($downloadId, self::OPTION_SUFFIX_STATUS);
        $this->optionsAdapter->updateOption($optionName, $isLicenseValid, true);
    }

    /**
     * Get the license key.
     *
     * @param int $downloadId The download ID.
     * @return string|null The license key.
     * @since 1.0.0
     */
    public function getLicenseKey(int $downloadId): ?string
    {
        $optionName = $this->buildOptionName($downloadId);
        $licenseKey = $this->optionsAdapter->getOption($optionName, null);

        return $licenseKey !== null && $licenseKey !== false ? (string)$licenseKey : null;
    }

    /**
     * Get the license status.
     *
     * @param int $downloadId The download ID.
     * @return bool The license status.
     * @since 1.0.0
     */
    public function getLicenseStatus(int $downloadId): bool
    {
        $optionName = $this->buildOptionName($downloadId, self::OPTION_SUFFIX_STATUS);
        $licenseStatus = $this->optionsAdapter->getOption($optionName, null);

        return $licenseStatus !== null && $licenseStatus !== false ? (bool)$licenseStatus : false;
    }

    /**
     * Remove the license key.
     *
     * @param int $downloadId The download ID.
     * @since 1.0.0
     */
    public function removeLicense(int $downloadId): void
    {
        $optionName = $this->buildOptionName($downloadId);
        $this->optionsAdapter->deleteOption($optionName);

        $optionName = $this->buildOptionName($downloadId, self::OPTION_SUFFIX_STATUS);
        $this->optionsAdapter->deleteOption($optionName);
    }

    /**
     * Check if the license key exists.
     *
     * @param int $downloadId The download ID.
     * @return bool True if the license key exists, false otherwise.
     * @since 1.0.0
     */
    public function hasLicenseKey(int $downloadId): bool
    {
        $optionName = $this->buildOptionName($downloadId);
        return $this->optionsAdapter->optionExists($optionName);
    }

    /**
     * Get the download IDs using the license key.
     *
     * @param string $licenseKey The license key.
     * @return array The download IDs.
     * @since 1.0.0
     */
    public function getDownloadIdsUsingLicenseKey(string $licenseKey): array
    {
        $downloadIds = [];

        // Get all options with our prefix
        $allOptions = $this->optionsAdapter->getAllOptionsWithPrefix($this->optionPrefix);

        foreach ($allOptions as $optionName => $storedLicenseKey) {
            if ($storedLicenseKey === $licenseKey) {
                // Extract download ID from option name
                $downloadId = $this->extractDownloadIdFromOptionName($optionName);
                if ($downloadId !== null) {
                    $downloadIds[] = $downloadId;
                }
            }
        }

        return $downloadIds;
    }

    /**
     * Build an option name for the given download ID.
     *
     * @param int $downloadId The download ID
     * @return string The option name
     * @since 1.0.0
     */
    private function buildOptionName(int $downloadId, string $optionSuffix = ''): string
    {
        return "{$this->optionPrefix}$downloadId$optionSuffix";
    }

    /**
     * Extract download ID from option name.
     *
     * @param string $optionName The option name
     * @return int|null The download ID or null if extraction fails
     * @since 1.0.0
     */
    private function extractDownloadIdFromOptionName(string $optionName): ?int
    {
        $prefix = $this->optionPrefix;

        if (strpos($optionName, $prefix) !== 0) {
            return null;
        }

        $downloadIdString = substr($optionName, strlen($prefix));

        if (!is_numeric($downloadIdString)) {
            return null;
        }

        return (int) $downloadIdString;
    }
}
