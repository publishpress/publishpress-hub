<?php

/**
 * Hooks service interface.
 *
 * @package PublishPress\Hub\Infrastructure\Hooks\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Hooks\Contract;

interface HooksServiceInterface
{
    /**
     * Add an action.
     *
     * @param string $action The action.
     * @param callable $callback The callback.
     * @param int $priority The priority.
     * @param int $acceptedArgs The accepted arguments.
     * @return void
     * @since 1.0.0
     */
    public function addAction(string $action, callable $callback, int $priority = 10, int $acceptedArgs = 1): void;

    /**
     * Remove an action.
     *
     * @param string $action The action.
     * @param callable $callback The callback.
     * @param int $priority The priority.
     * @return void
     * @since 1.0.0
     */
    public function removeAction(string $action, callable $callback, int $priority = 10): void;

    /**
     * Do an action.
     *
     * @param string $action The action.
     * @param mixed ...$args The arguments.
     * @return void
     * @since 1.0.0
     */
    public function doAction(string $action, ...$args): void;

    /**
     * Add a filter.
     *
     * @param string $filter The filter.
     * @param callable $callback The callback.
     * @param int $priority The priority.
     * @param int $acceptedArgs The accepted arguments.
     * @return void
     * @since 1.0.0
     */
    public function addFilter(string $filter, callable $callback, int $priority = 10, int $acceptedArgs = 1): void;

    /**
     * Remove a filter.
     *
     * @param string $filter The filter.
     * @param callable $callback The callback.
     * @param int $priority The priority.
     * @return void
     * @since 1.0.0
     */
    public function removeFilter(string $filter, callable $callback, int $priority = 10): void;

    /**
     * Apply filters.
     *
     * @param string $filter The filter.
     * @param mixed ...$args The arguments.
     * @return mixed The filtered value.
     * @since 1.0.0
     */
    public function applyFilters(string $filter, ...$args);
}
