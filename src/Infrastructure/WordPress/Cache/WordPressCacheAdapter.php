<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Cache;

use PublishPress\Hub\Infrastructure\Cache\Contract\CacheAdapterInterface;

class WordPressCacheAdapter implements CacheAdapterInterface
{
    public function get(string $key, string $group = '', mixed $default = null): mixed
    {
        return wp_cache_get($key, $group, false, $default);
    }

    public function set(string $key, mixed $value, string $group = '', int $ttl = 0): void
    {
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
