<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Contracts;

/**
 * Interface for HTTP exceptions.
 *
 * @since 1.0.0
 */
interface HttpExceptionInterface
{
    /**
     * Get the error code of the exception.
     *
     * @since 1.0.0
     * @return string
     */
    public function getErrorCode(): string;

    /**
     * Get the HTTP status code of the exception.
     *
     * @since 1.0.0
     * @return int
     */
    public function getHttpStatusCode(): int;
}
