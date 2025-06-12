<?php

declare(strict_types=1);

/**
 * Throwable error logger for the PublishPress Hub library.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

namespace PublishPress\Hub\Infrastructure\Logger;

use PublishPress\Hub\Infrastructure\Logger\Contracts\LoggerInterface;
use Throwable;

/**
 * Logger for throwable errors with configurable formatting and output.
 *
 * This class provides a centralized way to log errors in WordPress environments
 * with proper formatting, optional stack trace information, and extensible configuration.
 *
 * @since 1.0.0
 */
class Logger implements LoggerInterface
{
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
        'include_class_name' => true,
        'include_file_path' => true,
        'trace_separator' => ' > ',
        'message_prefix' => '',
        'error_log_function' => 'error_log',
    ];

    /**
     * Constructor.
     *
     * @since 1.0.0
     * @param array $config Optional configuration array.
     */
    public function __construct(array $config = [])
    {
        $this->config = array_merge(self::DEFAULT_CONFIG, $config);
    }

    /**
     * Log a throwable error with basic information.
     *
     * @since 1.0.0
     * @param string $message The error message to log.
     * @param Throwable|null $throwable The exception/error object to log.
     * @return bool True if logged successfully, false otherwise.
     */
    public function log(string $message, ?Throwable $throwable = null): bool
    {
        if (! $this->canLog()) {
            return false;
        }

        $message = trim($message);

        $logMessage = $this->buildLogMessage($message, $throwable, false);
        $sanitizedMessage = $this->sanitizeMessage($logMessage);

        return $this->writeLog($sanitizedMessage);
    }

    /**
     * Log a throwable error with stack trace information.
     *
     * @since 1.0.0
     * @param string $message The error message to log.
     * @param Throwable|null $throwable The exception/error object to log.
     * @return bool True if logged successfully, false otherwise.
     */
    public function logWithTrace(string $message, ?Throwable $throwable = null): bool
    {
        if (! $this->canLog()) {
            return false;
        }

        $message = trim($message);

        $logMessage = $this->buildLogMessage($message, $throwable, true);
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
        if (! is_callable($this->config['error_log_function'])) {
            return false;
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
        $errorLogFunction = $this->config['error_log_function'];

        return $errorLogFunction($message) !== false;
    }
}
