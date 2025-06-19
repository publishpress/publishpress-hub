<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\RestApi\Contracts;

use PublishPress\Hub\Domain\Plugin\Contracts\PluginInterface;

interface PluginMapperInterface
{
    public function toDto(PluginInterface $plugin): DtoInterface;

    public function toDtoArray(array $plugins): array;

    public function toSerializableArray(array $dtos): array;
}
