<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container\Exception;

use Exception;
use PublishPress\Psr\Container\NotFoundExceptionInterface;

/**
 * @since 1.0.0
 */
class NotFoundException extends Exception implements NotFoundExceptionInterface
{
}
