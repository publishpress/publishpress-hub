<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Exception;

use PublishPress\Hub\Application\Service\Contracts\ExceptionMetadataInterface;
use PublishPress\Hub\Application\Service\Contracts\HttpExceptionInterface;

/**
 * Exception thrown when a license server error occurs.
 *
 * @since 1.0.0
 */
class LicenseServerException extends ServiceException implements HttpExceptionInterface, ExceptionMetadataInterface
{
    /**
     * Error metadata.
     *
     * @since 1.0.0
     * @var array
     */
    private $errorMetadata;

    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct(string $message = '', array $errorMetadata = [])
    {
        $this->errorMetadata = $errorMetadata;

        $message = empty($message)
            ? 'License server error.'
            : sprintf('License server error: %s', $message);

        parent::__construct($message);
    }

    /**
     * Get the error code of the exception.
     *
     * @since 1.0.0
     * @return string
     */
    public function getErrorCode(): string
    {
        return 'license_server_error';
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

    /**
     * Get the error metadata of the exception.
     *
     * @since 1.0.0
     * @return array
     */
    public function getErrorMetadata(): array
    {
        return $this->errorMetadata;
    }
}
