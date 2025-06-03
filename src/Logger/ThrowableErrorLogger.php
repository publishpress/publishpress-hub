<?php
/**
 * Throwable error logger for the PublishPress Hub library.
 *
 * @package PublishPress\Hub\Logger
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

namespace PublishPress\Hub\Logger;

use PublishPress\Hub\Contracts\LoggerInterface;
use Throwable;

defined('ABSPATH') or die('No direct script access allowed.');

/**
 * Logger for throwable errors with configurable formatting and output.
 *
 * This class provides a centralized way to log errors in WordPress environments
 * with proper formatting, optional stack trace information, and extensible configuration.
 *
 * @since 1.0.0
 */
class ThrowableErrorLogger implements LoggerInterface
{
    /**
     * The singleton instance.
     *
     * @since 1.0.0
     * @var ThrowableErrorLogger|null
     */
    private static $instance = null;

    /**
     * Configuration options for the logger.
     *
     * @since 1.0.0
     * @var array
     */
    private $config;

    /**
     * Default configuration values.
     *
     * @since 1.0.0
     * @var array
     */
    private const DEFAULT_CONFIG = [
        'enable_debug_check' => true,
        'include_class_name' => true,
        'include_file_path' => true,
        'trace_separator' => ' > ',
        'message_prefix' => '',
    ];

    /**
     * Private constructor to prevent direct instantiation.
     *
     * @since 1.0.0
     * @param array $config Optional configuration array.
     */
    private function __construct(array $config = [])
    {
        $this->config = array_merge(self::DEFAULT_CONFIG, $config);
    }

    /**
     * Prevent cloning of the instance.
     *
     * @since 1.0.0
     * @return void
     */
    private function __clone()
    {
        // Prevent cloning
    }

    /**
     * Prevent unserialization of the instance.
     *
     * @since 1.0.0
     * @return void
     */
    public function __wakeup()
    {
        throw new \Exception('Cannot unserialize singleton');
    }

    /**
     * Get the singleton instance.
     *
     * @since 1.0.0
     * @param array $config Optional configuration array (only used on first call).
     * @return ThrowableErrorLogger
     */
    public static function getInstance(array $config = []): self
    {
        if (self::$instance === null) {
            self::$instance = new self($config);
        }

        return self::$instance;
    }

    /**
     * Reset the singleton instance (primarily for testing).
     *
     * @since 1.0.0
     * @return void
     */
    public static function resetInstance(): void
    {
        self::$instance = null;
    }

    /**
     * Create a new logger instance with custom configuration.
     *
     * This bypasses the singleton pattern for cases where you need
     * multiple loggers with different configurations.
     *
     * @since 1.0.0
     * @param array $config Configuration array.
     * @return ThrowableErrorLogger
     */
    public static function createInstance(array $config = []): self
    {
        return new self($config);
    }

    /**
     * Log a throwable error with optional context and trace information.
     *
     * @since 1.0.0
     * @param string $message The error message to log.
     * @param Throwable|null $throwable The exception/error object to log.
     * @param bool $includeTrace Whether to include the stack trace in the log.
     * @return bool True if logged successfully, false otherwise.
     */
    public function log(string $message, ?Throwable $throwable = null, bool $includeTrace = false): bool
    {
        if (! $this->canLog()) {
            return false;
        }

        $logMessage = $this->buildLogMessage($message, $throwable, $includeTrace);
        $sanitizedMessage = $this->sanitizeMessage($logMessage);

        return $this->writeLog($sanitizedMessage);
    }

    /**
     * Check if error logging is available and enabled.
     *
     * @since 1.0.0
     * @return bool True if logging is possible, false otherwise.
     */
    public function canLog(): bool
    {
        if (! function_exists('error_log')) {
            return false;
        }

        if ($this->config['enable_debug_check']) {
            return defined('WP_DEBUG') && WP_DEBUG;
        }

        return true;
    }

