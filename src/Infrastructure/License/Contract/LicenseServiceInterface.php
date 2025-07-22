<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\License\Contract;

interface LicenseServiceInterface
{
    public function validateAndActivateLicense(string $licenseKey, int $downloadId): void;

    public function activateLicense(string $licenseKey, int $downloadId): void;

    public function getLicenseInfo(string $licenseKey, int $downloadId): array;
}
