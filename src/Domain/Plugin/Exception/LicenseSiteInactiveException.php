<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

/**
 * @since 1.0.0
 */
class LicenseSiteInactiveException extends LicenseException
{
    /**
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct(
            __('This license is inactive for this site. Please contact support for help.', 'publishpress-hub'),
            $context
        );
    }
}
