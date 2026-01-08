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
            'Remote access denied.',
            ExceptionCode::REMOTE_ACCESS_DENIED,
            $context
        );
    }
}
