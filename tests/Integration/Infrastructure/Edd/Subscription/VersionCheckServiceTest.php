<?php

/**
 * Version check service integration tests.
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
use PublishPress\Hub\Infrastructure\Edd\Subscription\VersionCheckService;
use PublishPress\Hub\Infrastructure\Remote\Contract\RemoteServiceInterface;
use WP_Error;

class VersionCheckServiceTest extends WPTestCase
{
    private VersionCheckService $service;
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

        $this->service = new VersionCheckService(
            $this->apiUrl,
            $this->siteUrl,
            $this->remoteService,
            $this->cacheService,
            $this->requestHeaders
        );
    }

    public function testGetLastVersionInfoWithValidLicenseReturnsVersionData(): void
    {
        $licenseKey = 'valid-license-key';
        $downloadId = 12345;
        $expectedResponse = [
            'name' => 'Test Plugin Pro',
            'slug' => 'test-plugin-pro',
            'version' => '2.0.0',
            'download_link' => 'https://example.com/download/test-plugin-pro-2.0.0.zip',
            'sections' => [
                'changelog' => '<h3>Version 2.0.0</h3><ul><li>New feature</li></ul>',
            ],
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
                    return $args['body']['edd_action'] === 'get_version'
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

        $result = $this->service->getLastVersionInfo($licenseKey, $downloadId);

        $this->assertEquals($expectedResponse, $result);
        $this->assertEquals('2.0.0', $result['version']);
        $this->assertArrayHasKey('download_link', $result);
    }

    public function testGetLastVersionInfoUsesCachedDataWhenAvailable(): void
    {
        $licenseKey = 'cached-license-key';
        $downloadId = 12345;
        $cachedData = [
            'version' => '1.5.0',
            'download_link' => 'https://example.com/download/cached.zip',
        ];

        $this->cacheService
            ->expects($this->once())
            ->method('get')
            ->willReturn($cachedData);

        $this->remoteService
            ->expects($this->never())
            ->method('post');

        $result = $this->service->getLastVersionInfo($licenseKey, $downloadId);

        $this->assertEquals($cachedData, $result);
    }

    public function testGetLastVersionInfoBypassesCacheWhenForceIsTrue(): void
    {
        $licenseKey = 'force-license-key';
        $downloadId = 12345;
        $cachedData = ['version' => '1.0.0'];
        $freshData = [
            'version' => '2.0.0',
            'download_link' => 'https://example.com/download/fresh.zip',
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

        $result = $this->service->getLastVersionInfo($licenseKey, $downloadId, true);

        $this->assertEquals($freshData, $result);
        $this->assertEquals('2.0.0', $result['version']);
    }

    public function testGetLastVersionInfoThrowsExceptionOnServerError(): void
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

        $this->expectException(LicenseServerException::class);

        $this->service->getLastVersionInfo($licenseKey, $downloadId);
    }

    public function testGetLastVersionInfoThrowsExceptionOnInvalidResponse(): void
    {
        $licenseKey = 'invalid-response-key';
        $downloadId = 12345;

        $this->cacheService
            ->method('get')
            ->willReturn(null);

        $response = [
            'response' => ['code' => 200],
            'body' => 'invalid json',
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

        $this->service->getLastVersionInfo($licenseKey, $downloadId);
    }

    public function testGetLastVersionInfoThrowsExceptionOn403Response(): void
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

        $this->service->getLastVersionInfo($licenseKey, $downloadId);
    }

    public function testGetLastVersionInfoThrowsExceptionOnEmptyResponse(): void
    {
        $licenseKey = 'empty-response-key';
        $downloadId = 12345;

        $this->cacheService
            ->method('get')
            ->willReturn(null);

        $response = [
            'response' => ['code' => 200],
            'body' => json_encode([]),
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

        $this->service->getLastVersionInfo($licenseKey, $downloadId);
    }

    public function testGetLastVersionInfoRequestContainsCorrectParameters(): void
    {
        $licenseKey = 'test-license-key';
        $downloadId = 67890;

        $this->cacheService
            ->method('get')
            ->willReturn(null);

        $response = [
            'response' => ['code' => 200],
            'body' => json_encode(['version' => '1.0.0']),
        ];

        $this->remoteService
            ->expects($this->once())
            ->method('post')
            ->with(
                $this->apiUrl,
                $this->callback(function ($args) use ($licenseKey, $downloadId) {
                    return isset($args['body'])
                        && $args['body']['edd_action'] === 'get_version'
                        && $args['body']['item_id'] === $downloadId
                        && $args['body']['license'] === $licenseKey
                        && $args['body']['url'] === $this->siteUrl
                        && $args['timeout'] === 15
                        && $args['sslverify'] === true
                        && isset($args['headers'])
                        && $args['headers']['User-Agent'] === 'PublishPress Hub/1.0.0'
                        && $args['headers']['Content-Type'] === 'application/x-www-form-urlencoded';
                })
            )
            ->willReturn($response);

        $this->remoteService
            ->method('getResponseStatusCode')
            ->willReturn(200);

        $this->remoteService
            ->method('getDecodedBodyFromResponse')
            ->willReturn(['version' => '1.0.0']);

        $this->service->getLastVersionInfo($licenseKey, $downloadId);
    }

    public function testGetLastVersionInfoIncludesDownloadLink(): void
    {
        $licenseKey = 'download-link-key';
        $downloadId = 12345;
        $expectedDownloadLink = 'https://example.com/download/plugin.zip?key=abc123';
        $expectedResponse = [
            'version' => '3.0.0',
            'download_link' => $expectedDownloadLink,
            'package' => $expectedDownloadLink,
        ];

        $this->cacheService
            ->method('get')
            ->willReturn(null);

        $response = [
            'response' => ['code' => 200],
            'body' => json_encode($expectedResponse),
        ];

        $this->remoteService
            ->method('post')
            ->willReturn($response);

        $this->remoteService
            ->method('getResponseStatusCode')
            ->willReturn(200);

        $this->remoteService
            ->method('getDecodedBodyFromResponse')
            ->willReturn($expectedResponse);

        $result = $this->service->getLastVersionInfo($licenseKey, $downloadId);

        $this->assertArrayHasKey('download_link', $result);
        $this->assertEquals($expectedDownloadLink, $result['download_link']);
    }
}

