<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\License;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\License\Contract\LicenseAdapterInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicenseServiceInterface;

class LicenseService implements LicenseServiceInterface, BootableInterface
{
    use BootableTrait;

    private LicenseAdapterInterface $licenseAdapter;

    public function __construct(
        LicenseAdapterInterface $licenseAdapter
    ) {
        $this->licenseAdapter = $licenseAdapter;
    }

    protected function onLoad(): void
    {
    }

    protected function onInit(): void
    {
    }

    public function isLicenseValid(string $licenseKey, int $downloadId, bool $force = false): bool
    {
        return $this->licenseAdapter->isLicenseValid($licenseKey, $downloadId, $force);
    }

    public function isLicenseActive(string $licenseKey, int $downloadId, bool $force = false): bool
    {
        return $this->licenseAdapter->isLicenseActive($licenseKey, $downloadId, $force);
    }

    public function activateLicense(string $licenseKey, int $downloadId, bool $force = false): bool
    {
        return $this->licenseAdapter->activateLicense($licenseKey, $downloadId, $force);
    }

    public function getLicenseInfo(string $licenseKey, int $downloadId, bool $force = false): array
    {
        return $this->licenseAdapter->getLicenseInfo($licenseKey, $downloadId, $force);
    }

    public function getPluginInfo(string $licenseKey, int $downloadId, bool $force = false): array
    {
        return $this->licenseAdapter->getPluginInfo($licenseKey, $downloadId, $force);
    }
}
