<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container;

use PublishPress\Hub\Application\Service\DevComponentsShowcase\DevComponentsShowcaseService;
use PublishPress\Psr\Container\ContainerInterface;
use PublishPress\Hub\Infrastructure\WordPress\Hooks\WordPressHooksAdapter;
use PublishPress\Hub\Application\Service\PluginBootstrapService;
use PublishPress\Hub\Application\Service\PluginsDashboard\PluginsDashboardService;
use PublishPress\Hub\Infrastructure\AdminMenu\AdminMenuService;
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuAdapterInterface;
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuServiceInterface;
use PublishPress\Hub\Infrastructure\Asset\Contract\AssetServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;
use PublishPress\Hub\Infrastructure\I18n\Contract\I18nServiceInterface;
use PublishPress\Hub\Infrastructure\Logger\Contract\LoggerInterface;
use PublishPress\Hub\Infrastructure\Logger\Logger;
use PublishPress\Hub\Infrastructure\Security\Contract\SecurityServiceInterface;
use PublishPress\Hub\Infrastructure\View\Contract\ViewServiceInterface;
use PublishPress\Hub\Infrastructure\View\ViewService;
use PublishPress\Hub\Infrastructure\WordPress\AdminMenu\WordPressAdminMenuAdapter;
use PublishPress\Hub\Infrastructure\WordPress\Asset\WordPressAssetAdapter;
use PublishPress\Hub\Infrastructure\WordPress\I18n\WordPressI18nAdapter;
use PublishPress\Hub\Infrastructure\WordPress\Security\WordPressSecurityAdapter;
use PublishPress\Hub\Presentation\Controller\DevComponentsShowcaseController;
use PublishPress\Hub\Presentation\Controller\MainMenuController;
use PublishPress\Hub\Presentation\Controller\PluginsDashboardController;

