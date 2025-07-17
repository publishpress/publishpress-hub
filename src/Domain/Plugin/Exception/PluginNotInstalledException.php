<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

use PublishPress\Hub\Domain\Exception\DomainException;

/**
 * Exception thrown when a plugin is not installed.
 *
 * @since 1.0.0
 */
class PluginNotInstalledException extends DomainException
{
    public function __construct(string $slug = '')
    {
        $message = empty($slug)
            ? 'Plugin is not installed.'
            : sprintf('Plugin "%s" is not installed.', $slug);

        parent::__construct($message);
    }
}
