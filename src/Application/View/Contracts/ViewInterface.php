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
     * Enqueue the scripts.
     *
     * @since 1.0.0
     */
    public function enqueueScripts(string $hookSuffix): void;

    /**
     * Render the view.
     *
     * @since 1.0.0
     */
    public function render(): void;
}
