<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Hooks;

abstract class AbstractHooks
{
    public const ACTION_PLUGINS_LOADED = 'plugins_loaded';

    public const ACTION_INIT = 'init';

    public const ACTION_ENQUEUE_SCRIPTS = 'wp_enqueue_scripts';

    public const ACTION_ADMIN_ENQUEUE_SCRIPTS = 'admin_enqueue_scripts';

    public const ACTION_ADMIN_MENU = 'admin_menu';
}
