<?php

/**
 * Security service interface.
 *
 * @package PublishPress\Hub\Infrastructure\Security\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Security\Contract;

use WP_User;

interface SecurityServiceInterface
{
    /**
     * Create a nonce.
     *
     * @param string|int $action The action.
     * @return string The nonce.
     * @since 1.0.0
     */
    public function createNonce($action = -1): string;

    /**
     * Create a nonce for REST.
     *
     * @return string The nonce.
     * @since 1.0.0
     */
    public function createNonceForRest(): string;

    /**
     * Verify a nonce.
     *
     * @param string $nonce The nonce.
     * @param string|int $action The action.
     * @return int|false The result.
     * @since 1.0.0
     */
    public function verifyNonce(string $nonce, $action = -1);

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
    public function getNonceField($action = -1, string $name = '_wpnonce', bool $referer = true, bool $display = true): string;

    /**
     * Get a nonce URL.
     *
     * @param string $actionurl The action URL.
     * @param string|int $action The action.
     * @param string $name The name.
     * @return string The nonce URL.
     * @since 1.0.0
     */
    public function getNonceUrl(string $actionurl, $action = -1, string $name = '_wpnonce'): string;

    /**
     * Get a referer field.
     *
     * @param bool $display The display.
     * @return string The referer field.
     * @since 1.0.0
     */
    public function getRefererField(bool $display = true): string;

    /**
     * Check an AJAX referer.
     *
     * @param string|int $action The action.
     * @param bool $queryArg The query argument.
     * @param bool $stop The stop.
     * @return int|false The result.
     * @since 1.0.0
     */
    public function checkAjaxReferer($action = -1, bool $queryArg = false, bool $stop = true);

    /**
     * Check if a user can do a capability.
     *
     * @param string $capability The capability.
     * @param int|WP_User|null $user The user.
     * @return bool True if the user can do the capability, false otherwise.
     * @since 1.0.0
     */
    public function userCan(string $capability, $user = null): bool;
}
