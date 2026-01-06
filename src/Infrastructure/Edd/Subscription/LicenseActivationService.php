<?php

/**
 * License activation service for EDD subscriptions.
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
use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerInvalidResponseException;
use PublishPress\Hub\Infrastructure\Cache\Contract\CacheServiceInterface;
use PublishPress\Hub\Infrastructure\Edd\Subscription\Contract\LicenseActivationServiceInterface;
use PublishPress\Hub\Infrastructure\Remote\Contract\RemoteServiceInterface;
use PublishPress\Hub\Infrastructure\Remote\HttpDebugger;

class LicenseActivationService implements LicenseActivationServiceInterface
{
    private string $eddSubscriptionApiUrl;

    private string $siteUrl;

    private RemoteServiceInterface $remoteService;

    private CacheServiceInterface $cacheService;

    /**
     * @var array<string, string>
     */
    private array $requestHeaders;

    private const CACHE_TTL_IN_SECONDS = 10;

    private const TIMEOUT_IN_SECONDS = 15;

    /**
     * @param string $eddSubscriptionApiUrl The EDD subscription API URL.
     * @param string $siteUrl The site URL.
     * @param RemoteServiceInterface $remoteService The remote service.
     * @param CacheServiceInterface $cacheService The cache service.
     * @param array<string, string> $requestHeaders The request headers.
     * @since 1.0.0
     */
    public function __construct(
        string $eddSubscriptionApiUrl,
        string $siteUrl,
        RemoteServiceInterface $remoteService,
        CacheServiceInterface $cacheService,
        array $requestHeaders
    ) {
        $this->eddSubscriptionApiUrl = $eddSubscriptionApiUrl;
        $this->siteUrl = $siteUrl;
        $this->remoteService = $remoteService;
        $this->cacheService = $cacheService;
        $this->requestHeaders = $requestHeaders;
    }

    /**
     * Activate a license.
     *
     * @param string $licenseKey The license key to activate.
     * @param int $downloadId The download ID.
     * @param bool $force Whether to bypass cache and force activation.
     * @throws LicenseActivationException
     * @throws LicenseServerInvalidResponseException
     * @return array<string, mixed> The activation response data.
     * @since 1.0.0
     */
    public function activateLicense(string $licenseKey, int $downloadId, bool $force = false): array
    {
        // Cache key combines license key and download ID to ensure unique cache per license-product pair
        $cacheKey = md5("edd_activate_license_{$licenseKey}_$downloadId");
        $operation = 'activate_license';

        // Check cache first to avoid unnecessary API calls
        // Activation responses are cached briefly to handle rapid repeated activation attempts
        $data = $this->cacheService->get($cacheKey);

        if (empty($data) || $force) {
            // Build EDD Software Licensing API request
            // The 'url' parameter associates this activation with the current site
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
                'headers' => $this->requestHeaders,
            ];

            // Debug: Log request details
            HttpDebugger::debugRequest('POST', $this->eddSubscriptionApiUrl, $requestArgs);

            // POST request because activation modifies server state (records site activation)
            $response = $this->remoteService->post(
                $this->eddSubscriptionApiUrl,
                $requestArgs
            );

            // Debug: Log response details
            HttpDebugger::debugResponse($response);

            // Handle WordPress HTTP API errors (network failures, timeouts, DNS issues)
            if (is_wp_error($response)) {
                throw new LicenseActivationException([
                    'error_message' => esc_html($response->get_error_message()),
                    'operation' => esc_html($operation),
                ]);
            }

            // Validate HTTP status code (403 for Cloudflare blocks, non-200 for other errors)
            $this->handlePossibleInvalidResponse($response, $operation);

            $data = $this->remoteService->getDecodedBodyFromResponse($response);

            // Ensure response contains required 'license' field with activation status
            // Without this field, we cannot determine if activation succeeded
            if (empty($data) || !isset($data['license'])) {
                throw new LicenseServerInvalidResponseException([
                    'operation' => esc_html($operation),
                ]);
            }

            // Cache successful response to prevent duplicate activation attempts
            // Short TTL (10 seconds) allows quick retry if user clicks button multiple times
            $this->cacheService->set($cacheKey, $data, self::CACHE_TTL_IN_SECONDS);
        }

        return $data;
    }

    /**
     * Handle possible invalid response.
     *
     * @param array<string, mixed> $response The response.
     * @param string $operation The operation.
     * @throws LicenseServerInvalidResponseException
     * @return void
     * @since 1.0.0
     */
    private function handlePossibleInvalidResponse(array $response, string $operation = ''): void
    {
        // Check for Cloudflare blocking (403 Forbidden)
        // This can occur when Cloudflare's security rules block our request
        if ($this->remoteService->getResponseStatusCode($response) === 403) {
            $rayId = $this->remoteService->getCloudflareRayId($response);

            // Include Cloudflare Ray ID for debugging blocks with Cloudflare support
            if ($rayId) {
                throw new \PublishPress\Hub\Infrastructure\Remote\Exception\RemoteAccessDeniedException([
                    'cloudflare_ray_id' => esc_html($rayId),
                    'operation' => esc_html($operation),
                ]);
            }

            throw new \PublishPress\Hub\Infrastructure\Remote\Exception\RemoteAccessDeniedException();
        }

        // Ensure successful HTTP response code
        // EDD API should return 200 for valid requests, even if license validation fails
        // Non-200 indicates server errors, invalid endpoints, or network issues
        if ($this->remoteService->getResponseStatusCode($response) !== 200) {
            throw new LicenseServerInvalidResponseException([
                'operation' => esc_html($operation),
            ]);
        }
    }
}

