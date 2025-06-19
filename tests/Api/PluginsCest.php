<?php

declare(strict_types=1);


namespace Tests\Api;

use Tests\Support\ApiTester;

final class PluginsCest
{
    private const AUTH_HASH = 'YWRtaW46S1JjeHdnbUpqNEtDV3NZd2s4TWhIeXJB';

    public function _before(ApiTester $I): void
    {
        // Code here will be executed before each test.
    }

    public function tryToGetPlugins(ApiTester $I): void
    {
        $I->haveHttpHeader('Authorization', 'Basic ' . self::AUTH_HASH);
        $I->haveHttpHeader('Content-Type', 'application/json');
        $I->sendGET('plugins');

        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'success' => true,
        ]);

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
