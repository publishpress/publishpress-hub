<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

/**
 * @since 1.0.0
 */
class LicenseExpiredException extends LicenseException
{
    /**
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct(
            __('This license has expired. Please contact support to renew it.', 'publishpress-hub'),
            $context
        );
    }
}
