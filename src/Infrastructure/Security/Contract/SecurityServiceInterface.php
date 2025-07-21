<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Security\Contract;

interface SecurityServiceInterface
{
    /**
     * @param string|int $action
     */
    public function createNonce($action = -1): string;

    public function createNonceForRest(): string;

    /**
     * @param string|int $action
     * @return int|false
     */
    public function verifyNonce(string $nonce, $action = -1);

    /**
     * @param string|int $action
     */
    public function getNonceField($action = -1, string $name = '_wpnonce', bool $referer = true, bool $display = true): string;

    /**
     * @param string|int $action
     */
    public function getNonceUrl(string $actionurl, $action = -1, string $name = '_wpnonce'): string;

    public function getRefererField(bool $display = true): string;

    /**
     * @param string|int $action
     * @return int|false
     */
    public function checkAjaxReferer($action = -1, bool $queryArg = false, bool $stop = true);

    /**
     * @param int|WP_User|null $user
     */
    public function userCan(string $capability, $user = null): bool;
}
