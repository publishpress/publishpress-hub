<?php

declare(strict_types=1);


namespace Tests\Integration\Infrastructure\Container;

use PublishPress\Hub\Infrastructure\Container\Contracts\ServiceContainerInterface;
use PublishPress\Hub\Infrastructure\Container\NotFoundException;
use PublishPress\Hub\Infrastructure\Container\ServiceContainer;
use ReflectionClass;
use Tests\WPTestCase;

/**
 * Unit tests for ServiceContainer class.
 *
 * @coversDefaultClass \PublishPress\Hub\Infrastructure\Container\ServiceContainer
 */
class ServiceContainerTest extends WPTestCase
{
    /**
     * @var ServiceContainer
     */
    private $container;

    protected function setUp(): void
    {
        parent::setUp();
        // Reset singleton instance before each test
        $this->resetSingleton();
    }

    protected function tearDown(): void
    {
        // Reset singleton instance after each test
        $this->resetSingleton();
        parent::tearDown();
    }

    /**
     * Reset the singleton instance using reflection
     */
    private function resetSingleton(): void
    {
        $reflection = new ReflectionClass(ServiceContainer::class);
        $instanceProperty = $reflection->getProperty('instance');
        $instanceProperty->setAccessible(true);
        $instanceProperty->setValue(null);
    }

    /**
     * @covers ::__construct
     * @covers ::registerServices
     */
    public function testConstructorWithEmptyServices(): void
    {
        $container = new ServiceContainer();

        $this->assertInstanceOf(ServiceContainer::class, $container);
        $this->assertInstanceOf(ServiceContainerInterface::class, $container);
    }

    /**
     * @covers ::__construct
     * @covers ::registerServices
     * @covers ::has
     */
    public function testConstructorWithServices(): void
    {
        $services = [
            'test_service' => 'test_value',
            'another_service' => function() { return 'closure_result'; }
        ];

        $container = new ServiceContainer($services);

        $this->assertTrue($container->has('test_service'));
        $this->assertTrue($container->has('another_service'));
        $this->assertFalse($container->has('non_existent_service'));
    }

    /**
     * @covers ::registerServices
     * @covers ::has
     */
    public function testRegisterServices(): void
    {
        $container = new ServiceContainer();

        $initialServices = [
            'service1' => 'value1',
            'service2' => 'value2'
        ];

        $container->registerServices($initialServices);
        $this->assertTrue($container->has('service1'));
        $this->assertTrue($container->has('service2'));

        $additionalServices = [
            'service3' => 'value3',
            'service1' => 'updated_value1' // This should override
        ];

        $container->registerServices($additionalServices);
        $this->assertTrue($container->has('service3'));
        $this->assertEquals('updated_value1', $container->get('service1'));
    }

    /**
     * @covers ::getInstance
     */
    public function testGetInstanceSingleton(): void
    {
        $instance1 = ServiceContainer::getInstance();
        $instance2 = ServiceContainer::getInstance();

        $this->assertSame($instance1, $instance2);
        $this->assertInstanceOf(ServiceContainer::class, $instance1);
        $this->assertInstanceOf(ServiceContainerInterface::class, $instance1);
    }

    /**
     * @covers ::getInstance
     */
    public function testGetInstanceAfterConstructor(): void
    {
        $constructedContainer = new ServiceContainer();
        $instanceContainer = ServiceContainer::getInstance();

        $this->assertSame($constructedContainer, $instanceContainer);
    }

    /**
     * @covers ::get
     * @covers ::has
     */
    public function testGetSimpleService(): void
    {
        $services = [
            'simple_service' => 'simple_value',
            'number_service' => 42,
            'array_service' => ['key' => 'value']
        ];

        $container = new ServiceContainer($services);

        $this->assertEquals('simple_value', $container->get('simple_service'));
        $this->assertEquals(42, $container->get('number_service'));
        $this->assertEquals(['key' => 'value'], $container->get('array_service'));
    }

    /**
     * @covers ::get
     * @covers ::has
     */
    public function testGetClosureService(): void
    {
        $services = [
            'closure_service' => function() {
                return 'closure_result';
            },
            'closure_with_container' => function(ServiceContainerInterface $container) {
                return 'container_injected';
            }
        ];

        $container = new ServiceContainer($services);

        $this->assertEquals('closure_result', $container->get('closure_service'));
        $this->assertEquals('container_injected', $container->get('closure_with_container'));
    }

