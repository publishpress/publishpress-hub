<?php

declare(strict_types=1);


namespace Tests\Integration\Infrastructure\WordPress\I18n;

use PublishPress\Hub\Infrastructure\WordPress\Asset\WordPressAssetAdapter;
use PublishPress\Hub\Infrastructure\WordPress\Hooks\WordPressHooksAdapter;
use PublishPress\Hub\Infrastructure\WordPress\I18n\WordPressI18nAdapter;
use Tests\WPTestCase;

class WordPressI18nAdapterTest extends WPTestCase
{
    /**
     * @var WordPressI18nAdapter
     */
    private $i18nAdapter;

    protected function setUp(): void
    {
        parent::setUp();

        $this->i18nAdapter = new WordPressI18nAdapter(
            'publishpress-hub',
            __DIR__ . '/../../../../../',
            'languages',
            new WordPressHooksAdapter(),
            new WordPressAssetAdapter(
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
