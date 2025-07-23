<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Cache\Contract;

interface CacheServiceInterface
{
    public function get(string $key, mixed $default = null): mixed;

    public function set(string $key, mixed $value, int $ttl = 0): void;

    public function delete(string $key): void;

    public function clear(): void;
}
