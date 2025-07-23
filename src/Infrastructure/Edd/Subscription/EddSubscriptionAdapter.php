<?php

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
use PublishPress\Hub\Infrastructure\Cache\Contract\CacheServiceInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicenseAdapterInterface;
use PublishPress\Hub\Infrastructure\Remote\Contract\RemoteServiceInterface;

class EddSubscriptionAdapter implements LicenseAdapterInterface
{
    private string $eddSubscriptionApiUrl;

    private string $siteUrl;

    private RemoteServiceInterface $remoteService;

    private CacheServiceInterface $cacheService;

    /**
     * Cache TTL in seconds
     */
    private const CACHE_TTL = 30;

    /**
     * Timeout in seconds
     */
    private const TIMEOUT = 15;

    private const LICENSE_STATUS_VALID = 'valid';
    private const LICENSE_STATUS_INACTIVE = 'inactive';
    private const LICENSE_STATUS_INVALID = 'invalid';
    private const LICENSE_STATUS_MISSING = 'missing';
    private const LICENSE_STATUS_NOT_ACTIVABLE = 'license_not_activable';
    private const LICENSE_STATUS_DISABLED = 'disabled';
    private const LICENSE_STATUS_NO_ACTIVATIONS_LEFT = 'no_activations_left';
    private const LICENSE_STATUS_EXPIRED = 'expired';
    private const LICENSE_STATUS_KEY_MISMATCH = 'key_mismatch';
    private const LICENSE_STATUS_INVALID_ITEM_ID = 'invalid_item_id';
    private const LICENSE_STATUS_ITEM_NAME_MISMATCH = 'item_name_mismatch';
    private const LICENSE_STATUS_SITE_INACTIVE = 'site_inactive';

    public function __construct(
        string $eddSubscriptionApiUrl,
        string $siteUrl,
        RemoteServiceInterface $remoteService,
        CacheServiceInterface $cacheService
    ) {
        $this->eddSubscriptionApiUrl = $eddSubscriptionApiUrl;
        $this->siteUrl = $siteUrl;
        $this->remoteService = $remoteService;
        $this->cacheService = $cacheService;
    }

    /**
     * @throws LicenseServerException
     * @throws LicenseServerInvalidResponseException
     */
    public function getLicenseInfo(string $licenseKey, int $downloadId, bool $force = false): array
    {
        $cacheKey = md5('edd_check_license_' . $licenseKey . '_' . $downloadId);

        $data = $this->cacheService->get($cacheKey);

        if (!empty($data) && !$force) {
            return $data;
        }

        $response = $this->remoteService->get(
            $this->eddSubscriptionApiUrl,
            [
                'body' => [
                    'edd_action' => 'check_license',
                    'license' => $licenseKey,
                    'item_id' => $downloadId,
                    'url' => $this->siteUrl,
                ],
                'timeout' => self::TIMEOUT,
                'sslverify' => true,
            ]
        );

        if (is_wp_error($response)) {
            throw new LicenseServerException([
                'error_message' => 'Error validating license: ' . $response->get_error_message(),
            ]);
        }

        $responseData = $this->remoteService->decodeResponseBody($response);

        if (empty($responseData) || !isset($responseData['license'])) {
            throw new LicenseServerInvalidResponseException();
        }

        $data = $responseData;
        $this->cacheService->set($cacheKey, $data, self::CACHE_TTL);

        return $data;
    }

    /**
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
     */
    public function isLicenseValid(string $licenseKey, int $downloadId, bool $force = false): bool
    {
        $data = $this->getLicenseInfo($licenseKey, $downloadId, $force);

        $this->assertLicenseStatusOrThrow(
            $data['license'],
            [
                self::LICENSE_STATUS_VALID,
                self::LICENSE_STATUS_INACTIVE,
                self::LICENSE_STATUS_SITE_INACTIVE,
            ]
        );

        return true;
    }

    /**
     * @throws LicenseServerException
     * @throws LicenseServerInvalidResponseException
     */
    public function isLicenseActive(string $licenseKey, int $downloadId, bool $force = false): bool
    {
        $data = $this->getLicenseInfo($licenseKey, $downloadId, $force);

        return $data['license'] === self::LICENSE_STATUS_VALID;
    }

    /**
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
     */
    public function activateLicense(string $licenseKey, int $downloadId, bool $force = false): bool
    {
        $cacheKey = md5('edd_activate_license_' . $licenseKey . '_' . $downloadId);

        $data = $this->cacheService->get($cacheKey);

        if (empty($data) || $force) {
            $response = $this->remoteService->post(
                $this->eddSubscriptionApiUrl,
                [
                    'body' => [
                        'edd_action' => 'activate_license',
                        'license' => $licenseKey,
                        'item_id' => $downloadId,
                        'url' => $this->siteUrl,
                    ],
                    'timeout' => self::TIMEOUT,
                    'sslverify' => true,
                ]
            );

            if (is_wp_error($response)) {
                throw new LicenseServerException([
                    'error_message' => 'Error activating license: ' . $response->get_error_message(),
                ]);
            }

            $data = $this->remoteService->decodeResponseBody($response);

            if (empty($data) || !isset($data['license'])) {
                throw new LicenseServerInvalidResponseException();
            }

            $this->cacheService->set($cacheKey, $data, self::CACHE_TTL);
        }

        $this->assertLicenseStatusOrThrow($data['license'], [self::LICENSE_STATUS_VALID]);

        return true;
    }

    /**
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
    private function assertLicenseStatusOrThrow(string $license, array $acceptableResults): void
    {
        if (in_array($license, $acceptableResults)) {
            return;
        }

        switch ($license) {
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
                    'error_message' => 'Unknown license error: ' . $license,
                ]);
        }
    }

    /**
     * @throws LicenseServerException
     * @throws LicenseServerInvalidResponseException
     */
    public function getPluginInfo(string $licenseKey, int $downloadId, bool $force = false): array
    {
        $cacheKey = md5('edd_get_plugin_info_' . $licenseKey . '_' . $downloadId);

        $data = $this->cacheService->get($cacheKey);

        if (!empty($data) && !$force) {
            return $data;
        }

        $response = $this->remoteService->post(
            $this->eddSubscriptionApiUrl,
            [
                'body' => [
                    'edd_action' => 'get_version',
                    'license' => $licenseKey,
                    'item_id' => $downloadId,
                    'url' => $this->siteUrl,
                ],
                'timeout' => self::TIMEOUT,
                'sslverify' => true,
            ]
        );

        if (is_wp_error($response)) {
            throw new LicenseServerException([
                'error_message' => 'Error getting license info: ' . $response->get_error_message(),
            ]);
        }

        $data = $this->remoteService->decodeResponseBody($response);

        if (!$data) {
            throw new LicenseServerInvalidResponseException();
        }

        $this->cacheService->set($cacheKey, $data, self::CACHE_TTL);

        return $data;
    }
}
