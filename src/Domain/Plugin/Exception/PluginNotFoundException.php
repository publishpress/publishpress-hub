<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

use PublishPress\Hub\Domain\DomainException;

/**
 * Exception thrown when a plugin is not found in the repository.
 *
 * @since 1.0.0
 */
class PluginNotFoundException extends DomainException
{
    public function __construct(string $slug)
    {
        parent::__construct(sprintf('Plugin not found: %s', $slug));
    }
}
