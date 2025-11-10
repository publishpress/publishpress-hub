<?php

/**
 * Not found exception.
 *
 * @package PublishPress\Hub\Infrastructure\Container\Exception
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container\Exception;

use PublishPress\Hub\Domain\Exception\ExceptionCode;
use PublishPress\Hub\Infrastructure\Exception\Base\InfrastructureException;
use PublishPress\Psr\Container\NotFoundExceptionInterface;

class NotFoundException extends InfrastructureException implements NotFoundExceptionInterface
{
    /**
     * @param string $message The exception message.
     * @param array<string, mixed> $context Optional context information.
     * @since 1.0.0
     */
    public function __construct(string $message = 'Service not found in container.', array $context = [])
    {
        parent::__construct(
            $message,
            ExceptionCode::CONTAINER_NOT_FOUND,
            $context
        );
    }
}
