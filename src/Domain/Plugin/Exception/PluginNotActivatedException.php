<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

use PublishPress\Hub\Domain\DomainException;

/**
 * Exception thrown when a plugin is not activated.
 *
 * @since 1.0.0
 */
class PluginNotActivatedException extends DomainException
{
    public function __construct(string $slug = '')
    {
        $message = empty($slug)
            ? 'Plugin is not activated.'
            : sprintf('Plugin "%s" is not activated.', $slug);

        parent::__construct($message);
    }
}
