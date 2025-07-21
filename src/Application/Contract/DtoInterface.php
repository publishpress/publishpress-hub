<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Contract;

interface DtoInterface
{
    public function toArray(): array;
}
