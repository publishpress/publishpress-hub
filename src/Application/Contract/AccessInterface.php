<?php

/**
 * Access interface.
 *
 * @package PublishPress\Hub\Application\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Contract;
defined( 'ABSPATH' ) || exit;

interface AccessInterface
{
    /**
     * Check if the current user can view the Hub.
     *
     * @param int|\WP_User|null $user Optional user ID or WP_User object.
     * @return bool
     * @since 1.0.0
     */
    public function canUserViewHub($user = null): bool;

    /**
     * Initialize the capability and role.
     *
     * @return void
     * @since 1.0.0
     */
    public static function setupCapabilityAndRole(): void;
}
