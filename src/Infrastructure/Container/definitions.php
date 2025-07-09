<?php

/**
 * Service definitions for the PublishPress Hub library.
 *
 * This file defines all service bindings and dependency injection configurations
 * following Domain Driven Development principles.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container;

use PublishPress\Hub\Application\Service\AdminMenuService;
use PublishPress\Hub\Application\Service\CoreHubService;
use PublishPress\Hub\Application\Service\LanguageService;
use PublishPress\Hub\Application\Service\EDDLicenseService;
use PublishPress\Hub\Application\Service\PluginFamilyBootstrapService;
use PublishPress\Hub\Application\Service\PluginInstallationService;
use PublishPress\Hub\Application\Service\RestApi\ExceptionResponseMapper;
use PublishPress\Hub\Application\Service\RestApi\Mapper\PluginFamilyDtoMapper;
use PublishPress\Hub\Application\Service\RestApiService;
use PublishPress\Hub\Application\Service\WpOrgPluginsService;
use PublishPress\Hub\Application\View\Admin\ComponentsShowcaseView;
use PublishPress\Hub\Application\View\Admin\PluginsDashboardView;
use PublishPress\Hub\Domain\Plugin\PluginFamilyRepository;
use PublishPress\Hub\Infrastructure\Asset\AssetManager;
use PublishPress\Hub\Infrastructure\Container\Contracts\ServiceContainerInterface;
use PublishPress\Hub\Infrastructure\Logger\Logger;
use PublishPress\Hub\Infrastructure\Container\HubServiceCollectionProvider;

return [
    Services::CONST_TEXT_DOMAIN => 'publishpress-hub',
    Services::CONST_ASSETS_URL => PUBLISHPRESS_HUB_ASSETS_URL,
    Services::CONST_VERSION => PUBLISHPRESS_HUB_VERSION,
    Services::CONST_IS_DEVELOPMENT => defined('SCRIPT_DEBUG') && SCRIPT_DEBUG,
    Services::CONST_STORE_URL => 'https://publishpress.com',
    Services::CONST_HOME_URL => home_url(),

    Services::LOGGER => function (ServiceContainerInterface $container) {
        return new Logger();
    },

    Services::HUB_SERVICE_COLLECTION => function (ServiceContainerInterface $container) {
        return (new HubServiceCollectionProvider())($container);
    },

    Services::CORE_HUB_SERVICE => function (ServiceContainerInterface $container) {
        return new CoreHubService(
            $container->get(Services::PLUGIN_FAMILY_REPOSITORY),
            $container->get(Services::HUB_SERVICE_COLLECTION)
        );
    },

    Services::PLUGIN_FAMILY_REPOSITORY => function (ServiceContainerInterface $container) {
        return new PluginFamilyRepository();
    },

    Services::PLUGIN_FAMILY_BOOTSTRAP_SERVICE => function (ServiceContainerInterface $container) {
        return new PluginFamilyBootstrapService(
            $container->get(Services::PLUGIN_FAMILY_REPOSITORY)
        );
    },

    Services::ADMIN_MENU_SERVICE => function (ServiceContainerInterface $container) {
        return new AdminMenuService(
            $container->get(Services::PLUGINS_DASHBOARD_VIEW),
            $container->get(Services::COMPONENTS_SHOWCASE_VIEW)
        );
    },

    Services::LANGUAGE_SERVICE => function (ServiceContainerInterface $container) {
        return new LanguageService(
            $container->get(Services::ASSET_MANAGER),
            $container->get(Services::CONST_TEXT_DOMAIN)
        );
    },

    Services::PLUGINS_DASHBOARD_VIEW => function (ServiceContainerInterface $container) {
        return new PluginsDashboardView(
            $container->get(Services::ASSET_MANAGER)
        );
    },

    Services::COMPONENTS_SHOWCASE_VIEW => function (ServiceContainerInterface $container) {
        return new ComponentsShowcaseView(
            $container->get(Services::ASSET_MANAGER)
        );
    },

    Services::ASSET_MANAGER => function (ServiceContainerInterface $container) {
        return new AssetManager(
            $container->get(Services::CONST_ASSETS_URL),
            $container->get(Services::CONST_VERSION),
            $container->get(Services::CONST_IS_DEVELOPMENT)
        );
    },

    Services::REST_API_SERVICE => function (ServiceContainerInterface $container) {
        return new RestApiService(
            $container->get(Services::PLUGIN_FAMILY_REPOSITORY),
            $container->get(Services::PLUGIN_FAMILY_DTO_MAPPER),
            $container->get(Services::PLUGIN_INSTALLATION_SERVICE),
            $container->get(Services::EXCEPTION_RESPONSE_MAPPER)
        );
    },

    Services::PLUGIN_FAMILY_DTO_MAPPER => function (ServiceContainerInterface $container) {
        return new PluginFamilyDtoMapper();
    },

    Services::PLUGIN_INSTALLATION_SERVICE => function (ServiceContainerInterface $container) {
        return new PluginInstallationService(
            $container->get(Services::EDD_LICENSE_SERVICE),
            $container->get(Services::WP_PLUGINS_SERVICE)
        );
    },

    Services::EXCEPTION_RESPONSE_MAPPER => function (ServiceContainerInterface $container) {
        return new ExceptionResponseMapper();
    },

    Services::EDD_LICENSE_SERVICE => function (ServiceContainerInterface $container) {
        return new EDDLicenseService(
            $container->get(Services::CONST_HOME_URL),
            $container->get(Services::CONST_STORE_URL)
        );
    },

    Services::WP_PLUGINS_SERVICE => function (ServiceContainerInterface $container) {
        return new WpOrgPluginsService();
    },
];
