<?php

declare(strict_types=1);


namespace Tests\Api;

use lucatume\WPBrowser\Utils\Filesystem;
use PublishPress\Hub\Domain\Plugin\Plugin;
use PublishPress\Hub\Infrastructure\Container\ServiceContainer;
use PublishPress\Hub\Infrastructure\Container\Services;
use Tests\Support\ApiTester;

final class PluginsCest
{
    private $authHash;

    public function _before(ApiTester $I): void
    {
        $this->authHash = getenv('WP_TESTS_AUTH_HASH');
        $I->haveHttpHeader('Authorization', 'Basic ' . $this->authHash);
        $I->haveHttpHeader('Content-Type', 'application/json');
    }

    public function tryToGetPlugins(ApiTester $I): void
    {
        $I->sendGET('publishpress-hub/v1/plugins');

        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson(['success' => true,]);
        $I->seeResponseJsonMatchesJsonPath('$.data[0].slugFree');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].slugPro');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].name');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].version');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].isInstalled');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].isActive');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].isLicensed');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].isPro');
    }

    public function testInstallPluginFreeWithInvalidSlug(ApiTester $I): void
    {
        $I->sendPOST('publishpress-hub/v1/plugins/invalid-slug/install/free');

        $I->seeResponseCodeIs(404);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson(
            [
                'code' => 'plugin_not_found',
                'message' => 'Plugin not found: invalid-slug',
            ]
        );
    }

    public function testInstallPluginFreeWithAlreadyInstalledPlugin(ApiTester $I): void
    {
        $container = ServiceContainer::getInstance();
        $pluginRepository = $container->get(Services::PLUGIN_REPOSITORY);
        $plugin = new Plugin(
            'PublishPress Authors',
            'publishpress-authors',
            'publishpress-authors-pro',
            'publishpress-authors.php',
            'publishpress-authors-pro.php',
            'icon-authors',
            'A dummy plugin for testing purposes'
        );
        $plugin->register(
            '1.0.0',
            __DIR__ . '/../Support/Data/Plugins/dummy-authors-free/publishpress-authors.php',
            false
        );
        $pluginRepository->register($plugin);

        $I->sendPOST('publishpress-hub/v1/plugins/publishpress-authors/install/free');

        $I->seeResponseCodeIs(400);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson(
            [
                'code' => 'plugin_already_installed',
                'message' => 'Plugin "publishpress-authors" is already installed.',
            ]
        );
    }

    public function testInstallPluginFreeWithValidSlug(ApiTester $I): void
    {
        // Uninstall the plugin if exists
        $pluginPath = WP_PLUGIN_DIR . '/publishpress-checklists';
        if (file_exists($pluginPath)) {
            // Delete the plugin folder and all its contents - using filesystem
            $filesystem = new Filesystem();
            $filesystem->rrmdir($pluginPath);
        }

        $container = ServiceContainer::getInstance();
        $pluginRepository = $container->get(Services::PLUGIN_REPOSITORY);
        $plugin = $pluginRepository->findBySlug('publishpress-checklists');

        if ($plugin) {
            $plugin->unregister();
        }

        $I->sendPOST('publishpress-hub/v1/plugins/publishpress-checklists/install/free');

        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson(
            [
                'success' => true,
                'data' => ['plugin_slug' => 'publishpress-checklists'],
            ]
        );
    }
}
