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

    public function testGetScriptFileExtension(): void
    {
        $this->markTestIncomplete();
    }

    public function testGetStyleFileExtension(): void
    {
        $this->markTestIncomplete();
    }

    public function testGetAssetUrl(): void
    {
        $this->markTestIncomplete();
    }

    public function testEnqueueScript(): void
    {
        $this->markTestIncomplete();
    }

    public function testEnqueueStyle(): void
    {
        $this->markTestIncomplete();
    }
}
