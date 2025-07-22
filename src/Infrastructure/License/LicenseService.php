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

    public function validateLicense(string $licenseKey, int $downloadId): bool
    {
        return $this->licenseAdapter->validateLicense($licenseKey, $downloadId);
    }

    public function activateLicense(string $licenseKey, int $downloadId): bool
    {
        return $this->licenseAdapter->activateLicense($licenseKey, $downloadId);
    }

    public function getLicenseInfo(string $licenseKey, int $downloadId): array
    {
        return $this->licenseAdapter->getLicenseInfo($licenseKey, $downloadId);
    }
}
