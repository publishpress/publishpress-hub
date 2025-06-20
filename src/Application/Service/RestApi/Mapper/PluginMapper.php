<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\RestApi\Mapper;

use PublishPress\Hub\Application\Service\RestApi\Contracts\DtoInterface;
use PublishPress\Hub\Application\Service\RestApi\Contracts\PluginMapperInterface;
use PublishPress\Hub\Application\Service\RestApi\Dto\PluginDto;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginInterface;

/**
 * Maps Plugin domain objects to DTOs for API responses.
 *
 * @since 1.0.0
 */
class PluginMapper implements PluginMapperInterface
{
    /**
     * Map a single plugin to DTO.
     *
     * @param PluginInterface $plugin
     * @return DtoInterface
     */
    public function toDto(PluginInterface $plugin): DtoInterface
    {
        return new PluginDto(
            $plugin->getSlugFree(),
            $plugin->getSlugPro(),
            $plugin->getName(),
            $plugin->getVersion(),
            $plugin->isInstalled(),
            $plugin->isActive(),
            $plugin->isLicensed(),
            $plugin->isPro(),
            $plugin->getIconFile(),
            $plugin->getDescription()
        );
    }

    /**
     * Map an array of plugins to DTOs.
     *
     * @param PluginInterface[] $plugins
     * @return DtoInterface[]
     */
    public function toDtoArray(array $plugins): array
    {
        return array_map([$this, 'toDto'], $plugins);
    }

    /**
     * Convert DTO array to serializable array.
     *
     * @param DtoInterface[] $dtos
     * @return array
     */
    public function toSerializableArray(array $dtos): array
    {
        return array_map(fn(PluginDto $dto) => $dto->toArray(), $dtos);
    }
}
