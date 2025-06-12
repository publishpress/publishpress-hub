<?php

declare(strict_types=1);


namespace Tests\Unit\Domain\Plugin;

use Codeception\Test\Unit;
use PublishPress\Hub\Domain\Plugin\Plugin;
use PublishPress\Hub\Domain\Plugin\PluginRepository;
use Tests\Support\UnitTester;

/**
 * Unit tests for the PluginRepository domain class.
 */
class PluginRepositoryTest extends Unit
{
    protected UnitTester $tester;

    private PluginRepository $repository;

    protected function _before(): void
    {
        $this->repository = new PluginRepository();
    }

    /**
     * Test repository starts empty.
     */
    public function testRepositoryStartsEmpty(): void
    {
        $this->assertEmpty($this->repository->getAllPlugins());
        $this->assertFalse($this->repository->isRegistered('any-plugin'));
        $this->assertNull($this->repository->findBySlug('any-plugin'));
    }

    /**
     * Test registering a single plugin.
     */
    public function testRegisterSinglePlugin(): void
    {
        $plugin = new Plugin('Test Plugin', 'test-plugin', '1.0.0', '/path/to/plugin');

        $this->repository->register($plugin);

        $this->assertTrue($this->repository->isRegistered('test-plugin'));
        $this->assertCount(1, $this->repository->getAllPlugins());
        $this->assertSame($plugin, $this->repository->findBySlug('test-plugin'));
    }

    /**
     * Test registering multiple different plugins.
     */
    public function testRegisterMultipleDifferentPlugins(): void
    {
        $plugin1 = new Plugin('Plugin One', 'plugin-one', '1.0.0', '/path/to/plugin1');
        $plugin2 = new Plugin('Plugin Two', 'plugin-two', '2.0.0', '/path/to/plugin2');
        $plugin3 = new Plugin('Plugin Three', 'plugin-three', '1.5.0', '/path/to/plugin3');

        $this->repository->register($plugin1);
        $this->repository->register($plugin2);
        $this->repository->register($plugin3);

        $this->assertCount(3, $this->repository->getAllPlugins());
        $this->assertTrue($this->repository->isRegistered('plugin-one'));
        $this->assertTrue($this->repository->isRegistered('plugin-two'));
        $this->assertTrue($this->repository->isRegistered('plugin-three'));

        $this->assertSame($plugin1, $this->repository->findBySlug('plugin-one'));
        $this->assertSame($plugin2, $this->repository->findBySlug('plugin-two'));
        $this->assertSame($plugin3, $this->repository->findBySlug('plugin-three'));
    }

    /**
     * Test registering same plugin with newer version overwrites.
     */
    public function testRegisterSamePluginWithNewerVersionOverwrites(): void
    {
        $plugin1 = new Plugin('Test Plugin', 'test-plugin', '1.0.0', '/path/to/plugin');
        $plugin2 = new Plugin('Test Plugin Updated', 'test-plugin', '2.0.0', '/path/to/plugin/v2');

        $this->repository->register($plugin1);
        $this->repository->register($plugin2);

        $this->assertCount(1, $this->repository->getAllPlugins());
        $this->assertTrue($this->repository->isRegistered('test-plugin'));

        $registeredPlugin = $this->repository->findBySlug('test-plugin');
        $this->assertSame($plugin2, $registeredPlugin);
        $this->assertEquals('2.0.0', $registeredPlugin->getVersion());
        $this->assertEquals('Test Plugin Updated', $registeredPlugin->getName());
    }

    /**
     * Test registering same plugin with older version doesn't overwrite.
     */
    public function testRegisterSamePluginWithOlderVersionDoesNotOverwrite(): void
    {
        $plugin1 = new Plugin('Test Plugin', 'test-plugin', '2.0.0', '/path/to/plugin');
        $plugin2 = new Plugin('Test Plugin Old', 'test-plugin', '1.0.0', '/path/to/plugin/old');

        $this->repository->register($plugin1);
        $this->repository->register($plugin2);

        $this->assertCount(1, $this->repository->getAllPlugins());
        $this->assertTrue($this->repository->isRegistered('test-plugin'));

        $registeredPlugin = $this->repository->findBySlug('test-plugin');
        $this->assertSame($plugin1, $registeredPlugin);
        $this->assertEquals('2.0.0', $registeredPlugin->getVersion());
        $this->assertEquals('Test Plugin', $registeredPlugin->getName());
    }

