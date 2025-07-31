<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\DTO\Plugin\PluginFamilyDto;
use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\ProPluginInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;
use WP_REST_Request;

class ListPluginsUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;

    private LicensePersistenceInterface $licensePersistence;

    public function __construct(
        PluginStatusService $pluginStatusService,
        LicensePersistenceInterface $licensePersistence
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->licensePersistence = $licensePersistence;
    }

    public function execute(WP_REST_Request $request): array
    {
        // Get all plugin families with updated status from WordPress
        $families = $this->pluginStatusService->getAllPluginFamiliesWithUpdatedStatus();

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

            $pluginData = $dto->toArray();

            $licenseKey = $this->getLicenseKey($proPlugin);
            $pluginData['proPlugin']['licenseKey'] = $licenseKey;

            $plugins[] = $pluginData;
        }

        return [
            'success' => true,
            'plugins' => $plugins,
        ];
    }

    private function getLicenseKey(ProPluginInterface $proPlugin): string
    {
        return $this->licensePersistence->getLicenseKey($proPlugin->getDownloadId()) ?? '';
    }
}
