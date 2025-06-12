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

use PublishPress\Hub\Application\Service\HubService;
use PublishPress\Hub\Domain\Plugin\PluginRepository;
use PublishPress\Hub\Infrastructure\Container\Contracts\ServiceContainerInterface;
use PublishPress\Hub\Infrastructure\WordPress\Logger\Logger;

return [
    Services::LOGGER => function (ServiceContainerInterface $container) {
        return new Logger();
    },

    Services::HUB_SERVICE => function (ServiceContainerInterface $container) {
        return new HubService(
            $container->get(Services::PLUGIN_REPOSITORY)
        );
    },

    Services::PLUGIN_REPOSITORY => function (ServiceContainerInterface $container) {
        return new PluginRepository();
    },
];
