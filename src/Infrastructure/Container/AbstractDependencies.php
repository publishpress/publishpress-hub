<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container;

/**
 * Container dependency identifiers.
 *
 * These are the keys used to register and retrieve services from the container.
 * They should be descriptive and follow a consistent naming pattern.
 */
abstract class AbstractDependencies
{
    // Constants
    public const PLUGIN_PATH = 'publishpress-hub.constants.plugin_path';

    public const PLUGIN_TEXT_DOMAIN = 'publishpress-hub.constants.plugin_text_domain';

    public const PLUGIN_LANGUAGE_PATH = 'publishpress-hub.constants.plugin_language_path';

    public const PLUGIN_URL = 'publishpress-hub.constants.plugin_url';

    public const PLUGIN_ASSETS_PATH = 'publishpress-hub.constants.plugin_assets_path';

    public const PLUGIN_ASSETS_URL = 'publishpress-hub.constants.plugin_assets_url';

    public const PLUGIN_VENDOR_PATH = 'publishpress-hub.constants.plugin_vendor_path';

    public const PLUGIN_SRC_PATH = 'publishpress-hub.constants.plugin_src_path';

    public const PLUGIN_VERSION = 'publishpress-hub.constants.plugin_version';

    public const PLUGIN_LANGUAGES_PATH = 'publishpress-hub.constants.plugin_languages_path';

    public const PLUGIN_TEMPLATES_PATH = 'publishpress-hub.constants.plugin_templates_path';

    public const SCRIPT_DEBUG = 'publishpress-hub.constants.script_debug';

    // Infrastructure Services
    public const HOOKS_SERVICE = 'publishpress-hub.infrastructure.hooks.service';

    public const I18N_SERVICE = 'publishpress-hub.infrastructure.i18n.service';

    public const ASSET_SERVICE = 'publishpress-hub.infrastructure.asset.service';

    public const LOGGER_SERVICE = 'publishpress-hub.infrastructure.logger.service';

    // Application Services
    public const APPLICATION_BOOTSTRAP_SERVICE = 'publishpress-hub.application.bootstrap.service';
}
