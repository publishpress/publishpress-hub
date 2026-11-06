<?php

declare(strict_types=1);

namespace Tests\Unit\Application\Service\License;

use Codeception\Test\Unit;
use PublishPress\Hub\Application\Service\License\LicenseManagementService;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseActivationException;
use PublishPress\Hub\Infrastructure\License\Contract\LicenseApiServiceInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;

class LicenseManagementStorageTest extends Unit
{
    /** @dataProvider storageCases */
    public function testActivationChecksSavedState(string $method, ?string $storedKey, bool $status, bool $fails): void
    {
        $api = $this->createMock(LicenseApiServiceInterface::class);
        $api->method('activateLicense')->willReturn(true);
        $api->method('getLicenseInfo')->willReturn([]);
        $storage = $this->createMock(LicensePersistenceInterface::class);
        $storage->expects($this->once())->method('storeLicenseKey')->with(110550, 'requested-key');
        $storage->expects($this->once())->method('storeLicenseStatus')->with(110550, true);
        $storage->method('getLicenseKey')->willReturn($storedKey);
        $storage->method('getLicenseStatus')->willReturn($status);
        $service = new LicenseManagementService($api, $storage);
        if ($fails) {
            $this->expectException(LicenseActivationException::class);
        }
        $this->assertTrue($service->$method('requested-key', 110550));
    }

    public static function storageCases(): array
    {
        $cases = [];
        foreach (['activateAndStoreLicense', 'validateAndEnsureActiveLicense'] as $method) {
            $cases[] = [$method, null, true, true];
            $cases[] = [$method, 'previous-key', true, true];
            $cases[] = [$method, 'requested-key', false, true];
            $cases[] = [$method, 'requested-key', true, false];
        }
        return $cases;
    }
}
