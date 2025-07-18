<?php

declare(strict_types=1);


namespace Tests\Integration\Infrastructure\Asset;

use PublishPress\Hub\Infrastructure\WordPress\Asset\WordPressAssetAdapter;
use Tests\WPTestCase;

class WordPressAssetAdapterTest extends WPTestCase
{

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
        $assetAdapter = new WordPressAssetAdapter(
            'http://localhost/publishpress-hub/assets/',
            '1.0.0',
            false
        );

        $this->expectException(\InvalidArgumentException::class);

        $assetAdapter->getPluginAssetUrl('');
    }

    public function testGetAssetUrlWithInvalidPath(): void
    {
        $assetManager = new WordPressAssetAdapter(
            'http://localhost/publishpress-hub/assets/',
            '1.0.0',
            false
        );

        $this->expectException(\InvalidArgumentException::class);

        $assetManager->getPluginAssetUrl('invalid-path');
    }

    public function testGetAssetBaseUrlWithTrailingSlash(): void
    {
        $assetManager = new WordPressAssetAdapter(
            'http://localhost/publishpress-hub/assets/',
            '1.0.0',
            false
        );

        $this->assertEquals(
            'http://localhost/publishpress-hub/assets/',
            $assetManager->getPluginAssetsBaseUrl(),
            'The base URL is not correct'
        );
    }

    public function testGetAssetBaseUrlWithoutTrailingSlash(): void
    {
        $assetManager = new WordPressAssetAdapter(
            'http://localhost/publishpress-hub/assets',
            '1.0.0',
            false
        );

        $this->assertEquals(
            'http://localhost/publishpress-hub/assets/',
            $assetManager->getPluginAssetsBaseUrl(),
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

        $assetManager = new WordPressAssetAdapter(
            'http://localhost/publishpress-hub/assets/',
            '1.0.0',
            false
        );

        foreach ($data as $value) {
            $url = $assetManager->getPluginAssetUrl($value[0]);

            $this->assertEquals(
                'http://localhost/publishpress-hub/assets/' . $value[1],
                $url,
                'The URL is not correct'
            );
        }
    }
}
