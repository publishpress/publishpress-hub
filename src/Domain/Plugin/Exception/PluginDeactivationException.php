<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

use PublishPress\Hub\Domain\Exception\Base\DomainException;

/**
 * @since 1.0.0
 */
class PluginDeactivationException extends DomainException
{
    /**
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct(
            __('Plugin deactivation failed. Please try again later or contact support for help.', 'publishpress-hub'),
            $context
        );
    }
}
