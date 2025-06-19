<?php

declare(strict_types=1);

namespace PublishPress\Hub\Tests\Unit\Infrastructure\Container;

use PublishPress\Hub\Infrastructure\Container\HubServiceCollectionProvider;
use PublishPress\Hub\Tests\Unit\Infrastructure\Container\TestDoubles\TestService;
use PHPUnit\Framework\TestCase;
use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;
use PublishPress\Hub\Infrastructure\Container\Contracts\ServiceContainerInterface;
use PublishPress\Hub\Infrastructure\Container\ServiceCollection;
use PublishPress\Hub\Infrastructure\Container\Services;

if (! class_exists(TestService::class)) {
    require_once __DIR__ . '/TestDoubles/TestService.php';
}

/**
 * Test the service collection.
 *
 * @since 1.0.0
 */
class HubServiceCollectionProviderTest extends TestCase
{
    /**
     * Test that the provider returns a service collection.
     */
    public function testInvokeWillReturnServiceCollection(): void
    {
        $provider = new HubServiceCollectionProvider();

        $container = $this->createConfiguredMock(ServiceContainerInterface::class, [
            'has' => true,
            'get' => $this->createMock(ServiceInterface::class),
        ]);

        $collection = $provider($container);

        $this->assertInstanceOf(ServiceCollection::class, $collection);
    }

    /**
     * Test that the provider returns a service collection with the correct services.
     */
    public function testInvokeWillReturnServiceCollectionWithServices(): void
    {
        $provider = new HubServiceCollectionProvider();
        $serviceMock = $this->createMock(ServiceInterface::class);

        $container = $this->createConfiguredMock(ServiceContainerInterface::class, [
            'has' => true,
            'get' => $serviceMock,
        ]);

        $collection = $provider($container);

        $this->assertCount(4, $collection->getAll());
    }
}
