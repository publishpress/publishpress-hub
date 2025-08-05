<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Logger\Contract;

use Throwable;

/**
 * @since 1.0.0
 */
interface LoggerInterface
{
    /**
     * @since 1.0.0
     */
    public static function logException(string $message = '', ?Throwable $e = null, bool $addTrace = false): void;

    /**
     * @since 1.0.0
     */
    public function log(string $message, ?Throwable $throwable = null): bool;

    /**
     * @since 1.0.0
     */
    public function logWithTrace(string $message, ?Throwable $throwable = null): bool;

    /**
     * @since 1.0.0
     */
    public function canLog(): bool;

    /**
     * @since 1.0.0
     */
    public function setConfig(string $key, $value): void;

    /**
     * @since 1.0.0
     */
    public function getConfig(string $key, $default = null);
}
