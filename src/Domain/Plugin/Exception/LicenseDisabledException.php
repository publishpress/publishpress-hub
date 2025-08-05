<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

/**
 * Exception thrown when a license key was revoked.
 *
 * @since 1.0.0
 */
class LicenseDisabledException extends LicenseException
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
            __('This license is currently disabled. Please contact support for help.', 'publishpress-hub'),
            $context
        );
    }
}
