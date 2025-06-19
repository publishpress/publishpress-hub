<?php

declare(strict_types=1);

namespace Tests\Unit\Application\Service;

use PublishPress\Hub\Application\Service\PluginBootstrapService;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Plugin;
use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\MockObject\MockObject;

/**
 * Tests for PluginBootstrapService.
 *
 * @since 1.0.0
 */
class PluginBootstrapServiceTest extends TestCase
{
    /**
     * Mock plugin repository.
     *
     * @var PluginRepositoryInterface&MockObject
     */
    private $pluginRepository;

    /**
     * Service under test.
     *
     * @var PluginBootstrapService
     */
    private PluginBootstrapService $service;

    /**
     * Set up the test.
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->pluginRepository = $this->createMock(PluginRepositoryInterface::class);
        $this->service = new PluginBootstrapService($this->pluginRepository);
    }

    /**
     * Test that the service is not initialized by default.
     */
    public function testServiceNotInitializedByDefault(): void
    {
        $this->assertFalse($this->service->isInitialized());
    }

    /**
     * Test that the service can be initialized.
     */
    public function testServiceCanBeInitialized(): void
    {
        // Expect 10 plugins to be registered
        $this->pluginRepository
            ->expects($this->exactly(10))
            ->method('register')
            ->with($this->isInstanceOf(Plugin::class));

        $result = $this->service->initialize();

        $this->assertInstanceOf(PluginBootstrapService::class, $result);
        $this->assertTrue($this->service->isInitialized());
    }

    /**
     * Test that the service can only be initialized once.
     */
    public function testServiceCanOnlyBeInitializedOnce(): void
    {
        // First initialization should register 10 plugins
        $this->pluginRepository
            ->expects($this->exactly(10))
            ->method('register')
            ->with($this->isInstanceOf(Plugin::class));

        $this->service->initialize();
        $this->assertTrue($this->service->isInitialized());

        // Second initialization should not register any more plugins
        $this->service->initialize();
        $this->assertTrue($this->service->isInitialized());
    }

    /**
     * Test that all expected plugins are defined.
     */
    public function testExpectedPluginsAreDefined(): void
    {
        $expectedPlugins = [
            'PublishPress Checklists',
            'PublishPress Permissions',
            'PublishPress Authors',
            'PublishPress Blocks',
            'PublishPress Capabilities',
            'PublishPress Future',
            'PublishPress Planner',
            'PublishPress Revisions',
            'PublishPress Series',
            'PublishPress Statuses',
        ];

        $registeredPlugins = [];

        $this->pluginRepository
            ->expects($this->exactly(10))
            ->method('register')
            ->with($this->callback(function (Plugin $plugin) use (&$registeredPlugins) {
                $registeredPlugins[] = $plugin->getName();
                return true;
            }));

        $this->service->initialize();

        foreach ($expectedPlugins as $expectedPlugin) {
            $this->assertContains($expectedPlugin, $registeredPlugins);
        }
    }
}
