<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Exception;

use PublishPress\Hub\Application\Exception\ApplicationException;
use PublishPress\Hub\Application\Service\Contracts\HttpExceptionInterface;

/**
 * Exception thrown when a license key was revoked.
 *
 * @since 1.0.0
 */
class LicenseDisabledException extends ApplicationException implements HttpExceptionInterface
{
    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct()
    {
        parent::__construct('License key revoked.');
    }

    /**
     * Get the error code of the exception.
     *
     * @since 1.0.0
     * @return string
     */
    public function getErrorCode(): string
    {
        return 'license_disabled';
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
}
