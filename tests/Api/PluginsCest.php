<?php

declare(strict_types=1);


namespace Tests\Api;

use lucatume\WPBrowser\Utils\Filesystem;
use Tests\Support\ApiTester;

final class PluginsCest
{
    private $authHash;
    private $licenseKey;

    public function _before(ApiTester $I): void
    {
        $this->authHash = getenv('WP_TEST_AUTH_HASH');
        $I->haveHttpHeader('Authorization', 'Basic ' . $this->authHash);
        $I->haveHttpHeader('Content-Type', 'application/json');

        // Store the license key for use in tests
        $this->licenseKey = getenv('EDD_LICENSE_FOR_TESTS');
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
        // Uninstall the plugin if it exists using the API endpoint
        // This ensures proper cleanup before testing installation
        try {
            $I->sendPOST('publishpress-hub/v1/plugins/authors/uninstall');
            // If uninstall succeeds, we can proceed with installation
            // If it fails (plugin not installed), that's also fine - we'll install it
        } catch (\Exception $e) {
            // Plugin might not be installed, which is fine
        }

        // Use the existing 'authors' family slug from config (not 'publishpress-authors')
        // The API route uses familySlug from the URL, which should match the family slug from config
        $I->sendPOST('publishpress-hub/v1/plugins/authors/install/free');

        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson(
            [
                'success' => true,
                'slug' => 'publishpress-authors',
            ]
        );
    }

    public function testInstallPluginFreeWithValidSlug(ApiTester $I): void
    {
        // Uninstall the plugin if it exists using the API endpoint
        // This ensures proper cleanup before testing installation
        try {
            $I->sendPOST('publishpress-hub/v1/plugins/checklists/uninstall');
            // If uninstall succeeds, we can proceed with installation
            // If it fails (plugin not installed), that's also fine - we'll install it
        } catch (\Exception $e) {
            // Plugin might not be installed, which is fine
        }

        // Use the correct family slug 'checklists' (not 'publishpress-checklists')
        // The API route uses familySlug from the URL, which should match the family slug from config
        $I->sendPOST('publishpress-hub/v1/plugins/checklists/install/free');

        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson(
            [
                'success' => true,
                'slug' => 'publishpress-checklists',
            ]
        );
    }

    public function testInstallPluginProWithInvalidSlugReturnsError(ApiTester $I): void
    {
        $I->sendPOST(
            'publishpress-hub/v1/plugins/invalid-slug/install/pro',
            [
                'licenseKey' => 'dummy-license-key',
            ]
        );

        $I->seeResponseCodeIs(400);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson(
            [
                'success' => false,
            ]
        );
    }

    public function testInstallPluginProWithInvalidLicenseKeyReturnsError(ApiTester $I): void
    {
        $I->sendPOST(
            'publishpress-hub/v1/plugins/checklists/install/pro',
            [
                'licenseKey' => '1234567890',
            ]
        );

        $I->seeResponseCodeIs(400);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson(
            [
                'success' => false,
            ]
        );
    }

    public function testInstallPluginProWithValidLicenseKey(ApiTester $I, $scenario): void
    {
        if (!$this->licenseKey) {
            $scenario->skip('License key is not provided');
        }

        $I->sendPOST(
            'publishpress-hub/v1/plugins/checklists/install/pro',
            [
                'licenseKey' => $this->licenseKey,
            ]
        );

        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson(
            [
                'success' => true,
                'slug' => 'publishpress-checklists-pro',
            ]
        );
    }
}
