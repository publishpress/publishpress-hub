<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

/**
 * Exception thrown when a license server invalid response occurs.
 *
 * @since 1.0.0
 */
class LicenseServerInvalidResponseException extends LicenseException
{
    /**
     * Constructor.
     *
     * @since 1.0.0
     * @param array $context Optional context information
     */
    public function __construct(array $context = [])
    {
        parent::__construct('License server invalid response.', $context);
    }
}
