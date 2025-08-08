<?php

/**
 * WordPress hooks adapter.
 *
 * @package PublishPress\Hub\Infrastructure\WP\Hooks
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WP\Hooks;

use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;

class WPHooksAdapter implements HooksServiceInterface
{
    /**
     * Add an action.
     *
     * @param string $action The action.
     * @param callable $callback The callback.
     * @param int $priority The priority.
     * @param int $accepted_args The accepted arguments.
     * @return void
     * @since 1.0.0
     */
    public function addAction(string $action, callable $callback, int $priority = 10, int $accepted_args = 1): void
    {
        add_action($action, $callback, $priority, $accepted_args);
    }

    /**
     * Add a filter.
     *
     * @param string $filter The filter.
     * @param callable $callback The callback.
     * @param int $priority The priority.
     * @param int $accepted_args The accepted arguments.
     * @return void
     * @since 1.0.0
     */
    public function addFilter(string $filter, callable $callback, int $priority = 10, int $accepted_args = 1): void
    {
        add_filter($filter, $callback, $priority, $accepted_args);
    }

    /**
     * Do an action.
     *
     * @param string $action The action.
     * @param mixed ...$args The arguments.
     * @return void
     * @since 1.0.0
     */
    public function doAction(string $action, ...$args): void
    {
        do_action($action, ...$args);
    }

    /**
     * Apply filters.
     *
     * @param string $filter The filter.
     * @param mixed ...$args The arguments.
     * @return mixed The filtered value.
     * @since 1.0.0
     */
    public function applyFilters(string $filter, ...$args)
    {
        return apply_filters($filter, ...$args);
    }

    /**
     * Remove an action.
     *
     * @param string $action The action.
     * @param callable $callback The callback.
     * @param int $priority The priority.
     * @return void
     * @since 1.0.0
     */
    public function removeAction(string $action, callable $callback, int $priority = 10): void
    {
        remove_action($action, $callback, $priority);
    }

    /**
     * Remove a filter.
     *
     * @param string $filter The filter.
     * @param callable $callback The callback.
     * @param int $priority The priority.
     * @return void
     * @since 1.0.0
     */
    public function removeFilter(string $filter, callable $callback, int $priority = 10): void
    {
        remove_filter($filter, $callback, $priority);
    }
}
