<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Exception;

use PublishPress\Hub\Domain\Exception\Base\DomainException as BaseDomainException;
use PublishPress\Hub\Domain\Exception\Traits\ContextTrait;

/**
 * Base exception for license-related business rule violations.
 *
 * @since 1.0.0
 */
abstract class LicenseException extends BaseDomainException
{
}
