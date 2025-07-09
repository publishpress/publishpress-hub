<?php

namespace PublishPress\Hub\Application\Service\Contracts;

use PublishPress\Hub\Domain\Plugin\Contracts\EddPluginInterface;

interface LicenseServiceInterface extends ServiceInterface
{
    /**
     * Get version information and download link from EDD Software Licensing API.
     *
     * @since 1.0.0
     * @param int $itemId The EDD item ID
     * @param string $licenseKey The license key
     * @return array Version information including download link
     * @throws \Exception If getting version info fails
     */
    public function getVersionInfo(int $itemId, string $licenseKey): array;

    /**
     * Validate and activate a license.
     *
     * @since 1.0.0
     * @param int $itemId
     * @param string $licenseKey
     * @return void
     * @throws LicenseServerException
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
     */
    public function validateAndActivateLicense(int $itemId, string $licenseKey): void;
}
