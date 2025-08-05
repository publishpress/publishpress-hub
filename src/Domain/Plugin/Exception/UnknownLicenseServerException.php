<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

/**
 * Exception thrown when an unknown license server error occurs.
 *
 * @since 1.0.0
 */
class UnknownLicenseServerException extends LicenseException
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
            __('Unknown license server error. Please try again later or contact support for help.', 'publishpress-hub'),
            $context
        );
    }
}
