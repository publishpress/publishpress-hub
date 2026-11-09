<?php

/**
 * Regression tests for locally derived expiration notices.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.1.0
 */

declare(strict_types=1);

namespace Tests\Unit\Application\Service\License;

use Codeception\Test\Unit;
use PublishPress\Hub\Application\Service\License\Contract\LicenseManagementServiceInterface;
use PublishPress\Hub\Application\Service\License\LicenseExpirationNoticeService;
use PublishPress\Hub\Application\Service\License\LicenseStatusStorageService;
use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Plugin\ListPluginsUseCase;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\ProPluginInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;

if (!defined('DAY_IN_SECONDS')) {
    define('DAY_IN_SECONDS', 86400);
}

class LicenseExpirationStateTest extends Unit
{
    /**
     * @dataProvider expirationCases
     * @since 1.1.0
     */
    public function testNoticesAndDashboardUseCurrentLocalState(
        bool $installed,
        string $key,
        string $date,
        bool $cachedExpired,
        bool $expected
    ): void {
        $plugin = $this->createMock(ProPluginInterface::class);
        $plugin->method('getDownloadId')->willReturn(123);
        $plugin->method('getName')->willReturn('Example Pro');
        $plugin->method('isInstalled')->willReturn($installed);
        $family = $this->createMock(PluginFamilyInterface::class);
        $family->method('getProPlugin')->willReturn($plugin);
        $status = $this->createMock(PluginStatusService::class);
        $status->method('getAllPluginFamiliesWithUpdatedStatus')->willReturn([$family]);
        $persistence = $this->createMock(LicensePersistenceInterface::class);
        $persistence->method('getLicenseKey')->willReturn($key);
        $persistence->method('getLicenseExpirationDate')->willReturn($date);
        $storage = $this->createMock(LicenseStatusStorageService::class);
        $cached = ['isExpired' => $cachedExpired, 'expirationDate' => '2000-01-01'];
        $storage->method('getAllExpiredLicenses')->willReturn($cachedExpired ? [123 => $cached] : []);
        $storage->method('getLicenseExpirationStatus')->willReturn($cached);
        $management = $this->createMock(LicenseManagementServiceInterface::class);
        $management->method('getStoredLicenseExpirationDate')->willReturn($date);
        $management->expects($this->never())->method('getLicenseInfo');
        $notices = new LicenseExpirationNoticeService($storage, $status, $persistence);

        self::assertSame($expected, count($notices->getExpiredLicensesForNotice()) === 1);

        $list = new ListPluginsUseCase($status, $persistence, $management, $storage);
        $method = new \ReflectionMethod($list, 'isLicenseExpired');
        $method->setAccessible(true);
        self::assertSame($key !== '' && $date === '2000-01-01', $method->invoke($list, $plugin));
    }

    /** @since 1.1.0 */
    public static function expirationCases(): array
    {
        return [
            'date passes before scheduled validation' => [true, 'key', '2000-01-01', false, true],
            'renewed date overrides stale expired flag' => [true, 'key', '2099-01-01', true, false],
            'uninstalled plugin' => [false, 'key', '2000-01-01', true, false],
            'removed license key' => [true, '', '2000-01-01', true, false],
        ];
    }
}
