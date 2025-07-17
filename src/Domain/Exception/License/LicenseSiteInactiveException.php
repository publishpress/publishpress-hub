<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Exception\License;

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
        parent::__construct('Site is inactive for license.', $context);
    }
}
