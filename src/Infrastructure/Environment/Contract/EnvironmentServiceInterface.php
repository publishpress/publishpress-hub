<?php

/**
 * Environment service contract.
 *
 * @package PublishPress\Hub\Infrastructure\Environment\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Environment\Contract;

interface EnvironmentServiceInterface
{
    /**
     * Determines whether the current request is in the WordPress admin area.
     *
     * @since 1.0.0
     */
    public function isAdminArea(): bool;
}
