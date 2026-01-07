<?php

declare(strict_types=1);


namespace Tests\Integration\Infrastructure\WP\I18n;

use PublishPress\Hub\Infrastructure\WP\Asset\WPAssetAdapter;
use PublishPress\Hub\Infrastructure\WP\I18n\WPI18nAdapter;
use Tests\WPTestCase;

class WordPressI18nAdapterTest extends WPTestCase
{
    /**
     * @var WPI18nAdapter
     */
    private $i18nAdapter;

    protected function setUp(): void
    {
        parent::setUp();

        $this->i18nAdapter = new WPI18nAdapter(
            'publishpress-hub',
            __DIR__ . '/../../../../../',
            'languages',
            new WPAssetAdapter(
                'http://localhost/publishpress-hub/assets/',
                '1.0.0',
                false
            )
        );
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }

    public function testGetTextDomain(): void
    {
        $this->assertEquals('publishpress-hub', $this->i18nAdapter->getTextDomain());
    }

    public function testGetLocale(): void
    {
        $this->assertEquals('en_US', $this->i18nAdapter->getLocale());
    }
}
