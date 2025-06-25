<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

use PublishPress\Hub\Domain\DomainException;

/**
 * Exception thrown when a plugin is already installed.
 *
 * @since 1.0.0
 */
class PluginAlreadyInstalledException extends DomainException
{
    public function __construct(string $slug = '')
    {
        $message = empty($slug)
            ? 'Plugin is already installed.'
            : sprintf('Plugin "%s" is already installed.', $slug);

        parent::__construct($message);
    }
}
