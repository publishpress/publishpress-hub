<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

/**
 * @since 1.0.0
 */
class LicenseInvalidItemNameException extends LicenseException
{
    /**
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct(
            __('This license does not match the plugin you are trying to activate. Please contact support for assistance.', 'publishpress-hub'),
            $context
        );
    }
}
