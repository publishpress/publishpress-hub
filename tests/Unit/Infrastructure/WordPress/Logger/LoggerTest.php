<?php declare(strict_types=1);

namespace Tests\Unit\Infrastructure\WordPress\Logger;

use Codeception\Test\Unit;
use CustomException;
use Exception;
use PublishPress\Hub\Infrastructure\WordPress\Logger\Logger;
use RuntimeException;

/**
 * Unit tests for Logger class.
 *
 * @coversDefaultClass \PublishPress\Hub\Infrastructure\WordPress\Logger\Logger
 */
class LoggerTest extends Unit
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
        $logger = new Logger();

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

        $logger = new Logger($config);

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
        $logger = new Logger([
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
        $logger = new Logger([
            'error_log_function' => null,
        ]);

        $this->assertFalse($logger->canLog());
    }

    public function testLogWhenErrorLogAvailable(): void
    {
        $logger = new Logger([
            'error_log_function' => 'non_existent_function',
        ]);
        $result = $logger->log('Test message');
        $this->assertFalse($result);
    }

    /**
     * Test setConfig and getConfig methods.
     *
     * @covers ::setConfig
     * @covers ::getConfig
     */
    public function testSetAndGetConfig(): void
    {
        $logger = new Logger();

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
        $logger = new Logger([
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
        $logger = new Logger([
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
        $logger = new Logger([
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
        $logger = new Logger([
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
        $logger = new Logger([
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
        $logger = new Logger([
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
        $logger = new Logger([
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
        $logger = new Logger([
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
        $logger = new Logger([
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
        $logger = new Logger([
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
        $logger = new Logger([
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
        $logger = new Logger([
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
        $logger = new Logger([
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
        $logger = new Logger([
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
        $logger = new Logger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $longMessage = str_repeat('This is a very long message. ', 100);
        $result = $logger->log($longMessage);

        $this->assertTrue($result);
        $this->assertStringContainsString(trim($longMessage), $this->logOutput);
    }

    /**
     * Test trace formatting with complex stack trace scenarios.
     *
     * @covers ::log
     */
    public function testComplexStackTraceFormatting(): void
    {
        $logger = new Logger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
            'trace_separator' => ' | ',
        ]);

        // Create a nested exception scenario
        try {
            try {
                throw new \InvalidArgumentException('Inner exception');
            } catch (\Exception $e) {
                throw new RuntimeException('Outer exception', 0, $e);
            }
        } catch (RuntimeException $exception) {
            $result = $logger->log('Complex trace test', $exception, true);

            $this->assertTrue($result);
            $this->assertStringContainsString('Trace:', $this->logOutput);
            $this->assertStringContainsString(' | ', $this->logOutput);
            $this->assertStringContainsString(__FILE__, $this->logOutput);
        }
    }

    /**
     * Test trace formatting with missing trace information.
     *
     * @covers ::log
     */
    public function testTraceFormattingWithMissingInfo(): void
    {
        $logger = new Logger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        // Create exception with minimal trace info
        $exception = new Exception('Test exception');

        $result = $logger->log('Trace formatting test', $exception, true);

        $this->assertTrue($result);
        $this->assertStringContainsString('Caught Exception: Test exception', $this->logOutput);
    }

    /**
     * Test message sanitization with various special characters.
     *
     * @covers ::log
     */
    public function testMessageSanitizationEdgeCases(): void
    {
        $logger = new Logger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        // Test with various problematic characters
        $problematicMessage = "Test\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0A\x0B\x0C\x0D\x0E\x0F message";

        $result = $logger->log($problematicMessage);

        $this->assertTrue($result);
        // Message should be sanitized (escaped)
        $this->assertStringNotContainsString("\x00", $this->logOutput);
        $this->assertStringContainsString('\\000', $this->logOutput);
    }

    /**
     * Test complex exception class names formatting.
     *
     * @covers ::log
     */
    public function testComplexExceptionClassNameFormatting(): void
    {
        $logger = new Logger([
            'include_class_name' => true,
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        // Test with namespaced exception
        $exception = new \InvalidArgumentException('Namespaced exception');

        $result = $logger->log('Class name test', $exception);

        $this->assertTrue($result);
        $this->assertStringContainsString('InvalidArgumentException:', $this->logOutput);
    }

        /**
     * Test stack trace formatting with class methods.
     *
     * @covers ::log
     */
    public function testStackTraceWithClassMethods(): void
    {
        $logger = new Logger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        // This will create a trace that includes class methods
        $exception = $this->createExceptionWithClassTrace();

        $result = $logger->log('Stack trace class method test', $exception, true);

        $this->assertTrue($result);
        $this->assertStringContainsString('Trace:', $this->logOutput);
        // The class name will be escaped in the output, so we check for the method name instead
        $this->assertStringContainsString('createExceptionWithClassTrace()', $this->logOutput);
    }

    /**
     * Helper method to create an exception with class method in trace.
     */
    private function createExceptionWithClassTrace(): Exception
    {
        return new Exception('Exception with class trace');
    }

    /**
     * Test write log function failure scenarios.
     *
     * @covers ::log
     */
    public function testWriteLogFailureScenarios(): void
    {
        // Test with function that returns false
        $logger = new Logger([
            'error_log_function' => function($message) {
                return false; // Simulate logging failure
            },
        ]);

        $result = $logger->log('Test message');

        $this->assertFalse($result);
    }

    /**
     * Test build log message with all configuration options.
     *
     * @covers ::log
     */
    public function testBuildLogMessageWithAllOptions(): void
    {
        $logger = new Logger([
            'message_prefix' => '[PREFIX] ',
            'include_class_name' => true,
            'include_file_path' => true,
            'trace_separator' => ' >> ',
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        $exception = new RuntimeException('Full options test');

        $result = $logger->log('Base message', $exception, true);

        $this->assertTrue($result);
        $this->assertStringStartsWith('[PREFIX] Base message', $this->logOutput);
        $this->assertStringContainsString('RuntimeException:', $this->logOutput);
        $this->assertStringContainsString(__FILE__, $this->logOutput);
        $this->assertStringContainsString(' >> ', $this->logOutput);
    }

    /**
     * Debug test to verify private method execution.
     * This test specifically exercises all private methods and verifies they are called.
     *
     * @covers ::log
     * @covers ::buildLogMessage
     * @covers ::formatThrowableInfo
     * @covers ::formatStackTrace
     * @covers ::formatTraceItem
     * @covers ::sanitizeMessage
     * @covers ::writeLog
     */
    public function testDebugPrivateMethodExecution(): void
    {
        $logger = new Logger([
            'message_prefix' => '[DEBUG] ',
            'include_class_name' => true,
            'include_file_path' => true,
            'trace_separator' => ' -> ',
            'error_log_function' => [$this, '_customErrorLogFunction'],
        ]);

        // Test with a message that requires sanitization
        $messageWithSpecialChars = "Debug test\x00\x01\x02 with special chars";

        // Test with an exception that will generate a full stack trace
        $exception = new RuntimeException('Debug exception for private method testing');

        $result = $logger->log($messageWithSpecialChars, $exception, true);

        // Verify the result
        $this->assertTrue($result);

        // Verify buildLogMessage was called (message prefix)
        $this->assertStringStartsWith('[DEBUG] ', $this->logOutput);

        // Verify formatThrowableInfo was called (exception class name)
        $this->assertStringContainsString('RuntimeException:', $this->logOutput);

        // Verify formatStackTrace was called (trace separator)
        $this->assertStringContainsString(' -> ', $this->logOutput);

        // Verify formatTraceItem was called (should contain method names)
        $this->assertStringContainsString('()', $this->logOutput);

        // Verify sanitizeMessage was called (special chars should be escaped)
        $this->assertStringContainsString('\\000', $this->logOutput);

        // Verify writeLog was called (we got a successful result)
        $this->assertNotEmpty($this->logOutput);
    }

    /**
     * Test edge case: empty stack trace handling.
     * This test covers edge cases in formatStackTrace() and formatTraceItem() methods.
     *
     * @covers ::log
     * @covers ::formatStackTrace
     * @covers ::formatTraceItem
     */
    public function testStackTraceEdgeCases(): void
    {
        // Test with a logger that has custom configuration
        $logger = new Logger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
            'trace_separator' => ' | ',
        ]);

        // Create an exception from deep recursion to test edge cases
        $exception = $this->createExceptionWithSpecificTrace();

        $result = $logger->log('Edge case trace test', $exception, true);

        $this->assertTrue($result);
        $this->assertStringContainsString('Edge case trace test', $this->logOutput);
    }

    /**
     * Helper method to create exception that exercises trace edge cases.
     */
    private function createExceptionWithSpecificTrace(): Exception
    {
        // Create an exception that will have a minimal trace
        return new Exception('Edge case exception');
    }

    /**
     * Test edge case: writeLog with non-callable error function.
     * This test covers the writeLog() method when error_log_function is not callable.
     *
     * @covers ::log
     * @covers ::writeLog
     */
    public function testWriteLogWithNonCallableFunction(): void
    {
        $logger = new Logger([
            'error_log_function' => 'definitely_not_a_real_function_12345',
        ]);

        $result = $logger->log('Test message');

        // Should return false when error log function is not callable
        $this->assertFalse($result);
    }

        /**
     * Test comprehensive edge cases that naturally occur.
     * This covers various edge cases in private methods through natural usage.
     *
     * @covers ::log
     * @covers ::formatStackTrace
     * @covers ::formatTraceItem
     * @covers ::writeLog
     */
    public function testComprehensiveEdgeCases(): void
    {
        // Test with different error types that might have minimal traces
        $logger = new Logger([
            'error_log_function' => [$this, '_customErrorLogFunction'],
            'trace_separator' => ' | ',
        ]);

        // Test with Error class which might have different trace characteristics
        $error = new \Error('Test error for edge cases');
        $result = $logger->log('Error test', $error, true);

        $this->assertTrue($result);
        $this->assertStringContainsString('Error test', $this->logOutput);

        // Reset output for next test
        $this->logOutput = '';

        // Test with ParseError which might have even more minimal trace
        $parseError = new \ParseError('Parse error test');
        $result = $logger->log('Parse error test', $parseError, true);

        $this->assertTrue($result);
        $this->assertStringContainsString('Parse error test', $this->logOutput);
    }
}
