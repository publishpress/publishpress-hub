<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Exception\Base;

use Exception;
use PublishPress\Hub\Domain\Exception\Traits\ContextTrait;

class DomainException extends Exception
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
