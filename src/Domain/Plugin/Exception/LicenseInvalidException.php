<?php

/**
 * License invalid exception.
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

use PublishPress\Hub\Domain\Exception\ExceptionCode;

class LicenseInvalidException extends LicenseException
{
    /**
     * @param array<string, mixed> $context Optional context information
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct(
            esc_html__(
                'This license key could not be activated. It may be invalid, blocked, or not authorized for this plugin. Please verify the key and contact PublishPress support if the problem continues.', // phpcs:ignore Generic.Files.LineLength
                'publishpress-hub'
            ),
            ExceptionCode::LICENSE_INVALID,
            $context
        );
    }
}
