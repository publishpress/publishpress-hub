<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Security;

use PublishPress\Hub\Infrastructure\Security\Contract\SecurityServiceInterface;

class WordPressSecurityAdapter implements SecurityServiceInterface
{
    /**
     * @param string|int $action
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
     * @param string|int $action
     * @return int|false
     */
    public function verifyNonce(string $nonce, $action = -1)
    {
        return wp_verify_nonce($nonce, $action);
    }

    /**
     * @param string|int $action
     */
    public function getNonceField($action = -1, $name = '_wpnonce', $referer = true, $display = true): string
    {
        return wp_nonce_field($action, $name, $referer, $display);
    }

    /**
     * @param string|int $action
     */
    public function getNonceUrl(string $actionurl, $action = -1, string $name = '_wpnonce'): string
    {
        return wp_nonce_url($actionurl, $action, $name);
    }

    public function getRefererField(bool $display = true): string
    {
        return wp_referer_field($display);
    }

    /**
     * @param string|int $action
     * @param false|string $queryArg
     * @return int|false
     */
    public function checkAjaxReferer($action = -1, $queryArg = false, bool $stop = true)
    {
        return check_ajax_referer($action, $queryArg, $stop);
    }
}