return [
    AbstractDependencies::PLUGIN_PATH => PUBLISHPRESS_HUB_PATH,

    AbstractDependencies::PLUGIN_TEXT_DOMAIN => 'publishpress-hub',

    AbstractDependencies::PLUGIN_URL => PUBLISHPRESS_HUB_URL,

    AbstractDependencies::PLUGIN_ASSETS_PATH => PUBLISHPRESS_HUB_PATH . 'src/Presentation/Asset/dist/',

    AbstractDependencies::PLUGIN_ASSETS_URL => PUBLISHPRESS_HUB_URL . 'src/Presentation/Asset/dist/',

    AbstractDependencies::PLUGIN_VERSION => PUBLISHPRESS_HUB_VERSION,

    AbstractDependencies::PLUGIN_LANGUAGES_PATH => PUBLISHPRESS_HUB_PATH . 'languages/',

    AbstractDependencies::PLUGIN_TEMPLATES_BASE_PATH => PUBLISHPRESS_HUB_SRC_PATH . 'Presentation/Template/',

    AbstractDependencies::PLUGIN_I18N_SCRIPT_PATH => 'js/i18n.js',

    AbstractDependencies::SCRIPT_DEBUG => function (): bool {
        return defined('SCRIPT_DEBUG') && SCRIPT_DEBUG;
    },

    // Infrastructure Services
    AbstractDependencies::HOOKS_SERVICE =>
        function (ContainerInterface $container): HooksServiceInterface {
            return new WordPressHooksAdapter();
        },

    AbstractDependencies::I18N_SERVICE =>
        function (ContainerInterface $container): I18nServiceInterface {
            return new WordPressI18nAdapter(
                $container->get(AbstractDependencies::PLUGIN_TEXT_DOMAIN),
                $container->get(AbstractDependencies::PLUGIN_I18N_SCRIPT_PATH),
                $container->get(AbstractDependencies::PLUGIN_LANGUAGES_PATH),
                $container->get(AbstractDependencies::HOOKS_SERVICE),
                $container->get(AbstractDependencies::ASSET_SERVICE)
            );
        },

    AbstractDependencies::ASSET_SERVICE =>
        function (ContainerInterface $container): AssetServiceInterface {
            return new WordPressAssetAdapter(
                $container->get(AbstractDependencies::PLUGIN_ASSETS_URL),
                $container->get(AbstractDependencies::PLUGIN_VERSION),
                $container->get(AbstractDependencies::SCRIPT_DEBUG)
            );
        },

    AbstractDependencies::LOGGER_SERVICE =>
        function (ContainerInterface $container): LoggerInterface {
            return new Logger([
                'include_class_name' => true,
                'include_file_path' => true,
                'trace_separator' => ' > ',
                'message_prefix' => '[PublishPress Hub] ',
                'error_log_function' => 'error_log',
            ]);
        },

    AbstractDependencies::ADMIN_MENU_SERVICE =>
        function (ContainerInterface $container): AdminMenuServiceInterface {
            return new AdminMenuService(
                $container->get(AbstractDependencies::ADMIN_MENU_ADAPTER),
                $container->get(AbstractDependencies::HOOKS_SERVICE),
            );
        },

    AbstractDependencies::VIEW_SERVICE =>
        function (ContainerInterface $container): ViewServiceInterface {
            return new ViewService(
                $container->get(AbstractDependencies::PLUGIN_TEMPLATES_BASE_PATH)
            );
        },

    AbstractDependencies::SECURITY_SERVICE =>
        function (ContainerInterface $container): SecurityServiceInterface {
            return new WordPressSecurityAdapter();
        },

    // Application Services
    AbstractDependencies::PLUGIN_BOOTSTRAP_SERVICE =>
        function (ContainerInterface $container): PluginBootstrapService {
            return new PluginBootstrapService(
                $container->get(AbstractDependencies::HOOKS_SERVICE),
                [
                    $container->get(AbstractDependencies::I18N_SERVICE),
                    $container->get(AbstractDependencies::ADMIN_MENU_SERVICE),
                    $container->get(AbstractDependencies::PLUGINS_DASHBOARD_SERVICE),
                    $container->get(AbstractDependencies::DEV_COMPONENTS_SHOWCASE_SERVICE),
                ],
                $container->get(AbstractDependencies::MAIN_MENU_CONTROLLER)
            );
        },

    AbstractDependencies::PLUGINS_DASHBOARD_SERVICE =>
        function (ContainerInterface $container): PluginsDashboardService {
            return new PluginsDashboardService(
                $container->get(AbstractDependencies::PLUGINS_DASHBOARD_CONTROLLER),
                $container->get(AbstractDependencies::ADMIN_MENU_SERVICE)
            );
        },

    AbstractDependencies::DEV_COMPONENTS_SHOWCASE_SERVICE =>
        function (ContainerInterface $container): DevComponentsShowcaseService {
            return new DevComponentsShowcaseService(
                $container->get(AbstractDependencies::DEV_COMPONENTS_SHOWCASE_CONTROLLER)
            );
        },

    // Presentation Services
    AbstractDependencies::MAIN_MENU_CONTROLLER =>
        function (ContainerInterface $container): MainMenuController {
            return new MainMenuController(
                $container->get(AbstractDependencies::ADMIN_MENU_SERVICE)
            );
        },

    AbstractDependencies::PLUGINS_DASHBOARD_CONTROLLER =>
        function (ContainerInterface $container): PluginsDashboardController {
            return new PluginsDashboardController(
                $container->get(AbstractDependencies::HOOKS_SERVICE),
                $container->get(AbstractDependencies::VIEW_SERVICE),
                $container->get(AbstractDependencies::ADMIN_MENU_SERVICE),
                $container->get(AbstractDependencies::ASSET_SERVICE),
                $container->get(AbstractDependencies::SECURITY_SERVICE)
            );
        },

    AbstractDependencies::DEV_COMPONENTS_SHOWCASE_CONTROLLER =>
        function (ContainerInterface $container): DevComponentsShowcaseController {
            return new DevComponentsShowcaseController(
                $container->get(AbstractDependencies::HOOKS_SERVICE),
                $container->get(AbstractDependencies::VIEW_SERVICE),
                $container->get(AbstractDependencies::ADMIN_MENU_SERVICE),
                $container->get(AbstractDependencies::ASSET_SERVICE)
            );
        },

    // Adapters
    AbstractDependencies::ADMIN_MENU_ADAPTER =>
        function (ContainerInterface $container): AdminMenuAdapterInterface {
            return new WordPressAdminMenuAdapter();
        },
];
