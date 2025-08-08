<?php

/**
 * Service for the Plugins Dashboard.
 *
 * @package PublishPress\Hub\Application\Service\PluginsDashboard
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\PluginsDashboard;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Presentation\Controller\PluginsDashboardController;

class PluginsDashboardService implements BootableInterface
{
    use BootableTrait;

    private PluginsDashboardController $pluginsDashboardController;

    /**
     * @since 1.0.0
     */
    public function __construct(
        PluginsDashboardController $pluginsDashboardController
    ) {
        $this->pluginsDashboardController = $pluginsDashboardController;
    }

    /**
     * Loads the Plugins Dashboard controller.
     *
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        $this->pluginsDashboardController->load();
    }

    /**
     * Initializes the Plugins Dashboard controller.
     *
     * @since 1.0.0
     */
    protected function onInit(): void
    {
        $this->pluginsDashboardController->init();
    }
}
