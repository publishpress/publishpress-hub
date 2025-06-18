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
use PublishPress\Hub\Application\Service\HubService;
use PublishPress\Hub\Application\Service\LanguageService;
use PublishPress\Hub\Application\View\Admin\DashboardView;
use PublishPress\Hub\Domain\Plugin\PluginRepository;
use PublishPress\Hub\Infrastructure\Asset\AssetManager;
use PublishPress\Hub\Infrastructure\Container\Contracts\ServiceContainerInterface;
use PublishPress\Hub\Infrastructure\Logger\Logger;
use PublishPress\Hub\Infrastructure\Container\HubServiceCollectionProvider;

return [
    Services::CONST_TEXT_DOMAIN => 'publishpress-hub',

    Services::LOGGER => function (ServiceContainerInterface $container) {
        return new Logger();
    },

    Services::HUB_SERVICE_COLLECTION => function (ServiceContainerInterface $container) {
        return (new HubServiceCollectionProvider())($container);
    },

    Services::HUB_SERVICE => function (ServiceContainerInterface $container) {
        return new HubService(
            $container->get(Services::PLUGIN_REPOSITORY),
            $container->get(Services::HUB_SERVICE_COLLECTION)
        );
    },

    Services::PLUGIN_REPOSITORY => function (ServiceContainerInterface $container) {
        return new PluginRepository();
    },

    Services::ADMIN_MENU_SERVICE => function (ServiceContainerInterface $container) {
        return new AdminMenuService(
            $container->get(Services::HUB_DASHBOARD_VIEW),
            $container->get(Services::ASSET_MANAGER)
        );
    },

    Services::LANGUAGE_SERVICE => function (ServiceContainerInterface $container) {
        return new LanguageService(
            $container->get(Services::ASSET_MANAGER),
            $container->get(Services::CONST_TEXT_DOMAIN)
        );
    },

    Services::HUB_DASHBOARD_VIEW => function (ServiceContainerInterface $container) {
        return new DashboardView();
    },

    Services::ASSET_MANAGER => function (ServiceContainerInterface $container) {
        $isDevelopment = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG;

        return new AssetManager(
            PUBLISHPRESS_HUB_ASSETS_URL,
            PUBLISHPRESS_HUB_VERSION,
            $isDevelopment
        );
    },
];
