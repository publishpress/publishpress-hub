<?php

declare(strict_types=1);

/**
 * Container NotFoundException for PSR-11 compliance.
 *
 * @package PublishPress\Hub\Infrastructure\Container
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

namespace PublishPress\Hub\Infrastructure\Container;

use Exception;
use PublishPress\Psr\Container\NotFoundExceptionInterface;

/**
 * Exception thrown when a service is not found in the container.
 * Implements PSR-11 NotFoundExceptionInterface for container compliance.
 *
 * @since 1.0.0
 */
class NotFoundException extends Exception implements NotFoundExceptionInterface
{
    /**
     * @since 1.0.0
     */
    public function __construct(string $message = '', int $code = 0, ?Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
