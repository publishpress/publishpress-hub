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

use Exception;
use PublishPress\Psr\Container\NotFoundExceptionInterface;

class NotFoundException extends Exception implements NotFoundExceptionInterface
{
}
