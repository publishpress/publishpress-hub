<?php

/**
 * Edd subscription adapter.
 *
 * @package PublishPress\Hub\Infrastructure\Edd\Subscription
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Edd\Subscription;

use PublishPress\Hub\Domain\Plugin\Exception\LicenseDisabledException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseExpiredException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidItemIdException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidItemNameException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseKeyMismatchException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseMissingException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseMissingUrlException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseNoActivationsLeftException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseNotActivableException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerInvalidResponseException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseSiteInactiveException;
use PublishPress\Hub\Infrastructure\Edd\Subscription\Contract\LicenseActivationServiceInterface;
use PublishPress\Hub\Infrastructure\Edd\Subscription\Contract\LicenseDeactivationServiceInterface;
use PublishPress\Hub\Infrastructure\Edd\Subscription\Contract\LicenseInfoServiceInterface;
use PublishPress\Hub\Infrastructure\Edd\Subscription\Contract\VersionCheckServiceInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicenseAdapterInterface;

\defined('ABSPATH') || exit;

class EddSubscriptionAdapter implements LicenseAdapterInterface
{
    private LicenseActivationServiceInterface $licenseActivationService;

    private LicenseDeactivationServiceInterface $licenseDeactivationService;

    private LicenseInfoServiceInterface $licenseInfoService;

    private VersionCheckServiceInterface $versionCheckService;

    private LicenseStatusValidator $licenseStatusValidator;

    private const LICENSE_STATUS_VALID = 'valid';

    private const LICENSE_STATUS_INACTIVE = 'inactive';

    private const LICENSE_STATUS_SITE_INACTIVE = 'site_inactive';

    /**
     * @param LicenseActivationServiceInterface $licenseActivationService The license activation service.
     * @param LicenseDeactivationServiceInterface $licenseDeactivationService The license deactivation service.
     * @param LicenseInfoServiceInterface $licenseInfoService The license info service.
     * @param VersionCheckServiceInterface $versionCheckService The version check service.
     * @param LicenseStatusValidator $licenseStatusValidator The license status validator.
     * @since 1.0.0
     */
    public function __construct(
        LicenseActivationServiceInterface $licenseActivationService,
        LicenseDeactivationServiceInterface $licenseDeactivationService,
        LicenseInfoServiceInterface $licenseInfoService,
        VersionCheckServiceInterface $versionCheckService,
        LicenseStatusValidator $licenseStatusValidator
    ) {
        $this->licenseActivationService = $licenseActivationService;
        $this->licenseDeactivationService = $licenseDeactivationService;
        $this->licenseInfoService = $licenseInfoService;
        $this->versionCheckService = $versionCheckService;
        $this->licenseStatusValidator = $licenseStatusValidator;
    }

    /**
     * Get the license info.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Whether to force the license info to be fetched from the server.
     * @throws LicenseServerException
     * @throws LicenseServerInvalidResponseException
     * @return array<string, mixed> The license info.
     * @since 1.0.0
     */
    public function getLicenseInfo(string $licenseKey, int $downloadId, bool $force = false): array
    {
        return $this->licenseInfoService->getLicenseInfo($licenseKey, $downloadId, $force);
    }

    /**
     * Check if the license is valid.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Whether to force the license info to be fetched from the server.
     * @throws LicenseServerException
     * @throws LicenseServerInvalidResponseException
     * @throws LicenseMissingException
     * @throws LicenseMissingUrlException
     * @throws LicenseNotActivableException
     * @throws LicenseDisabledException
     * @throws LicenseNoActivationsLeftException
     * @throws LicenseExpiredException
     * @throws LicenseKeyMismatchException
     * @throws LicenseInvalidItemIdException
     * @throws LicenseInvalidItemNameException
     * @throws LicenseSiteInactiveException
     * @throws LicenseInvalidException
     * @return bool True if the license is valid, false otherwise.
     * @since 1.0.0
     */
    public function isLicenseValid(string $licenseKey, int $downloadId, bool $force = false): bool
    {
        $data = $this->getLicenseInfo($licenseKey, $downloadId, $force);
        $operation = 'is_license_valid';

        $this->licenseStatusValidator->assertLicenseStatusOrThrow(
            ($data['error'] ?? '') === 'expired' ? 'expired' : $data['license'],
            [
                self::LICENSE_STATUS_VALID,
                self::LICENSE_STATUS_INACTIVE,
                self::LICENSE_STATUS_SITE_INACTIVE,
            ],
            $operation
        );

        return true;
    }

    /**
     * Check if the license is active.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Whether to force the license info to be fetched from the server.
     * @throws LicenseServerException
     * @throws LicenseServerInvalidResponseException
     * @return bool True if the license is active, false otherwise.
     * @since 1.0.0
     */
    public function isLicenseActive(string $licenseKey, int $downloadId, bool $force = false): bool
    {
        $data = $this->getLicenseInfo($licenseKey, $downloadId, $force);

        return $data['license'] === self::LICENSE_STATUS_VALID;
    }

    /**
     * Activate the license.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Whether to force the license info to be fetched from the server.
     * @throws LicenseServerException
     * @throws LicenseServerInvalidResponseException
     * @throws LicenseMissingException
     * @throws LicenseMissingUrlException
     * @throws LicenseNotActivableException
     * @throws LicenseDisabledException
     * @throws LicenseNoActivationsLeftException
     * @throws LicenseExpiredException
     * @throws LicenseKeyMismatchException
     * @throws LicenseInvalidItemIdException
     * @throws LicenseInvalidItemNameException
     * @throws LicenseSiteInactiveException
     * @throws LicenseInvalidException
     * @return bool True if the license is activated, false otherwise.
     * @since 1.0.0
     */
    public function activateLicense(string $licenseKey, int $downloadId, bool $force = false): bool
    {
        $data = $this->licenseActivationService->activateLicense($licenseKey, $downloadId, $force);

        $this->licenseStatusValidator->assertLicenseStatusOrThrow(
            ($data['error'] ?? '') === 'expired' ? 'expired' : $data['license'],
            [self::LICENSE_STATUS_VALID],
            'activate_license'
        );

        return true;
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
        $this->licenseDeactivationService->deactivateLicense($licenseKey, $downloadId);

        return true;
    }

    /**
     * Get the last version info.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Whether to force the license info to be fetched from the server.
     * @throws LicenseServerException
     * @throws LicenseServerInvalidResponseException
     * @return array<string, mixed> The last version info.
     * @since 1.0.0
     */
    public function getLastVersionInfo(string $licenseKey, int $downloadId, bool $force = false): array
    {
        return $this->versionCheckService->getLastVersionInfo($licenseKey, $downloadId, $force);
    }
}
