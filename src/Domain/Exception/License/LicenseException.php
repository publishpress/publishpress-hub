<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Exception\License;

use PublishPress\Hub\Domain\Exception\ContextTrait;
use PublishPress\Hub\Domain\Exception\DomainException;

/**
 * Base exception for license-related business rule violations.
 *
 * @since 1.0.0
 */
abstract class LicenseException extends DomainException
{
    use ContextTrait;

    /**
     * @since 1.0.0
     */
    public function __construct(string $message, array $context = [])
    {
        parent::__construct($message);
        $this->setContext($context);
    }
}
