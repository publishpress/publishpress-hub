<?php

/**
 * License info service for EDD subscriptions.
 *
 * @package PublishPress\Hub\Infrastructure\Edd\Subscription
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Edd\Subscription;

use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerInvalidResponseException;
use PublishPress\Hub\Infrastructure\Cache\Contract\CacheServiceInterface;
use PublishPress\Hub\Infrastructure\Edd\Subscription\Contract\LicenseInfoServiceInterface;
use PublishPress\Hub\Infrastructure\Remote\Contract\RemoteServiceInterface;
use PublishPress\Hub\Infrastructure\Remote\HttpDebugger;

class LicenseInfoService implements LicenseInfoServiceInterface
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
     * Get the license information.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Whether to bypass cache and force license info retrieval.
     * @throws LicenseServerException
     * @throws LicenseServerInvalidResponseException
     * @return array<string, mixed> The license information.
     * @since 1.0.0
     */
    public function getLicenseInfo(string $licenseKey, int $downloadId, bool $force = false): array
    {
        // Create unique cache key per license-product combination
        $cacheKey = md5('edd_check_license_' . $licenseKey . '_' . $downloadId);
        $operation = 'get_license_info';

        // Return cached data unless force refresh is requested
        // Cache prevents excessive API calls during scheduled validation
        $data = $this->cacheService->get($cacheKey);

        if (!empty($data) && !$force) {
            return $data;
        }

        // Build EDD Software Licensing API request for license status check
        // This is a read-only operation that returns license details without modifying state
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
            'headers' => $this->requestHeaders,
        ];

        // Debug: Log request details
        HttpDebugger::debugRequest('GET', $this->eddSubscriptionApiUrl, $requestArgs);

        // GET request because we're only retrieving information, not modifying state
        $response = $this->remoteService->get(
            $this->eddSubscriptionApiUrl,
            $requestArgs
        );

        // Debug: Log response details
        HttpDebugger::debugResponse($response);

        // Handle WordPress HTTP API errors (network failures, timeouts, DNS issues)
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

        // Validate HTTP status code (403 for Cloudflare blocks, non-200 for other errors)
        $this->handlePossibleInvalidResponse($response, $operation);

        $data = $this->remoteService->getDecodedBodyFromResponse($response);

        // Ensure response contains required 'license' field
        // This field contains the status (valid/invalid/expired) and other license details
        if (empty($data) || !isset($data['license'])) {
            throw new LicenseServerInvalidResponseException([
                'operation' => esc_html($operation),
            ]);
        }

        // Cache the response to reduce API load
        // Short TTL (10 seconds) ensures relatively fresh data while preventing API abuse
        $this->cacheService->set($cacheKey, $data, self::CACHE_TTL_IN_SECONDS);

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

