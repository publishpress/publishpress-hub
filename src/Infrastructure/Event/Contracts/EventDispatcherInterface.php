<?php

/**
 * Event dispatcher interface for the PublishPress Hub library.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Event\Contracts;

/**
 * Interface for event dispatching.
 *
 * Provides abstraction over WordPress hooks system to improve testability
 * and maintain clean architecture principles.
 *
 * @since 1.0.0
 */
interface EventDispatcherInterface
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
    public function addAction(string $hook, callable $callback, int $priority = 10, int $acceptedArgs = 1): void;

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
    public function addFilter(string $hook, callable $callback, int $priority = 10, int $acceptedArgs = 1): void;

    /**
     * Dispatch an action.
     *
     * @since 1.0.0
     * @param string $hook The hook name
     * @param mixed ...$args Arguments to pass to the hook
     * @return void
     */
    public function doAction(string $hook, ...$args): void;

    /**
     * Apply filters.
     *
     * @since 1.0.0
     * @param string $hook The hook name
     * @param mixed $value The value to filter
     * @param mixed ...$args Additional arguments
     * @return mixed The filtered value
     */
    public function applyFilters(string $hook, $value, ...$args);

    /**
     * Check if a hook has any callbacks.
     *
     * @since 1.0.0
     * @param string $hook The hook name
     * @return bool True if hook has callbacks, false otherwise
     */
    public function hasAction(string $hook): bool;

    /**
     * Remove an action hook.
     *
     * @since 1.0.0
     * @param string $hook The hook name
     * @param callable $callback The callback function
     * @param int $priority The priority
     * @return bool True if removed, false otherwise
     */
    public function removeAction(string $hook, callable $callback, int $priority = 10): bool;

    /**
     * Remove a filter hook.
     *
     * @since 1.0.0
     * @param string $hook The hook name
     * @param callable $callback The callback function
     * @param int $priority The priority
     * @return bool True if removed, false otherwise
     */
    public function removeFilter(string $hook, callable $callback, int $priority = 10): bool;
}
