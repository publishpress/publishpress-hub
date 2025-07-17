<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Exception\License;

/**
 * Exception thrown when a license server error occurs.
 *
 * @since 1.0.0
 */
class LicenseServerException extends LicenseException
{
    /**
     * Constructor.
     *
     * @since 1.0.0
     * @param array $context Optional context information
     */
    public function __construct(array $context = [])
    {
        parent::__construct('License server error.', $context);
    }
}
