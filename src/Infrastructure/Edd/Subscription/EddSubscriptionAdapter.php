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

use PublishPress\Hub\Domain\Plugin\Exception\LicenseActivationException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseDeactivationException;
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
use PublishPress\Hub\Domain\Plugin\Exception\UnknownLicenseServerException;
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

    private const CACHE_TTL_IN_SECONDS = 10;

    private const TIMEOUT_IN_SECONDS = 15;

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

    /**
     * @param string $eddSubscriptionApiUrl The URL of the Edd subscription API.
     * @param string $siteUrl The URL of the site.
     * @param string $userAgent The user agent.
     * @param RemoteServiceInterface $remoteService The remote service.
     * @param CacheServiceInterface $cacheService The cache service.
     * @since 1.0.0
     */
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
        $cacheKey = md5('edd_check_license_' . $licenseKey . '_' . $downloadId);
        $operation = 'get_license_info';

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
            'timeout' => self::TIMEOUT_IN_SECONDS,
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
                'error_message' => sprintf(
                    // translators: %s is the error message
                    esc_html__('Error validating license: %s', 'publishpress-hub'),
                    esc_html($response->get_error_message())
                ),
                'operation' => esc_html($operation),
            ]);
        }

        $this->handlePossibleInvalidResponse($response, $operation);

        $data = $this->remoteService->getDecodedBodyFromResponse($response);

        if (empty($data) || !isset($data['license'])) {
            throw new LicenseServerInvalidResponseException([
                'operation' => esc_html($operation),
            ]);
        }

        $this->cacheService->set($cacheKey, $data, self::CACHE_TTL_IN_SECONDS);

        return $data;
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

        $this->assertLicenseStatusOrThrow(
            $data['license'],
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
        $cacheKey = md5("edd_activate_license_{$licenseKey}_$downloadId");
        $operation = 'activate_license';

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
                'timeout' => self::TIMEOUT_IN_SECONDS,
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
                throw new LicenseActivationException([
                    'error_message' => esc_html($response->get_error_message()),
                    'operation' => esc_html($operation),
                ]);
            }

            $this->handlePossibleInvalidResponse($response, $operation);

            $data = $this->remoteService->getDecodedBodyFromResponse($response);

            if (empty($data) || !isset($data['license'])) {
                throw new LicenseServerInvalidResponseException([
                    'operation' => esc_html($operation),
                ]);
            }

            $this->cacheService->set($cacheKey, $data, self::CACHE_TTL_IN_SECONDS);
        }

        $this->assertLicenseStatusOrThrow(
            $data['license'],
            [self::LICENSE_STATUS_VALID],
            $operation
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
        $operation = 'deactivate_license';

        // Prepare request parameters
        $requestBody = [
            'edd_action' => 'deactivate_license',
            'license' => $licenseKey,
            'item_id' => $downloadId,
            'url' => $this->siteUrl,
        ];

        $requestArgs = [
            'body' => $requestBody,
            'timeout' => self::TIMEOUT_IN_SECONDS,
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
            throw new LicenseDeactivationException([
                'error_message' => esc_html($response->get_error_message()),
                'operation' => esc_html($operation),
            ]);
        }

        $this->handlePossibleInvalidResponse($response, $operation);

        $data = $this->remoteService->getDecodedBodyFromResponse($response);

        if (empty($data)) {
            throw new LicenseServerInvalidResponseException([
                'operation' => esc_html($operation),
            ]);
        }

        return true;
    }

    /**
     * Assert the license status or throw an exception.
     *
     * @param string $license The license status.
     * @param array<string> $acceptableResults The acceptable results.
     * @param string $operation The operation.
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
     * @return void
     * @since 1.0.0
     */
    private function assertLicenseStatusOrThrow(
        string $license,
        array $acceptableResults,
        string $operation = ''
    ): void {
        if (in_array($license, $acceptableResults)) {
            return;
        }

        $context = [];

        if ($operation) {
            $context['operation'] = esc_html($operation);
        }

        // phpcs:disable WordPress.Security.EscapeOutput.ExceptionNotEscaped
        switch ($license) {
            case 'missing':
                throw new LicenseMissingException($context);
            case 'missing_url':
                throw new LicenseMissingUrlException($context);
            case 'license_not_activable':
                throw new LicenseNotActivableException($context);
            case 'disabled':
                throw new LicenseDisabledException($context);
            case 'no_activations_left':
                throw new LicenseNoActivationsLeftException($context);
            case 'expired':
                throw new LicenseExpiredException($context);
            case 'key_mismatch':
                throw new LicenseKeyMismatchException($context);
            case 'invalid_item_id':
                throw new LicenseInvalidItemIdException($context);
            case 'item_name_mismatch':
                throw new LicenseInvalidItemNameException($context);
            case 'site_inactive':
                throw new LicenseSiteInactiveException($context);
            case 'invalid':
                throw new LicenseInvalidException($context);
            default:
                throw new UnknownLicenseServerException($context);
        }
        // phpcs:enable WordPress.Security.EscapeOutput.ExceptionNotEscaped
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
        $cacheKey = md5("edd_get_plugin_info_{$licenseKey}_$downloadId");
        $operation = 'get_last_version_info';

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
            'timeout' => self::TIMEOUT_IN_SECONDS,
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
                'error_message' => sprintf(
                    // translators: %s is the error message
                    esc_html__('Error getting license info: %s', 'publishpress-hub'),
                    esc_html($response->get_error_message())
                ),
                'operation' => esc_html($operation),
            ]);
        }

        $this->handlePossibleInvalidResponse($response, $operation);

        $data = $this->remoteService->getDecodedBodyFromResponse($response);

        if (empty($data)) {
            throw new LicenseServerInvalidResponseException([
                'operation' => esc_html($operation),
            ]);
        }

        $this->cacheService->set($cacheKey, $data, self::CACHE_TTL_IN_SECONDS);

        return $data;
    }

    /**
     * Get the request headers.
     *
     * @return array<string, string> The request headers.
     * @since 1.0.0
     */
    private function getRequestHeaders(): array
    {
        return [
            'User-Agent' => $this->userAgent,
            'Accept' => 'application/json, text/plain, */*',
            'Accept-Language' => 'en-US,en;q=0.9',
            'Accept-Encoding' => 'gzip, deflate',
            'Content-Type' => 'application/x-www-form-urlencoded',
            'Connection' => 'keep-alive',
            'Referer' => $this->siteUrl,
            'Origin' => $this->siteUrl,
            'Cache-Control' => 'no-cache',
            'Pragma' => 'no-cache',
        ];
    }

    /**
     * Handle possible invalid response.
     *
     * @param array<string, mixed> $response The response.
     * @param string $operation The operation.
     * @throws RemoteAccessDeniedException
     * @throws LicenseServerInvalidResponseException
     * @return void
     * @since 1.0.0
     */
    private function handlePossibleInvalidResponse(array $response, string $operation = ''): void
    {
        if ($this->remoteService->getResponseStatusCode($response) === 403) {
            $rayId = $this->remoteService->getCloudflareRayId($response);

            if ($rayId) {
                throw new RemoteAccessDeniedException([
                    'cloudflare_ray_id' => esc_html($rayId),
                    'operation' => esc_html($operation),
                ]);
            }

            throw new RemoteAccessDeniedException();
        }

        if ($this->remoteService->getResponseStatusCode($response) !== 200) {
            throw new LicenseServerInvalidResponseException([
                'operation' => esc_html($operation),
            ]);
        }
    }
}
