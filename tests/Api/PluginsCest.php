<?php

declare(strict_types=1);


namespace Tests\Api;

use lucatume\WPBrowser\Utils\Filesystem;
use PublishPress\Hub\Domain\Plugin\Entity\FreePlugin as EntityFreePlugin;
use PublishPress\Hub\Domain\Plugin\Entity\PluginFamily as EntityPluginFamily;
use PublishPress\Hub\Domain\Plugin\Entity\ProPlugin as EntityProPlugin;
use PublishPress\Hub\Domain\Plugin\FreePlugin;
use PublishPress\Hub\Domain\Plugin\PluginFamily;
use PublishPress\Hub\Domain\Plugin\ProPlugin;
use PublishPress\Hub\Infrastructure\Container\AbstractDependencies;
use PublishPress\Hub\Infrastructure\Container\DependencyContainer;
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
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].slug');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].name');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].iconPath');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].description');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].changelogUrl');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].freePlugin.name');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].freePlugin.slug');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].freePlugin.version');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].freePlugin.detailsUrl');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].freePlugin.isInstalled');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].freePlugin.isActive');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].freePlugin.path');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].proPlugin.name');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].proPlugin.slug');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].proPlugin.version');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].proPlugin.detailsUrl');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].proPlugin.isInstalled');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].proPlugin.isActive');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].proPlugin.isLicensed');
        $I->seeResponseJsonMatchesJsonPath('$.plugins[0].proPlugin.path');
    }

    public function testInstallPluginFreeWithInvalidSlugReturnsError(ApiTester $I): void
    {
        $I->sendPOST('publishpress-hub/v1/plugins/invalid-slug/install/free');

        $I->seeResponseCodeIs(400);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson(
            [
                'success' => false,
            ]
        );
    }

    public function testInstallFreePlugin(ApiTester $I): void
    {
        $container = DependencyContainer::getInstance();
        $pluginFamilyRepository = $container->get(AbstractDependencies::PLUGIN_FAMILY_REPOSITORY);

        $pluginFamily = new EntityPluginFamily(
            'PublishPress Authors',
            'publishpress-authors',
            'icon-authors',
            'A dummy plugin for testing purposes',
            'https://publishpress.com/knowledge-base/changelogs-publishpress-authors/'
        );

        $freePlugin = new EntityFreePlugin(
            'PublishPress Authors',
            'publishpress-authors',
            'publishpress-authors.php',
            'https://publishpress.com/pricing/publishpress-authors/'
        );

        $proPlugin = new EntityProPlugin(
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
        $pluginRepository = $container->get(AbstractDependencies::PLUGIN_FAMILY_REPOSITORY);
        $plugin = $pluginRepository->findFamilyBySlug('publishpress-checklists');

        if ($plugin) {
            $plugin->unregister();
        }

        $I->sendPOST('publishpress-hub/v1/plugins/publishpress-checklists/install/free');

        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson(
            [
                'success' => true,
                'slug' => 'publishpress-checklists',
            ]
        );
    }
}
