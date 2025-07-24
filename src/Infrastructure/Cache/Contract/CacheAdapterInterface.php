<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Cache\Contract;

interface CacheAdapterInterface
{
    /**
     * @param string $key
     * @param string $group
     * @param mixed $default
     * @return mixed
     */
    public function get(string $key, string $group = '', $default = null);

    /**
     * @param string $key
     * @param mixed $value
     * @param string $group
     * @param int $ttl
     */
    public function set(string $key, $value, string $group = '', int $ttl = 0): void;

    public function delete(string $key, string $group = ''): void;

    public function clear(): void;
}
