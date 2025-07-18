<?php

declare(strict_types=1);


namespace Tests\Api;

use lucatume\WPBrowser\Utils\Filesystem;
use PublishPress\Hub\Domain\Plugin\FreePlugin;
use PublishPress\Hub\Domain\Plugin\PluginBuilder;
use PublishPress\Hub\Domain\Plugin\PluginFamily;
use PublishPress\Hub\Domain\Plugin\ProPlugin;
use PublishPress\Hub\Infrastructure\Container\DependencyContainer;
use PublishPress\Hub\Infrastructure\Container\Services;
use Tests\Support\ApiTester;

final class PluginsCest
{
    private $authHash;

    public function _before(ApiTester $I): void
    {
        $this->authHash = getenv('WP_TEST_AUTH_HASH');
        $I->haveHttpHeader('Authorization', 'Basic ' . $this->authHash);
        $I->haveHttpHeader('Content-Type', 'application/json');
    }

    public function tryToGetPlugins(ApiTester $I): void
    {
        $I->sendGET('publishpress-hub/v1/plugins');

        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson(['success' => true,]);
        $I->seeResponseJsonMatchesJsonPath('$.data[0].slug');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].name');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].iconPath');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].description');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].changelogUrl');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].freePlugin.name');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].freePlugin.slug');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].freePlugin.version');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].freePlugin.detailsUrl');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].freePlugin.isInstalled');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].freePlugin.isActive');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].freePlugin.path');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].proPlugin.name');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].proPlugin.slug');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].proPlugin.version');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].proPlugin.detailsUrl');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].proPlugin.isInstalled');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].proPlugin.isActive');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].proPlugin.isLicensed');
        $I->seeResponseJsonMatchesJsonPath('$.data[0].proPlugin.path');
    }

    public function testInstallPluginFreeWithInvalidSlug(ApiTester $I): void
    {
        $I->sendPOST('publishpress-hub/v1/plugins/invalid-slug/install/free');

        $I->seeResponseCodeIs(404);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson(
            [
                'code' => 'plugin_family_not_found',
            ]
        );
    }

    public function testInstallFreePlugin(ApiTester $I): void
    {
        $container = DependencyContainer::getInstance();
        $pluginFamilyRepository = $container->get(Services::PLUGIN_FAMILY_REPOSITORY);

        $pluginFamily = new PluginFamily(
            'icon-authors',
            'A dummy plugin for testing purposes',
            'https://publishpress.com/knowledge-base/changelogs-publishpress-authors/'
        );

        $freePlugin = new FreePlugin(
            'PublishPress Authors',
            'publishpress-authors',
            'publishpress-authors.php',
            'https://publishpress.com/pricing/publishpress-authors/'
        );

        $proPlugin = new ProPlugin(
            'PublishPress Authors Pro',
            'publishpress-authors-pro',
            'publishpress-authors-pro.php',
            'https://publishpress.com/pricing/publishpress-authors-pro/',
            1000,
            'publishpress-authors'
        );

        $pluginFamily->setFreePlugin($freePlugin);
        $pluginFamily->setProPlugin($proPlugin);

        $pluginFamilyRepository->registerFamily($pluginFamily);

        $I->sendPOST('publishpress-hub/v1/plugins/publishpress-authors/install/free');

        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
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

        $container = DependencyContainer::getInstance();
        $pluginRepository = $container->get(Services::PLUGIN_FAMILY_REPOSITORY);
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
