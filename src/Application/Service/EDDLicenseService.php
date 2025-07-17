<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Service\Contracts\LicenseServiceInterface;
use PublishPress\Hub\Domain\Exception\License\LicenseDisabledException;
use PublishPress\Hub\Domain\Exception\License\LicenseExpiredException;
use PublishPress\Hub\Domain\Exception\License\LicenseInvalidException;
use PublishPress\Hub\Domain\Exception\License\LicenseInvalidItemIdException;
use PublishPress\Hub\Domain\Exception\License\LicenseInvalidItemNameException;
use PublishPress\Hub\Domain\Exception\License\LicenseKeyMismatchException;
use PublishPress\Hub\Domain\Exception\License\LicenseMissingException;
use PublishPress\Hub\Domain\Exception\License\LicenseMissingUrlException;
use PublishPress\Hub\Domain\Exception\License\LicenseNoActivationsLeftException;
use PublishPress\Hub\Domain\Exception\License\LicenseNotActivableException;
use PublishPress\Hub\Domain\Exception\License\LicenseServerException;
use PublishPress\Hub\Domain\Exception\License\LicenseServerInvalidResponseException;
use PublishPress\Hub\Domain\Exception\License\LicenseSiteInactiveException;

class EDDLicenseService implements LicenseServiceInterface
{
    /**
     * Service initialization status.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $initialized = false;

    /**
     * Home URL.
     *
     * @since 1.0.0
     * @var string
     */
    private string $homeUrl;

    /**
     * Store URL.
     *
     * @since 1.0.0
     * @var string
     */
    private string $storeUrl;

    /**
     * Constructor.
     *
     * @since 1.0.0
     * @param string $homeUrl
     * @param string $storeUrl
     */
    public function __construct(string $homeUrl, string $storeUrl)
    {
        $this->homeUrl = $homeUrl;
        $this->storeUrl = $storeUrl;
    }

    /**
     * Initialize the service.
     *
     * @return self
     */
    public function initialize(): self
    {
        $this->initialized = true;
        return $this;
    }

    /**
     * Check if the service is initialized.
     *
     * @return bool
     */
    public function isInitialized(): bool
    {
        return $this->initialized;
    }

    /**
     * Validate a license.
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
    public function validateAndActivateLicense(int $itemId, string $licenseKey): void
    {
        $apiParams = [
            'edd_action' => 'check_license',
            'item_id' => $itemId,
            'license' => $licenseKey,
            'url' => $this->homeUrl,
        ];

        $response = wp_remote_post($this->storeUrl, [
            'body' => $apiParams,
            'timeout' => 15,
            'sslverify' => true,
        ]);

        if (is_wp_error($response)) {
            throw new LicenseServerException([
                'error_message' => $response->get_error_message(),
            ]);
        }

        $licenseData = json_decode(wp_remote_retrieve_body($response), true);

        if (!$licenseData || !isset($licenseData['license'])) {
            throw new LicenseServerInvalidResponseException();
        }

        $this->validateLicenseData($licenseData, ['valid', 'inactive', 'site_inactive']);

        if ($licenseData['license'] === 'inactive' || $licenseData['license'] === 'site_inactive') {
            // Does the user have enough activations left?
            if ($licenseData['activations_left'] > 0) {
                // Activate the license
                $this->activateLicense($itemId, $licenseKey);

                return;
            }

            throw new LicenseNoActivationsLeftException();
        }
    }

     /**
     * Get version information and download link from EDD Software Licensing API.
     *
     * @since 1.0.0
     * @param int $itemId The EDD item ID
     * @param string $licenseKey The license key
     * @return array Version information including download link
     * @throws \Exception If getting version info fails
     */
    public function getVersionInfo(int $itemId, string $licenseKey): array
    {
        $apiParams = [
            'edd_action' => 'get_version',
            'item_id' => $itemId,
            'license' => $licenseKey,
            'url' => $this->homeUrl,
        ];

        $response = wp_remote_post($this->storeUrl, [
            'body' => $apiParams,
            'timeout' => 15,
            'sslverify' => true,
        ]);

        if (is_wp_error($response)) {
            throw new LicenseServerException([
                'error_message' => $response->get_error_message(),
            ]);
        }

        $versionData = json_decode(wp_remote_retrieve_body($response), true);

        if (!$versionData) {
            throw new LicenseServerInvalidResponseException();
        }

        return $versionData;
    }

    /**
     * Activate a license.
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
    private function activateLicense(int $itemId, string $licenseKey): void
    {
        $apiParams = [
            'edd_action' => 'activate_license',
            'item_id' => $itemId,
            'license' => $licenseKey,
            'url' => $this->homeUrl,
        ];

        $response = wp_remote_post($this->storeUrl, [
            'body' => $apiParams,
            'timeout' => 15,
            'sslverify' => true,
        ]);

        if (is_wp_error($response)) {
            throw new LicenseServerException([
                'error_message' => 'Failed to activate license: ' . $response->get_error_message(),
            ]);
        }

        $licenseData = json_decode(wp_remote_retrieve_body($response), true);

        if (!$licenseData || !isset($licenseData['license'])) {
            throw new LicenseServerInvalidResponseException();
        }

        $this->validateLicenseData($licenseData, ['valid']);
    }

    /**
     * Validate license data.
     *
     * @since 1.0.0
     * @param array $licenseData The license data
     * @param array $acceptableResults The results to accept
     * @return void
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
     * @throws LicenseServerException
     */
    private function validateLicenseData(array $licenseData, array $acceptableResults = []): void
    {
        if (in_array($licenseData['license'], $acceptableResults)) {
            return;
        }

        switch ($licenseData['license']) {
            case 'missing':
                throw new LicenseMissingException();
            case 'missing_url':
                throw new LicenseMissingUrlException();
            case 'license_not_activable':
                throw new LicenseNotActivableException();
            case 'disabled':
                throw new LicenseDisabledException();
            case 'no_activations_left':
                throw new LicenseNoActivationsLeftException();
            case 'expired':
                throw new LicenseExpiredException();
            case 'key_mismatch':
                throw new LicenseKeyMismatchException();
            case 'invalid_item_id':
                throw new LicenseInvalidItemIdException();
            case 'item_name_mismatch':
                throw new LicenseInvalidItemNameException();
            // TODO: Check if this is really an issue, since we should activate the license if it's inactive
            case 'site_inactive':
                throw new LicenseSiteInactiveException();
            case 'invalid':
                throw new LicenseInvalidException();

            default:
                throw new LicenseServerException([
                    'error_message' => 'Unknown license error: ' . $licenseData['license'],
                ]);
        }
    }
}
