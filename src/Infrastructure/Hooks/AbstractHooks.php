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

\defined('ABSPATH') || exit;

abstract class AbstractHooks
{
    public const ACTION_PLUGINS_LOADED = 'plugins_loaded';

    public const ACTION_INIT = 'init';

    public const ACTION_ENQUEUE_SCRIPTS = 'wp_enqueue_scripts';

    public const ACTION_ADMIN_ENQUEUE_SCRIPTS = 'admin_enqueue_scripts';

    public const ACTION_ADMIN_MENU = 'admin_menu';

    public const ACTION_ADMIN_INIT = 'admin_init';

    public const ACTION_ADMIN_NOTICES = 'admin_notices';

    public const ACTION_REST_API_INIT = 'rest_api_init';

    public const ACTION_MCP_ADAPTER_INIT = 'mcp_adapter_init';

    public const ACTION_MCP_REGISTRATION_ERROR = 'publishpress_hub_mcp_registration_error';

    public const ACTION_REST_ROUTES_REGISTERED = 'publishpress_hub_rest_routes_registered';

    public const FILTER_PLUGIN_CAPABILITIES = 'cme_plugin_capabilities';

    public const FILTER_EDD_SUBSCRIPTION_API_URL = 'publishpress_hub_edd_subscription_api_url';
}
