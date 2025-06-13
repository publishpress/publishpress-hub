<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container;

use PublishPress\Hub\Infrastructure\Container\Contracts\ServiceProviderInterface;
use PublishPress\Hub\Infrastructure\Container\Contracts\ServiceContainerInterface;

/**
 * Hub service collection provider.
 *
 * This provider is responsible for registering all services that are part of the
 * PublishPress Hub core functionality. It ensures services are registered in the
 * correct order and with proper dependencies.
 *
 * @since 1.0.0
 */
class HubServiceCollectionProvider implements ServiceProviderInterface
{
    /**
     * Register services in the collection.
     *
     * @since 1.0.0
     * @param ServiceContainerInterface $container The service container
     * @return ServiceCollection
     */
    public function __invoke(ServiceContainerInterface $container): ServiceCollection
    {
        $collection = new ServiceCollection();

        // Register core services
        $this->registerCoreServices($collection, $container);

        return $collection;
    }

    /**
     * Register core services.
     *
     * @since 1.0.0
     * @param ServiceCollection $collection The service collection
     * @param ServiceContainerInterface $container The service container
     */
    private function registerCoreServices(
        ServiceCollection $collection,
        ServiceContainerInterface $container
    ): void {
        // Register services in the correct order
        $services = [
            'language' => Services::LANGUAGE_SERVICE,
            'admin_menu' => Services::ADMIN_MENU_SERVICE,
        ];

        foreach ($services as $name => $serviceId) {
            if ($container->has($serviceId)) {
                $collection->add($name, $container->get($serviceId));
            }
        }
    }
}
