<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Exception\Contract;

use Exception;

interface WithContextInterface
{
    public function getContext(): array;

    public function hasContext(): bool;

    public function getMessage(): string;

    /**
     * @return int|string
     */
    public function getCode();
}
