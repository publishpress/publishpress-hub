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
    // Constants
    public const PLUGIN_PATH = 'publishpress-hub.constants.plugin-path';

    public const PLUGIN_TEXT_DOMAIN = 'publishpress-hub.constants.plugin-text-domain';

    public const PLUGIN_LANGUAGE_PATH = 'publishpress-hub.constants.plugin-language-path';

    public const PLUGIN_URL = 'publishpress-hub.constants.plugin-url';

    public const PLUGIN_ASSETS_PATH = 'publishpress-hub.constants.plugin-assets-path';

    public const PLUGIN_ASSETS_URL = 'publishpress-hub.constants.plugin-assets-url';

    public const PLUGIN_VENDOR_PATH = 'publishpress-hub.constants.plugin-vendor-path';

    public const PLUGIN_SRC_PATH = 'publishpress-hub.constants.plugin-src-path';

    public const PLUGIN_VERSION = 'publishpress-hub.constants.plugin-version';

    public const PLUGIN_LANGUAGES_PATH = 'publishpress-hub.constants.plugin-languages-path';

    public const PLUGIN_TEMPLATES_BASE_PATH = 'publishpress-hub.constants.plugin-templates-base-path';

    public const SCRIPT_DEBUG = 'publishpress-hub.constants.script-debug';

    public const PLUGIN_I18N_SCRIPT_PATH = 'publishpress-hub.constants.plugin-i18n-script-path';

    // Infrastructure Services
    public const HOOKS_SERVICE = 'publishpress-hub.infrastructure.hooks.service';

    public const I18N_SERVICE = 'publishpress-hub.infrastructure.i18n.service';

    public const ASSET_SERVICE = 'publishpress-hub.infrastructure.asset.service';

    public const LOGGER_SERVICE = 'publishpress-hub.infrastructure.logger.service';

    public const ADMIN_MENU_SERVICE = 'publishpress-hub.infrastructure.admin-menu.service';

    public const VIEW_SERVICE = 'publishpress-hub.infrastructure.view.service';

    public const SECURITY_SERVICE = 'publishpress-hub.infrastructure.security.service';

    // Application Services
    public const PLUGIN_BOOTSTRAP_SERVICE = 'publishpress-hub.application.plugin.bootstrap.service';

    public const PLUGINS_DASHBOARD_SERVICE = 'publishpress-hub.application.plugins-dashboard.dashboard.service';

    // Adapters
    public const ADMIN_MENU_ADAPTER = 'publishpress-hub.infrastructure.admin-menu.adapter';

    // Presentation Services
    public const MAIN_MENU_CONTROLLER = 'publishpress-hub.presentation.main-menu.controller';

    public const PLUGINS_DASHBOARD_CONTROLLER = 'publishpress-hub.presentation.plugins-dashboard.controller';
}
