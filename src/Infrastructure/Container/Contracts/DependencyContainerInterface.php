<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container\Contracts;

use PublishPress\Psr\Container\ContainerInterface;

interface DependencyContainerInterface extends ContainerInterface
{
    /**
     * @param array<callable|mixed> $dependencies Dependency definitions
     * @return void
     */
    public function register(array $dependencies): void;
}
