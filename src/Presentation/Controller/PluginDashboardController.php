<?php

declare(strict_types=1);

namespace PublishPress\Hub\Presentation\Controller;

use PublishPress\Hub\Infrastructure\View\Contract\ViewServiceInterface;

class PluginDashboardController
{
    private ViewServiceInterface $viewService;

    public function __construct(ViewServiceInterface $viewService)
    {
        $this->viewService = $viewService;
    }

    public function render(): void
    {
        $this->viewService->render(
            'Admin/PluginsDashboard/plugins-dashboard-container',
            [
                'loading_message' => __('Please wait while we load the plugins dashboard...', 'publishpress-hub'),
            ]
        );
    }
}
