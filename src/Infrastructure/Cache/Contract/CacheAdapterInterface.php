<?php

/**
 * Cache adapter interface.
 *
 * @package PublishPress\Hub\Infrastructure\Cache\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Cache\Contract;

interface CacheAdapterInterface
{
    /**
     * Get a value from the cache.
     *
     * @param string $key The key of the value to get.
     * @param string $group The group of the value to get.
     * @param mixed $default The default value to return if the value is not found.
     * @return mixed The value from the cache.
     * @since 1.0.0
     */
    public function get(string $key, string $group = '', $default = null);

    /**
     * Set a value in the cache.
     *
     * @param string $key
     * @param mixed $value The value to set.
     * @param string $group The group of the value to set.
     * @param int $ttl The time to live for the value.
     * @since 1.0.0
     */
    public function set(string $key, $value, string $group = '', int $ttl = 0): void;

    /**
     * Delete a value from the cache.
     *
     * @param string $key The key of the value to delete.
     * @param string $group The group of the value to delete.
     * @since 1.0.0
     */
    public function delete(string $key, string $group = ''): void;

    /**
     * Clear the cache.
     *
     * @since 1.0.0
     */
    public function clear(): void;
}
