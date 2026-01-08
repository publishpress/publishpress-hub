<?php

/**
 * Container definitions.
 *
 * @package PublishPress\Hub
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub;

use PublishPress\Hub\Application\Service\ActivationRedirectService;
use PublishPress\Hub\Application\Service\HubBootstrapService;
use PublishPress\Hub\Application\Service\RewriteRulesService;
use PublishPress\Hub\Application\Service\Access\HubAccessService;
use PublishPress\Hub\Application\Service\License\LicenseExpirationNoticeService;
use PublishPress\Hub\Application\Service\License\LicenseManagementService;
use PublishPress\Hub\Application\Service\License\LicenseStatusStorageService;
use PublishPress\Hub\Application\Service\License\LicenseValidationBootstrapService;
use PublishPress\Hub\Application\Service\License\ScheduledLicenseValidationService;
use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\Service\VersionService;
use PublishPress\Hub\Application\UseCase\Plugin\ActivateLicenseUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\ChangePluginActivationUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\DeactivateLicenseUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\InstallFreePluginUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\InstallProPluginUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\ListPluginsUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\ResolveConflictUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\UninstallPluginUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\UpgradePluginUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\UpdatePluginUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\ValidateLicensesUseCase;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Repository\PluginFamilyRepository;
use PublishPress\Hub\Infrastructure\AdminMenu\AdminMenuService;
use PublishPress\Hub\Infrastructure\Cache\CacheService;
use PublishPress\Hub\Infrastructure\Edd\Subscription\EddSubscriptionAdapter;
use PublishPress\Hub\Infrastructure\Edd\Subscription\LicenseActivationService;
use PublishPress\Hub\Infrastructure\Edd\Subscription\LicenseDeactivationService;
use PublishPress\Hub\Infrastructure\Edd\Subscription\LicenseInfoService;
use PublishPress\Hub\Infrastructure\Edd\Subscription\LicenseStatusValidator;
use PublishPress\Hub\Infrastructure\Edd\Subscription\VersionCheckService;
use PublishPress\Hub\Infrastructure\License\LicenseApiService;
use PublishPress\Hub\Infrastructure\Logger\Logger;
use PublishPress\Hub\Infrastructure\Remote\RemoteService;
use PublishPress\Hub\Infrastructure\RestApi\RestApiService;
use PublishPress\Hub\Infrastructure\View\ViewService;
use PublishPress\Hub\Infrastructure\WPOrg\Api\WPOrgPluginApiAdapter;
use PublishPress\Hub\Infrastructure\WP\Asset\WPAssetAdapter;
use PublishPress\Hub\Infrastructure\WP\Filesystem\WPFileSystemAdapter;
use PublishPress\Hub\Infrastructure\WP\I18n\WPI18nAdapter;
use PublishPress\Hub\Infrastructure\WP\Options\WPOptionsAdapter;
use PublishPress\Hub\Infrastructure\WP\Plugin\WPPluginLifecycleAdapter;
use PublishPress\Hub\Infrastructure\WP\Plugin\WPPluginStatusAdapter;
use PublishPress\Hub\Infrastructure\WP\Remote\WPRemoteAdapter;
use PublishPress\Hub\Infrastructure\WP\RestApi\WPRestApiAdapter;
use PublishPress\Hub\Infrastructure\WP\Security\WPSecurityAdapter;
use PublishPress\Hub\Admin\Page\ComponentsShowcaseController;
use PublishPress\Hub\Admin\Page\PluginsDashboardController;
use PublishPress\Hub\Admin\Page\SettingsPageController;
use PublishPress\Hub\Admin\Page\WelcomePageController;
use PublishPress\Hub\Infrastructure\Container\AbstractDependencies;
use PublishPress\Hub\Infrastructure\License\Handler\LicenseValidationActionHandler;
use PublishPress\Hub\Infrastructure\License\PerPluginLicensePersistenceService;
use PublishPress\Hub\Rest\PluginsController;
use PublishPress\Psr\Container\ContainerInterface;

return [
    AbstractDependencies::PLUGIN_PATH => PUBLISHPRESS_HUB_PATH,

    AbstractDependencies::PLUGIN_TEXT_DOMAIN => 'publishpress-hub',

    AbstractDependencies::PLUGIN_URL => PUBLISHPRESS_HUB_URL,

    AbstractDependencies::PLUGIN_RESOURCES_PATH => PUBLISHPRESS_HUB_PATH . 'resources/dist/',

    AbstractDependencies::PLUGIN_RESOURCES_URL => PUBLISHPRESS_HUB_URL . 'resources/dist/',

    AbstractDependencies::PLUGIN_VERSION => PUBLISHPRESS_HUB_VERSION,

    AbstractDependencies::PLUGIN_LANGUAGES_PATH => PUBLISHPRESS_HUB_PATH . 'languages/',

    AbstractDependencies::ADMIN_TEMPLATES_BASE_PATH => PUBLISHPRESS_HUB_SRC_PATH . 'Admin/Template/',

    AbstractDependencies::PLUGIN_I18N_SCRIPT_PATH => 'js/i18n.js',

    AbstractDependencies::HUB_REST_API_NAMESPACE => 'publishpress-hub/v1',

    AbstractDependencies::EDD_SUBSCRIPTION_API_URL => 'https://publishpress.com',

    AbstractDependencies::SITE_URL => home_url(),

    AbstractDependencies::CACHE_GROUP => 'publishpress-hub',

    AbstractDependencies::LICENSE_OPTION_PREFIX => 'publishpress_hub_license_',

    AbstractDependencies::LICENSE_VALIDATION_POLL_INTERVAL_SECONDS =>
        defined('PUBLISHPRESS_HUB_LICENSE_VALIDATION_POLL_INTERVAL_SECONDS')
            ? (int) constant('PUBLISHPRESS_HUB_LICENSE_VALIDATION_POLL_INTERVAL_SECONDS')
            : 12 * HOUR_IN_SECONDS,

    AbstractDependencies::USER_AGENT =>
        fn(ContainerInterface $container) => sprintf(
            'PublishPress-Hub/%s; %s',
            $container->get(AbstractDependencies::PLUGIN_VERSION),
            $container->get(AbstractDependencies::SITE_URL)
        ),

    AbstractDependencies::SCRIPT_DEBUG =>
        fn(ContainerInterface $container) => defined('SCRIPT_DEBUG') && constant('SCRIPT_DEBUG'),

    // Infrastructure Services
    AbstractDependencies::I18N_SERVICE =>
        fn(ContainerInterface $container) => new WPI18nAdapter(
            $container->get(AbstractDependencies::PLUGIN_TEXT_DOMAIN),
            $container->get(AbstractDependencies::PLUGIN_I18N_SCRIPT_PATH),
            $container->get(AbstractDependencies::PLUGIN_LANGUAGES_PATH),
            $container->get(AbstractDependencies::ASSET_SERVICE)
        ),

    AbstractDependencies::ASSET_SERVICE =>
        fn(ContainerInterface $container) => new WPAssetAdapter(
            $container->get(AbstractDependencies::PLUGIN_RESOURCES_URL),
            $container->get(AbstractDependencies::PLUGIN_VERSION),
            $container->get(AbstractDependencies::SCRIPT_DEBUG)
        ),

    AbstractDependencies::LOGGER_SERVICE =>
        fn(ContainerInterface $container) => new Logger([
                'include_class_name' => true,
                'include_file_path' => true,
                'trace_separator' => ' > ',
                'message_prefix' => '[PublishPress Hub] ',
                'error_log_function' => 'error_log',
            ]),

    AbstractDependencies::ADMIN_MENU_SERVICE =>
        fn(ContainerInterface $container) => new AdminMenuService(
            $container->get(AbstractDependencies::ASSET_SERVICE)
        ),

    AbstractDependencies::ADMIN_VIEW_SERVICE =>
        fn(ContainerInterface $container) => new ViewService(
            $container->get(AbstractDependencies::ADMIN_TEMPLATES_BASE_PATH)
        ),

    AbstractDependencies::REST_API_ADAPTER =>
        fn(ContainerInterface $container) => new WPRestApiAdapter(),

    AbstractDependencies::REST_API_SERVICE =>
        fn(ContainerInterface $container) => new RestApiService(
            $container->get(AbstractDependencies::REST_API_ADAPTER)
        ),

    // TODO: Swap back to CanonicalLicensePersistenceService after we update all the plugins to use Hub as dependency.
    AbstractDependencies::LICENSE_PERSISTENCE_SERVICE =>
        fn(ContainerInterface $container) => new PerPluginLicensePersistenceService(
            $container->get(AbstractDependencies::OPTIONS_ADAPTER),
            $container->get(AbstractDependencies::PLUGIN_FAMILY_REPOSITORY)
        ),

    AbstractDependencies::LICENSE_API_SERVICE =>
        fn(ContainerInterface $container) => new LicenseApiService(
            $container->get(AbstractDependencies::EDD_SUBSCRIPTION_ADAPTER),
        ),

    AbstractDependencies::LICENSE_MANAGEMENT_SERVICE =>
        fn(ContainerInterface $container) => new LicenseManagementService(
            $container->get(AbstractDependencies::LICENSE_API_SERVICE),
            $container->get(AbstractDependencies::LICENSE_PERSISTENCE_SERVICE)
        ),

    AbstractDependencies::LICENSE_STATUS_STORAGE_SERVICE =>
        fn(ContainerInterface $container) => new LicenseStatusStorageService(
            $container->get(AbstractDependencies::OPTIONS_ADAPTER)
        ),

    AbstractDependencies::SCHEDULED_LICENSE_VALIDATION_SERVICE =>
        fn(ContainerInterface $container) => new ScheduledLicenseValidationService(
            $container->get(AbstractDependencies::LICENSE_MANAGEMENT_SERVICE),
            $container->get(AbstractDependencies::LICENSE_STATUS_STORAGE_SERVICE),
            $container->get(AbstractDependencies::PLUGIN_STATUS_SERVICE),
            $container->get(AbstractDependencies::LICENSE_PERSISTENCE_SERVICE),
            $container->get(AbstractDependencies::LOGGER_SERVICE),
            $container->get(AbstractDependencies::LICENSE_VALIDATION_POLL_INTERVAL_SECONDS)
        ),

    AbstractDependencies::HUB_ACCESS_SERVICE =>
        fn(ContainerInterface $container) => new HubAccessService(),

    AbstractDependencies::VERSION_SERVICE =>
        fn(ContainerInterface $container) => new VersionService(
            $container->get(AbstractDependencies::OPTIONS_ADAPTER),
            $container->get(AbstractDependencies::PLUGIN_VERSION)
        ),

    AbstractDependencies::LICENSE_VALIDATION_ACTION_HANDLER =>
        fn(ContainerInterface $container) => new LicenseValidationActionHandler(
            $container->get(AbstractDependencies::SCHEDULED_LICENSE_VALIDATION_SERVICE)
        ),

    AbstractDependencies::LICENSE_EXPIRATION_NOTICE_SERVICE =>
        fn(ContainerInterface $container) => new LicenseExpirationNoticeService(
            $container->get(AbstractDependencies::LICENSE_STATUS_STORAGE_SERVICE),
            $container->get(AbstractDependencies::PLUGIN_STATUS_SERVICE)
        ),

    AbstractDependencies::LICENSE_VALIDATION_BOOTSTRAP_SERVICE =>
        fn(ContainerInterface $container) => new LicenseValidationBootstrapService(
            $container->get(AbstractDependencies::SCHEDULED_LICENSE_VALIDATION_SERVICE),
            $container->get(AbstractDependencies::LICENSE_VALIDATION_ACTION_HANDLER),
            $container->get(AbstractDependencies::LICENSE_EXPIRATION_NOTICE_SERVICE)
        ),

    AbstractDependencies::LICENSE_ACTIVATION_SERVICE =>
        function (ContainerInterface $container) {
            $eddSubscriptionApiUrl = $container->get(AbstractDependencies::EDD_SUBSCRIPTION_API_URL);
            $siteUrl = $container->get(AbstractDependencies::SITE_URL);
            $userAgent = $container->get(AbstractDependencies::USER_AGENT);

            $requestHeaders = [
                'User-Agent' => $userAgent,
                'Accept' => 'application/json, text/plain, */*',
                'Accept-Language' => 'en-US,en;q=0.9',
                'Accept-Encoding' => 'gzip, deflate',
                'Content-Type' => 'application/x-www-form-urlencoded',
                'Connection' => 'keep-alive',
                'Referer' => $siteUrl,
                'Origin' => $siteUrl,
                'Cache-Control' => 'no-cache',
                'Pragma' => 'no-cache',
            ];

            return new LicenseActivationService(
                $eddSubscriptionApiUrl,
                $siteUrl,
                $container->get(AbstractDependencies::REMOTE_SERVICE),
                $container->get(AbstractDependencies::CACHE_SERVICE),
                $requestHeaders
            );
        },

    AbstractDependencies::VERSION_CHECK_SERVICE =>
        function (ContainerInterface $container) {
            $eddSubscriptionApiUrl = $container->get(AbstractDependencies::EDD_SUBSCRIPTION_API_URL);
            $siteUrl = $container->get(AbstractDependencies::SITE_URL);
            $userAgent = $container->get(AbstractDependencies::USER_AGENT);

            $requestHeaders = [
                'User-Agent' => $userAgent,
                'Accept' => 'application/json, text/plain, */*',
                'Accept-Language' => 'en-US,en;q=0.9',
                'Accept-Encoding' => 'gzip, deflate',
                'Content-Type' => 'application/x-www-form-urlencoded',
                'Connection' => 'keep-alive',
                'Referer' => $siteUrl,
                'Origin' => $siteUrl,
                'Cache-Control' => 'no-cache',
                'Pragma' => 'no-cache',
            ];

            return new VersionCheckService(
                $eddSubscriptionApiUrl,
                $siteUrl,
                $container->get(AbstractDependencies::REMOTE_SERVICE),
                $container->get(AbstractDependencies::CACHE_SERVICE),
                $requestHeaders
            );
        },

    AbstractDependencies::LICENSE_STATUS_VALIDATOR =>
        fn(ContainerInterface $container) => new LicenseStatusValidator(),

    AbstractDependencies::LICENSE_INFO_SERVICE =>
        function (ContainerInterface $container) {
            $eddSubscriptionApiUrl = $container->get(AbstractDependencies::EDD_SUBSCRIPTION_API_URL);
            $siteUrl = $container->get(AbstractDependencies::SITE_URL);
            $userAgent = $container->get(AbstractDependencies::USER_AGENT);

            $requestHeaders = [
                'User-Agent' => $userAgent,
                'Accept' => 'application/json, text/plain, */*',
                'Accept-Language' => 'en-US,en;q=0.9',
                'Accept-Encoding' => 'gzip, deflate',
                'Content-Type' => 'application/x-www-form-urlencoded',
                'Connection' => 'keep-alive',
                'Referer' => $siteUrl,
                'Origin' => $siteUrl,
                'Cache-Control' => 'no-cache',
                'Pragma' => 'no-cache',
            ];

            return new LicenseInfoService(
                $eddSubscriptionApiUrl,
                $siteUrl,
                $container->get(AbstractDependencies::REMOTE_SERVICE),
                $container->get(AbstractDependencies::CACHE_SERVICE),
                $requestHeaders
            );
        },

    AbstractDependencies::LICENSE_DEACTIVATION_SERVICE =>
        function (ContainerInterface $container) {
            $eddSubscriptionApiUrl = $container->get(AbstractDependencies::EDD_SUBSCRIPTION_API_URL);
            $siteUrl = $container->get(AbstractDependencies::SITE_URL);
            $userAgent = $container->get(AbstractDependencies::USER_AGENT);

            $requestHeaders = [
                'User-Agent' => $userAgent,
                'Accept' => 'application/json, text/plain, */*',
                'Accept-Language' => 'en-US,en;q=0.9',
                'Accept-Encoding' => 'gzip, deflate',
                'Content-Type' => 'application/x-www-form-urlencoded',
                'Connection' => 'keep-alive',
                'Referer' => $siteUrl,
                'Origin' => $siteUrl,
                'Cache-Control' => 'no-cache',
                'Pragma' => 'no-cache',
            ];

            return new LicenseDeactivationService(
                $eddSubscriptionApiUrl,
                $siteUrl,
                $container->get(AbstractDependencies::REMOTE_SERVICE),
                $requestHeaders
            );
        },

    AbstractDependencies::EDD_SUBSCRIPTION_ADAPTER =>
        fn(ContainerInterface $container) => new EddSubscriptionAdapter(
            $container->get(AbstractDependencies::LICENSE_ACTIVATION_SERVICE),
            $container->get(AbstractDependencies::LICENSE_DEACTIVATION_SERVICE),
            $container->get(AbstractDependencies::LICENSE_INFO_SERVICE),
            $container->get(AbstractDependencies::VERSION_CHECK_SERVICE),
            $container->get(AbstractDependencies::LICENSE_STATUS_VALIDATOR)
        ),

    AbstractDependencies::REMOTE_SERVICE =>
        fn(ContainerInterface $container) => new RemoteService(
            $container->get(AbstractDependencies::REMOTE_ADAPTER)
        ),

    AbstractDependencies::REMOTE_ADAPTER =>
        fn(ContainerInterface $container) => new WPRemoteAdapter(),

    AbstractDependencies::CACHE_SERVICE =>
        fn(ContainerInterface $container) => new CacheService(
            $container->get(AbstractDependencies::CACHE_GROUP)
        ),

    AbstractDependencies::FREE_PLUGIN_API =>
        fn(ContainerInterface $container) => new WPOrgPluginApiAdapter(),

    // Application Services
    AbstractDependencies::HUB_BOOTSTRAP_SERVICE =>
        function (ContainerInterface $container) {
            $servicesToInit = [
                $container->get(AbstractDependencies::HUB_ACCESS_SERVICE),
                $container->get(AbstractDependencies::I18N_SERVICE),
                $container->get(AbstractDependencies::ADMIN_MENU_SERVICE),
            ];

            if (!defined('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE') || !constant('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE')) {
                $servicesToInit[] = $container->get(AbstractDependencies::WELCOME_PAGE_CONTROLLER);
            }

            $servicesToInit[] = $container->get(AbstractDependencies::PLUGINS_DASHBOARD_CONTROLLER);
            $servicesToInit[] = $container->get(AbstractDependencies::SETTINGS_PAGE_CONTROLLER);
            $servicesToInit[] = $container->get(AbstractDependencies::REST_API_SERVICE);
            $servicesToInit[] = $container->get(AbstractDependencies::REST_API_PLUGINS_CONTROLLER);
            $servicesToInit[] = $container->get(AbstractDependencies::LICENSE_VALIDATION_BOOTSTRAP_SERVICE);
            $servicesToInit[] = $container->get(AbstractDependencies::ACTIVATION_REDIRECT_SERVICE);
            $servicesToInit[] = $container->get(AbstractDependencies::REWRITE_RULES_SERVICE);

            if (defined('PUBLISHPRESS_HUB_DEV_MODE') && constant('PUBLISHPRESS_HUB_DEV_MODE')) {
                $servicesToInit[] = $container->get(AbstractDependencies::DEV_COMPONENTS_SHOWCASE_CONTROLLER);
            }

            return new HubBootstrapService(
                $servicesToInit,
                $container->get(AbstractDependencies::PLUGIN_FAMILY_REPOSITORY),
                $container->get(AbstractDependencies::HUB_ACCESS_SERVICE)
            );
        },

    AbstractDependencies::PLUGIN_FAMILY_REPOSITORY =>
        fn(ContainerInterface $container): PluginFamilyRepositoryInterface => new PluginFamilyRepository(),

    AbstractDependencies::PLUGIN_STATUS_ADAPTER =>
        fn(ContainerInterface $container) => new WPPluginStatusAdapter(
            $container->get(AbstractDependencies::FILE_SYSTEM_ADAPTER)
        ),

    AbstractDependencies::PLUGIN_STATUS_SERVICE =>
        fn(ContainerInterface $container) => new PluginStatusService(
            $container->get(AbstractDependencies::PLUGIN_STATUS_ADAPTER),
            $container->get(AbstractDependencies::PLUGIN_FAMILY_REPOSITORY),
            $container->get(AbstractDependencies::LICENSE_PERSISTENCE_SERVICE)
        ),

    AbstractDependencies::PLUGIN_LIFECYCLE_ADAPTER =>
        fn(ContainerInterface $container) => new WPPluginLifecycleAdapter(
            $container->get(AbstractDependencies::FILE_SYSTEM_ADAPTER)
        ),

    AbstractDependencies::FILE_SYSTEM_ADAPTER =>
        fn(ContainerInterface $container) => new WPFileSystemAdapter(),

    AbstractDependencies::OPTIONS_ADAPTER =>
        fn(ContainerInterface $container) => new WPOptionsAdapter(),

    // Use Cases
    AbstractDependencies::LIST_PLUGINS_USE_CASE =>
        fn(ContainerInterface $container) => new ListPluginsUseCase(
            $container->get(AbstractDependencies::PLUGIN_STATUS_SERVICE),
            $container->get(AbstractDependencies::LICENSE_PERSISTENCE_SERVICE),
            $container->get(AbstractDependencies::LICENSE_MANAGEMENT_SERVICE),
            $container->get(AbstractDependencies::LICENSE_STATUS_STORAGE_SERVICE)
        ),

    AbstractDependencies::INSTALL_FREE_PLUGIN_USE_CASE =>
        fn(ContainerInterface $container) => new InstallFreePluginUseCase(
            $container->get(AbstractDependencies::PLUGIN_STATUS_SERVICE),
            $container->get(AbstractDependencies::PLUGIN_LIFECYCLE_ADAPTER),
            $container->get(AbstractDependencies::FREE_PLUGIN_API)
        ),

    AbstractDependencies::INSTALL_PRO_PLUGIN_USE_CASE =>
        fn(ContainerInterface $container) => new InstallProPluginUseCase(
            $container->get(AbstractDependencies::PLUGIN_STATUS_SERVICE),
            $container->get(AbstractDependencies::PLUGIN_LIFECYCLE_ADAPTER),
            $container->get(AbstractDependencies::LICENSE_MANAGEMENT_SERVICE)
        ),

    AbstractDependencies::CHANGE_PLUGIN_ACTIVATION_USE_CASE =>
        fn(ContainerInterface $container) => new ChangePluginActivationUseCase(
            $container->get(AbstractDependencies::PLUGIN_STATUS_SERVICE),
            $container->get(AbstractDependencies::PLUGIN_LIFECYCLE_ADAPTER)
        ),

    AbstractDependencies::UNINSTALL_PLUGIN_USE_CASE =>
        fn(ContainerInterface $container) => new UninstallPluginUseCase(
            $container->get(AbstractDependencies::PLUGIN_STATUS_SERVICE),
            $container->get(AbstractDependencies::PLUGIN_LIFECYCLE_ADAPTER)
        ),

    AbstractDependencies::UPGRADE_PLUGIN_USE_CASE =>
        fn(ContainerInterface $container) => new UpgradePluginUseCase(
            $container->get(AbstractDependencies::PLUGIN_STATUS_SERVICE),
            $container->get(AbstractDependencies::PLUGIN_LIFECYCLE_ADAPTER),
            $container->get(AbstractDependencies::LICENSE_MANAGEMENT_SERVICE)
        ),

    AbstractDependencies::UPDATE_PLUGIN_USE_CASE =>
        fn(ContainerInterface $container) => new UpdatePluginUseCase(
            $container->get(AbstractDependencies::PLUGIN_STATUS_SERVICE),
            $container->get(AbstractDependencies::PLUGIN_LIFECYCLE_ADAPTER)
        ),

    AbstractDependencies::RESOLVE_CONFLICT_USE_CASE =>
        fn(ContainerInterface $container) => new ResolveConflictUseCase(
            $container->get(AbstractDependencies::PLUGIN_STATUS_SERVICE),
            $container->get(AbstractDependencies::PLUGIN_LIFECYCLE_ADAPTER)
        ),

    AbstractDependencies::DEACTIVATE_LICENSE_USE_CASE =>
        fn(ContainerInterface $container) => new DeactivateLicenseUseCase(
            $container->get(AbstractDependencies::PLUGIN_STATUS_SERVICE),
            $container->get(AbstractDependencies::LICENSE_MANAGEMENT_SERVICE)
        ),

    AbstractDependencies::ACTIVATE_LICENSE_USE_CASE =>
        fn(ContainerInterface $container) => new ActivateLicenseUseCase(
            $container->get(AbstractDependencies::PLUGIN_STATUS_SERVICE),
            $container->get(AbstractDependencies::LICENSE_MANAGEMENT_SERVICE),
            $container->get(AbstractDependencies::SCHEDULED_LICENSE_VALIDATION_SERVICE)
        ),

    AbstractDependencies::VALIDATE_LICENSES_USE_CASE =>
        fn(ContainerInterface $container) => new ValidateLicensesUseCase(
            $container->get(AbstractDependencies::SCHEDULED_LICENSE_VALIDATION_SERVICE),
            $container->get(AbstractDependencies::LIST_PLUGINS_USE_CASE)
        ),

    // Admin Services
    AbstractDependencies::WELCOME_PAGE_CONTROLLER =>
        fn(ContainerInterface $container) => new WelcomePageController(
            $container->get(AbstractDependencies::ADMIN_VIEW_SERVICE),
            $container->get(AbstractDependencies::ADMIN_MENU_SERVICE),
            $container->get(AbstractDependencies::ASSET_SERVICE),
            $container->get(AbstractDependencies::OPTIONS_ADAPTER)
        ),

    AbstractDependencies::ACTIVATION_REDIRECT_SERVICE =>
        fn(ContainerInterface $container) => new ActivationRedirectService(
            $container->get(AbstractDependencies::OPTIONS_ADAPTER)
        ),

    AbstractDependencies::REWRITE_RULES_SERVICE =>
        fn(ContainerInterface $container) => new RewriteRulesService(),

    AbstractDependencies::PLUGINS_DASHBOARD_CONTROLLER =>
        fn(ContainerInterface $container) => new PluginsDashboardController(
            $container->get(AbstractDependencies::ADMIN_VIEW_SERVICE),
            $container->get(AbstractDependencies::ADMIN_MENU_SERVICE),
            $container->get(AbstractDependencies::ASSET_SERVICE)
        ),

    AbstractDependencies::SETTINGS_PAGE_CONTROLLER =>
        fn(ContainerInterface $container) => new SettingsPageController(
            $container->get(AbstractDependencies::ADMIN_VIEW_SERVICE),
            $container->get(AbstractDependencies::ADMIN_MENU_SERVICE),
            $container->get(AbstractDependencies::ASSET_SERVICE)
        ),

    AbstractDependencies::DEV_COMPONENTS_SHOWCASE_CONTROLLER =>
        fn(ContainerInterface $container) => new ComponentsShowcaseController(
            $container->get(AbstractDependencies::ADMIN_VIEW_SERVICE),
            $container->get(AbstractDependencies::ADMIN_MENU_SERVICE),
            $container->get(AbstractDependencies::ASSET_SERVICE)
        ),

    // Rest API Services
    AbstractDependencies::REST_API_PLUGINS_CONTROLLER =>
        fn(ContainerInterface $container) => new PluginsController(
            $container->get(AbstractDependencies::HUB_REST_API_NAMESPACE),
            $container->get(AbstractDependencies::REST_API_SERVICE),
            $container->get(AbstractDependencies::LIST_PLUGINS_USE_CASE),
            $container->get(AbstractDependencies::INSTALL_FREE_PLUGIN_USE_CASE),
            $container->get(AbstractDependencies::INSTALL_PRO_PLUGIN_USE_CASE),
            $container->get(AbstractDependencies::CHANGE_PLUGIN_ACTIVATION_USE_CASE),
            $container->get(AbstractDependencies::UNINSTALL_PLUGIN_USE_CASE),
            $container->get(AbstractDependencies::UPGRADE_PLUGIN_USE_CASE),
            $container->get(AbstractDependencies::UPDATE_PLUGIN_USE_CASE),
            $container->get(AbstractDependencies::RESOLVE_CONFLICT_USE_CASE),
            $container->get(AbstractDependencies::DEACTIVATE_LICENSE_USE_CASE),
            $container->get(AbstractDependencies::ACTIVATE_LICENSE_USE_CASE),
            $container->get(AbstractDependencies::VALIDATE_LICENSES_USE_CASE)
        )
];
