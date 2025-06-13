<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container\Contracts;

use PublishPress\Hub\Infrastructure\Container\ServiceCollection;

/**
 * Service provider interface.
 *
 * @since 1.0.0
 */
interface ServiceProviderInterface
{
    /**
     * Register services in the collection.
     *
     * @since 1.0.0
     * @param ServiceContainerInterface $container The service container
     * @return ServiceCollection
     */
    public function __invoke(ServiceContainerInterface $container): ServiceCollection;
}
