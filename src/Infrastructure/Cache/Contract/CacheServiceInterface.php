<?php

/**
 * Cache service interface.
 *
 * @package PublishPress\Hub\Infrastructure\Cache\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Cache\Contract;

defined('ABSPATH') || exit;

interface CacheServiceInterface
{
    /**
     * Get a value from the cache.
     *
     * @param string $key The key of the value to get.
     * @param mixed $default The default value to return if the value is not found.
     * @return mixed The value from the cache.
     * @since 1.0.0
     */
    public function get(string $key, $default = null);

    /**
     * Set a value in the cache.
     *
     * @param string $key The key of the value to set.
     * @param mixed $value The value to set.
     * @param int $ttl The time to live for the value.
     * @since 1.0.0
     */
    public function set(string $key, $value, int $ttl = 0): void;

    /**
     * Delete a value from the cache.
     *
     * @param string $key The key of the value to delete.
     * @since 1.0.0
     */
    public function delete(string $key): void;

    /**
     * Clear the cache.
     *
     * @since 1.0.0
     */
    public function clear(): void;
}
