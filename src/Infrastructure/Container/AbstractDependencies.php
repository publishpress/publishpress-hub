<?php

/**
 * Abstract dependencies.
 *
 * @package PublishPress\Hub\Infrastructure\Container
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container;

defined('ABSPATH') || exit;

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

    public const PLUGIN_RESOURCES_PATH = 'publishpress-hub.constants.plugin-assets-path';

    public const PLUGIN_RESOURCES_URL = 'publishpress-hub.constants.plugin-assets-url';

    public const PLUGIN_VENDOR_PATH = 'publishpress-hub.constants.plugin-vendor-path';

    public const PLUGIN_SRC_PATH = 'publishpress-hub.constants.plugin-src-path';

    public const PLUGIN_VERSION = 'publishpress-hub.constants.plugin-version';

    public const PLUGIN_LANGUAGES_PATH = 'publishpress-hub.constants.plugin-languages-path';

    public const ADMIN_TEMPLATES_BASE_PATH = 'publishpress-hub.constants.admin-templates-base-path';

    public const USER_AGENT = 'publishpress-hub.constants.user-agent';

    public const HUB_REST_API_NAMESPACE = 'publishpress-hub.constants.hub-rest-api-namespace';

    public const SCRIPT_DEBUG = 'publishpress-hub.constants.script-debug';

    public const PLUGIN_I18N_SCRIPT_PATH = 'publishpress-hub.constants.plugin-i18n-script-path';

    public const EDD_SUBSCRIPTION_API_URL = 'publishpress-hub.constants.edd-subscription-api-url';

    public const ALLOWED_DOWNLOAD_DOMAINS = 'publishpress-hub.constants.allowed-download-domains';

    public const PACKAGE_SIGNATURE_PUBLIC_KEYS = 'publishpress-hub.constants.package-signature-public-keys';

    public const SITE_URL = 'publishpress-hub.constants.site-url';

    public const CACHE_GROUP = 'publishpress-hub.constants.cache-group';

    public const LICENSE_VALIDATION_POLL_INTERVAL_SECONDS = 'publishpress-hub.constants.license-validation-poll-interval-seconds';

    public const PLUGIN_AUTHOR = 'publishpress-hub.constants.plugin-author';

    public const EDD_ITEM_ID = 'publishpress-hub.constants.edd-item-id';

    public const PLUGIN_FILE = 'publishpress-hub.constants.plugin-file';

    public const HUB_UPDATER_VALUE = 'publishpress-hub.constants.hub-updater-value';

    // Infrastructure Services
    public const HOOKS_SERVICE = 'publishpress-hub.infrastructure.hooks.service';

    public const I18N_SERVICE = 'publishpress-hub.infrastructure.i18n.service';

    public const ASSET_SERVICE = 'publishpress-hub.infrastructure.asset.service';

    public const LOGGER_SERVICE = 'publishpress-hub.infrastructure.logger.service';

    public const ADMIN_MENU_SERVICE = 'publishpress-hub.infrastructure.admin-menu.service';

    public const ADMIN_VIEW_SERVICE = 'publishpress-hub.infrastructure.view.service';

    public const SECURITY_SERVICE = 'publishpress-hub.infrastructure.security.service';

    public const ENVIRONMENT_SERVICE = 'publishpress-hub.infrastructure.environment.service';

    public const REST_API_SERVICE = 'publishpress-hub.infrastructure.rest-api.service';

    public const REST_API_ADAPTER = 'publishpress-hub.infrastructure.rest-api.adapter';

    public const FILE_SYSTEM_ADAPTER = 'publishpress-hub.infrastructure.file-system.adapter';

    public const OPTIONS_ADAPTER = 'publishpress-hub.infrastructure.options.adapter';

    public const LICENSE_OPTION_PREFIX = 'publishpress-hub.infrastructure.license.option-prefix';

    public const LICENSE_API_SERVICE = 'publishpress-hub.infrastructure.license.api.service';

    public const LICENSE_PERSISTENCE_SERVICE = 'publishpress-hub.infrastructure.license.persistence.service';

    public const LICENSE_MANAGEMENT_SERVICE = 'publishpress-hub.application.license.management.service';

    public const LICENSE_STATUS_STORAGE_SERVICE = 'publishpress-hub.application.license.status-storage.service';

    public const SCHEDULED_LICENSE_VALIDATION_SERVICE = 'publishpress-hub.application.license.scheduled-validation.service';

    public const HUB_ACCESS_SERVICE = 'publishpress-hub.application.access.service';

    public const ADMIN_NOTICE_VISIBILITY_SERVICE = 'publishpress-hub.application.admin-notice-visibility.service';

    public const LICENSE_EXPIRATION_NOTICE_SERVICE = 'publishpress-hub.application.license.expiration-notice.service';

    public const LICENSE_VALIDATION_ACTION_HANDLER = 'publishpress-hub.infrastructure.license.validation-action-handler';

    public const LICENSE_VALIDATION_BOOTSTRAP_SERVICE = 'publishpress-hub.application.license.validation-bootstrap.service';

    public const WP_CONFIG_LICENSE_READER_SERVICE = 'publishpress-hub.application.license.wp-config-reader.service';

    public const WP_CONFIG_LICENSE_SYNC_SERVICE = 'publishpress-hub.application.license.wp-config-sync.service';

    public const VALIDATE_LICENSES_USE_CASE = 'publishpress-hub.application.use-case.plugin.validate-licenses';

    public const EDD_SUBSCRIPTION_ADAPTER = 'publishpress-hub.infrastructure.edd-subscription.adapter';

    public const LICENSE_ACTIVATION_SERVICE = 'publishpress-hub.infrastructure.edd.license-activation.service';

    public const VERSION_CHECK_SERVICE = 'publishpress-hub.infrastructure.edd.version-check.service';

    public const LICENSE_STATUS_VALIDATOR = 'publishpress-hub.infrastructure.edd.license-status-validator';

    public const LICENSE_INFO_SERVICE = 'publishpress-hub.infrastructure.edd.license-info.service';

    public const LICENSE_DEACTIVATION_SERVICE = 'publishpress-hub.infrastructure.edd.license-deactivation.service';

    public const REMOTE_SERVICE = 'publishpress-hub.infrastructure.remote.service';

    public const REMOTE_ADAPTER = 'publishpress-hub.infrastructure.remote.adapter';

    public const CACHE_SERVICE = 'publishpress-hub.infrastructure.cache.service';

    public const CACHE_ADAPTER = 'publishpress-hub.infrastructure.cache.adapter';

    // Application Services
    public const HUB_BOOTSTRAP_SERVICE = 'publishpress-hub.application.hub.bootstrap.service';

    public const MCP_CONNECTION_SERVICE = 'publishpress-hub.application.mcp.connection.service';

    public const WORDPRESS_ABILITIES_SERVICE = 'publishpress-hub.application.mcp.wordpress-abilities.service';

    public const WORDPRESS_LOOKUP_SERVICE = 'publishpress-hub.application.mcp.wordpress-lookup.service';

    public const WORDPRESS_WRITE_SERVICE = 'publishpress-hub.application.mcp.wordpress-write.service';

    public const MCP_ADAPTER_INSTALLATION_SERVICE = 'publishpress-hub.application.mcp.adapter-installation.service';

    public const VERSION_SERVICE = 'publishpress-hub.application.version.service';

    public const PLUGIN_FAMILY_REPOSITORY = 'publishpress-hub.domain.plugin-family.repository';

    public const PLUGIN_LIFECYCLE_ADAPTER = 'publishpress-hub.infrastructure.plugin-lifecycle.adapter';

    public const LIST_PLUGINS_USE_CASE = 'publishpress-hub.application.use-case.plugin.list';

    public const INSTALL_FREE_PLUGIN_USE_CASE = 'publishpress-hub.application.use-case.plugin.install-free';

    public const INSTALL_PRO_PLUGIN_USE_CASE = 'publishpress-hub.application.use-case.plugin.install-pro';

    public const CHANGE_PLUGIN_ACTIVATION_USE_CASE = 'publishpress-hub.application.use-case.plugin.change-plugin-activation';

    public const UNINSTALL_PLUGIN_USE_CASE = 'publishpress-hub.application.use-case.plugin.uninstall';

    public const UPGRADE_PLUGIN_USE_CASE = 'publishpress-hub.application.use-case.plugin.upgrade';

    public const UPDATE_PLUGIN_USE_CASE = 'publishpress-hub.application.use-case.plugin.update';

    public const RESOLVE_CONFLICT_USE_CASE = 'publishpress-hub.application.use-case.plugin.resolve-conflict';

    public const DEACTIVATE_LICENSE_USE_CASE = 'publishpress-hub.application.use-case.plugin.deactivate-license';

    public const ACTIVATE_LICENSE_USE_CASE = 'publishpress-hub.application.use-case.plugin.activate-license';

    public const REUSE_LICENSE_FOR_ALL_PLUGINS_USE_CASE = 'publishpress-hub.application.use-case.plugin.reuse-license-for-all-plugins';

    public const PLUGIN_STATUS_ADAPTER = 'publishpress-hub.infrastructure.plugin-status.adapter';

    public const PLUGIN_STATUS_SERVICE = 'publishpress-hub.application.plugin-status.service';

    public const FREE_PLUGIN_API = 'publishpress-hub.infrastructure.free-plugin-api';

    // Adapters
    public const ADMIN_MENU_ADAPTER = 'publishpress-hub.infrastructure.admin-menu.adapter';

    // Presentation Services
    public const WELCOME_PAGE_CONTROLLER = 'publishpress-hub.presentation.welcome-page.controller';

    public const ACTIVATION_REDIRECT_SERVICE = 'publishpress-hub.application.service.activation-redirect';

    public const REWRITE_RULES_SERVICE = 'publishpress-hub.application.service.rewrite-rules';

    public const EDD_PLUGIN_UPDATE_SERVICE = 'publishpress-hub.application.service.edd-plugin-update';

    public const STATISTICS_SERVICE = 'publishpress-hub.application.service.statistics';

    public const PLUGINS_DASHBOARD_CONTROLLER = 'publishpress-hub.presentation.plugins-dashboard.controller';

    public const SETTINGS_PAGE_CONTROLLER = 'publishpress-hub.presentation.settings-page.controller';

    public const MCP_SETUP_SERVICE = 'publishpress-hub.application.mcp.setup.service';

    public const REST_API_MCP_CONTROLLER = 'publishpress-hub.presentation.rest-api.mcp.controller';

    public const MCP_PAGE_CONTROLLER = 'publishpress-hub.presentation.mcp-page.controller';

    public const DEV_COMPONENTS_SHOWCASE_CONTROLLER = 'publishpress-hub.presentation.dev-components-showcase.controller';

    public const REST_API_PLUGINS_CONTROLLER = 'publishpress-hub.presentation.rest-api.plugins.controller';

    public const REST_API_SETTINGS_CONTROLLER = 'publishpress-hub.presentation.rest-api.settings.controller';

    public const DEBUG_LOG_SERVICE = 'publishpress-hub.infrastructure.debug.log-service';

    public const GET_DIAGNOSTICS_SETTINGS_USE_CASE = 'publishpress-hub.application.use-case.settings.get-diagnostics';

    public const UPDATE_DIAGNOSTICS_SETTINGS_USE_CASE = 'publishpress-hub.application.use-case.settings.update-diagnostics';

    public const GET_DEBUG_LOG_USE_CASE = 'publishpress-hub.application.use-case.settings.get-debug-log';

    public const CLEAR_DEBUG_LOG_USE_CASE = 'publishpress-hub.application.use-case.settings.clear-debug-log';

    public const GET_SITE_HEALTH_REPORT_USE_CASE = 'publishpress-hub.application.use-case.settings.get-site-health-report';
}
