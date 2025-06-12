<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container\Contracts;

/**
 * Service container interface.
 */
interface ServiceContainerInterface extends \PublishPress\Psr\Container\ContainerInterface
{
    /**
     * Register services with the container.
     *
     * @since 1.0.0
     */
    public function registerServices(array $services): void;
}
