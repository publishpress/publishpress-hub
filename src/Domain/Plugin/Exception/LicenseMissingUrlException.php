<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

/**
 * @since 1.0.0
 */
class LicenseMissingUrlException extends LicenseException
{
    /**
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct(
            __('Your site URL is required to activate the license. Please enter a valid site URL to continue.', 'publishpress-hub'),
            $context
        );
    }
}
