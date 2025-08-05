<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

/**
 * @since 1.0.0
 */
class LicenseInvalidException extends LicenseException
{
    /**
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct(
            __('This license key is not authorized for this plugin. Please verify your license key or contact support for help.', 'publishpress-hub'),
            $context
        );
    }
}
