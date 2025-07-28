<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Remote\Exception;

use Exception;
use PublishPress\Hub\Domain\Exception\Contract\WithContextInterface;
use PublishPress\Hub\Domain\Exception\Traits\ContextTrait;

/**
 * @since 1.0.0
 */
class RemoteAccessDeniedException extends Exception implements WithContextInterface
{
    use ContextTrait;

    /**
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct('Remote access denied.');
        $this->setContext($context);
    }
}
