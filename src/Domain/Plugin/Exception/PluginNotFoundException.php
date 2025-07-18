<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

use PublishPress\Hub\Domain\Exception\Base\DomainException;

/**
 * Exception thrown when a plugin is not found in the repository.
 *
 * @since 1.0.0
 */
class PluginNotFoundException extends DomainException
{
    /**
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct('Plugin not found.', $context);
    }
}
