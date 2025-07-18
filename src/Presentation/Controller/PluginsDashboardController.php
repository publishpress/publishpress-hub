<?php

declare(strict_types=1);

namespace PublishPress\Hub\Presentation\Controller;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuServiceInterface;
use PublishPress\Hub\Infrastructure\AdminMenu\Entity\SubmenuPage;
use PublishPress\Hub\Infrastructure\View\Contract\ViewServiceInterface;

class PluginsDashboardController implements BootableInterface
{
    use BootableTrait;

    private ViewServiceInterface $viewService;

    private AdminMenuServiceInterface $adminMenuService;

    public function __construct(
        ViewServiceInterface $viewService,
        AdminMenuServiceInterface $adminMenuService
    ) {
        $this->viewService = $viewService;
        $this->adminMenuService = $adminMenuService;
    }

    protected function onLoad(): void
    {
        $this->registerAdminMenu();
        $this->enqueueAssets();
    }

    protected function onInit(): void
    {
    }

    private function registerAdminMenu(): void
    {
        $submenu = new SubmenuPage(
            'publishpress-hub',
            'Plugins',
            'Plugins',
            'manage_options',
            'publishpress-hub-plugins-dashboard',
            [$this, 'showDashboard']
        );

        $this->adminMenuService->addSubmenuPage($submenu);
        $this->adminMenuService->setMainMenuPage('publishpress-hub-plugins-dashboard');
    }

    private function enqueueAssets(): void
    {

    }

    public function showDashboard(): void
    {
        $this->viewService->render(
            'Admin/PluginsDashboard/plugins-dashboard-container',
            [
                'loading_message' => __('Please wait while we load the plugins dashboard...', 'publishpress-hub'),
            ]
        );
    }
}
