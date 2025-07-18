<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Hooks;

abstract class AbstractHooks
{
    public const ACTION_PLUGINS_LOADED = 'plugins_loaded';

    public const ACTION_INIT = 'init';
}
