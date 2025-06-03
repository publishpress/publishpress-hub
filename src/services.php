<?php declare(strict_types=1);

use PublishPress\Hub\Application\Service\HubService;
use PublishPress\Hub\Infrastructure\Contracts\ServiceContainerInterface;
use PublishPress\Hub\Infrastructure\WordPress\Logger\ThrowableErrorLogger;
use PublishPress\Hub\ServicesList;

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

return [
    ServicesList::ERROR_LOGGER => function (ServiceContainerInterface $container) {
        return new ThrowableErrorLogger();
    },

    ServicesList::HUB_SERVICE => function (ServiceContainerInterface $container) {
        return new HubService();
    },
];
