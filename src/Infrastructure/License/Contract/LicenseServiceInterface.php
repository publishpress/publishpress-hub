<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\License\Contract;

use PublishPress\Hub\Domain\Plugin\Exception\LicenseException;

interface LicenseServiceInterface
{
    public function isLicenseValid(string $licenseKey, int $downloadId, bool $force = false): bool;

    public function isLicenseActive(string $licenseKey, int $downloadId, bool $force = false): bool;

    public function activateLicense(string $licenseKey, int $downloadId, bool $force = false): bool;

    public function getLicenseInfo(string $licenseKey, int $downloadId, bool $force = false): array;

    public function getPluginInfo(string $licenseKey, int $downloadId, bool $force = false): array;
}
