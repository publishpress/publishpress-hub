<?php

declare(strict_types=1);

namespace Tests\Unit\Application\UseCase\Plugin;

use Codeception\Test\Unit;
use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Plugin\ResolveConflictUseCase;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginInterface;
use PublishPress\Hub\Domain\Plugin\Contract\ProPluginInterface;
use PublishPress\Hub\Infrastructure\WP\Plugin\WPPluginLifecycleAdapter;
use WP_REST_Request;

require_once dirname(__DIR__, 4) . '/Support/Stubs/RestRequest.php';

class ResolveConflictUseCaseTest extends Unit
{
    private WPPluginLifecycleAdapter $lifecycle;
    private PluginStatusService $status;
    private ResolveConflictUseCase $useCase;

    protected function setUp(): void
    {
        parent::setUp();
        $free = $this->createMock(PluginInterface::class);
        $free->method('getPath')->willReturn('free/plugin.php');
        $free->method('getSlug')->willReturn('free');
        $free->method('isInstalled')->willReturn(true);
        $pro = $this->createMock(ProPluginInterface::class);
        $pro->method('getPath')->willReturn('pro/plugin.php');
        $pro->method('isInstalled')->willReturn(true);
        $pro->method('isActive')->willReturn(true);
        $family = $this->createMock(PluginFamilyInterface::class);
        $family->method('getFreePlugin')->willReturn($free);
        $family->method('getProPlugin')->willReturn($pro);
        $family->method('hasConflictingInstallations')->willReturn(true);
        $this->status = $this->createMock(PluginStatusService::class);
        $this->status->method('getPluginFamilyWithUpdatedStatus')->willReturn($family);
        $this->lifecycle = $this->createMock(WPPluginLifecycleAdapter::class);
        $this->useCase = new ResolveConflictUseCase($this->status, $this->lifecycle);
    }

    private function request(string $phase, string $selection = 'pro'): WP_REST_Request
    {
        $builder = $this->getMockBuilder(WP_REST_Request::class)->disableOriginalConstructor();
        $request = $builder->onlyMethods(['get_param'])->getMock();
        $request->method('get_param')->willReturnMap([
            ['familySlug', 'statuses'], ['pluginToKeep', $selection], ['phase', $phase],
        ]);
        return $request;
    }

    public function testActivationNeverDeletesEitherCopy(): void
    {
        $this->lifecycle->expects($this->once())->method('switchActivePlugin')
            ->with('free/plugin.php', 'pro/plugin.php');
        $this->lifecycle->expects($this->never())->method('deletePlugin');
        $this->assertTrue($this->useCase->execute($this->request('activate'))['requiresCleanup']);
    }

    public function testCleanupRefusesUnsafeState(): void
    {
        $this->lifecycle->method('canRemoveConflictingPlugin')->willReturn(false);
        $this->lifecycle->expects($this->never())->method('deletePlugin');
        $this->expectException(\RuntimeException::class);
        $this->useCase->execute($this->request('cleanup'));
    }

    public function testCleanupDeletesOnlyAfterVerificationWithoutDoubleUninstall(): void
    {
        $this->lifecycle->method('canRemoveConflictingPlugin')->willReturn(true);
        $this->lifecycle->expects($this->never())->method('uninstallPlugin');
        $this->lifecycle->expects($this->once())->method('deletePlugin')->with('free/plugin.php')->willReturn(true);
        $this->status->expects($this->once())->method('updatePluginStatus');
        $this->assertTrue($this->useCase->execute($this->request('cleanup'))['active']);
    }

    public function testInvalidSelectionCannotChangeActivation(): void
    {
        $this->lifecycle->expects($this->never())->method('switchActivePlugin');
        $this->lifecycle->expects($this->never())->method('deletePlugin');
        $this->expectException(\InvalidArgumentException::class);
        $this->useCase->execute($this->request('activate', 'invalid'));
    }

    public function testFailedDeletionIsNotReportedAsSuccess(): void
    {
        $this->lifecycle->method('canRemoveConflictingPlugin')->willReturn(true);
        $this->lifecycle->method('deletePlugin')->willReturn(false);
        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('could not be removed');
        $this->useCase->execute($this->request('cleanup'));
    }
}
