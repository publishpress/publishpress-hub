<?php

declare(strict_types=1);


namespace Tests\Api;

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
}
