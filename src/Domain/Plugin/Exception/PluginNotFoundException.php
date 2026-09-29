<?php

/**
 * Plugin not found exception.
 *
 * @package PublishPress\Hub\Domain\Plugin\Exception
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

defined('ABSPATH') || exit;

use PublishPress\Hub\Domain\Exception\Base\DomainException;
use PublishPress\Hub\Domain\Exception\ExceptionCode;

class PluginNotFoundException extends DomainException
{
    /**
     * @param array<string, mixed> $context Optional context information
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct(
            esc_html__(
                'Plugin not found in our available plugins list. Please contact support for help.', // phpcs:ignore Generic.Files.LineLength
                'publishpress-hub'
            ),
            ExceptionCode::PLUGIN_NOT_FOUND,
            $context
        );
    }
}
