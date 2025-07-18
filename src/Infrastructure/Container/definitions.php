<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container;

use PublishPress\Psr\Container\ContainerInterface;
use PublishPress\Hub\Infrastructure\WordPress\Hooks\WordPressHooksAdapter;
use PublishPress\Hub\Application\Service\ApplicationBootstrapService;
use PublishPress\Hub\Infrastructure\Asset\Contract\AssetServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;
use PublishPress\Hub\Infrastructure\I18n\Contract\I18nServiceInterface;
use PublishPress\Hub\Infrastructure\Logger\Contract\LoggerInterface;
use PublishPress\Hub\Infrastructure\Logger\Logger;
use PublishPress\Hub\Infrastructure\WordPress\Asset\WordPressAssetAdapter;
use PublishPress\Hub\Infrastructure\WordPress\I18n\WordPressI18nAdapter;

return [
    AbstractDependencies::PLUGIN_PATH => PUBLISHPRESS_HUB_PATH,

    AbstractDependencies::PLUGIN_TEXT_DOMAIN => 'publishpress-hub',

    AbstractDependencies::PLUGIN_LANGUAGE_PATH => 'languages',

    AbstractDependencies::PLUGIN_URL => PUBLISHPRESS_HUB_URL,

    AbstractDependencies::PLUGIN_ASSETS_PATH => PUBLISHPRESS_HUB_ASSETS_PATH,

    AbstractDependencies::PLUGIN_ASSETS_URL => PUBLISHPRESS_HUB_ASSETS_URL,

    AbstractDependencies::PLUGIN_VENDOR_PATH => PUBLISHPRESS_HUB_VENDOR_PATH,

    AbstractDependencies::PLUGIN_SRC_PATH => PUBLISHPRESS_HUB_SRC_PATH,

    AbstractDependencies::PLUGIN_VERSION => PUBLISHPRESS_HUB_VERSION,

    AbstractDependencies::PLUGIN_LANGUAGES_PATH => PUBLISHPRESS_HUB_LANGUAGES_PATH,

    AbstractDependencies::PLUGIN_TEMPLATES_PATH => PUBLISHPRESS_HUB_TEMPLATES_PATH,

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
                $container->get(AbstractDependencies::PLUGIN_PATH),
                $container->get(AbstractDependencies::PLUGIN_LANGUAGE_PATH),
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
            ]
            );
        },

    // Application Services
    AbstractDependencies::APPLICATION_BOOTSTRAP_SERVICE =>
        function (ContainerInterface $container): ApplicationBootstrapService {
            return new ApplicationBootstrapService(
                $container->get(AbstractDependencies::HOOKS_SERVICE)
            );
        },
];
