<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Cache\Contract;

interface CacheAdapterInterface
{
    public function get(string $key, string $group = '', mixed $default = null): mixed;

    public function set(string $key, mixed $value, string $group = '', int $ttl = 0): void;

    public function delete(string $key, string $group = ''): void;

    public function clear(): void;
}
