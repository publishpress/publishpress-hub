<?php

/**
 * Container definitions.
 *
 * @package PublishPress\Hub\Infrastructure\Container
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container;

use PublishPress\Hub\Application\Service\HubBootstrapService;
use PublishPress\Hub\Application\Service\License\LicenseManagementService;
use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Plugin\ActivateLicenseUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\ChangePluginActivationUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\DeactivateLicenseUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\InstallFreePluginUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\InstallProPluginUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\ListPluginsUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\ResolveConflictUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\UninstallPluginUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\UpgradePluginUseCase;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Repository\PluginFamilyRepository;
use PublishPress\Hub\Infrastructure\AdminMenu\AdminMenuService;
use PublishPress\Hub\Infrastructure\Cache\CacheService;
use PublishPress\Hub\Infrastructure\Edd\Subscription\EddSubscriptionAdapter;
use PublishPress\Hub\Infrastructure\License\LicenseApiService;
use PublishPress\Hub\Infrastructure\License\LicensePersistenceService;
use PublishPress\Hub\Infrastructure\Logger\Logger;
use PublishPress\Hub\Infrastructure\Remote\RemoteService;
use PublishPress\Hub\Infrastructure\RestApi\RestApiService;
use PublishPress\Hub\Infrastructure\View\ViewService;
use PublishPress\Hub\Infrastructure\WPOrg\Api\WPOrgPluginApiAdapter;
use PublishPress\Hub\Infrastructure\WP\AdminMenu\WPAdminMenuAdapter;
use PublishPress\Hub\Infrastructure\WP\Asset\WPAssetAdapter;
use PublishPress\Hub\Infrastructure\WP\Cache\WPCacheAdapter;
use PublishPress\Hub\Infrastructure\WP\Environment\WPEnvironmentAdapter;
use PublishPress\Hub\Infrastructure\WP\Filesystem\WPFileSystemAdapter;
use PublishPress\Hub\Infrastructure\WP\Hooks\WPHooksAdapter;
use PublishPress\Hub\Infrastructure\WP\I18n\WPI18nAdapter;
use PublishPress\Hub\Infrastructure\WP\Options\WPOptionsAdapter;
use PublishPress\Hub\Infrastructure\WP\Plugin\WPPluginLifecycleAdapter;
use PublishPress\Hub\Infrastructure\WP\Plugin\WPPluginStatusAdapter;
use PublishPress\Hub\Infrastructure\WP\Remote\WPRemoteAdapter;
use PublishPress\Hub\Infrastructure\WP\RestApi\WPRestApiAdapter;
use PublishPress\Hub\Infrastructure\WP\Security\WPSecurityAdapter;
use PublishPress\Hub\Presentation\Controller\DevComponentsShowcaseController;
use PublishPress\Hub\Presentation\Controller\MainMenuController;
use PublishPress\Hub\Presentation\Controller\PluginsDashboardController;
use PublishPress\Hub\Presentation\Controller\RestApi\PluginsController;
use PublishPress\Psr\Container\ContainerInterface;

return [
    AbstractDependencies::PLUGIN_PATH => PUBLISHPRESS_HUB_PATH,

    AbstractDependencies::PLUGIN_TEXT_DOMAIN => 'publishpress-hub',

    AbstractDependencies::PLUGIN_URL => PUBLISHPRESS_HUB_URL,

    AbstractDependencies::PLUGIN_ASSETS_PATH => PUBLISHPRESS_HUB_PATH . 'src/resources/Asset/dist/',

    AbstractDependencies::PLUGIN_ASSETS_URL => PUBLISHPRESS_HUB_URL . 'src/resources/Asset/dist/',

    AbstractDependencies::PLUGIN_VERSION => PUBLISHPRESS_HUB_VERSION,

    AbstractDependencies::PLUGIN_LANGUAGES_PATH => PUBLISHPRESS_HUB_PATH . 'languages/',

    AbstractDependencies::PLUGIN_TEMPLATES_BASE_PATH => PUBLISHPRESS_HUB_SRC_PATH . 'Presentation/Template/',

    AbstractDependencies::PLUGIN_I18N_SCRIPT_PATH => 'js/i18n.js',

    AbstractDependencies::HUB_REST_API_NAMESPACE => 'publishpress-hub/v1',

    AbstractDependencies::EDD_SUBSCRIPTION_API_URL => 'https://publishpress.com',

    AbstractDependencies::SITE_URL => home_url(),

    AbstractDependencies::CACHE_GROUP => 'publishpress-hub',

    AbstractDependencies::LICENSE_OPTION_PREFIX => 'publishpress_hub_license_',

    AbstractDependencies::USER_AGENT =>
        fn(ContainerInterface $container) => sprintf(
            'PublishPress-Hub/%s; %s',
            $container->get(AbstractDependencies::PLUGIN_VERSION),
            $container->get(AbstractDependencies::SITE_URL)
        ),

    AbstractDependencies::SCRIPT_DEBUG =>
        fn(ContainerInterface $container) => defined('SCRIPT_DEBUG') && constant('SCRIPT_DEBUG'),

    // Infrastructure Services
    AbstractDependencies::HOOKS_SERVICE =>
        fn(ContainerInterface $container) => new WPHooksAdapter(),

    AbstractDependencies::I18N_SERVICE =>
        fn(ContainerInterface $container) => new WPI18nAdapter(
            $container->get(AbstractDependencies::PLUGIN_TEXT_DOMAIN),
            $container->get(AbstractDependencies::PLUGIN_I18N_SCRIPT_PATH),
            $container->get(AbstractDependencies::PLUGIN_LANGUAGES_PATH),
            $container->get(AbstractDependencies::HOOKS_SERVICE),
            $container->get(AbstractDependencies::ASSET_SERVICE)
        ),

    AbstractDependencies::ASSET_SERVICE =>
        fn(ContainerInterface $container) => new WPAssetAdapter(
            $container->get(AbstractDependencies::PLUGIN_ASSETS_URL),
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
            $container->get(AbstractDependencies::ADMIN_MENU_ADAPTER),
            $container->get(AbstractDependencies::HOOKS_SERVICE),
        ),

    AbstractDependencies::VIEW_SERVICE =>
        fn(ContainerInterface $container) => new ViewService(
            $container->get(AbstractDependencies::PLUGIN_TEMPLATES_BASE_PATH)
        ),

    AbstractDependencies::SECURITY_SERVICE =>
        fn(ContainerInterface $container) => new WPSecurityAdapter(),

    AbstractDependencies::ENVIRONMENT_SERVICE =>
        fn(ContainerInterface $container) => new WPEnvironmentAdapter(),

    AbstractDependencies::REST_API_ADAPTER =>
        fn(ContainerInterface $container) => new WPRestApiAdapter(),

    AbstractDependencies::REST_API_SERVICE =>
        fn(ContainerInterface $container) => new RestApiService(
            $container->get(AbstractDependencies::HOOKS_SERVICE),
            $container->get(AbstractDependencies::REST_API_ADAPTER),
            $container->get(AbstractDependencies::SECURITY_SERVICE)
        ),

    AbstractDependencies::LICENSE_PERSISTENCE_SERVICE =>
        fn(ContainerInterface $container) => new LicensePersistenceService(
            $container->get(AbstractDependencies::OPTIONS_ADAPTER),
            $container->get(AbstractDependencies::LICENSE_OPTION_PREFIX)
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

    AbstractDependencies::EDD_SUBSCRIPTION_ADAPTER =>
        fn(ContainerInterface $container) => new EddSubscriptionAdapter(
            $container->get(AbstractDependencies::EDD_SUBSCRIPTION_API_URL),
            $container->get(AbstractDependencies::SITE_URL),
            $container->get(AbstractDependencies::USER_AGENT),
            $container->get(AbstractDependencies::REMOTE_SERVICE),
            $container->get(AbstractDependencies::CACHE_SERVICE)
        ),

    AbstractDependencies::REMOTE_SERVICE =>
        fn(ContainerInterface $container) => new RemoteService(
            $container->get(AbstractDependencies::REMOTE_ADAPTER)
        ),

    AbstractDependencies::REMOTE_ADAPTER =>
        fn(ContainerInterface $container) => new WPRemoteAdapter(),

    AbstractDependencies::CACHE_SERVICE =>
        fn(ContainerInterface $container) => new CacheService(
            $container->get(AbstractDependencies::CACHE_GROUP),
            $container->get(AbstractDependencies::CACHE_ADAPTER)
        ),

    AbstractDependencies::CACHE_ADAPTER =>
        fn(ContainerInterface $container) => new WPCacheAdapter(),

    AbstractDependencies::FREE_PLUGIN_API =>
        fn(ContainerInterface $container) => new WPOrgPluginApiAdapter(),

    // Application Services
    AbstractDependencies::HUB_BOOTSTRAP_SERVICE =>
        function (ContainerInterface $container) {
            $servicesToInit = [
                $container->get(AbstractDependencies::I18N_SERVICE),
                $container->get(AbstractDependencies::ADMIN_MENU_SERVICE),
                $container->get(AbstractDependencies::PLUGINS_DASHBOARD_CONTROLLER),
                $container->get(AbstractDependencies::REST_API_SERVICE),
                $container->get(AbstractDependencies::REST_API_PLUGINS_CONTROLLER),
            ];

            if (defined('PUBLISHPRESS_HUB_DEV_MODE') && constant('PUBLISHPRESS_HUB_DEV_MODE')) {
                $servicesToInit[] = $container->get(AbstractDependencies::DEV_COMPONENTS_SHOWCASE_CONTROLLER);
            }

            return new HubBootstrapService(
                $container->get(AbstractDependencies::HOOKS_SERVICE),
                $servicesToInit,
                $container->get(AbstractDependencies::MAIN_MENU_CONTROLLER),
                $container->get(AbstractDependencies::PLUGIN_FAMILY_REPOSITORY),
                $container->get(AbstractDependencies::ENVIRONMENT_SERVICE)
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
            $container->get(AbstractDependencies::LICENSE_PERSISTENCE_SERVICE)
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
            $container->get(AbstractDependencies::LICENSE_MANAGEMENT_SERVICE)
        ),

    // Presentation Services
    AbstractDependencies::MAIN_MENU_CONTROLLER =>
        fn(ContainerInterface $container) => new MainMenuController(
            $container->get(AbstractDependencies::ADMIN_MENU_SERVICE),
            $container->get(AbstractDependencies::ASSET_SERVICE),
            $container->get(AbstractDependencies::HOOKS_SERVICE)
        ),

    AbstractDependencies::PLUGINS_DASHBOARD_CONTROLLER =>
        fn(ContainerInterface $container) => new PluginsDashboardController(
            $container->get(AbstractDependencies::HOOKS_SERVICE),
            $container->get(AbstractDependencies::VIEW_SERVICE),
            $container->get(AbstractDependencies::ADMIN_MENU_SERVICE),
            $container->get(AbstractDependencies::ASSET_SERVICE),
            $container->get(AbstractDependencies::SECURITY_SERVICE)
        ),

    AbstractDependencies::DEV_COMPONENTS_SHOWCASE_CONTROLLER =>
        fn(ContainerInterface $container) => new DevComponentsShowcaseController(
            $container->get(AbstractDependencies::HOOKS_SERVICE),
            $container->get(AbstractDependencies::VIEW_SERVICE),
            $container->get(AbstractDependencies::ADMIN_MENU_SERVICE),
            $container->get(AbstractDependencies::ASSET_SERVICE)
        ),

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
            $container->get(AbstractDependencies::RESOLVE_CONFLICT_USE_CASE),
            $container->get(AbstractDependencies::DEACTIVATE_LICENSE_USE_CASE),
            $container->get(AbstractDependencies::ACTIVATE_LICENSE_USE_CASE)
        ),

    // Adapters
    AbstractDependencies::ADMIN_MENU_ADAPTER =>
        fn(ContainerInterface $container) => new WPAdminMenuAdapter(),
];
