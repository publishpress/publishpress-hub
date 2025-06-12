<?php

/**
 * Domain hooks for the PublishPress Hub library.
 *
 * This class defines all domain-specific hooks that represent business events
 * and domain operations following Domain Driven Development principles.
 *
 * @package PublishPress\Hub\Domain
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Domain;

/**
 * Domain hooks container.
 *
 * Contains hooks that represent domain events and business operations.
 * These hooks are typically used for domain event publishing and
 * business rule coordination.
 *
 * @since 1.0.0
 */
abstract class Hooks
{
    /**
     * Hook fired when a plugin is registered in the hub.
     *
     * @since 1.0.0
     */
    public const ACTION_PLUGIN_REGISTERED = 'publishpress_hub_plugin_registered';

    /**
     * Hook fired before a plugin is registered.
     *
     * @since 1.0.0
     */
    public const ACTION_BEFORE_PLUGIN_REGISTER = 'publishpress_hub_before_plugin_register';

    /**
     * Hook fired when plugin registration fails.
     *
     * @since 1.0.0
     */
    public const ACTION_PLUGIN_REGISTRATION_FAILED = 'publishpress_hub_plugin_registration_failed';

    /**
     * Filter to modify plugin data before registration.
     *
     * @since 1.0.0
     */
    public const FILTER_PLUGIN_DATA = 'publishpress_hub_plugin_data';
}
