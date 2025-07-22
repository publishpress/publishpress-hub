<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\DTO\Plugin\PluginFamilyDto;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Infrastructure\WordPress\Plugin\WordPressPluginStatusAdapter;
use WP_REST_Request;

class ListPluginsUseCase implements UseCaseInterface
{
    private PluginFamilyRepositoryInterface $pluginFamilyRepository;
    private WordPressPluginStatusAdapter $pluginStatusAdapter;

    public function __construct(
        PluginFamilyRepositoryInterface $pluginFamilyRepository,
        WordPressPluginStatusAdapter $pluginStatusAdapter
    ) {
        $this->pluginFamilyRepository = $pluginFamilyRepository;
        $this->pluginStatusAdapter = $pluginStatusAdapter;
    }

    public function execute(WP_REST_Request $request): array
    {
        $families = $this->pluginFamilyRepository->getAllFamilies();

        $plugins = [];

        /** @var PluginFamilyInterface $family */
        foreach ($families as $family) {
            $freePlugin = $family->getFreePlugin();
            $proPlugin = $family->getProPlugin();

            // Check actual WordPress status for both plugins
            $freePluginInstalled = $this->pluginStatusAdapter->checkIfPluginIsInstalled($freePlugin);
            $freePluginActive = $this->pluginStatusAdapter->checkIfPluginIsActive($freePlugin);
            $freePluginVersion = $this->pluginStatusAdapter->getPluginVersion($freePlugin);

            $proPluginInstalled = $this->pluginStatusAdapter->checkIfPluginIsInstalled($proPlugin);
            $proPluginActive = $this->pluginStatusAdapter->checkIfPluginIsActive($proPlugin);
            $proPluginVersion = $this->pluginStatusAdapter->getPluginVersion($proPlugin);

            // Update plugin entities with actual WordPress status
            $freePlugin->setInstalled($freePluginInstalled, $freePluginVersion);
            $freePlugin->setActive($freePluginActive);

            $proPlugin->setInstalled($proPluginInstalled, $proPluginVersion);
            $proPlugin->setActive($proPluginActive);

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
            'success' => true,
            'plugins' => $plugins,
        ];
    }
}
