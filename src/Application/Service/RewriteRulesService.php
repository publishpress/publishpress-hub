<?php

/**
 * Rewrite rules service for managing WordPress rewrite rules.
 *
 * @package PublishPress\Hub\Application\Service
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

defined('ABSPATH') || exit;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;

class RewriteRulesService implements BootableInterface
{
    use BootableTrait;

    public const FLUSH_OPTION_KEY = 'publishpress_hub_flush_rewrite_rules';

    /**
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        // Hook into our custom action that fires after REST routes are registered
        add_action(
            AbstractHooks::ACTION_REST_ROUTES_REGISTERED,
            [$this, 'maybeFlushRewriteRules']
        );
    }

    /**
     * @since 1.0.0
     */
    protected function onInit(): void
    {
    }

    /**
     * Check if rewrite rules need to be flushed and flush them.
     *
     * This is called after REST routes are registered to ensure routes are
     * available before flushing. This approach ensures:
     * - Routes are guaranteed to be registered first
     * - Only flushes once after activation
     * - No performance impact from checking on every page load
     *
     * @since 1.0.0
     */
    public function maybeFlushRewriteRules(): void
    {
        if (get_option(self::FLUSH_OPTION_KEY)) {
            // Considering we are using a custom action to flush rewrite rules, we can safely ignore the WordPress VIP restricted function warning.
            // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.flush_rewrite_rules_flush_rewrite_rules
            flush_rewrite_rules();
            delete_option(self::FLUSH_OPTION_KEY);
        }
    }

    /**
     * Set the flush option to true.
     *
     * @since 1.0.0
     */
    public static function setFlushOption(): void
    {
        update_option(self::FLUSH_OPTION_KEY, true);
    }
}