    /**
     * Set configuration option.
     *
     * @since 1.0.0
     * @param string $key Configuration key.
     * @param mixed $value Configuration value.
     * @return void
     */
    public function setConfig(string $key, $value): void
    {
        $this->config[$key] = $value;
    }

    /**
     * Get configuration option.
     *
     * @since 1.0.0
     * @param string $key Configuration key.
     * @param mixed $default Default value if key doesn't exist.
     * @return mixed Configuration value.
     */
    public function getConfig(string $key, $default = null)
    {
        return $this->config[$key] ?? $default;
    }

    /**
     * Build the complete log message with throwable information and optional trace.
     *
     * @since 1.0.0
     * @param string $baseMessage The base error message.
     * @param Throwable|null $throwable The throwable object.
     * @param bool $includeTrace Whether to include stack trace.
     * @return string The formatted log message.
     */
    private function buildLogMessage(string $baseMessage, ?Throwable $throwable, bool $includeTrace): string
    {
        $logMessage = $this->config['message_prefix'] . $baseMessage;

        if ($throwable !== null) {
            $logMessage .= ' - ' . $this->formatThrowableInfo($throwable);
        }

        if ($includeTrace && $throwable !== null) {
            $traceInfo = $this->formatStackTrace($throwable);
            if (! empty($traceInfo)) {
                $logMessage .= ' ' . $traceInfo;
            }
        }

        return $logMessage;
    }

    /**
     * Format throwable information into a readable string.
     *
     * @since 1.0.0
     * @param Throwable $throwable The throwable object.
     * @return string Formatted throwable information.
     */
    private function formatThrowableInfo(Throwable $throwable): string
    {
        $parts = ['Caught'];

        if ($this->config['include_class_name']) {
            $parts[] = get_class($throwable) . ':';
        }

        $parts[] = $throwable->getMessage();

        if ($this->config['include_file_path']) {
            $parts[] = sprintf('in %s:%d', $throwable->getFile(), $throwable->getLine());
        }

        return implode(' ', $parts);
    }

    /**
     * Format stack trace information into a readable string.
     *
     * @since 1.0.0
     * @param Throwable $throwable The throwable object.
     * @return string Formatted stack trace.
     */
    private function formatStackTrace(Throwable $throwable): string
    {
        $traceItems = array_map(
            function (array $traceItem): string {
                return $this->formatTraceItem($traceItem);
            },
            $throwable->getTrace()
        );

        $validTraceItems = array_filter($traceItems);

        if (empty($validTraceItems)) {
            return '';
        }

        return 'Trace: ' . implode($this->config['trace_separator'], $validTraceItems);
    }

    /**
     * Format a single trace item.
     *
     * @since 1.0.0
     * @param array $traceItem The trace item array.
     * @return string Formatted trace item.
     */
    private function formatTraceItem(array $traceItem): string
    {
        if (! isset($traceItem['function'])) {
            return '';
        }

        $parts = [];

        if (isset($traceItem['file'], $traceItem['line'])) {
            $parts[] = sprintf('%s:%d', $traceItem['file'], $traceItem['line']);
        }

        $functionName = $traceItem['function'];
        if (isset($traceItem['class'])) {
            $operator = $traceItem['type'] ?? '::';
            $functionName = $traceItem['class'] . $operator . $functionName;
        }

        $parts[] = $functionName . '()';

        return implode(' ', $parts);
    }

    /**
     * Sanitize log message by removing non-printable characters.
     *
     * @since 1.0.0
     * @param string $message The message to sanitize.
     * @return string The sanitized message.
     */
    private function sanitizeMessage(string $message): string
    {
        return addcslashes($message, "\000..\037\177..\377\\");
    }

    /**
     * Write the log message to the error log.
     *
     * @since 1.0.0
     * @param string $message The sanitized message to log.
     * @return bool True if logged successfully, false otherwise.
     */
    private function writeLog(string $message): bool
    {
        // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
        return error_log($message) !== false;
    }
}
