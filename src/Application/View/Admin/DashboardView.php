<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\View\Admin;

use PublishPress\Hub\Application\View\Contracts\ViewInterface;

/**
 * Dashboard view.
 *
 * @since 1.0.0
 */
class DashboardView implements ViewInterface
{
    /**
     * Render the view.
     *
     * @since 1.0.0
     */
    public function render(): void
    {
        include PUBLISHPRESS_HUB_TEMPLATES_PATH . 'admin/dashboard.php';
    }
}
