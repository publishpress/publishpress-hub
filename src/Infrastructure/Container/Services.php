<?php

/**
 * Services list for the PublishPress Hub library.
 *
 * This file defines all service bindings and dependency injection configurations
 * following Domain Driven Development principles.
 *
 * @package PublishPress\Hub
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container;

abstract class Services
{
    public const CONST_TEXT_DOMAIN = 'publishpress-hub/const-text-domain';

    public const CONST_ASSETS_URL = 'publishpress-hub/const-assets-url';

    public const CONST_VERSION = 'publishpress-hub/const-version';

    public const CONST_IS_DEVELOPMENT = 'publishpress-hub/const-is-development';

    public const CONST_STORE_URL = 'publishpress-hub/const-store-url';

    public const CONST_HOME_URL = 'publishpress-hub/const-home-url';

    public const LOGGER = 'publishpress-hub/logger';

    public const CORE_HUB_SERVICE = 'publishpress-hub/core-hub-service';

    public const PLUGIN_FAMILY_REPOSITORY = 'publishpress-hub/plugin-family-repository';

    public const ADMIN_MENU_SERVICE = 'publishpress-hub/admin-menu-service';

    public const HUB_SERVICE_COLLECTION = 'publishpress-hub/hub-service-collection';

    public const LANGUAGE_SERVICE = 'publishpress-hub/language-service';

    public const PLUGINS_DASHBOARD_VIEW = 'publishpress-hub/plugins-dashboard-view';

    public const COMPONENTS_SHOWCASE_VIEW = 'publishpress-hub/components-showcase-view';

    public const ASSET_MANAGER = 'publishpress-hub/asset-manager';

    public const REST_API_SERVICE = 'publishpress-hub/rest-api-service';

    public const PLUGIN_FAMILY_BOOTSTRAP_SERVICE = 'publishpress-hub/plugin-family-bootstrap-service';

    public const PLUGIN_FAMILY_DTO_MAPPER = 'publishpress-hub/plugin-family-dto-mapper';

    public const PLUGIN_INSTALLATION_SERVICE = 'publishpress-hub/plugin-installation-service';

    public const EXCEPTION_RESPONSE_MAPPER = 'publishpress-hub/exception-response-mapper';
}
