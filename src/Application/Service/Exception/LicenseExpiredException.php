<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Exception;

use PublishPress\Hub\Application\Exception\ApplicationException;
use PublishPress\Hub\Application\Service\Contracts\ExceptionMetadataInterface;
use PublishPress\Hub\Application\Service\Contracts\HttpExceptionInterface;

/**
 * Exception thrown when a license has expired.
 *
 * @since 1.0.0
 */
class LicenseExpiredException extends ApplicationException implements HttpExceptionInterface, ExceptionMetadataInterface
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
    public function __construct(array $errorMetadata = [])
    {
        parent::__construct('License has expired.');
        $this->errorMetadata = $errorMetadata;
    }

    /**
     * Get the error code of the exception.
     *
     * @since 1.0.0
     * @return string
     */
    public function getErrorCode(): string
    {
        return 'license_expired';
    }

    /**
     * Get the HTTP status code of the exception.
     *
     * @since 1.0.0
     * @return int
     */
    public function getHttpStatusCode(): int
    {
        return 400;
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
