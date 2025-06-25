<?php

declare(strict_types=1);


namespace Tests\Integration\Application\Service;

use PublishPress\Hub\Application\Service\CoreHubService;
use PublishPress\Hub\Domain\Hooks as DomainHooks;
use PublishPress\Hub\Application\Hooks;
use PublishPress\Hub\Application\Service\PluginBootstrapService;
use PublishPress\Hub\Domain\Plugin\PluginRepository;
use PublishPress\Hub\Infrastructure\Container\ServiceCollection;
use Tests\NoTransactionWPTestCase;

/**
 * Integration tests for HubService.
 *
 * Tests the HubService with real WordPress hooks through the
 * event dispatcher abstraction.
 *
 * @since 1.0.0
 */
class HubServiceTest extends NoTransactionWPTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }

    public function testServiceInitializes(): void
    {
        $pluginRepository = new PluginRepository();
        $serviceCollection = new ServiceCollection();
        $hubService = new CoreHubService($pluginRepository, $serviceCollection);

        $this->assertFalse($hubService->isInitialized());

        $result = $hubService->initialize();

        $this->assertSame($hubService, $result);
        $this->assertTrue($hubService->isInitialized());

        $this->seeHookAction(Hooks::ACTION_REGISTER_PLUGIN);
    }

    public function testRegisterPluginViaAction(): void
    {
        $pluginRepository = new PluginRepository();
        $serviceCollection = new ServiceCollection();
        $pluginBootstrapService = new PluginBootstrapService($pluginRepository);
        $pluginBootstrapService->initialize();
        $pluginBootstrapService->bootstrapPlugins();
        $hubService = new CoreHubService($pluginRepository, $serviceCollection);
        $hubService->initialize();

        // Trigger the action like our plugins would do.
        do_action(
            Hooks::ACTION_REGISTER_PLUGIN,
            'publishpress-authors',
            '1.0.0',
            TESTS_PATH . 'Support/Data/Plugins/dummy-authors-free/publishpress-authors.php'
        );

        $plugin = $pluginRepository->findBySlug('publishpress-authors');
        $this->assertEquals('PublishPress Authors', $plugin->getName());
        $this->assertEquals('publishpress-authors', $plugin->getSlugFree());
        $this->assertEquals('1.0.0', $plugin->getVersion());
        $this->assertEquals(TESTS_PATH . 'Support/Data/Plugins/dummy-authors-free/publishpress-authors.php', $plugin->getPath());

        $this->seeHookCalledTimes(DomainHooks::ACTION_BEFORE_PLUGIN_REGISTER, 1);
        $this->seeHookCalledTimes(DomainHooks::ACTION_PLUGIN_REGISTERED, 1);
    }

    public function testRegisterPluginFailsWithException(): void
    {
        $pluginRepository = new PluginRepository();
        $serviceCollection = new ServiceCollection();
        $hubService = new CoreHubService($pluginRepository, $serviceCollection);
        $hubService->initialize();

        add_action(DomainHooks::ACTION_BEFORE_PLUGIN_REGISTER, function () {
            throw new \Exception('Test exception');
        });

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Test exception');

        $hubService->registerPlugin('test-plugin', '1.0.0', '/test/path');

        $this->seeHookCalled(DomainHooks::ACTION_PLUGIN_REGISTRATION_FAILED);
    }
}
