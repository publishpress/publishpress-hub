<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\RestApi\Contracts;

use PublishPress\Hub\Domain\Plugin\Contracts\PluginFamilyInterface;

/**
 * Maps PluginFamily domain objects to DTOs for API responses.
 *
 * @since 1.0.0
 */
interface PluginFamilyDtoMapperInterface
{
    /**
     * Map a plugin family to a DTO.
     *
     * @param PluginFamilyInterface $pluginFamily
     * @return DtoInterface
     */
    public function toDto(PluginFamilyInterface $pluginFamily): DtoInterface;

    /**
     * Map an array of plugin families to DTOs.
     *
     * @param PluginFamilyInterface[] $pluginFamilies
     * @return DtoInterface[]
     */
    public function toDtoArray(array $pluginFamilies): array;

    /**
     * Convert DTO array to serializable array.
     *
     * @param DtoInterface[] $dtos
     * @return array
     */
    public function toSerializableArray(array $dtos): array;
}
