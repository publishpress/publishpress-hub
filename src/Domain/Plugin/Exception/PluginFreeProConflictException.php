<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

use PublishPress\Hub\Domain\Exception\Base\DomainException;

/**
 * @since 1.0.0
 */
class PluginFreeProConflictException extends DomainException
{
    /**
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct(
            __('This action is not possible because both free and pro versions are installed. Please uninstall one version to continue.', 'publishpress-hub'),
            $context
        );
    }
}
