<?php

declare(strict_types=1);

namespace PublishPress\Hub\Tests\Unit\Infrastructure\Container;

use PublishPress\Hub\Infrastructure\Container\DependencyContainer;
use Codeception\Test\Unit;
use PublishPress\Hub\Infrastructure\Container\Exception\NotFoundException;
use PublishPress\Hub\Tests\Unit\Infrastructure\Container\TestDummy\TestService;

/**
 * Test the service collection.
 *
 * @since 1.0.0
 */
class DependencyContainerTest extends Unit
{
    protected function setUp(): void
    {
        parent::setUp();

        if (! class_exists(TestService::class)) {
            require_once __DIR__ . '/TestDummy/TestService.php';
        }
    }

    public function testRegisterAndGetServices(): void
    {
        $container = new DependencyContainer();

        $definitions = [
            'test1' => function () {
                return new TestService();
            },
            'test2' => function () {
                return new TestService();
            },
        ];

        $container->register($definitions);

        $this->assertInstanceOf(TestService::class, $container->get('test1'));
        $this->assertInstanceOf(TestService::class, $container->get('test2'));
    }

    public function testGetThrowsExceptionForNonExistentService(): void
    {
        $container = new DependencyContainer();
        $this->expectException(NotFoundException::class);
        $container->get('non_existent');
    }

    public function testHas(): void
    {
        $container = new DependencyContainer();

        $this->assertFalse($container->has('test1'));

        $container->register([
            'test1' => function () {
                return new TestService();
            },
        ]);

        $this->assertTrue($container->has('test1'));
    }
}
