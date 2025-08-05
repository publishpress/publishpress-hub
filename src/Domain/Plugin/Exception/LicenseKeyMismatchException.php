<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

/**
 * @since 1.0.0
 */
class LicenseKeyMismatchException extends LicenseException
{
    /**
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct(
            __('License key does not match our records. Please contact support for assistance.', 'publishpress-hub'),
            $context
        );
    }
}
