<?php

/**
 * License deactivation service integration tests.
 *
 * @package Tests\Integration\Infrastructure\Edd\Subscription
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace Tests\Integration\Infrastructure\Edd\Subscription;

use Codeception\TestCase\WPTestCase;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseDeactivationException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerInvalidResponseException;
use PublishPress\Hub\Infrastructure\Edd\Subscription\LicenseDeactivationService;
use PublishPress\Hub\Infrastructure\Remote\Contract\RemoteServiceInterface;
use PublishPress\Hub\Infrastructure\Remote\Exception\RemoteAccessDeniedException;
use WP_Error;

class LicenseDeactivationServiceTest extends WPTestCase
{
    private LicenseDeactivationService $service;
    private RemoteServiceInterface $remoteService;
    private string $apiUrl = 'https://example.com/edd-api';
    private string $siteUrl = 'https://test-site.com';

    /**
     * @var array<string, string>
     */
    private array $requestHeaders;

    public function setUp(): void
    {
        parent::setUp();

        $this->remoteService = $this->createMock(RemoteServiceInterface::class);

        $this->requestHeaders = [
            'User-Agent' => 'PublishPress Hub/1.0.0',
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

        $this->service = new LicenseDeactivationService(
            $this->apiUrl,
            $this->siteUrl,
            $this->remoteService,
            $this->requestHeaders
        );
    }

    public function testDeactivateLicenseWithValidKeyReturnsData(): void
    {
        $licenseKey = 'valid-license-key';
        $downloadId = 12345;
        $expectedResponse = [
            'license' => 'deactivated',
            'item_id' => $downloadId,
        ];

        $response = [
            'response' => ['code' => 200],
            'body' => json_encode($expectedResponse),
        ];

        $this->remoteService
            ->expects($this->once())
            ->method('post')
            ->with(
                $this->apiUrl,
                $this->callback(function ($args) use ($licenseKey, $downloadId) {
                    return $args['body']['edd_action'] === 'deactivate_license'
                        && $args['body']['license'] === $licenseKey
                        && $args['body']['item_id'] === $downloadId
                        && $args['body']['url'] === $this->siteUrl;
                })
            )
            ->willReturn($response);

        $this->remoteService
            ->expects($this->exactly(2))
            ->method('getResponseStatusCode')
            ->with($response)
            ->willReturn(200);

        $this->remoteService
            ->expects($this->once())
            ->method('getDecodedBodyFromResponse')
            ->with($response)
            ->willReturn($expectedResponse);

        $result = $this->service->deactivateLicense($licenseKey, $downloadId);

        $this->assertEquals($expectedResponse, $result);
        $this->assertEquals('deactivated', $result['license']);
    }

    public function testDeactivateLicenseThrowsExceptionOnServerError(): void
    {
        $licenseKey = 'error-license-key';
        $downloadId = 12345;

        $wpError = new WP_Error('http_request_failed', 'Could not connect to server');

        $this->remoteService
            ->expects($this->once())
            ->method('post')
            ->willReturn($wpError);

        $this->expectException(LicenseDeactivationException::class);

        $this->service->deactivateLicense($licenseKey, $downloadId);
    }

    public function testDeactivateLicenseThrowsExceptionOn403WithCloudflareRayId(): void
    {
        $licenseKey = 'blocked-license-key';
        $downloadId = 12345;

        $response = [
            'response' => ['code' => 403],
            'body' => '',
            'headers' => ['cf-ray' => '12345-XYZ'],
        ];

        $this->remoteService
            ->expects($this->once())
            ->method('post')
            ->willReturn($response);

        $this->remoteService
            ->expects($this->once())
            ->method('getResponseStatusCode')
            ->with($response)
            ->willReturn(403);

        $this->remoteService
            ->expects($this->once())
            ->method('getCloudflareRayId')
            ->with($response)
            ->willReturn('12345-XYZ');

        $this->expectException(RemoteAccessDeniedException::class);

        $this->service->deactivateLicense($licenseKey, $downloadId);
    }

    public function testDeactivateLicenseThrowsExceptionOn403WithoutCloudflareRayId(): void
    {
        $licenseKey = 'blocked-license-key';
        $downloadId = 12345;

        $response = [
            'response' => ['code' => 403],
            'body' => '',
        ];

        $this->remoteService
            ->expects($this->once())
            ->method('post')
            ->willReturn($response);

        $this->remoteService
            ->expects($this->once())
            ->method('getResponseStatusCode')
            ->with($response)
            ->willReturn(403);

        $this->remoteService
            ->expects($this->once())
            ->method('getCloudflareRayId')
            ->with($response)
            ->willReturn(null);

        $this->expectException(RemoteAccessDeniedException::class);

        $this->service->deactivateLicense($licenseKey, $downloadId);
    }

    public function testDeactivateLicenseThrowsExceptionOnNon200Response(): void
    {
        $licenseKey = 'invalid-license-key';
        $downloadId = 12345;

        $response = [
            'response' => ['code' => 500],
            'body' => '',
        ];

        $this->remoteService
            ->expects($this->once())
            ->method('post')
            ->willReturn($response);

        $this->remoteService
            ->expects($this->exactly(2))
            ->method('getResponseStatusCode')
            ->with($response)
            ->willReturn(500);

        $this->expectException(LicenseServerInvalidResponseException::class);

        $this->service->deactivateLicense($licenseKey, $downloadId);
    }

    public function testDeactivateLicenseThrowsExceptionOnEmptyResponse(): void
    {
        $licenseKey = 'empty-response-key';
        $downloadId = 12345;

        $response = [
            'response' => ['code' => 200],
            'body' => '',
        ];

        $this->remoteService
            ->method('post')
            ->willReturn($response);

        $this->remoteService
            ->method('getResponseStatusCode')
            ->willReturn(200);

        $this->remoteService
            ->method('getDecodedBodyFromResponse')
            ->willReturn([]);

        $this->expectException(LicenseServerInvalidResponseException::class);

        $this->service->deactivateLicense($licenseKey, $downloadId);
    }
}

