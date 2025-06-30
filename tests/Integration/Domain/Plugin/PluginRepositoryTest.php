<?php

declare(strict_types=1);


namespace Tests\Integration\Domain\Plugin;

use PublishPress\Hub\Domain\Plugin\Plugin;
use PublishPress\Hub\Domain\Plugin\PluginBuilder;
use PublishPress\Hub\Domain\Plugin\PluginRepository;
use Tests\NoTransactionWPTestCase;

/**
 * Unit tests for the PluginRepository domain class.
 */
class PluginRepositoryTest extends NoTransactionWPTestCase
{
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
        $plugin = PluginBuilder::create('Test Plugin')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();

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
        $plugin1 = PluginBuilder::create('Plugin One')
            ->withSlugFree('plugin-one')
            ->withSlugPro('plugin-one-pro')
            ->withPluginFileNameFree('plugin-one.php')
            ->withPluginFileNamePro('plugin-one-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-plugin-one')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/plugin-two/')
            ->withProDetailsUrl('https://publishpress.com/pricing/plugin-two-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-plugin-two/')
            ->build();
        $plugin2 = PluginBuilder::create('Plugin Two')
            ->withSlugFree('plugin-two')
            ->withSlugPro('plugin-two-pro')
            ->withPluginFileNameFree('plugin-two.php')
            ->withPluginFileNamePro('plugin-two-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-plugin-two')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/plugin-two/')
            ->withProDetailsUrl('https://publishpress.com/pricing/plugin-two-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-plugin-two/')
            ->build();
        $plugin3 = PluginBuilder::create('Plugin Three')
            ->withSlugFree('plugin-three')
            ->withSlugPro('plugin-three-pro')
            ->withPluginFileNameFree('plugin-three.php')
            ->withPluginFileNamePro('plugin-three-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-plugin-three')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/plugin-three/')
            ->withProDetailsUrl('https://publishpress.com/pricing/plugin-three-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-plugin-three/')
            ->build();

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
        $plugin1 = PluginBuilder::create('Test Plugin')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin1->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin2 = PluginBuilder::create('Test Plugin Updated')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin2->register('2.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-2/dummy-plugin-2.php');

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
        $plugin1 = PluginBuilder::create('Test Plugin')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin1->register('2.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin2 = PluginBuilder::create('Test Plugin Old')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin2->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-2/dummy-plugin-2.php');

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
        $plugin1 = PluginBuilder::create('Test Plugin Original')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin1->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin2 = PluginBuilder::create('Test Plugin Duplicate')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin2->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-2/dummy-plugin-2.php');

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
        $plugin = PluginBuilder::create('Test Plugin')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

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
        $plugin = PluginBuilder::create('Test Plugin')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

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
        $plugin = PluginBuilder::create('Test Plugin')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

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
        $plugin = PluginBuilder::create('Test Plugin')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

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
        $plugin1 = PluginBuilder::create('Plugin A')
            ->withSlugFree('plugin-a')
            ->withSlugPro('plugin-a-pro')
            ->withPluginFileNameFree('plugin-a.php')
            ->withPluginFileNamePro('plugin-a-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-plugin-a')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/plugin-a/')
            ->withProDetailsUrl('https://publishpress.com/pricing/plugin-a-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-plugin-a/')
            ->build();
        $plugin1->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin2 = PluginBuilder::create('Plugin B')
            ->withSlugFree('plugin-b')
            ->withSlugPro('plugin-b-pro')
            ->withPluginFileNameFree('plugin-b.php')
            ->withPluginFileNamePro('plugin-b-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-plugin-b')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/plugin-b/')
            ->withProDetailsUrl('https://publishpress.com/pricing/plugin-b-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-plugin-b/')
            ->build();
        $plugin2->register('2.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-2/dummy-plugin-2.php');

        $this->repository->register($plugin1);
        $this->repository->register($plugin2);

        $allPlugins = $this->repository->getAllPlugins();

        $this->assertCount(2, $allPlugins);
        $this->assertContains($plugin1, $allPlugins);
        $this->assertContains($plugin2, $allPlugins);
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
        $plugin1 = PluginBuilder::create('Test Plugin')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin1->register('1.0.0-beta', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin2 = PluginBuilder::create('Test Plugin')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin2->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-2/dummy-plugin-2.php');

        $this->repository->register($plugin1);
        $this->repository->register($plugin2);

        $registeredPlugin = $this->repository->findBySlug('test-plugin');
        $this->assertEquals('1.0.0', $registeredPlugin->getVersion());

        // Reset repository
        $this->repository = new PluginRepository();

        // Test complex version numbers
        $plugin3 = PluginBuilder::create('Test Plugin')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin3->register('1.2.3', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin4 = PluginBuilder::create('Test Plugin')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin4->register('1.2.10', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-2/dummy-plugin-2.php');

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
        $plugin1 = PluginBuilder::create('Test Plugin')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin1->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin2 = PluginBuilder::create('Test Plugin')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin2->register('1.5.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-2/dummy-plugin-2.php');

        $plugin3 = PluginBuilder::create('Test Plugin')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin3->register('1.2.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin4 = PluginBuilder::create('Test Plugin')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin4->register('2.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-2/dummy-plugin-2.php');

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
    }

    /**
     * Test that repository maintains plugin instances correctly.
     */
    public function testRepositoryMaintainsPluginInstancesCorrectly(): void
    {
        $plugin1 = PluginBuilder::create('Plugin One')
            ->withSlugFree('plugin-one')
            ->withSlugPro('plugin-one-pro')
            ->withPluginFileNameFree('plugin-one.php')
            ->withPluginFileNamePro('plugin-one-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-plugin-one')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin1->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $plugin2 = PluginBuilder::create('Plugin Two')
            ->withSlugFree('plugin-two')
            ->withSlugPro('plugin-two-pro')
            ->withPluginFileNameFree('plugin-two.php')
            ->withPluginFileNamePro('plugin-two-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-plugin-two')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin2->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-2/dummy-plugin-2.php');

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
        $plugin = PluginBuilder::create('Test Plugin')
            ->withSlugFree('test-plugin')
            ->withSlugPro('test-plugin-pro')
            ->withPluginFileNameFree('test-plugin.php')
            ->withPluginFileNamePro('test-plugin-pro.php')
            ->withEddItemId(1000)
            ->withIconFile('icon-test-plugin')
            ->withDescription('A dummy plugin for testing purposes')
            ->withFreeDetailsUrl('https://publishpress.com/pricing/test-plugin/')
            ->withProDetailsUrl('https://publishpress.com/pricing/test-plugin-pro/')
            ->withChangelogUrl('https://publishpress.com/knowledge-base/changelogs-test-plugin/')
            ->build();
        $plugin->register('1.0.0', TESTS_PATH . 'Support/Data/Plugins/dummy-plugin-1/dummy-plugin-1.php');

        $this->repository->register($plugin);
        $this->assertTrue($this->repository->isRegistered('test-plugin'));

        $this->repository->reset();

        $this->assertEmpty($this->repository->getAllPlugins());
        $this->assertFalse($this->repository->isRegistered('test-plugin'));
        $this->assertNull($this->repository->findBySlug('test-plugin'));
    }
}
