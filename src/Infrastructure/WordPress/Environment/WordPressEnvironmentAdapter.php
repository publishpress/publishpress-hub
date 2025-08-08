<?php

/**
 * WordPress environment adapter.
 *
 * @package PublishPress\Hub\Infrastructure\WordPress\Environment
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Environment;

use PublishPress\Hub\Infrastructure\Environment\Contract\EnvironmentServiceInterface;

class WordPressEnvironmentAdapter implements EnvironmentServiceInterface
{
    /**
     * {@inheritdoc}
     */
    public function isAdminArea(): bool
    {
        if (! function_exists('is_admin')) {
            return false;
        }

        return is_admin();
    }
}
