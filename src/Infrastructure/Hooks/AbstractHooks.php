<?php

/**
 * Abstract hooks class.
 *
 * @package PublishPress\Hub\Infrastructure\Hooks
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Hooks;

abstract class AbstractHooks
{
    public const ACTION_PLUGINS_LOADED = 'plugins_loaded';

    public const ACTION_INIT = 'init';

    public const ACTION_ENQUEUE_SCRIPTS = 'wp_enqueue_scripts';

    public const ACTION_ADMIN_ENQUEUE_SCRIPTS = 'admin_enqueue_scripts';

    public const ACTION_ADMIN_MENU = 'admin_menu';

    public const ACTION_REST_API_INIT = 'rest_api_init';
}
