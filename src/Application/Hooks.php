<?php

/**
 * Application hooks for the PublishPress Hub library.
 *
 * This class defines all application-specific hooks that coordinate
 * application services and use cases following Domain Driven Development principles.
 *
 * @package PublishPress\Hub\Application
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application;

/**
 * Application hooks container.
 *
 * Contains hooks that coordinate application services and use cases.
 * These hooks are typically used for service orchestration and
 * cross-cutting concerns at the application layer.
 *
 * @since 1.0.0
 */
abstract class Hooks
{
    /**
     * Hook to register a plugin with the hub.
     *
     * @since 1.0.0
     */
    public const ACTION_REGISTER_PLUGIN = 'publishpress_hub_register_plugin';

    /**
     * Hook fired when the hub service is initialized.
     *
     * @since 1.0.0
     */
    public const ACTION_HUB_SERVICE_INITIALIZED = 'publishpress_hub_service_initialized';

    /**
     * Hook fired before the hub service is initialized.
     *
     * @since 1.0.0
     */
    public const ACTION_BEFORE_HUB_SERVICE_INIT = 'publishpress_hub_before_service_init';

    /**
     * Filter to modify the hub service configuration.
     *
     * @since 1.0.0
     */
    public const FILTER_HUB_SERVICE_CONFIG = 'publishpress_hub_service_config';

    /**
     * Hook used to register the admin menu.
     *
     * @since 1.0.0
     */
    public const ACTION_ADMIN_MENU = 'admin_menu';

    /**
     * Hook used to start the hub service.
     *
     * @since 1.0.0
     */
    public const ACTION_INIT = 'init';
}
