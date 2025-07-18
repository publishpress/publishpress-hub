<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\PluginsDashboard;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuServiceInterface;
use PublishPress\Hub\Infrastructure\AdminMenu\Entity\SubmenuPage;
use PublishPress\Hub\Presentation\Controller\PluginDashboardController;

class PluginsDashboardService implements BootableInterface
{
    use BootableTrait;

    private PluginDashboardController $pluginDashboardController;

    private AdminMenuServiceInterface $adminMenuService;

    public function __construct(
        PluginDashboardController $pluginDashboardController,
        AdminMenuServiceInterface $adminMenuService
    ) {
        $this->pluginDashboardController = $pluginDashboardController;
        $this->adminMenuService = $adminMenuService;
    }

    protected function onLoad(): void
    {
        $this->registerAdminMenu();
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
            [$this->pluginDashboardController, 'render']
        );

        $this->adminMenuService->addSubmenuPage($submenu);
        $this->adminMenuService->setMainMenuPage('publishpress-hub-plugins-dashboard');
    }
}
