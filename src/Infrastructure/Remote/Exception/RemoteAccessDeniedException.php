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

use Exception;
use PublishPress\Hub\Domain\Exception\Contract\WithContextInterface;
use PublishPress\Hub\Domain\Exception\Traits\ContextTrait;

class RemoteAccessDeniedException extends Exception implements WithContextInterface
{
    use ContextTrait;

    /**
     * @param array<string, mixed> $context The context.
     * @since 1.0.0
     */
    public function __construct(array $context = [])
    {
        parent::__construct('Remote access denied.');
        $this->setContext($context);
    }
}
