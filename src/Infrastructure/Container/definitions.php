<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container;

use PublishPress\Psr\Container\ContainerInterface;
use PublishPress\Hub\Infrastructure\WordPress\WordPressHooksAdapter;
use PublishPress\Hub\Application\Service\ApplicationBootstrapService;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;

return [
    // WordPress Infrastructure Services
    AbstractDependencies::HOOKS_SERVICE =>
        function (ContainerInterface $container): HooksServiceInterface {
            return new WordPressHooksAdapter();
        },

    // Application Services
    AbstractDependencies::APPLICATION_BOOTSTRAP_SERVICE =>
        function (ContainerInterface $container): ApplicationBootstrapService {
            return new ApplicationBootstrapService(
                $container->get(AbstractDependencies::HOOKS_SERVICE)
            );
        },
];
