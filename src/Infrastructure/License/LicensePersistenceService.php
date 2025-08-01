<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\License;

use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;
use PublishPress\Hub\Infrastructure\WordPress\Options\Contract\OptionsAdapterInterface;

class LicensePersistenceService implements LicensePersistenceInterface
{
    private OptionsAdapterInterface $optionsAdapter;
    private string $optionPrefix;

    public function __construct(OptionsAdapterInterface $optionsAdapter, string $optionPrefix)
    {
        $this->optionsAdapter = $optionsAdapter;
        $this->optionPrefix = $optionPrefix;
    }

    public function storeLicenseKey(int $downloadId, string $licenseKey): void
    {
        $optionName = $this->buildOptionName($downloadId);
        $this->optionsAdapter->updateOption($optionName, $licenseKey, true);
    }

    public function getLicenseKey(int $downloadId): ?string
    {
        $optionName = $this->buildOptionName($downloadId);
        $licenseKey = $this->optionsAdapter->getOption($optionName, null);

        return $licenseKey !== null && $licenseKey !== false ? (string)$licenseKey : null;
    }

    public function removeLicenseKey(int $downloadId): void
    {
        $optionName = $this->buildOptionName($downloadId);
        $this->optionsAdapter->deleteOption($optionName);
    }

    public function hasLicenseKey(int $downloadId): bool
    {
        $optionName = $this->buildOptionName($downloadId);
        return $this->optionsAdapter->optionExists($optionName);
    }

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
     */
    private function buildOptionName(int $downloadId): string
    {
        return "{$this->optionPrefix}$downloadId";
    }

    /**
     * Extract download ID from option name.
     *
     * @param string $optionName The option name
     * @return int|null The download ID or null if extraction fails
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
