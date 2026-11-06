<?php

/**
 * Regression tests for shared license activation.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.1.0
 */

declare(strict_types=1);

namespace Tests\Unit\Application\Service\License;

use Codeception\Test\Unit;
use PublishPress\Hub\Application\Service\License\LicenseManagementService;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\ProPluginInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicenseApiServiceInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;

class SharedLicenseActivationTest extends Unit
{
    public function testSharedActivationSkipsProtectedKeysAndContinuesAfterFailures(): void
    {
        $persistence = $this->createMock(LicensePersistenceInterface::class);
        $persistence->method('isLicenseFromConstant')->willReturnCallback(static fn(int $id): bool => $id === 2);
        $persistence->expects($this->once())->method('markLicenseAsFromConstant')->with(5, false);
        $persistence->expects($this->never())->method('storeLicenseStatus');
        $service = $this->getMockBuilder(LicenseManagementService::class)
            ->setConstructorArgs([$this->createMock(LicenseApiServiceInterface::class), $persistence])
            ->onlyMethods(['activateAndStoreLicense'])->getMock();
        $attempts = [];
        $service->expects($this->exactly(3))->method('activateAndStoreLicense')
            ->willReturnCallback(static function (string $key, int $id) use (&$attempts): bool {
                self::assertSame('bundle-key', $key);
                $attempts[] = $id;
                if ($id === 3) {
                    throw new \RuntimeException('Activation failed');
                }
                return $id === 5;
            });
        $families = [];
        foreach ([1, 2, 3, 4, 5] as $id) {
            $plugin = $this->createMock(ProPluginInterface::class);
            $plugin->method('getDownloadId')->willReturn($id);
            $plugin->method('getSlug')->willReturn('plugin-' . $id);
            $family = $this->createMock(PluginFamilyInterface::class);
            $family->method('getProPlugin')->willReturn($plugin);
            $families[] = $family;
        }

        $results = $service->activateLicenseForFamilies('bundle-key', $families, 1);

        self::assertSame([3, 4, 5], $attempts);
        self::assertSame([
            ['slug' => 'plugin-3', 'success' => false],
            ['slug' => 'plugin-4', 'success' => false],
            ['slug' => 'plugin-5', 'success' => true],
        ], $results);
    }
}
