<?php declare(strict_types=1);
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

namespace PublishPress\Hub;

abstract class ServicesList
{
    public const ERROR_LOGGER = 'publishpress-hub/error-logger';

    public const HUB_SERVICE = 'publishpress-hub/hub-service';
}
