<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Security;

use PublishPress\Hub\Infrastructure\Security\Contract\SecurityServiceInterface;
use WP_User;

class WordPressSecurityAdapter implements SecurityServiceInterface
{
    /**
     * @param -1|string $action
     */
    public function createNonce($action = -1): string
    {
        return wp_create_nonce($action);
    }

    public function createNonceForRest(): string
    {
        return $this->createNonce('wp_rest');
    }

    /**
     * @param -1|string $action
     * @return int|false
     */
    public function verifyNonce(string $nonce, $action = -1)
    {
        return wp_verify_nonce($nonce, $action);
    }

    /**
     * @param -1|string $action
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
     * @param -1|string $action
     */
    public function getNonceUrl(string $actionurl, $action = -1, string $name = '_wpnonce'): string
    {
        return wp_nonce_url($actionurl, $action, $name);
    }

    public function getRefererField(bool $display = true): string
    {
        $referer_field = wp_referer_field(false);

        if ($display) {
            echo $referer_field;
        }

        return $referer_field;
    }

    /**
     * @param -1|string $action
     * @param false|string $queryArg
     * @return int|false
     */
    public function checkAjaxReferer($action = -1, $queryArg = false, bool $stop = true)
    {
        return check_ajax_referer($action, $queryArg, $stop);
    }

    /**
     * @param int|WP_User|null $user
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
