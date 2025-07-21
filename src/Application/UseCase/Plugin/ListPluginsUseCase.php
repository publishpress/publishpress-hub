<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\DTO\Plugin\PluginFamilyDto;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Entity\PluginFamily;

class ListPluginsUseCase
{
    private PluginFamilyRepositoryInterface $pluginFamilyRepository;

    public function __construct(PluginFamilyRepositoryInterface $pluginFamilyRepository)
    {
        $this->pluginFamilyRepository = $pluginFamilyRepository;
    }

    public function execute(): array
    {
        $plugins = $this->pluginFamilyRepository->getAllFamilies();

        $pluginDtos = [];

        /** @var PluginFamily $plugin */
        foreach ($plugins as $plugin) {
            $dto = new PluginFamilyDto($plugin);

            $freePlugin = $plugin->getFreePlugin();
            $proPlugin = $plugin->getProPlugin();

            $dto->setName($plugin->getName())
                ->setSlug($plugin->getSlug())
                ->setIconPath($plugin->getIconPath())
                ->setDescription($plugin->getDescription())
                ->setChangelogUrl($plugin->getChangelogUrl())
                ->setFreePluginName($freePlugin->getName())
                ->setFreePluginSlug($freePlugin->getSlug())
                ->setFreePluginVersion($freePlugin->getVersion())
                ->setFreePluginDetailsUrl($freePlugin->getDetailsUrl())
                ->setFreePluginIsInstalled($freePlugin->isInstalled())
                ->setFreePluginIsActive($freePlugin->isActive())
                ->setFreePluginPath($freePlugin->getPath())
                ->setProPluginName($proPlugin->getName())
                ->setProPluginSlug($proPlugin->getSlug())
                ->setProPluginVersion($proPlugin->getVersion())
                ->setProPluginDetailsUrl($proPlugin->getDetailsUrl())
                ->setProPluginIsInstalled($proPlugin->isInstalled())
                ->setProPluginIsActive($proPlugin->isActive())
                ->setProPluginIsLicensed($proPlugin->isLicensed())
                ->setProPluginPath($proPlugin->getPath())
                ->setIsAnyVersionInstalled($plugin->hasAnyVersionInstalled())
                ->setIsAnyVersionActive($plugin->hasAnyVersionActive())
                ->setHasConflictingInstallations($plugin->hasConflictingInstallations());

            $pluginDtos[] = $dto;
        }

        return [
            'plugins' => $pluginDtos,
        ];
    }
}
