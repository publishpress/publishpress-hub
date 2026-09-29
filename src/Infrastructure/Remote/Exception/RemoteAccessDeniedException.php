<?php

/**
 * Remote access denied exception.
 *
 * @package PublishPress\Hub\Infrastructure\Remote\Exception
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Remote\Exception;

defined('ABSPATH') || exit;

use PublishPress\Hub\Domain\Exception\ExceptionCode;
use PublishPress\Hub\Infrastructure\Exception\Base\InfrastructureException;

class RemoteAccessDeniedException extends InfrastructureException
{
    /**
     * @param array<string, mixed> $context The context.
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct(
            esc_html__(
                'The license server denied this request. This can happen when a license key or site has been blocked. Please contact PublishPress support for help.', // phpcs:ignore Generic.Files.LineLength
                'publishpress-hub'
            ),
            ExceptionCode::REMOTE_ACCESS_DENIED,
            $context
        );
    }
}
