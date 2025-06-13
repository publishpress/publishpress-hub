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
use PublishPress\Hub\Domain\Plugin\PluginRepository;
use PublishPress\Hub\Infrastructure\Container\Contracts\ServiceContainerInterface;
use PublishPress\Hub\Infrastructure\Logger\Logger;
use PublishPress\Hub\Infrastructure\Container\HubServiceCollectionProvider;

return [
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
        return new AdminMenuService();
    },

    Services::LANGUAGE_SERVICE => function (ServiceContainerInterface $container) {
        return new LanguageService();
    },
];
