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

    public const USER_AGENT = 'publishpress-hub.constants.user-agent';

    public const HUB_REST_API_NAMESPACE = 'publishpress-hub.constants.hub-rest-api-namespace';

    public const SCRIPT_DEBUG = 'publishpress-hub.constants.script-debug';

    public const PLUGIN_I18N_SCRIPT_PATH = 'publishpress-hub.constants.plugin-i18n-script-path';

    public const EDD_SUBSCRIPTION_API_URL = 'publishpress-hub.constants.edd-subscription-api-url';

    public const SITE_URL = 'publishpress-hub.constants.site-url';

    public const CACHE_GROUP = 'publishpress-hub.constants.cache-group';

    // Infrastructure Services
    public const HOOKS_SERVICE = 'publishpress-hub.infrastructure.hooks.service';

    public const I18N_SERVICE = 'publishpress-hub.infrastructure.i18n.service';

    public const ASSET_SERVICE = 'publishpress-hub.infrastructure.asset.service';

    public const LOGGER_SERVICE = 'publishpress-hub.infrastructure.logger.service';

    public const ADMIN_MENU_SERVICE = 'publishpress-hub.infrastructure.admin-menu.service';

    public const VIEW_SERVICE = 'publishpress-hub.infrastructure.view.service';

    public const SECURITY_SERVICE = 'publishpress-hub.infrastructure.security.service';

    public const REST_API_SERVICE = 'publishpress-hub.infrastructure.rest-api.service';

    public const REST_API_ADAPTER = 'publishpress-hub.infrastructure.rest-api.adapter';

    public const FILE_SYSTEM_ADAPTER = 'publishpress-hub.infrastructure.file-system.adapter';

    public const LICENSE_SERVICE = 'publishpress-hub.infrastructure.license.service';

    public const EDD_SUBSCRIPTION_ADAPTER = 'publishpress-hub.infrastructure.edd-subscription.adapter';

    public const REMOTE_SERVICE = 'publishpress-hub.infrastructure.remote.service';

    public const REMOTE_ADAPTER = 'publishpress-hub.infrastructure.remote.adapter';

    public const CACHE_SERVICE = 'publishpress-hub.infrastructure.cache.service';

    public const CACHE_ADAPTER = 'publishpress-hub.infrastructure.cache.adapter';

    // Application Services
    public const PLUGIN_BOOTSTRAP_SERVICE = 'publishpress-hub.application.plugin.bootstrap.service';

    public const PLUGINS_DASHBOARD_SERVICE = 'publishpress-hub.application.plugins-dashboard.dashboard.service';

    public const DEV_COMPONENTS_SHOWCASE_SERVICE = 'publishpress-hub.application.dev-components-showcase.service';

    public const PLUGIN_FAMILY_REPOSITORY = 'publishpress-hub.domain.plugin-family.repository';

    public const PLUGIN_LIFECYCLE_ADAPTER = 'publishpress-hub.infrastructure.plugin-lifecycle.adapter';

    public const LIST_PLUGINS_USE_CASE = 'publishpress-hub.application.use-case.plugin.list';

    public const INSTALL_FREE_PLUGIN_USE_CASE = 'publishpress-hub.application.use-case.plugin.install-free';

    public const INSTALL_PRO_PLUGIN_USE_CASE = 'publishpress-hub.application.use-case.plugin.install-pro';

    public const CHANGE_PLUGIN_ACTIVATION_USE_CASE = 'publishpress-hub.application.use-case.plugin.change-plugin-activation';

    public const UNINSTALL_PLUGIN_USE_CASE = 'publishpress-hub.application.use-case.plugin.uninstall';

    public const UPGRADE_PLUGIN_USE_CASE = 'publishpress-hub.application.use-case.plugin.upgrade';

    public const RESOLVE_CONFLICT_USE_CASE = 'publishpress-hub.application.use-case.plugin.resolve-conflict';

    public const PLUGIN_STATUS_ADAPTER = 'publishpress-hub.infrastructure.plugin-status.adapter';

    public const PLUGIN_STATUS_SERVICE = 'publishpress-hub.application.plugin-status.service';

    public const FREE_PLUGIN_API = 'publishpress-hub.infrastructure.free-plugin-api';

    // Adapters
    public const ADMIN_MENU_ADAPTER = 'publishpress-hub.infrastructure.admin-menu.adapter';

    // Presentation Services
    public const MAIN_MENU_CONTROLLER = 'publishpress-hub.presentation.main-menu.controller';

    public const PLUGINS_DASHBOARD_CONTROLLER = 'publishpress-hub.presentation.plugins-dashboard.controller';

    public const DEV_COMPONENTS_SHOWCASE_CONTROLLER = 'publishpress-hub.presentation.dev-components-showcase.controller';

    public const REST_API_PLUGINS_CONTROLLER = 'publishpress-hub.presentation.rest-api.plugins.controller';
}
