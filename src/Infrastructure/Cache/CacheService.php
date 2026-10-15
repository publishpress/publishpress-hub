<?php

/**
 * Cache service.
 *
 * @package PublishPress\Hub\Infrastructure\Cache
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Cache;

defined('ABSPATH') || exit;

use PublishPress\Hub\Infrastructure\Cache\Contract\CacheServiceInterface;

class CacheService implements CacheServiceInterface
{
    private string $group;

    /**
     * @param string $group The group of the cache.
     * @since 1.0.0
     */
    public function __construct(string $group)
    {
        $this->group = $group;
    }

    /**
     * Get a value from the cache.
     *
     * @param string $key The key of the value to get.
     * @param mixed $default The default value to return if the value is not found.
     * @return mixed The value from the cache.
     * @since 1.0.0
     */
    public function get(string $key, $default = null)
    {
        return wp_cache_get($key, $this->group, false, $default);
    }

    /**
     * Set a value in the cache.
     *
     * @param string $key The key of the value to set.
     * @param mixed $value The value to set.
     * @param int $ttl The time to live for the value.
     * @since 1.0.0
     */
    public function set(string $key, $value, int $ttl = 0): void
    {
        // phpcs:ignore WordPressVIPMinimum.Performance.LowExpiryCacheTime.CacheTimeUndetermined
        wp_cache_set($key, $value, $this->group, $ttl);
    }

    /**
     * Delete a value from the cache.
     *
     * @param string $key The key of the value to delete.
     * @since 1.0.0
     */
    public function delete(string $key): void
    {
        wp_cache_delete($key, $this->group);
    }

    /**
     * Clear the cache.
     *
     * @since 1.0.0
     */
    public function clear(): void
    {
        wp_cache_flush();
    }
}
