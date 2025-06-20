<?php

declare(strict_types=1);


namespace Tests\Integration\Infrastructure\Asset;

use PublishPress\Hub\Infrastructure\Asset\AssetManager;
use Tests\WPTestCase;

/**
 * Unit tests for AssetManager class.
 *
 * @coversDefaultClass \PublishPress\Hub\Infrastructure\Asset\AssetManager
 */
class AssetManagerTest extends WPTestCase
{
    /**
     * @var AssetManager
     */
    private $assetManager;

    protected function setUp(): void
    {
        parent::setUp();
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }

    public function testGetAssetUrlWithEmptyPath(): void
    {
        $assetManager = new AssetManager(
            'http://localhost/publishpress-hub/assets/',
            '1.0.0',
            false
        );

        $this->expectException(\InvalidArgumentException::class);

        $assetManager->getAssetUrl('');
    }

    public function testGetAssetUrlWithInvalidPath(): void
    {
        $assetManager = new AssetManager(
            'http://localhost/publishpress-hub/assets/',
            '1.0.0',
            false
        );

        $this->expectException(\InvalidArgumentException::class);

        $assetManager->getAssetUrl('invalid-path');
    }

    public function testGetAssetBaseUrlWithTrailingSlash(): void
    {
        $assetManager = new AssetManager(
            'http://localhost/publishpress-hub/assets/',
            '1.0.0',
            false
        );

        $this->assertEquals(
            'http://localhost/publishpress-hub/assets/',
            $assetManager->getAssetBaseUrl(),
            'The base URL is not correct'
        );
    }

    public function testGetAssetBaseUrlWithoutTrailingSlash(): void
    {
        $assetManager = new AssetManager(
            'http://localhost/publishpress-hub/assets',
            '1.0.0',
            false
        );

        $this->assertEquals(
            'http://localhost/publishpress-hub/assets/',
            $assetManager->getAssetBaseUrl(),
            'The base URL is not correct'
        );
    }

    /**
     * Test the getAssetUrl method for production.
     *
     * @since 1.0.0
     */
    public function testGetAssetUrlForProduction(): void
    {
        $data = [
            ['js/admin-page.js', 'js/admin-page.min.js'],
            ['/js/admin-page.js', 'js/admin-page.min.js'],
            ['js/admin-page.js', 'js/admin-page.min.js'],
            ['css/admin-page.css', 'css/admin-page.min.css'],
            ['/css/admin-page.css', 'css/admin-page.min.css'],
            ['css/admin-page.css', 'css/admin-page.min.css'],
            ['images/admin-page.png', 'images/admin-page.png'],
            ['/images/admin-page.png', 'images/admin-page.png'],
            ['images/icons/admin-page.png', 'images/icons/admin-page.png'],
        ];

        $assetManager = new AssetManager(
            'http://localhost/publishpress-hub/assets/',
            '1.0.0',
            false
        );

        foreach ($data as $value) {
            $url = $assetManager->getAssetUrl($value[0]);

            $this->assertEquals(
                'http://localhost/publishpress-hub/assets/' . $value[1],
                $url,
                'The URL is not correct'
            );
        }
    }
}
