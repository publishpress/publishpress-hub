<?php

/**
 * License invalid item ID exception.
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

class LicenseInvalidItemIdException extends LicenseException
{
    /**
     * @param array<string, mixed> $context Optional context information
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct(
            esc_html__(
                'This license cannot be used for this plugin. Please contact support for help.',
                'publishpress-hub'
            ),
            ExceptionCode::LICENSE_INVALID_ITEM_ID,
            $context
        );
    }
}
