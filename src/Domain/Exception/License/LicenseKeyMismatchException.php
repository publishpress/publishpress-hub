<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Exception\License;

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
        parent::__construct('License key doesn\'t match.', $context);
    }
}
