<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Cache;

use PublishPress\Hub\Infrastructure\Cache\Contract\CacheAdapterInterface;

class WordPressCacheAdapter implements CacheAdapterInterface
{
    /**
     * @param string $key
     * @param string $group
     * @param mixed $default
     * @return mixed
     */
    public function get(string $key, string $group = '', $default = null)
    {
        return wp_cache_get($key, $group, false, $default);
    }

    /**
     * @param string $key
     * @param mixed $value
     * @param string $group
     * @param int $ttl
     */
    public function set(string $key, $value, string $group = '', int $ttl = 0): void
    {
        // phpcs:ignore WordPressVIPMinimum.Performance.LowExpiryCacheTime.CacheTimeUndetermined
        wp_cache_set($key, $value, $group, $ttl);
    }

    public function delete(string $key, string $group = ''): void
    {
        wp_cache_delete($key, $group);
    }

    public function clear(): void
    {
        wp_cache_flush();
    }
}
