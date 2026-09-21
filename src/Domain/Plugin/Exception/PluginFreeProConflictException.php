<?php

/**
 * Plugin free pro conflict exception.
 *
 * @package PublishPress\Hub\Domain\Plugin\Exception
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;
defined( 'ABSPATH' ) || exit;

use PublishPress\Hub\Domain\Exception\Base\DomainException;
use PublishPress\Hub\Domain\Exception\ExceptionCode;

class PluginFreeProConflictException extends DomainException
{
    /**
     * @param array<string, mixed> $context Optional context information
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct(
            esc_html__(
                'This action is not possible because both free and pro versions are installed. Please uninstall one version to continue.', // phpcs:ignore Generic.Files.LineLength
                'publishpress-hub'
            ),
            ExceptionCode::PLUGIN_FREE_PRO_CONFLICT,
            $context
        );
    }
}
