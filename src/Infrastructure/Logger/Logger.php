<?php

/**
 * Logger class.
 *
 * @package PublishPress\Hub\Infrastructure\Logger
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Logger;

defined('ABSPATH') || exit;

use PublishPress\Hub\Infrastructure\Logger\Contract\LoggerInterface;
use Throwable;

class Logger implements LoggerInterface
{
    /**
     * @var array<string, mixed>
     * @since 1.0.0
     */
    private $config = [
        'include_class_name' => true,
        'include_file_path' => true,
        'trace_separator' => ' > ',
        'message_prefix' => '',
        'error_log_function' => 'error_log',
    ];

    /**
     * @param array<string, mixed> $config The config.
     * @since 1.0.0
     */
    public function __construct(array $config = [])
    {
        if (! empty($config)) {
            $this->config = array_merge($this->config, $config);
        }
    }

    /**
     * This is an static method so we can use it before the plugin is fully loaded
     * and the logger is not available as dependency in the container.
     *
     * @param string $message The message.
     * @param Throwable|null $e The exception.
     * @param bool $addTrace Whether to add the trace to the message.
     * @since 1.0.0
     */
    public static function logException(string $message = '', ?Throwable $e = null, bool $addTrace = false): void
    {
        if (! function_exists('error_log')) {
            return;
        }

        if (! defined('WP_DEBUG') || ! WP_DEBUG) {
            return;
        }

        $message = ! empty($message) ? "$message - " : '';
        $message .= sprintf(
            'Caught %1$s: %2$s on file %3$s, line %4$d',
            get_class($e),
            $e->getMessage(),
            $e->getFile(),
            $e->getLine()
        );

        if ($addTrace && method_exists($e, 'getTrace')) {
            // Add the backtrace to the log
            $traceItems = array_map(
                function ($item) {
                    if (isset($item['file'])) {
                        return $item['file'] . ':' . $item['line'] . ' ' . $item['function'] . '()';
                    }

                    return '';
                },
                $e->getTrace()
            );

            $message .= ' Trace: ' . implode(' > ', $traceItems);
        }

        // Make the log message binary safe removing any non-printable chars.
        $message = addcslashes($message, "\000..\037\177..\377\\");

        // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
        error_log($message);
    }

    /**
     * Log a message.
     *
     * @param string $message The message.
     * @param Throwable|null $throwable The throwable.
     * @return bool True if the message was logged, false otherwise.
     * @since 1.0.0
     */
    public function log(string $message, ?Throwable $throwable = null): bool
    {
        if (! $this->canLog()) {
            return false;
        }

        $message = trim($message);

        $logMessage = $this->buildLogMessage($message, $throwable, false);
        $sanitizedMessage = $this->sanitizeMessage($logMessage);

        return $this->sendToErrorLog($sanitizedMessage);
    }

    /**
     * Log a message with trace.
     *
     * @param string $message The message.
     * @param Throwable|null $throwable The throwable.
     * @return bool True if the message was logged, false otherwise.
     * @since 1.0.0
     */
    public function logWithTrace(string $message, ?Throwable $throwable = null): bool
    {
        if (! $this->canLog()) {
            return false;
        }

        $message = trim($message);

        $logMessage = $this->buildLogMessage($message, $throwable, true);
        $sanitizedMessage = $this->sanitizeMessage($logMessage);

        return $this->sendToErrorLog($sanitizedMessage);
    }

    /**
     * Check if the logger can log.
     *
     * @return bool True if the logger can log, false otherwise.
     * @since 1.0.0
     */
    public function canLog(): bool
    {
        if (! is_callable($this->config['error_log_function'])) {
            return false;
        }

        return true;
    }

    /**
     * Set the config.
     *
     * @param string $key The key.
     * @param mixed $value The value.
     * @since 1.0.0
     */
    public function setConfig(string $key, $value): void
    {
        $this->config[$key] = $value;
    }

    /**
     * Get the config.
     *
     * @param string $key The key.
     * @param mixed $default The default value.
     * @return mixed The config value.
     * @since 1.0.0
     */
    public function getConfig(string $key, $default = null)
    {
        return $this->config[$key] ?? $default;
    }

    /**
     * Build the log message.
     *
     * @param string $baseMessage The base message.
     * @param Throwable|null $throwable The throwable.
     * @param bool $includeTrace Whether to include the trace.
     * @return string The log message.
     * @since 1.0.0
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
     * Format the throwable info.
     *
     * @param Throwable $throwable The throwable.
     * @return string The throwable info.
     * @since 1.0.0
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
     * Format the stack trace.
     *
     * @param Throwable $throwable The throwable.
     * @return string The stack trace.
     * @since 1.0.0
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
     * Format the trace item.
     *
     * @param array<string, mixed> $traceItem The trace item.
     * @return string The trace item.
     * @since 1.0.0
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
     * @param string $message The message.
     * @return string The sanitized message.
     * @since 1.0.0
     */
    private function sanitizeMessage(string $message): string
    {
        return addcslashes($message, "\000..\037\177..\377\\");
    }

    /**
     * Send the message to the error log.
     *
     * @param string $message The message.
     * @return bool True if the message was logged, false otherwise.
     * @since 1.0.0
     */
    private function sendToErrorLog(string $message): bool
    {
        $errorLogFunction = $this->config['error_log_function'];

        return $errorLogFunction($message) !== false;
    }
}
