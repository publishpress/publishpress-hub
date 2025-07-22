<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

use PublishPress\Hub\Domain\Exception\Base\DomainException;

/**
 * @since 1.0.0
 */
class PluginInstallException extends DomainException
{
    /**
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct('Failed to install plugin.', $context);
    }
}