    /**
     * Test registering same plugin with equal version overwrites.
     */
    public function testRegisterSamePluginWithEqualVersionOverwrites(): void
    {
        $plugin1 = new Plugin('Test Plugin Original', 'test-plugin', '1.0.0', '/path/to/plugin');
        $plugin2 = new Plugin('Test Plugin Duplicate', 'test-plugin', '1.0.0', '/path/to/plugin/duplicate');

        $this->repository->register($plugin1);
        $this->repository->register($plugin2);

        $this->assertCount(1, $this->repository->getAllPlugins());

        $registeredPlugin = $this->repository->findBySlug('test-plugin');
        $this->assertSame($plugin2, $registeredPlugin);
        $this->assertEquals('Test Plugin Duplicate', $registeredPlugin->getName());
    }

    /**
     * Test findBySlug returns null for non-existent plugin.
     */
    public function testFindBySlugReturnsNullForNonExistentPlugin(): void
    {
        $plugin = new Plugin('Test Plugin', 'test-plugin', '1.0.0', '/path/to/plugin');
        $this->repository->register($plugin);

        $this->assertNull($this->repository->findBySlug('non-existent-plugin'));
        $this->assertNull($this->repository->findBySlug(''));
        $this->assertNull($this->repository->findBySlug('test-plugin-2'));
    }

    /**
     * Test findBySlug is case sensitive.
     */
    public function testFindBySlugIsCaseSensitive(): void
    {
        $plugin = new Plugin('Test Plugin', 'test-plugin', '1.0.0', '/path/to/plugin');
        $this->repository->register($plugin);

        $this->assertSame($plugin, $this->repository->findBySlug('test-plugin'));
        $this->assertNull($this->repository->findBySlug('Test-Plugin'));
        $this->assertNull($this->repository->findBySlug('TEST-PLUGIN'));
    }

    /**
     * Test isRegistered returns false for non-existent plugin.
     */
    public function testIsRegisteredReturnsFalseForNonExistentPlugin(): void
    {
        $plugin = new Plugin('Test Plugin', 'test-plugin', '1.0.0', '/path/to/plugin');
        $this->repository->register($plugin);

        $this->assertFalse($this->repository->isRegistered('non-existent-plugin'));
        $this->assertFalse($this->repository->isRegistered(''));
        $this->assertFalse($this->repository->isRegistered('test-plugin-2'));
    }

    /**
     * Test isRegistered is case sensitive.
     */
    public function testIsRegisteredIsCaseSensitive(): void
    {
        $plugin = new Plugin('Test Plugin', 'test-plugin', '1.0.0', '/path/to/plugin');
        $this->repository->register($plugin);

        $this->assertTrue($this->repository->isRegistered('test-plugin'));
        $this->assertFalse($this->repository->isRegistered('Test-Plugin'));
        $this->assertFalse($this->repository->isRegistered('TEST-PLUGIN'));
    }

    /**
     * Test getAllPlugins returns array values without keys.
     */
    public function testGetAllPluginsReturnsArrayValues(): void
    {
        $plugin1 = new Plugin('Plugin A', 'plugin-a', '1.0.0', '/path/a');
        $plugin2 = new Plugin('Plugin B', 'plugin-b', '2.0.0', '/path/b');
        $plugin3 = new Plugin('Plugin C', 'plugin-c', '1.5.0', '/path/c');

        $this->repository->register($plugin1);
        $this->repository->register($plugin2);
        $this->repository->register($plugin3);

        $allPlugins = $this->repository->getAllPlugins();

        $this->assertCount(3, $allPlugins);
        $this->assertEquals([0, 1, 2], array_keys($allPlugins));
        $this->assertContains($plugin1, $allPlugins);
        $this->assertContains($plugin2, $allPlugins);
        $this->assertContains($plugin3, $allPlugins);
    }

    /**
     * Test getAllPlugins returns empty array when no plugins registered.
     */
    public function testGetAllPluginsReturnsEmptyArrayWhenEmpty(): void
    {
        $this->assertSame([], $this->repository->getAllPlugins());
        $this->assertIsArray($this->repository->getAllPlugins());
    }

