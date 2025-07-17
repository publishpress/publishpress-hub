<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Exception;

use PublishPress\Hub\Application\Exception\ApplicationException;
use PublishPress\Hub\Application\Service\Contracts\HttpExceptionInterface;

/**
 * Exception thrown when fetching plugin information fails.
 *
 * @since 1.0.0
 */
class FetchingPluginInformationException extends ApplicationException implements HttpExceptionInterface
{
    /**
     * Get the error code of the exception.
     *
     * @since 1.0.0
     * @return string
     */
    public function getErrorCode(): string
    {
        return 'fetching_plugin_information_error';
    }

    /**
     * Get the HTTP status code of the exception.
     *
     * @since 1.0.0
     * @return int
     */
    public function getHttpStatusCode(): int
    {
        return 500;
    }
}
