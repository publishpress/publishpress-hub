<?php

declare(strict_types=1);


namespace Tests\Unit\Infrastructure\Autoloader;

use Codeception\Test\Unit;
use PublishPress\Hub\Infrastructure\Autoloader\Autoloader;

/**
 * Unit tests for Autoloader class.
 *
 * @coversDefaultClass \PublishPress\Hub\Infrastructure\Autoloader\Autoloader
 */
class AutoloaderTest extends Unit
{
    /**
     * @var string
     */
    private string $testBaseDir;

    protected function setUp(): void
    {
        parent::setUp();

        $this->testBaseDir = __DIR__ . '/../../../Support/Data/DummyClasses';

        // Clear any previously registered autoloaders for clean state
        Autoloader::unregister();
    }

    protected function tearDown(): void
    {
        // Reset the autoloader for the next test
        $this->resetAutoloader();
        parent::tearDown();
    }

    /**
     * @covers ::register
     */
    public function testRegister(): void
    {
        Autoloader::register('DummyClasses\\Root1', $this->testBaseDir . '/root1');

        // The class should not exist before autoloading
        $this->assertFalse(class_exists('DummyClasses\\Root1\\TestClass1', false), 'Class should not exist before autoloading');

        // Trigger autoloading by checking if class exists
        $classExists = class_exists('DummyClasses\\Root1\\TestClass1');

        // The class should now exist after autoloading
        $this->assertTrue($classExists, 'Class should exist after autoloading');
    }

    /**
     * @covers ::register
     */
    public function testRegisterWithTrailingSlashInBaseDir(): void
    {
        // Register with trailing slash in base directory
        Autoloader::register('DummyClasses\\Root1', $this->testBaseDir . '/root1/');

        $className = 'DummyClasses\\Root1\\TestClass1';
        $this->assertTrue(class_exists($className), 'Should handle trailing slash in base directory');
    }

    /**
     * @covers ::register
     */
    public function testRegisterWithNestedNamespace(): void
    {
        Autoloader::register('DummyClasses\\Root1', $this->testBaseDir . '/root1');

        $className = 'DummyClasses\\Root1\\Sub\\TestSubClass1';
        $this->assertTrue(class_exists($className), 'Should load classes from nested namespaces');
    }

    /**
     * @covers ::register
     */
    public function testAutoloaderIgnoresClassesOutsideNamespace(): void
    {
        Autoloader::register('DummyClasses\\Root1', $this->testBaseDir . '/root1');

        // Try to load a class outside our namespace
        $className = 'OutsideClass';

        // This should not interfere with our autoloader since it's outside the namespace
        $this->assertFalse(class_exists($className, false), 'Should ignore classes outside registered namespace');
    }

    /**
     * @covers ::register
     */
    public function testAutoloaderHandlesNonExistentFiles(): void
    {
        Autoloader::register('DummyClasses\\Root1', $this->testBaseDir . '/root1');

        // Try to load a class that doesn't have a corresponding file
        $className = 'DummyClasses\\Root1\\NonExistentClass';

        // This should not throw an error, just return false
        $classExists = class_exists($className);
        $this->assertFalse($classExists, 'Should handle non-existent files gracefully');
    }

    /**
     * @covers ::autoload
     */
    public function testAutoloaderHandlesNonRegisteredNamespace(): void
    {
        Autoloader::register('DummyClasses\\Root1', $this->testBaseDir . '/root1');

        // Try to load a class that doesn't have a corresponding file
        $className = 'NonRegisteredNamespace\\NonExistentClass';

        // This should not throw an error, just return false
        $classExists = class_exists($className);
        $this->assertFalse($classExists, 'Should handle non-existent files gracefully');
    }

    /**
     * @covers ::register
     */
    public function testMultipleAutoloaderRegistrations(): void
    {
        Autoloader::register('DummyClasses\\Root1', $this->testBaseDir . '/root1');
        Autoloader::register('DummyClasses\\Root2', $this->testBaseDir . '/root2');

        // Use unique class names that won't be loaded by other tests
        $this->assertFalse(
            class_exists('DummyClasses\\Root1\\TestClassMultiple1', false),
            'First class should not be loaded yet'
        );

        $this->assertFalse(
            class_exists('DummyClasses\\Root2\\TestClassMultiple2', false),
            'Second class should not be loaded yet'
        );

        $this->assertTrue(
            class_exists('DummyClasses\\Root1\\TestClassMultiple1'),
            'First autoloader should work'
        );

        $this->assertTrue(
            class_exists('DummyClasses\\Root2\\TestClassMultiple2'),
            'Second autoloader should work'
        );
    }

    public function testUnregister(): void
    {
        Autoloader::register('DummyClasses\\Root1', $this->testBaseDir . '/root1');

        // Load a class to verify the autoloader is working
        $this->assertTrue(
            class_exists('DummyClasses\\Root1\\TestClass1'),
            'Class should be loaded before unregister'
        );

        // Unregister the autoloader
        Autoloader::unregister();

        // The already loaded class should still exist (PHP doesn't unload classes)
        $this->assertTrue(
            class_exists('DummyClasses\\Root1\\TestClass1', false),
            'Already loaded class should still exist after unregister'
        );

        // But new classes should not be autoloadable
        $this->assertFalse(
            class_exists('DummyClasses\\Root2\\TestClass2'),
            'New classes should not be autoloadable after unregister'
        );
    }

    /**
     * We need this to reset the autoloader for the next test so the library
     * classes can be loaded again.
     *
     * @return void
     */
    private function resetAutoloader(): void
    {
        Autoloader::unregister();
        Autoloader::register('PublishPress\\Hub\\', __DIR__ . '/../../../../src/');
    }
}
