<?php

/**
 * License activation service integration tests.
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
use PublishPress\Hub\Domain\Plugin\Exception\LicenseActivationException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseDisabledException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseExpiredException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseNoActivationsLeftException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerInvalidResponseException;
use PublishPress\Hub\Infrastructure\Cache\Contract\CacheServiceInterface;
use PublishPress\Hub\Infrastructure\Edd\Subscription\LicenseActivationService;
use PublishPress\Hub\Infrastructure\Remote\Contract\RemoteServiceInterface;
use WP_Error;

class LicenseActivationServiceTest extends WPTestCase
{
    private LicenseActivationService $service;
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

        $this->service = new LicenseActivationService(
            $this->apiUrl,
            $this->siteUrl,
            $this->remoteService,
            $this->cacheService,
            $this->requestHeaders
        );
    }

    public function testActivateLicenseWithValidKeyReturnsSuccessData(): void
    {
        $licenseKey = 'valid-license-key';
        $downloadId = 12345;
        $expectedResponse = [
            'license' => 'valid',
            'item_id' => $downloadId,
            'expires' => '2026-12-31',
            'activations_left' => 5,
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
            ->method('post')
            ->with(
                $this->apiUrl,
                $this->callback(function ($args) use ($licenseKey, $downloadId) {
                    return $args['body']['edd_action'] === 'activate_license'
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

        $result = $this->service->activateLicense($licenseKey, $downloadId);

        $this->assertEquals($expectedResponse, $result);
        $this->assertEquals('valid', $result['license']);
    }

    public function testActivateLicenseUsesCachedDataWhenAvailable(): void
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
            ->method('post');

        $result = $this->service->activateLicense($licenseKey, $downloadId);

        $this->assertEquals($cachedData, $result);
    }

    public function testActivateLicenseBypassesCacheWhenForceIsTrue(): void
    {
        $licenseKey = 'force-license-key';
        $downloadId = 12345;
        $cachedData = ['license' => 'valid'];
        $freshData = [
            'license' => 'valid',
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
            ->method('post')
            ->willReturn($response);

        $this->remoteService
            ->expects($this->exactly(2))
            ->method('getResponseStatusCode')
            ->willReturn(200);

        $this->remoteService
            ->expects($this->once())
            ->method('getDecodedBodyFromResponse')
            ->willReturn($freshData);

        $result = $this->service->activateLicense($licenseKey, $downloadId, true);

        $this->assertEquals($freshData, $result);
    }

    public function testActivateLicenseThrowsExceptionOnServerError(): void
    {
        $licenseKey = 'error-license-key';
        $downloadId = 12345;

        $this->cacheService
            ->method('get')
            ->willReturn(null);

        $wpError = new WP_Error('http_request_failed', 'Could not connect to server');

        $this->remoteService
            ->expects($this->once())
            ->method('post')
            ->willReturn($wpError);

        $this->expectException(LicenseActivationException::class);

        $this->service->activateLicense($licenseKey, $downloadId);
    }

    public function testActivateLicenseThrowsExceptionOnInvalidResponse(): void
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
            ->method('post')
            ->willReturn($response);

        $this->remoteService
            ->method('getResponseStatusCode')
            ->willReturn(200);

        $this->remoteService
            ->method('getDecodedBodyFromResponse')
            ->willReturn(['no_license_key' => 'invalid']);

        $this->expectException(LicenseServerInvalidResponseException::class);

        $this->service->activateLicense($licenseKey, $downloadId);
    }

    public function testActivateLicenseThrowsExceptionOn403Response(): void
    {
        $licenseKey = 'blocked-license-key';
        $downloadId = 12345;

        $this->cacheService
            ->method('get')
            ->willReturn(null);

        $response = [
            'response' => ['code' => 403],
            'headers' => ['cf-ray' => '12345-ABC'],
            'body' => 'Access Denied',
        ];

        $this->remoteService
            ->method('post')
            ->willReturn($response);

        $this->remoteService
            ->method('getResponseStatusCode')
            ->willReturn(403);

        $this->remoteService
            ->method('getCloudflareRayId')
            ->willReturn('12345-ABC');

        $this->expectException(\PublishPress\Hub\Infrastructure\Remote\Exception\RemoteAccessDeniedException::class);

        $this->service->activateLicense($licenseKey, $downloadId);
    }

    public function testActivateLicenseThrowsExceptionOnNon200Response(): void
    {
        $licenseKey = 'error-license-key';
        $downloadId = 12345;

        $this->cacheService
            ->method('get')
            ->willReturn(null);

        $response = [
            'response' => ['code' => 500],
            'body' => 'Server Error',
        ];

        $this->remoteService
            ->method('post')
            ->willReturn($response);

        $this->remoteService
            ->method('getResponseStatusCode')
            ->willReturn(500);

        $this->remoteService
            ->method('getCloudflareRayId')
            ->willReturn(null);

        $this->expectException(LicenseServerInvalidResponseException::class);

        $this->service->activateLicense($licenseKey, $downloadId);
    }

    public function testActivateLicenseRequestContainsCorrectHeaders(): void
    {
        $licenseKey = 'test-license-key';
        $downloadId = 12345;

        $this->cacheService
            ->method('get')
            ->willReturn(null);

        $response = [
            'response' => ['code' => 200],
            'body' => json_encode(['license' => 'valid']),
        ];

        $this->remoteService
            ->expects($this->once())
            ->method('post')
            ->with(
                $this->apiUrl,
                $this->callback(function ($args) {
                    return isset($args['headers'])
                        && $args['headers']['User-Agent'] === 'PublishPress Hub/1.0.0'
                        && $args['headers']['Content-Type'] === 'application/x-www-form-urlencoded'
                        && $args['headers']['Origin'] === $this->siteUrl;
                })
            )
            ->willReturn($response);

        $this->remoteService
            ->method('getResponseStatusCode')
            ->willReturn(200);

        $this->remoteService
            ->method('getDecodedBodyFromResponse')
            ->willReturn(['license' => 'valid']);

        $this->service->activateLicense($licenseKey, $downloadId);
    }
}

