<?php

/**
 * License deactivation service for EDD subscriptions.
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

use PublishPress\Hub\Domain\Plugin\Exception\LicenseDeactivationException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerInvalidResponseException;
use PublishPress\Hub\Infrastructure\Edd\Subscription\Contract\LicenseDeactivationServiceInterface;
use PublishPress\Hub\Infrastructure\Remote\Contract\RemoteServiceInterface;

class LicenseDeactivationService implements LicenseDeactivationServiceInterface
{
    private string $eddSubscriptionApiUrl;

    private string $siteUrl;

    private RemoteServiceInterface $remoteService;

    /**
     * @var array<string, string>
     */
    private array $requestHeaders;

    private const TIMEOUT_IN_SECONDS = 15;

    /**
     * @param string $eddSubscriptionApiUrl The EDD subscription API URL.
     * @param string $siteUrl The site URL.
     * @param RemoteServiceInterface $remoteService The remote service.
     * @param array<string, string> $requestHeaders The request headers.
     * @since 1.0.0
     */
    public function __construct(
        string $eddSubscriptionApiUrl,
        string $siteUrl,
        RemoteServiceInterface $remoteService,
        array $requestHeaders
    ) {
        $this->eddSubscriptionApiUrl = $eddSubscriptionApiUrl;
        $this->siteUrl = $siteUrl;
        $this->remoteService = $remoteService;
        $this->requestHeaders = $requestHeaders;
    }

    /**
     * Deactivate a license.
     *
     * @param string $licenseKey The license key to deactivate.
     * @param int $downloadId The download ID.
     * @throws LicenseDeactivationException
     * @throws LicenseServerInvalidResponseException
     * @return array<string, mixed> The deactivation response data.
     * @since 1.0.0
     */
    public function deactivateLicense(string $licenseKey, int $downloadId): array
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
            'headers' => $this->requestHeaders,
        ];

        $response = $this->remoteService->post(
            $this->eddSubscriptionApiUrl,
            $requestArgs
        );

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
