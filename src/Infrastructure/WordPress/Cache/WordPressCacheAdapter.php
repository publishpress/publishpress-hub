<?php

/**
 * WordPress cache adapter.
 *
 * @package PublishPress\Hub\Infrastructure\WordPress\Cache
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Cache;

use PublishPress\Hub\Infrastructure\Cache\Contract\CacheAdapterInterface;

class WordPressCacheAdapter implements CacheAdapterInterface
{
    /**
     * Get a cached value.
     *
     * @param string $key The key.
     * @param string $group The group.
     * @param mixed $default The default value.
     * @return mixed The cached value.
     * @since 1.0.0
     */
    public function get(string $key, string $group = '', $default = null)
    {
        return wp_cache_get($key, $group, false, $default);
    }

    /**
     * Set a cached value.
     *
     * @param string $key The key.
     * @param mixed $value The value.
     * @param string $group The group.
     * @param int $ttl The TTL.
     * @since 1.0.0
     */
    public function set(string $key, $value, string $group = '', int $ttl = 0): void
    {
        // phpcs:ignore WordPressVIPMinimum.Performance.LowExpiryCacheTime.CacheTimeUndetermined
        wp_cache_set($key, $value, $group, $ttl);
    }

    /**
     * Delete a cached value.
     *
     * @param string $key The key.
     * @param string $group The group.
     * @since 1.0.0
     */
    public function delete(string $key, string $group = ''): void
    {
        wp_cache_delete($key, $group);
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
