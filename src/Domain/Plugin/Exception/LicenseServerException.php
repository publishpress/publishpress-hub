<?php

/**
 * License server exception.
 *
 * @package PublishPress\Hub\Domain\Plugin\Exception
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

use PublishPress\Hub\Domain\Exception\ExceptionCode;

\defined('ABSPATH') || exit;

class LicenseServerException extends LicenseException
{
    /**
     * @param array<string, mixed> $context Optional context information
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct(
            esc_html__(
                'License server error. Please try again later or contact support for help.',
                'publishpress-hub'
            ),
            ExceptionCode::LICENSE_SERVER_ERROR,
            $context
        );
    }
}
