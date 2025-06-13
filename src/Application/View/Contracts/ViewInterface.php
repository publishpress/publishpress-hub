<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\View\Contracts;

/**
 * View interface.
 *
 * @since 1.0.0
 */
interface ViewInterface
{
    /**
     * Render the view.
     *
     * @since 1.0.0
     */
    public function render(): void;
}