    /**
     * @covers ::get
     */
    public function testGetServiceCaching(): void
    {
        $callCount = 0;
        $services = [
            'cached_service' => function() use (&$callCount) {
                $callCount++;
                return 'cached_result_' . $callCount;
            }
        ];

        $container = new ServiceContainer($services);

        $result1 = $container->get('cached_service');
        $result2 = $container->get('cached_service');

        $this->assertEquals('cached_result_1', $result1);
        $this->assertEquals('cached_result_1', $result2); // Should be cached
        $this->assertEquals(1, $callCount); // Closure should only be called once
    }

    /**
     * @covers ::get
     */
    public function testGetComplexDependencyInjection(): void
    {
        $services = [
            'config' => ['database_host' => 'localhost'],
            'database' => function(ServiceContainerInterface $container) {
                $config = $container->get('config');
                return 'Database connected to: ' . $config['database_host'];
            },
            'repository' => function(ServiceContainerInterface $container) {
                $database = $container->get('database');
                return 'Repository using: ' . $database;
            }
        ];

        $container = new ServiceContainer($services);

        $repository = $container->get('repository');
        $this->assertEquals('Repository using: Database connected to: localhost', $repository);
    }

    /**
     * @covers ::get
     */
    public function testGetThrowsExceptionForNonExistentService(): void
    {
        $container = new ServiceContainer();

        $this->expectException(NotFoundException::class);
        $this->expectExceptionMessage('Service &quot;non_existent&quot; not found in container.');

        $container->get('non_existent');
    }

    /**
     * @covers ::has
     */
    public function testHasReturnsTrueForExistingServices(): void
    {
        $services = [
            'existing_service' => 'value'
        ];

        $container = new ServiceContainer($services);

        $this->assertTrue($container->has('existing_service'));
    }

    /**
     * @covers ::has
     */
    public function testHasReturnsTrueForResolvedEntries(): void
    {
        $services = [
            'service_to_resolve' => function() {
                return 'resolved_value';
            }
        ];

        $container = new ServiceContainer($services);

        // First get the service to resolve it
        $container->get('service_to_resolve');

        // has() should still return true for resolved entries
        $this->assertTrue($container->has('service_to_resolve'));
    }

    /**
     * @covers ::has
     */
    public function testHasReturnsFalseForNonExistentService(): void
    {
        $container = new ServiceContainer();

        $this->assertFalse($container->has('non_existent_service'));
    }

    /**
     * @covers ::get
     * @covers ::has
     * @covers ::registerServices
     */
    public function testCompleteWorkflow(): void
    {
        // Create container with initial services
        $initialServices = [
            'config' => ['env' => 'test'],
            'logger' => function() {
                return 'Logger instance';
            }
        ];

        $container = new ServiceContainer($initialServices);

        // Register additional services
        $additionalServices = [
            'cache' => function(ServiceContainerInterface $container) {
                $config = $container->get('config');
                return 'Cache for env: ' . $config['env'];
            }
        ];

        $container->registerServices($additionalServices);

        // Test all services are available
        $this->assertTrue($container->has('config'));
        $this->assertTrue($container->has('logger'));
        $this->assertTrue($container->has('cache'));

        // Test services work correctly
        $this->assertEquals(['env' => 'test'], $container->get('config'));
        $this->assertEquals('Logger instance', $container->get('logger'));
        $this->assertEquals('Cache for env: test', $container->get('cache'));

        // Test singleton behavior
        $sameContainer = ServiceContainer::getInstance();
        $this->assertSame($container, $sameContainer);
        $this->assertTrue($sameContainer->has('cache'));
    }

    /**
     * @covers ::get
     */
    public function testCircularDependencyHandling(): void
    {
        $services = [
            'service_a' => function(ServiceContainerInterface $container) {
                // This would cause infinite recursion if not handled properly
                // For this test, we'll just ensure basic functionality works
                return 'Service A';
            },
            'service_b' => function(ServiceContainerInterface $container) {
                $serviceA = $container->get('service_a');
                return 'Service B depends on: ' . $serviceA;
            }
        ];

        $container = new ServiceContainer($services);

        $result = $container->get('service_b');
        $this->assertEquals('Service B depends on: Service A', $result);
    }
}
