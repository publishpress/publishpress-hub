<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\DTO\Plugin\PluginFamilyDto;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;

class ListPluginsUseCase
{
    private PluginFamilyRepositoryInterface $pluginFamilyRepository;

    public function __construct(PluginFamilyRepositoryInterface $pluginFamilyRepository)
    {
        $this->pluginFamilyRepository = $pluginFamilyRepository;
    }

    public function execute(): array
    {
        $families = $this->pluginFamilyRepository->getAllFamilies();

        $plugins = [];

        /** @var PluginFamilyInterface $family */
        foreach ($families as $family) {
            $freePlugin = $family->getFreePlugin();
            $proPlugin = $family->getProPlugin();

            $dto = new PluginFamilyDto();
            $dto->setName($family->getName())
                ->setSlug($family->getSlug())
                ->setIconPath($family->getIconPath())
                ->setDescription($family->getDescription())
                ->setChangelogUrl($family->getChangelogUrl())
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
                ->setIsAnyVersionInstalled($family->hasAnyVersionInstalled())
                ->setIsAnyVersionActive($family->hasAnyVersionActive())
                ->setHasConflictingInstallations($family->hasConflictingInstallations());

            $plugins[] = $dto->toArray();
        }

        return [
            'plugins' => $plugins,
        ];
    }
}
