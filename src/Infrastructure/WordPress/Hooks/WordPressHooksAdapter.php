<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Hooks;

use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;

class WordPressHooksAdapter implements HooksServiceInterface
{
    public function addAction(string $action, callable $callback, int $priority = 10, int $accepted_args = 1): void
    {
        add_action($action, $callback, $priority, $accepted_args);
    }

    public function addFilter(string $filter, callable $callback, int $priority = 10, int $accepted_args = 1): void
    {
        add_filter($filter, $callback, $priority, $accepted_args);
    }

    public function doAction(string $action, ...$args): void
    {
        do_action($action, ...$args);
    }

    public function applyFilters(string $filter, ...$args)
    {
        return apply_filters($filter, ...$args);
    }

    public function removeAction(string $action, callable $callback, int $priority = 10): void
    {
        remove_action($action, $callback, $priority);
    }

    public function removeFilter(string $filter, callable $callback, int $priority = 10): void
    {
        remove_filter($filter, $callback, $priority);
    }
}