    /**
     * Test complex version comparison scenarios.
     */
    public function testComplexVersionComparisonScenarios(): void
    {
        // Test pre-release versions
        $plugin1 = new Plugin('Test Plugin', 'test-plugin', '1.0.0-beta', '/path/1');
        $plugin2 = new Plugin('Test Plugin', 'test-plugin', '1.0.0', '/path/2');

        $this->repository->register($plugin1);
        $this->repository->register($plugin2);

        $registeredPlugin = $this->repository->findBySlug('test-plugin');
        $this->assertEquals('1.0.0', $registeredPlugin->getVersion());

        // Reset repository
        $this->repository = new PluginRepository();

        // Test complex version numbers
        $plugin3 = new Plugin('Test Plugin', 'test-plugin', '1.2.3', '/path/3');
        $plugin4 = new Plugin('Test Plugin', 'test-plugin', '1.2.10', '/path/4');

        $this->repository->register($plugin3);
        $this->repository->register($plugin4);

        $registeredPlugin = $this->repository->findBySlug('test-plugin');
        $this->assertEquals('1.2.10', $registeredPlugin->getVersion());
    }

    /**
     * Test multiple registrations of same plugin with different versions.
     */
    public function testMultipleRegistrationsOfSamePlugin(): void
    {
        $plugin1 = new Plugin('Test Plugin', 'test-plugin', '1.0.0', '/path/1');
        $plugin2 = new Plugin('Test Plugin', 'test-plugin', '1.5.0', '/path/2');
        $plugin3 = new Plugin('Test Plugin', 'test-plugin', '1.2.0', '/path/3');
        $plugin4 = new Plugin('Test Plugin', 'test-plugin', '2.0.0', '/path/4');
        $plugin5 = new Plugin('Test Plugin', 'test-plugin', '1.8.0', '/path/5');

        $this->repository->register($plugin1);
        $this->assertCount(1, $this->repository->getAllPlugins());
        $this->assertEquals('1.0.0', $this->repository->findBySlug('test-plugin')->getVersion());

        $this->repository->register($plugin2);
        $this->assertCount(1, $this->repository->getAllPlugins());
        $this->assertEquals('1.5.0', $this->repository->findBySlug('test-plugin')->getVersion());

        $this->repository->register($plugin3);
        $this->assertCount(1, $this->repository->getAllPlugins());
        $this->assertEquals('1.5.0', $this->repository->findBySlug('test-plugin')->getVersion()); // Should not change

        $this->repository->register($plugin4);
        $this->assertCount(1, $this->repository->getAllPlugins());
        $this->assertEquals('2.0.0', $this->repository->findBySlug('test-plugin')->getVersion());

        $this->repository->register($plugin5);
        $this->assertCount(1, $this->repository->getAllPlugins());
        $this->assertEquals('2.0.0', $this->repository->findBySlug('test-plugin')->getVersion()); // Should not change
    }

    /**
     * Test that repository maintains plugin instances correctly.
     */
    public function testRepositoryMaintainsPluginInstancesCorrectly(): void
    {
        $plugin1 = new Plugin('Plugin One', 'plugin-one', '1.0.0', '/path/1');
        $plugin2 = new Plugin('Plugin Two', 'plugin-two', '1.0.0', '/path/2');

        $this->repository->register($plugin1);
        $this->repository->register($plugin2);

        // Verify same instances are returned
        $this->assertSame($plugin1, $this->repository->findBySlug('plugin-one'));
        $this->assertSame($plugin2, $this->repository->findBySlug('plugin-two'));

        // Verify getAllPlugins returns same instances
        $allPlugins = $this->repository->getAllPlugins();
        $this->assertContains($plugin1, $allPlugins);
        $this->assertContains($plugin2, $allPlugins);
    }

    /**
     * Test edge case with empty slug handling.
     */
    public function testEdgeCaseWithEmptySlugHandling(): void
    {
        $this->assertFalse($this->repository->isRegistered(''));
        $this->assertNull($this->repository->findBySlug(''));
    }

    /**
     * Test reset method.
     */
    public function testResetMethod(): void
    {
        $this->repository->register(new Plugin('Test Plugin', 'test-plugin', '1.0.0', '/path/to/plugin'));
        $this->assertTrue($this->repository->isRegistered('test-plugin'));

        $this->repository->reset();

        $this->assertEmpty($this->repository->getAllPlugins());
        $this->assertFalse($this->repository->isRegistered('test-plugin'));
        $this->assertNull($this->repository->findBySlug('test-plugin'));
    }
}
