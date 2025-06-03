<?php declare(strict_types=1);

namespace Tests\Unit\Infrastructure\WordPress\Logger;

use Codeception\Test\Unit;
use CustomException;
use Exception;
use PublishPress\Hub\Infrastructure\WordPress\Logger\ThrowableErrorLogger;
use RuntimeException;
use Throwable;

/**
 * Unit tests for ThrowableErrorLogger class.
 *
 * @coversDefaultClass \PublishPress\Hub\Infrastructure\WordPress\Logger\ThrowableErrorLogger
 */
class ThrowableErrorLoggerTest extends Unit
{
    private $logOutput = '';

    protected function setUp(): void
    {
        $this->logOutput = '';
        parent::setUp();
    }

    protected function tearDown(): void
    {
        parent::tearDown();
    }

    public function _customErrorLogFunction($message)
    {
        $this->logOutput = $message;
        return true;
    }

    /**
     * Test constructor with default configuration.
     *
     * @covers ::__construct
     */
    public function testConstructorWithDefaultConfig(): void
    {
        $logger = new ThrowableErrorLogger();

        $this->assertTrue($logger->getConfig('include_class_name'));
        $this->assertTrue($logger->getConfig('include_file_path'));
        $this->assertEquals(' > ', $logger->getConfig('trace_separator'));
        $this->assertEquals('', $logger->getConfig('message_prefix'));
        $this->assertEquals('error_log', $logger->getConfig('error_log_function'));
    }

    /**
     * Test constructor with custom configuration.
     *
     * @covers ::__construct
     */
    public function testConstructorWithCustomConfig(): void
    {
        $config = [
            'include_class_name' => false,
            'message_prefix' => 'TEST: ',
            'trace_separator' => ' | ',
            'error_log_function' => 'var_dump',
        ];

        $logger = new ThrowableErrorLogger($config);

        $this->assertFalse($logger->getConfig('include_class_name'));
        $this->assertEquals('TEST: ', $logger->getConfig('message_prefix'));
        $this->assertEquals(' | ', $logger->getConfig('trace_separator'));
        $this->assertEquals('var_dump', $logger->getConfig('error_log_function'));
        $this->assertTrue($logger->getConfig('include_file_path'));
    }

    /**
     * Test canLog method when error_log function is available.
     *
     * @covers ::canLog
     */
    public function testCanLogWhenErrorLogAvailable(): void
    {
        $logger = new ThrowableErrorLogger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $this->assertTrue($logger->canLog());
    }

    /**
     * Test canLog method when error_log function is not available.
     *
     * @covers ::canLog
     */
    public function testCanLogWhenErrorLogNotAvailable(): void
    {
        $logger = new ThrowableErrorLogger([
            'error_log_function' => null,
        ]);

        $this->assertFalse($logger->canLog());
    }

    /**
     * Test setConfig and getConfig methods.
     *
     * @covers ::setConfig
     * @covers ::getConfig
     */
    public function testSetAndGetConfig(): void
    {
        $logger = new ThrowableErrorLogger();

        $logger->setConfig('test_key', 'test_value');
        $this->assertEquals('test_value', $logger->getConfig('test_key'));

        // Test with default value
        $this->assertEquals('default', $logger->getConfig('non_existent_key', 'default'));
        $this->assertNull($logger->getConfig('non_existent_key'));

        // Test overriding existing config
        $logger->setConfig('enable_debug_check', false);
        $this->assertFalse($logger->getConfig('enable_debug_check'));
    }

    /**
     * Test log method with simple message only.
     *
     * @covers ::log
     */
    public function testLogWithSimpleMessage(): void
    {
        $message = 'Test error message';
        $logger = new ThrowableErrorLogger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $result = $logger->log($message);

        $this->assertTrue($result);
        $this->assertEquals($message, $this->logOutput);
    }

    /**
     * Test log method with throwable but no trace.
     *
     * @covers ::log
     */
    public function testLogWithThrowableNoTrace(): void
    {
        $exception = new Exception('Test exception message');
        $logger = new ThrowableErrorLogger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $result = $logger->log('Base message', $exception);

        $this->assertTrue($result);
        $this->assertStringStartsWith('Base message - Caught Exception: Test exception message in ', $this->logOutput);
    }

    /**
     * Test log method with throwable and trace.
     *
     * @covers ::log
     */
    public function testLogWithThrowableAndTrace(): void
    {
        $exception = new RuntimeException('Runtime error');
        $logger = new ThrowableErrorLogger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $result = $logger->log('Error occurred', $exception, true);

        $this->assertTrue($result);
        $this->assertStringStartsWith('Error occurred', $this->logOutput);
    }

