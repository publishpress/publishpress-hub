<?php

/**
 * Dependency container interface.
 *
 * @package PublishPress\Hub\Infrastructure\Container\Contracts
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container\Contracts;

use PublishPress\Psr\Container\ContainerInterface;

interface DependencyContainerInterface extends ContainerInterface
{
    /**
     * Register dependencies.
     *
     * @param array<callable|mixed> $dependencies Dependency definitions
     * @return void
     * @since 1.0.0
     */
    public function register(array $dependencies): void;
}
