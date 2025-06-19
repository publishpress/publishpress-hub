<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\RestApi\Contracts;

interface DtoInterface
{
    public function toArray(): array;
}
