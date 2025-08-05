<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

/**
 * @since 1.0.0
 */
class LicenseNoActivationsLeftException extends LicenseException
{
    /**
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct(
            __('License activation limit reached. Please contact support to upgrade or deactivate on another site.', 'publishpress-hub'),
            $context
        );
    }
}
