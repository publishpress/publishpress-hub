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
                'headers' => $this->requestHeaders,
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
        if ($this->remoteService->getResponseStatusCode($response) === 403) {
            $rayId = $this->remoteService->getCloudflareRayId($response);

            if ($rayId) {
                throw new \PublishPress\Hub\Infrastructure\Remote\Exception\RemoteAccessDeniedException([
                    'cloudflare_ray_id' => esc_html($rayId),
                    'operation' => esc_html($operation),
                ]);
            }

            throw new \PublishPress\Hub\Infrastructure\Remote\Exception\RemoteAccessDeniedException();
        }

        if ($this->remoteService->getResponseStatusCode($response) !== 200) {
            throw new LicenseServerInvalidResponseException([
                'operation' => esc_html($operation),
            ]);
        }
    }
}

