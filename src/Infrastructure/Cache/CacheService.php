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

use PublishPress\Hub\Infrastructure\Cache\Contract\CacheAdapterInterface;
use PublishPress\Hub\Infrastructure\Cache\Contract\CacheServiceInterface;

class CacheService implements CacheServiceInterface
{
    private CacheAdapterInterface $cacheAdapter;

    private string $group;

    /**
     * @param string $group The group of the cache.
     * @param CacheAdapterInterface $cacheAdapter The cache adapter.
     * @since 1.0.0
     */
    public function __construct(string $group, CacheAdapterInterface $cacheAdapter)
    {
        $this->group = $group;
        $this->cacheAdapter = $cacheAdapter;
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
        return $this->cacheAdapter->get($key, $this->group, $default);
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
        $this->cacheAdapter->set($key, $value, $this->group, $ttl);
    }

    /**
     * Delete a value from the cache.
     *
     * @param string $key The key of the value to delete.
     * @since 1.0.0
     */
    public function delete(string $key): void
    {
        $this->cacheAdapter->delete($key, $this->group);
    }

    /**
     * Clear the cache.
     *
     * @since 1.0.0
     */
    public function clear(): void
    {
        $this->cacheAdapter->clear();
    }
}
