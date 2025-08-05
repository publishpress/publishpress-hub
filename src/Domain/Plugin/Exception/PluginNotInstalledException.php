<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

use PublishPress\Hub\Domain\Exception\Base\DomainException;

/**
 * Exception thrown when a plugin is not installed.
 *
 * @since 1.0.0
 */
class PluginNotInstalledException extends DomainException
{
    /**
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct(
            __('This action is not possible because the plugin is not installed. Please install the plugin and try again.', 'publishpress-hub'),
            $context
        );
    }
}
