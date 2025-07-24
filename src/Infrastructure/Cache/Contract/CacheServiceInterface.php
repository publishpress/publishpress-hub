<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Cache\Contract;

interface CacheServiceInterface
{
    /**
     * @param string $key
     * @param mixed $default
     * @return mixed
     */
    public function get(string $key, $default = null);

    /**
     * @param string $key
     * @param mixed $value
     * @param int $ttl
     */
    public function set(string $key, $value, int $ttl = 0): void;

    public function delete(string $key): void;

    public function clear(): void;
}
