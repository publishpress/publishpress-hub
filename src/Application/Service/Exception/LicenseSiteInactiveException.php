<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Exception;

use PublishPress\Hub\Application\Exception\ApplicationException;
use PublishPress\Hub\Application\Service\Contracts\HttpExceptionInterface;

/**
 * Exception thrown when the license is not active on the site.
 *
 * @since 1.0.0
 */
class LicenseSiteInactiveException extends ApplicationException implements HttpExceptionInterface
{
    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct()
    {
        parent::__construct('Site is not active for this license.');
    }

    /**
     * Get the error code of the exception.
     *
     * @since 1.0.0
     * @return string
     */
    public function getErrorCode(): string
    {
        return 'license_site_inactive';
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
