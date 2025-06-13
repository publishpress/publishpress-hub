<?php

declare(strict_types=1);

namespace PublishPress\Hub\Tests\Unit\Infrastructure\Container;

use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;
use PublishPress\Hub\Infrastructure\Container\ServiceCollection;
use PublishPress\Hub\Tests\Unit\Infrastructure\Container\TestDoubles\TestService;
use PHPUnit\Framework\TestCase;

if (! class_exists(TestService::class)) {
    require_once __DIR__ . '/TestDoubles/TestService.php';
}

/**
 * Test the service collection.
 *
 * @since 1.0.0
 */
class ServiceCollectionTest extends TestCase
{
    /**
     * Test adding and getting services.
     *
     * @covers ::add
     * @covers ::get
     */
    public function testAddAndGetServices(): void
    {
        $collection = new ServiceCollection();

        $service1 = new TestService();
        $service2 = new TestService();

        $collection->add('test1', $service1);
        $collection->add('test2', $service2);

        $this->assertSame($service1, $collection->get('test1'));
        $this->assertSame($service2, $collection->get('test2'));
        $this->assertNull($collection->get('non_existent'));
    }

    /**
     * Test initializing all services.
     *
     * @covers ::initialize
     */
    public function testInitializeAllServices(): void
    {
        $collection = new ServiceCollection();

        $service1 = new TestService();
        $service2 = new TestService();

        $collection->add('test1', $service1);
        $collection->add('test2', $service2);

        $collection->initialize();

        $this->assertTrue($service1->isInitialized());
        $this->assertTrue($service2->isInitialized());
    }

    /**
     * Test getting all services.
     *
     * @covers ::getAll
     */
    public function testGetAllServices(): void
    {
        $collection = new ServiceCollection();

        $service1 = new TestService();
        $service2 = new TestService();

        $collection->add('test1', $service1);
        $collection->add('test2', $service2);

        $allServices = $collection->getAll();

        $this->assertCount(2, $allServices);
        $this->assertSame($service1, $allServices['test1']);
        $this->assertSame($service2, $allServices['test2']);
    }
}
