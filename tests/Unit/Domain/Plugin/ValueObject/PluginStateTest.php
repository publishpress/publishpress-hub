<?php

declare(strict_types=1);

namespace Tests\Unit\Domain\Plugin\ValueObject;

use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\ValueObject\PluginState;
use Codeception\Test\Unit;

/**
 * Unit tests for the PluginState value object.
 */
class PluginStateTest extends Unit
{
    public function testConstructorWithValidParameters(): void
    {
        $state = new PluginState(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        $this->assertEquals('Test Plugin', $state->getName());
        $this->assertEquals('test-plugin', $state->getSlug());
        $this->assertEquals('test-plugin.php', $state->getFileName());
        $this->assertEquals('https://publishpress.com/pricing/test-plugin/', $state->getDetailsUrl());
        $this->assertEquals('test-plugin/test-plugin.php', $state->getPath());
    }

    public function testInitialStateIsCorrect(): void
    {
        $state = new PluginState(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        $this->assertFalse($state->isInstalled());
        $this->assertFalse($state->isActive());
        $this->assertFalse($state->isLicensed());
        $this->assertEquals('', $state->getVersion());
        $this->assertNull($state->getFamily());
    }

    public function testWithInstalledReturnsNewInstance(): void
    {
        $originalState = new PluginState(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        $newState = $originalState->withInstalled(true, '1.0.3', 'custom/path/test-plugin.php');

        // Original state should remain unchanged
        $this->assertFalse($originalState->isInstalled());
        $this->assertEquals('', $originalState->getVersion());
        $this->assertEquals('test-plugin/test-plugin.php', $originalState->getPath());

        // New state should have updated values
        $this->assertTrue($newState->isInstalled());
        $this->assertEquals('1.0.3', $newState->getVersion());
        $this->assertEquals('custom/path/test-plugin.php', $newState->getPath());

        // Should be different instances
        $this->assertNotSame($originalState, $newState);
    }

    public function testWithActiveReturnsNewInstance(): void
    {
        $originalState = new PluginState(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        $newState = $originalState->withActive(true);

        // Original state should remain unchanged
        $this->assertFalse($originalState->isActive());

        // New state should have updated values
        $this->assertTrue($newState->isActive());

        // Should be different instances
        $this->assertNotSame($originalState, $newState);
    }

    public function testWithLicensedReturnsNewInstance(): void
    {
        $originalState = new PluginState(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        $newState = $originalState->withLicensed(true);

        // Original state should remain unchanged
        $this->assertFalse($originalState->isLicensed());

        // New state should have updated values
        $this->assertTrue($newState->isLicensed());

        // Should be different instances
        $this->assertNotSame($originalState, $newState);
    }

    public function testWithNameReturnsNewInstance(): void
    {
        $originalState = new PluginState(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        $newState = $originalState->withName('Updated Plugin Name');

        // Original state should remain unchanged
        $this->assertEquals('Test Plugin', $originalState->getName());

        // New state should have updated values
        $this->assertEquals('Updated Plugin Name', $newState->getName());

        // Should be different instances
        $this->assertNotSame($originalState, $newState);
    }

    public function testWithSlugUpdatesPath(): void
    {
        $originalState = new PluginState(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        $newState = $originalState->withSlug('updated-plugin');

        // Original state should remain unchanged
        $this->assertEquals('test-plugin', $originalState->getSlug());
        $this->assertEquals('test-plugin/test-plugin.php', $originalState->getPath());

        // New state should have updated values
        $this->assertEquals('updated-plugin', $newState->getSlug());
        $this->assertEquals('updated-plugin/test-plugin.php', $newState->getPath());

        // Should be different instances
        $this->assertNotSame($originalState, $newState);
    }

    public function testWithFileNameUpdatesPath(): void
    {
        $originalState = new PluginState(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        $newState = $originalState->withFileName('updated-plugin.php');

        // Original state should remain unchanged
        $this->assertEquals('test-plugin.php', $originalState->getFileName());
        $this->assertEquals('test-plugin/test-plugin.php', $originalState->getPath());

        // New state should have updated values
        $this->assertEquals('updated-plugin.php', $newState->getFileName());
        $this->assertEquals('test-plugin/updated-plugin.php', $newState->getPath());

        // Should be different instances
        $this->assertNotSame($originalState, $newState);
    }

    public function testWithDetailsUrlReturnsNewInstance(): void
    {
        $originalState = new PluginState(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        $newState = $originalState->withDetailsUrl('https://example.com/new-url/');

        // Original state should remain unchanged
        $this->assertEquals('https://publishpress.com/pricing/test-plugin/', $originalState->getDetailsUrl());

        // New state should have updated values
        $this->assertEquals('https://example.com/new-url/', $newState->getDetailsUrl());

        // Should be different instances
        $this->assertNotSame($originalState, $newState);
    }

    public function testWithFamilyReturnsNewInstance(): void
    {
        $originalState = new PluginState(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/'
        );

        // Create a mock family
        $family = $this->createMock(PluginFamilyInterface::class);

        $newState = $originalState->withFamily($family);

        // Original state should remain unchanged
        $this->assertNull($originalState->getFamily());

        // New state should have updated values
        $this->assertSame($family, $newState->getFamily());

        // Should be different instances
        $this->assertNotSame($originalState, $newState);
    }

    public function testConstructorWithCustomPath(): void
    {
        $state = new PluginState(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/',
            null,
            false,
            false,
            false,
            '',
            'custom/path/test-plugin.php'
        );

        $this->assertEquals('custom/path/test-plugin.php', $state->getPath());
    }

    public function testConstructorWithInitialState(): void
    {
        $state = new PluginState(
            'Test Plugin',
            'test-plugin',
            'test-plugin.php',
            'https://publishpress.com/pricing/test-plugin/',
            null,
            true,
            true,
            true,
            '1.0.0',
            'test-plugin/test-plugin.php'
        );

        $this->assertTrue($state->isInstalled());
        $this->assertTrue($state->isActive());
        $this->assertTrue($state->isLicensed());
        $this->assertEquals('1.0.0', $state->getVersion());
    }
}
