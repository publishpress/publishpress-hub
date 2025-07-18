<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Logger;

use PublishPress\Hub\Infrastructure\Logger\Contract\LoggerInterface;
use Throwable;

/**
 * @since 1.0.0
 */
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
     * @since 1.0.0
     */
    public static function logException(string $message = '', Throwable $e, bool $addTrace = false): void
    {
        if (! function_exists('error_log')) {
            return;
        }

        if (! defined('WP_DEBUG') || ! WP_DEBUG) {
            return;
        }

        $message = ! empty($message) ? $message . ' - ' : '';
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
     * @since 1.0.0
     */
    public function setConfig(string $key, $value): void
    {
        $this->config[$key] = $value;
    }

    /**
     * @since 1.0.0
     */
    public function getConfig(string $key, $default = null)
    {
        return $this->config[$key] ?? $default;
    }

    /**
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
     * @since 1.0.0
     */
    private function sanitizeMessage(string $message): string
    {
        return addcslashes($message, "\000..\037\177..\377\\");
    }

    /**
     * @since 1.0.0
     */
    private function sendToErrorLog(string $message): bool
    {
        $errorLogFunction = $this->config['error_log_function'];

        return $errorLogFunction($message) !== false;
    }
}
