<?php declare(strict_types=1);

namespace Tests\Unit\Infrastructure\Container;

use Codeception\Test\Unit;
use PublishPress\Hub\Infrastructure\Container\NotFoundException;
use PublishPress\Hub\Infrastructure\Container\ServiceContainer;

/**
 * Unit tests for ServiceContainer class.
 *
 * @coversDefaultClass \PublishPress\Hub\Infrastructure\Container\ServiceContainer
 */
class NotFoundExceptionTest extends Unit
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
