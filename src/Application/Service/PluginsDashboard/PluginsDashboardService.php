<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\PluginsDashboard;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Presentation\Controller\PluginsDashboardController;

class PluginsDashboardService implements BootableInterface
{
    use BootableTrait;

    private PluginsDashboardController $pluginsDashboardController;

    public function __construct(
        PluginsDashboardController $pluginsDashboardController
    ) {
        $this->pluginsDashboardController = $pluginsDashboardController;
    }

    protected function onLoad(): void
    {
        $this->pluginsDashboardController->load();
    }

    protected function onInit(): void
    {
        $this->pluginsDashboardController->init();
    }
}
