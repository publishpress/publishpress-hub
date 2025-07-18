<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Hooks\Contract;

interface HooksServiceInterface
{
    public function addAction(string $action, callable $callback, int $priority = 10, int $acceptedArgs = 1): void;

    public function removeAction(string $action, callable $callback, int $priority = 10): void;

    public function doAction(string $action, ...$args): void;

    public function addFilter(string $filter, callable $callback, int $priority = 10, int $acceptedArgs = 1): void;

    public function removeFilter(string $filter, callable $callback, int $priority = 10): void;

    public function applyFilters(string $filter, ...$args);
}
