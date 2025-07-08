<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\RestApi\Mapper;

use PublishPress\Hub\Application\Service\RestApi\Contracts\DtoInterface;
use PublishPress\Hub\Application\Service\RestApi\Contracts\PluginFamilyDtoMapperInterface;
use PublishPress\Hub\Application\Service\RestApi\Dto\PluginFamilyDto;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginInterface;

/**
 * Maps Plugin domain objects to DTOs for API responses.
 *
 * @since 1.0.0
 */
class PluginFamilyDtoMapper implements PluginFamilyDtoMapperInterface
{
    /**
     * Map a single plugin family to DTO.
     *
     * @param PluginFamilyInterface $pluginFamily
     * @return DtoInterface
     */
    public function toDto(PluginFamilyInterface $pluginFamily): DtoInterface
    {
        $dto = new PluginFamilyDto();
        $dto->setSlug($pluginFamily->getSlug())
            ->setName($pluginFamily->getName())
            ->setIconPath($pluginFamily->getIconPath())
            ->setDescription($pluginFamily->getDescription())
            ->setChangelogUrl($pluginFamily->getChangelogUrl())
            ->setFreePluginName($pluginFamily->getFreePlugin()->getName())
            ->setFreePluginSlug($pluginFamily->getFreePlugin()->getSlug())
            ->setFreePluginVersion($pluginFamily->getFreePlugin()->getVersion())
            ->setFreePluginDetailsUrl($pluginFamily->getFreePlugin()->getDetailsUrl())
            ->setFreePluginIsInstalled($pluginFamily->getFreePlugin()->isInstalled())
            ->setFreePluginIsActive($pluginFamily->getFreePlugin()->isActive())
            ->setFreePluginPath($pluginFamily->getFreePlugin()->getPath())
            ->setProPluginName($pluginFamily->getProPlugin()->getName())
            ->setProPluginSlug($pluginFamily->getProPlugin()->getSlug())
            ->setProPluginVersion($pluginFamily->getProPlugin()->getVersion())
            ->setProPluginDetailsUrl($pluginFamily->getProPlugin()->getDetailsUrl())
            ->setProPluginIsInstalled($pluginFamily->getProPlugin()->isInstalled())
            ->setProPluginIsActive($pluginFamily->getProPlugin()->isActive())
            ->setProPluginIsLicensed($pluginFamily->getProPlugin()->isLicensed())
            ->setProPluginPath($pluginFamily->getProPlugin()->getPath())
            ->setIsAnyVersionInstalled($pluginFamily->hasAnyVersionInstalled())
            ->setIsAnyVersionActive($pluginFamily->hasAnyVersionActive())
            ->setHasConflictingInstallations($pluginFamily->hasConflictingInstallations());

        return $dto;
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
        return array_map(fn(PluginFamilyDto $dto) => $dto->toArray(), $dtos);
    }
}
