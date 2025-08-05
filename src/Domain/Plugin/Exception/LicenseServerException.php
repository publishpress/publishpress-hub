<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

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
        parent::__construct(
            __('License server error. Please try again later or contact support for help.', 'publishpress-hub'),
            $context
        );
    }
}
