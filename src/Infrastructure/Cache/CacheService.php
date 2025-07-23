<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Cache;

use PublishPress\Hub\Infrastructure\Cache\Contract\CacheAdapterInterface;
use PublishPress\Hub\Infrastructure\Cache\Contract\CacheServiceInterface;

class CacheService implements CacheServiceInterface
{
    private CacheAdapterInterface $cacheAdapter;

    private string $group;

    public function __construct(string $group, CacheAdapterInterface $cacheAdapter)
    {
        $this->group = $group;
        $this->cacheAdapter = $cacheAdapter;
    }

    public function get(string $key, mixed $default = null): mixed
    {
        return $this->cacheAdapter->get($key, $this->group, $default);
    }

    public function set(string $key, mixed $value, int $ttl = 0): void
    {
        $this->cacheAdapter->set($key, $value, $this->group, $ttl);
    }

    public function delete(string $key): void
    {
        $this->cacheAdapter->delete($key, $this->group);
    }

    public function clear(): void
    {
        $this->cacheAdapter->clear();
    }
}
