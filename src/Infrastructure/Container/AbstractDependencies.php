<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container;

/**
 * Container dependency identifiers.
 *
 * These are the keys used to register and retrieve services from the container.
 * They should be descriptive and follow a consistent naming pattern.
 */
abstract class AbstractDependencies
{
    // Application Services
    public const APPLICATION_BOOTSTRAP_SERVICE = 'publishpress-hub.application.bootstrap.service';

    // Infrastructure Adapters
    public const HOOKS_SERVICE = 'publishpress-hub.infrastructure.hooks.service';
}
