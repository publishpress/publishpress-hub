<?php

/**
 * Version check service for EDD subscriptions.
 *
 * @package PublishPress\Hub\Infrastructure\Edd\Subscription
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Edd\Subscription;

defined('ABSPATH') || exit;

use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerInvalidResponseException;
use PublishPress\Hub\Infrastructure\Cache\Contract\CacheServiceInterface;
use PublishPress\Hub\Infrastructure\Edd\Subscription\Contract\VersionCheckServiceInterface;
use PublishPress\Hub\Infrastructure\Remote\Contract\RemoteServiceInterface;

class VersionCheckService implements VersionCheckServiceInterface
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
     * Get the last version information.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Whether to bypass cache and force version check.
     * @throws LicenseServerException
     * @throws LicenseServerInvalidResponseException
     * @return array<string, mixed> The version information.
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
            'headers' => $this->requestHeaders,
        ];

        $response = $this->remoteService->post(
            $this->eddSubscriptionApiUrl,
            $requestArgs
        );

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
