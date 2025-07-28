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

    /**
     * Build an option name for the given download ID.
     *
     * @param int $downloadId The download ID
     * @return string The option name
     */
    private function buildOptionName(int $downloadId): string
    {
        return $this->optionPrefix . $downloadId;
    }
}
