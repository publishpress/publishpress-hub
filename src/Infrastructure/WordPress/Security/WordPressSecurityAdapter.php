<?php

/**
 * WordPress security adapter.
 *
 * @package PublishPress\Hub\Infrastructure\WordPress\Security
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Security;

use PublishPress\Hub\Infrastructure\Security\Contract\SecurityServiceInterface;
use WP_User;

class WordPressSecurityAdapter implements SecurityServiceInterface
{
    /**
     * Create a nonce.
     *
     * @param -1|string $action The action.
     * @return string The nonce.
     * @since 1.0.0
     */
    public function createNonce($action = -1): string
    {
        return wp_create_nonce($action);
    }

    /**
     * Create a nonce for REST.
     *
     * @return string The nonce.
     * @since 1.0.0
     */
    public function createNonceForRest(): string
    {
        return $this->createNonce('wp_rest');
    }

    /**
     * Verify a nonce.
     *
     * @param string $nonce The nonce.
     * @param string|int $action The action.
     * @return int|false The result.
     * @since 1.0.0
     */
    public function verifyNonce(string $nonce, $action = -1)
    {
        return wp_verify_nonce($nonce, $action);
    }

    /**
     * Get a nonce field.
     *
     * @param string|int $action The action.
     * @param string $name The name.
     * @param bool $referer The referer.
     * @param bool $display The display.
     * @return string The nonce field.
     * @since 1.0.0
     */
    public function getNonceField(
        $action = -1,
        string $name = '_wpnonce',
        bool $referer = true,
        bool $display = true
    ): string {
        $nonce_field = wp_nonce_field($action, $name, $referer, false);

        if ($display) {
            echo $nonce_field;
        }

        return $nonce_field;
    }

    /**
     * Get a nonce URL.
     *
     * @param string $actionurl The action URL.
     * @param string|int $action The action.
     * @param string $name The name.
     * @return string The nonce URL.
     * @since 1.0.0
     */
    public function getNonceUrl(string $actionurl, $action = -1, string $name = '_wpnonce'): string
    {
        return wp_nonce_url($actionurl, $action, $name);
    }

    /**
     * Get a referer field.
     *
     * @param bool $display The display.
     * @return string The referer field.
     * @since 1.0.0
     */
    public function getRefererField(bool $display = true): string
    {
        $referer_field = wp_referer_field(false);

        if ($display) {
            echo $referer_field;
        }

        return $referer_field;
    }

    /**
     * Check an AJAX referer.
     *
     * @param string|int $action The action.
     * @param bool $queryArg The query argument.
     * @param bool $stop The stop.
     * @return int|false The result.
     * @since 1.0.0
     */
    public function checkAjaxReferer($action = -1, $queryArg = false, bool $stop = true)
    {
        return check_ajax_referer($action, $queryArg, $stop);
    }

    /**
     * Check if a user can do a capability.
     *
     * @param string $capability The capability.
     * @param int|WP_User|null $user The user.
     * @return bool True if the user can do the capability, false otherwise.
     * @since 1.0.0
     */
    public function userCan(string $capability, $user = null): bool
    {
        if (empty($user)) {
            $user = get_current_user_id();
        }

        if (is_int($user)) {
            $user = get_user_by('id', $user);
        }

        if (!$user instanceof WP_User) {
            return false;
        }

        return $user->has_cap($capability);
    }
}
