<?php

/**
 * WordPress event dispatcher implementation.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Event;

use PublishPress\Hub\Infrastructure\Event\Contracts\EventDispatcherInterface;

/**
 * WordPress hooks implementation of event dispatcher.
 *
 * This implementation uses WordPress native hooks system to provide
 * event dispatching capabilities while maintaining the abstraction.
 *
 * @since 1.0.0
 */
class WordPressEventDispatcher implements EventDispatcherInterface
{
    /**
     * Register an action hook.
     *
     * @since 1.0.0
     * @param string $hook The hook name
     * @param callable $callback The callback function
     * @param int $priority The priority (default: 10)
     * @param int $acceptedArgs Number of arguments (default: 1)
     * @return void
     */
    public function addAction(string $hook, callable $callback, int $priority = 10, int $acceptedArgs = 1): void
    {
        add_action($hook, $callback, $priority, $acceptedArgs);
    }

    /**
     * Register a filter hook.
     *
     * @since 1.0.0
     * @param string $hook The hook name
     * @param callable $callback The callback function
     * @param int $priority The priority (default: 10)
     * @param int $acceptedArgs Number of arguments (default: 1)
     * @return void
     */
    public function addFilter(string $hook, callable $callback, int $priority = 10, int $acceptedArgs = 1): void
    {
        add_filter($hook, $callback, $priority, $acceptedArgs);
    }

    /**
     * Dispatch an action.
     *
     * @since 1.0.0
     * @param string $hook The hook name
     * @param mixed ...$args Arguments to pass to the hook
     * @return void
     */
    public function doAction(string $hook, ...$args): void
    {
        do_action($hook, ...$args);
    }

    /**
     * Apply filters.
     *
     * @since 1.0.0
     * @param string $hook The hook name
     * @param mixed $value The value to filter
     * @param mixed ...$args Additional arguments
     * @return mixed The filtered value
     */
    public function applyFilters(string $hook, $value, ...$args)
    {
        return apply_filters($hook, $value, ...$args);
    }

    /**
     * Check if a hook has any callbacks.
     *
     * @since 1.0.0
     * @param string $hook The hook name
     * @return bool True if hook has callbacks, false otherwise
     */
    public function hasAction(string $hook): bool
    {
        return has_action($hook) !== false;
    }

    /**
     * Remove an action hook.
     *
     * @since 1.0.0
     * @param string $hook The hook name
     * @param callable $callback The callback function
     * @param int $priority The priority
     * @return bool True if removed, false otherwise
     */
    public function removeAction(string $hook, callable $callback, int $priority = 10): bool
    {
        return remove_action($hook, $callback, $priority);
    }

    /**
     * Remove a filter hook.
     *
     * @since 1.0.0
     * @param string $hook The hook name
     * @param callable $callback The callback function
     * @param int $priority The priority
     * @return bool True if removed, false otherwise
     */
    public function removeFilter(string $hook, callable $callback, int $priority = 10): bool
    {
        return remove_filter($hook, $callback, $priority);
    }
}
