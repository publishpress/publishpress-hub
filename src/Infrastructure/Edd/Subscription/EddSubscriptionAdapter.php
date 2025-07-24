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
use PublishPress\Hub\Infrastructure\Remote\Exception\RemoteAccessDeniedException;
use PublishPress\Hub\Infrastructure\Remote\HttpDebugger;

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

    private string $userAgent;

    public function __construct(
        string $eddSubscriptionApiUrl,
        string $siteUrl,
        string $userAgent,
        RemoteServiceInterface $remoteService,
        CacheServiceInterface $cacheService
    ) {
        $this->eddSubscriptionApiUrl = $eddSubscriptionApiUrl;
        $this->siteUrl = $siteUrl;
        $this->remoteService = $remoteService;
        $this->cacheService = $cacheService;
        $this->userAgent = $userAgent;
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

        // Prepare request parameters
        $requestBody = [
            'edd_action' => 'check_license',
            'license' => $licenseKey,
            'item_id' => $downloadId,
            'url' => $this->siteUrl,
        ];

        $requestArgs = [
            'body' => $requestBody,
            'timeout' => self::TIMEOUT,
            'sslverify' => true,
            'headers' => $this->getRequestHeaders(),
        ];

        // Debug: Log request details
        HttpDebugger::debugRequest('GET', $this->eddSubscriptionApiUrl, $requestArgs);

        $response = $this->remoteService->get(
            $this->eddSubscriptionApiUrl,
            $requestArgs
        );

        // Debug: Log response details
        HttpDebugger::debugResponse($response);

        if (is_wp_error($response)) {
            throw new LicenseServerException([
                'error_message' => 'Error validating license: ' . $response->get_error_message(),
            ]);
        }

        if ($this->remoteService->getResponseStatusCode($response) === 403) {
            throw new RemoteAccessDeniedException();
        }

        if ($this->remoteService->getResponseStatusCode($response) !== 200) {
            throw new LicenseServerInvalidResponseException();
        }

        $data = $this->remoteService->getDecodedBodyFromResponse($response);

        if (empty($data) || !isset($data['license'])) {
            throw new LicenseServerInvalidResponseException();
        }

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
            // Prepare request parameters
            $requestBody = [
                'edd_action' => 'activate_license',
                'license' => $licenseKey,
                'item_id' => $downloadId,
                'url' => $this->siteUrl,
            ];

            $requestArgs = [
                'body' => $requestBody,
                'timeout' => self::TIMEOUT,
                'sslverify' => true,
                'headers' => $this->getRequestHeaders(),
            ];

            // Debug: Log request details
            HttpDebugger::debugRequest('POST', $this->eddSubscriptionApiUrl, $requestArgs);

            $response = $this->remoteService->post(
                $this->eddSubscriptionApiUrl,
                $requestArgs
            );

            // Debug: Log response details
            HttpDebugger::debugResponse($response);

            if (is_wp_error($response)) {
                throw new LicenseServerException([
                    'error_message' => 'Error activating license: ' . $response->get_error_message(),
                ]);
            }

            if ($this->remoteService->getResponseStatusCode($response) === 403) {
                throw new RemoteAccessDeniedException();
            }

            if ($this->remoteService->getResponseStatusCode($response) !== 200) {
                throw new LicenseServerInvalidResponseException();
            }

            $data = $this->remoteService->getDecodedBodyFromResponse($response);

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
    public function getLastVersionInfo(string $licenseKey, int $downloadId, bool $force = false): array
    {
        $cacheKey = md5('edd_get_plugin_info_' . $licenseKey . '_' . $downloadId);

        $data = $this->cacheService->get($cacheKey);

        if (!empty($data) && !$force) {
            return $data;
        }

        // Prepare request parameters
        $requestBody = [
            'edd_action' => 'get_version',
            'item_id' => $downloadId,
            'license' => $licenseKey,
            'url' => $this->siteUrl,
        ];

        $requestArgs = [
            'body' => $requestBody,
            'timeout' => self::TIMEOUT,
            'sslverify' => true,
            'headers' => $this->getRequestHeaders(),
        ];

        // Debug: Log request details
        HttpDebugger::debugRequest('POST', $this->eddSubscriptionApiUrl, $requestArgs);

        $response = $this->remoteService->post(
            $this->eddSubscriptionApiUrl,
            $requestArgs
        );

        // Debug: Log response details
        HttpDebugger::debugResponse($response);

        if (is_wp_error($response)) {
            throw new LicenseServerException([
                'error_message' => 'Error getting license info: ' . $response->get_error_message(),
            ]);
        }

        if ($this->remoteService->getResponseStatusCode($response) === 403) {
            throw new RemoteAccessDeniedException();
        }

        if ($this->remoteService->getResponseStatusCode($response) !== 200) {
            throw new LicenseServerInvalidResponseException();
        }

        $data = $this->remoteService->getDecodedBodyFromResponse($response);


        if (empty($data)) {
            throw new LicenseServerInvalidResponseException();
        }

        $this->cacheService->set($cacheKey, $data, self::CACHE_TTL);

        return $data;
    }

    private function getRequestHeaders(): array
    {
        return [
            'User-Agent' => $this->userAgent,
            'Accept' => 'application/json, text/plain, */*',
            'Accept-Language' => 'en-US,en;q=0.9',
            'Accept-Encoding' => 'gzip, deflate, br',
            'Content-Type' => 'application/x-www-form-urlencoded',
            'Connection' => 'keep-alive',
            'Sec-Fetch-Dest' => 'empty',
            'Sec-Fetch-Mode' => 'cors',
            'Sec-Fetch-Site' => 'same-origin',
            'Cache-Control' => 'no-cache',
            'Pragma' => 'no-cache',
        ];
    }
}
