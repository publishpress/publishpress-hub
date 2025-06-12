<?php

declare(strict_types=1);

/**
 * Logger interface for the PublishPress Hub library.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

namespace PublishPress\Hub\Infrastructure\Logger\Contracts;

use Throwable;

/**
 * Interface for logging throwable errors.
 *
 * This interface defines the contract for logging errors with optional
 * context information and stack traces.
 *
 * @since 1.0.0
 */
interface LoggerInterface
{
    /**
     * Log a throwable error with basic information.
     *
     * @since 1.0.0
     * @param string $message The error message to log.
     * @param Throwable|null $throwable The exception/error object to log.
     * @return bool True if logged successfully, false otherwise.
     */
    public function log(string $message, ?Throwable $throwable = null): bool;

    /**
     * Log a throwable error with stack trace information.
     *
     * @since 1.0.0
     * @param string $message The error message to log.
     * @param Throwable|null $throwable The exception/error object to log.
     * @return bool True if logged successfully, false otherwise.
     */
    public function logWithTrace(string $message, ?Throwable $throwable = null): bool;

    /**
     * Check if error logging is available and enabled.
     *
     * @since 1.0.0
     * @return bool True if logging is possible, false otherwise.
     */
    public function canLog(): bool;

    /**
     * Set configuration option.
     *
     * @since 1.0.0
     * @param string $key Configuration key.
     * @param mixed $value Configuration value.
     * @return void
     */
    public function setConfig(string $key, $value): void;

    /**
     * Get configuration option.
     *
     * @since 1.0.0
     * @param string $key Configuration key.
     * @param mixed $default Default value if key doesn't exist.
     * @return mixed Configuration value.
     */
    public function getConfig(string $key, $default = null);
}
