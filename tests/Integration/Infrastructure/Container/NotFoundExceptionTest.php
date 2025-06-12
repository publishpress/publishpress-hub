<?php

declare(strict_types=1);


namespace Tests\Integration\Infrastructure\Container;

use PublishPress\Hub\Infrastructure\Container\NotFoundException;
use PublishPress\Hub\Infrastructure\Container\ServiceContainer;
use Tests\WPTestCase;

/**
 * Unit tests for ServiceContainer class.
 *
 * @coversDefaultClass \PublishPress\Hub\Infrastructure\Container\NotFoundException
 */
class NotFoundExceptionTest extends WPTestCase
{
    /**
     * @var ServiceContainer
     */
    private $container;

    protected function setUp(): void
    {
        parent::setUp();
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }

    public function testConstructor(): void
    {
        $previous = new \Exception('previous');
        $exception = new NotFoundException('test', 125, $previous);
        $this->assertEquals('test', $exception->getMessage());
        $this->assertEquals(125, $exception->getCode());
        $this->assertSame($previous, $exception->getPrevious());
    }
}