    /**
     * Test log method with custom message prefix.
     *
     * @covers ::log
     */
    public function testLogWithMessagePrefix(): void
    {
        $logger = new ThrowableErrorLogger([
            'message_prefix' => '[CUSTOM] ',
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $result = $logger->log('Test message');

        $this->assertTrue($result);
        $this->assertStringStartsWith('[CUSTOM] Test message', $this->logOutput);
    }

    /**
     * Test log method with class name enabled.
     *
     * @covers ::log
     */
    public function testLogWithClassNameEnabled(): void
    {
        $logger = new ThrowableErrorLogger([
            'include_class_name' => true,
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $exception = new CustomException('Test exception');

        $result = $logger->log('Base message', $exception);

        $this->assertTrue($result);
        $this->assertStringStartsWith('Base message - Caught CustomException: Test exception in ', $this->logOutput);
    }

    /**
     * Test log method with class name disabled.
     *
     * @covers ::log
     */
    public function testLogWithClassNameDisabled(): void
    {
        $logger = new ThrowableErrorLogger([
            'include_class_name' => false,
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $exception = new CustomException('Test exception');

        $result = $logger->log('Base message', $exception);

        $this->assertTrue($result);
        $this->assertStringNotContainsString('CustomException', $this->logOutput);
        $this->assertStringStartsWith('Base message - Caught Test exception in ', $this->logOutput);
    }

    /**
     * Test log method with file path enabled.
     *
     * @covers ::log
     */
    public function testLogWithFilePathEnabled(): void
    {
        $logger = new ThrowableErrorLogger([
            'include_file_path' => true,
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $exception = new Exception('Test exception'); $line = __LINE__;

        $result = $logger->log('Base message', $exception);

        $this->assertTrue($result);
        $this->assertStringStartsWith('Base message - Caught Exception: Test exception in ' . __FILE__ . ':' . $line, $this->logOutput);
    }

    /**
     * Test log method with file path disabled.
     *
     * @covers ::log
     */
    public function testLogWithFilePathDisabled(): void
    {
        $logger = new ThrowableErrorLogger([
            'include_file_path' => false,
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $exception = new Exception('Test exception');

        $result = $logger->log('Base message', $exception);

        $this->assertTrue($result);
        $this->assertEquals('Base message - Caught Exception: Test exception', $this->logOutput);
    }

    /**
     * Test log method with custom trace separator.
     *
     * @covers ::log
     */
    public function testLogWithCustomTraceSeparator(): void
    {
        $logger = new ThrowableErrorLogger([
            'trace_separator' => ' | ',
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $exception = new RuntimeException('Runtime error'); $line = __LINE__;

        $result = $logger->log('Error occurred', $exception, true);

        $this->assertTrue($result);
        $this->assertStringContainsString(__FILE__ . ':' . $line . ' Trace: ', $this->logOutput);
        $this->assertStringStartsWith('Error occurred - Caught RuntimeException: Runtime error in ', $this->logOutput);
        $this->assertStringContainsString(' | ', $this->logOutput);
    }

    /**
     * Test log method with trace flag disabled.
     *
     * @covers ::log
     */
    public function testLogWithTraceFlagDisabled(): void
    {
        $logger = new ThrowableErrorLogger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $exception = new RuntimeException('Runtime error');

        $result = $logger->log('Error occurred', $exception, false);

        $this->assertTrue($result);
        $this->assertStringNotContainsString(' Trace: ', $this->logOutput);
        $this->assertStringStartsWith('Error occurred - Caught RuntimeException: Runtime error in ', $this->logOutput);
        $this->assertStringNotContainsString(' | ', $this->logOutput);
    }

    /**
     * Test that log message is properly sanitized.
     *
     * @covers ::log
     */
    public function testLogMessageSanitization(): void
    {
        $messageWithSpecialChars = "Test message with \x000null\x002\x004 chars";
        $logger = new ThrowableErrorLogger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $result = $logger->log($messageWithSpecialChars);

        $this->assertTrue($result);
        $this->assertStringContainsString('Test message with \\0000null\\0002\\0004 chars', $this->logOutput);
    }

    /**
     * Test edge case with null throwable and trace flag.
     *
     * @covers ::log
     */
    public function testLogWithNullThrowableAndTrace(): void
    {
        $logger = new ThrowableErrorLogger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $result = $logger->log('Test message', null, true);

        $this->assertTrue($result);
        $this->assertEquals('Test message', $this->logOutput);
    }

    /**
     * Test logger with different exception types.
     *
     * @covers ::log
     */
    public function testLogWithDifferentExceptionTypes(): void
    {
        $logger = new ThrowableErrorLogger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $exception = new Exception('Standard exception');
        $result = $logger->log('Test with different exception types', $exception, true);

        $this->assertTrue($result);
        $this->assertStringContainsString('Caught Exception: Standard exception', $this->logOutput);


        $this->logOutput = '';
        $exception = new RuntimeException('Runtime exception');
        $result = $logger->log('Test with different exception types', $exception, true);

        $this->assertTrue($result);
        $this->assertStringContainsString('Caught RuntimeException: Runtime exception', $this->logOutput);

        $this->logOutput = '';
        $exception = new \InvalidArgumentException('Invalid argument');
        $result = $logger->log('Test with different exception types', $exception, true);

        $this->assertTrue($result);
        $this->assertStringContainsString('Caught InvalidArgumentException: Invalid argument', $this->logOutput);
    }

    /**
     * Test empty message handling.
     *
     * @covers ::log
     */
    public function testEmptyMessageHandling(): void
    {
        $logger = new ThrowableErrorLogger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $result = $logger->log('');
        $this->assertTrue($result);
        $this->assertEquals('', $this->logOutput);

        $result = $logger->log('   ');
        $this->assertTrue($result);
        $this->assertEquals('', $this->logOutput);
    }

    /**
     * Test very long message handling.
     *
     * @covers ::log
     */
    public function testLongMessageHandling(): void
    {
        $logger = new ThrowableErrorLogger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $longMessage = str_repeat('This is a very long message. ', 100);
        $result = $logger->log($longMessage);

        $this->assertTrue($result);
        $this->assertStringContainsString(trim($longMessage), $this->logOutput);
    }
}
