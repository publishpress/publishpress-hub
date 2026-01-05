<?php

/**
 * License info service integration tests.
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
use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerInvalidResponseException;
use PublishPress\Hub\Infrastructure\Cache\Contract\CacheServiceInterface;
use PublishPress\Hub\Infrastructure\Edd\Subscription\LicenseInfoService;
use PublishPress\Hub\Infrastructure\Remote\Contract\RemoteServiceInterface;
use WP_Error;

class LicenseInfoServiceTest extends WPTestCase
{
    private LicenseInfoService $service;
    private RemoteServiceInterface $remoteService;
    private CacheServiceInterface $cacheService;
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
        $this->cacheService = $this->createMock(CacheServiceInterface::class);

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

        $this->service = new LicenseInfoService(
            $this->apiUrl,
            $this->siteUrl,
            $this->remoteService,
            $this->cacheService,
            $this->requestHeaders
        );
    }

    public function testGetLicenseInfoWithValidKeyReturnsLicenseData(): void
    {
        $licenseKey = 'valid-license-key';
        $downloadId = 12345;
        $expectedResponse = [
            'license' => 'valid',
            'item_id' => $downloadId,
            'expires' => '2026-12-31',
            'customer_name' => 'John Doe',
            'customer_email' => 'john@example.com',
        ];

        $this->cacheService
            ->expects($this->once())
            ->method('get')
            ->willReturn(null);

        $response = [
            'response' => ['code' => 200],
            'body' => json_encode($expectedResponse),
        ];

        $this->remoteService
            ->expects($this->once())
            ->method('get')
            ->with(
                $this->apiUrl,
                $this->callback(function ($args) use ($licenseKey, $downloadId) {
                    return $args['body']['edd_action'] === 'check_license'
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

        $this->cacheService
            ->expects($this->once())
            ->method('set')
            ->with(
                $this->isType('string'),
                $expectedResponse,
                10
            );

        $result = $this->service->getLicenseInfo($licenseKey, $downloadId);

        $this->assertEquals($expectedResponse, $result);
        $this->assertEquals('valid', $result['license']);
        $this->assertArrayHasKey('expires', $result);
    }

    public function testGetLicenseInfoUsesCachedDataWhenAvailable(): void
    {
        $licenseKey = 'cached-license-key';
        $downloadId = 12345;
        $cachedData = [
            'license' => 'valid',
            'item_id' => $downloadId,
        ];

        $this->cacheService
            ->expects($this->once())
            ->method('get')
            ->willReturn($cachedData);

        $this->remoteService
            ->expects($this->never())
            ->method('get');

        $result = $this->service->getLicenseInfo($licenseKey, $downloadId);

        $this->assertEquals($cachedData, $result);
    }

    public function testGetLicenseInfoBypassesCacheWhenForceIsTrue(): void
    {
        $licenseKey = 'force-license-key';
        $downloadId = 12345;
        $cachedData = ['license' => 'valid'];
        $freshData = [
            'license' => 'expired',
            'item_id' => $downloadId,
        ];

        $this->cacheService
            ->expects($this->once())
            ->method('get')
            ->willReturn($cachedData);

        $response = [
            'response' => ['code' => 200],
            'body' => json_encode($freshData),
        ];

        $this->remoteService
            ->expects($this->once())
            ->method('get')
            ->willReturn($response);

        $this->remoteService
            ->expects($this->exactly(2))
            ->method('getResponseStatusCode')
            ->willReturn(200);

        $this->remoteService
            ->expects($this->once())
            ->method('getDecodedBodyFromResponse')
            ->willReturn($freshData);

        $result = $this->service->getLicenseInfo($licenseKey, $downloadId, true);

        $this->assertEquals($freshData, $result);
        $this->assertEquals('expired', $result['license']);
    }

    public function testGetLicenseInfoThrowsExceptionOnServerError(): void
    {
        $licenseKey = 'error-license-key';
        $downloadId = 12345;

        $this->cacheService
            ->method('get')
            ->willReturn(null);

        $wpError = new WP_Error('http_request_failed', 'Could not connect to server');

        $this->remoteService
            ->expects($this->once())
            ->method('get')
            ->willReturn($wpError);

        $this->expectException(LicenseServerException::class);

        $this->service->getLicenseInfo($licenseKey, $downloadId);
    }

    public function testGetLicenseInfoThrowsExceptionOnInvalidResponse(): void
    {
        $licenseKey = 'invalid-response-key';
        $downloadId = 12345;

        $this->cacheService
            ->method('get')
            ->willReturn(null);

        $response = [
            'response' => ['code' => 200],
            'body' => json_encode(['no_license_key' => 'invalid']),
        ];

        $this->remoteService
            ->method('get')
            ->willReturn($response);

        $this->remoteService
            ->method('getResponseStatusCode')
            ->willReturn(200);

        $this->remoteService
            ->method('getDecodedBodyFromResponse')
            ->willReturn(['no_license_key' => 'invalid']);

        $this->expectException(LicenseServerInvalidResponseException::class);

        $this->service->getLicenseInfo($licenseKey, $downloadId);
    }
}

