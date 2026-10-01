<?php

declare(strict_types=1);

namespace Tests\Unit\Application\UseCase\Plugin;

use Codeception\Test\Unit;
use PublishPress\Hub\Application\Service\License\LicenseManagementService;
use PublishPress\Hub\Application\Service\License\ScheduledLicenseValidationService;
use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Plugin\ActivateLicenseUseCase;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Contract\ProPluginInterface;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidException;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;

require_once dirname(__DIR__, 4) . '/Support/Stubs/RestRequest.php';

class ActivateLicenseFailureTest extends Unit
{
    public function testRejectedKeyCannotReportAnExistingLicenseAsNewSuccess(): void
    {
        $plugin = $this->createMock(ProPluginInterface::class);
        $plugin->method('getDownloadId')->willReturn(123);
        $plugin->method('getSlug')->willReturn('statuses-pro');
        $plugin->method('isLicensed')->willReturn(true);
        $family = $this->createMock(PluginFamilyInterface::class);
        $family->method('getProPlugin')->willReturn($plugin);
        $status = $this->createMock(PluginStatusService::class);
        $status->method('getPluginFamilyWithUpdatedStatus')->willReturn($family);
        $status->expects($this->never())->method('updatePluginStatus');
        $management = $this->createMock(LicenseManagementService::class);
        $management->method('activateAndStoreLicense')->willReturn(false);
        $validation = $this->createMock(ScheduledLicenseValidationService::class);
        $validation->expects($this->never())->method('validateAllLicenses');
        $repository = $this->createMock(PluginFamilyRepositoryInterface::class);
        $repository->expects($this->never())->method('getAllFamilies');
        $persistence = $this->createMock(LicensePersistenceInterface::class);
        $persistence->method('isLicenseFromConstant')->willReturn(false);
        $request = $this->createMock(\WP_REST_Request::class);
        $request->method('get_param')->willReturnMap([
            ['familySlug', 'statuses'], ['licenseKey', 'rejected-key'], ['applyToAll', true],
        ]);
        $useCase = new ActivateLicenseUseCase($status, $management, $validation, $repository, $persistence);
        $this->expectException(LicenseInvalidException::class);
        $useCase->execute($request);
    }
}
