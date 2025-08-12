<?php

/**
 * Logger interface.
 *
 * @package PublishPress\Hub\Infrastructure\Logger\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Logger\Contract;

use Throwable;

interface LoggerInterface
{
    /**
     * Log an exception.
     *
     * @param string $message The message.
     * @param Throwable|null $e The exception.
     * @param bool $addTrace Whether to add the trace to the message.
     * @since 1.0.0
     */
    public static function logException(string $message = '', ?Throwable $e = null, bool $addTrace = false): void;

    /**
     * Log a message.
     *
     * @param string $message The message.
     * @param Throwable|null $throwable The throwable.
     * @return bool True if the message was logged, false otherwise.
     * @since 1.0.0
     */
    public function log(string $message, ?Throwable $throwable = null): bool;

    /**
     * Log a message with trace.
     *
     * @param string $message The message.
     * @param Throwable|null $throwable The throwable.
     * @return bool True if the message was logged, false otherwise.
    * @since 1.0.0
     */
    public function logWithTrace(string $message, ?Throwable $throwable = null): bool;

    /**
     * Check if the logger can log.
     *
     * @return bool True if the logger can log, false otherwise.
     * @since 1.0.0
     */
    public function canLog(): bool;

    /**
     * Set the config.
     *
     * @param string $key The key.
     * @param mixed $value The value.
     * @since 1.0.0
     */
    public function setConfig(string $key, $value): void;

    /**
     * Get the config.
     *
     * @param string $key The key.
     * @param mixed $default The default value.
     * @return mixed The config value.
     * @since 1.0.0
     */
    public function getConfig(string $key, $default = null);
}
