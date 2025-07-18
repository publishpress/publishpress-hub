<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\DTO\Plugin\PluginListRequest;
use PublishPress\Hub\Application\DTO\Plugin\PluginListResponse;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Entity\PluginFamily;

class ListPluginsUseCase
{
    private PluginFamilyRepositoryInterface $pluginFamilyRepository;

    public function __construct(PluginFamilyRepositoryInterface $pluginFamilyRepository)
    {
        $this->pluginFamilyRepository = $pluginFamilyRepository;
    }

        public function execute(PluginListRequest $request): PluginListResponse
    {
        $families = $this->pluginFamilyRepository->getAllFamilies();

        $filteredFamilies = $this->filterFamilies($families, $request);
        $paginatedFamilies = $this->paginateFamilies($filteredFamilies, $request);

        $plugins = [];
        foreach ($paginatedFamilies as $family) {
            $plugins = array_merge($plugins, $this->familyToArray($family));
        }

        return new PluginListResponse(
            $plugins,
            count($filteredFamilies),
            $request->getPage(),
            $request->getPerPage()
        );
    }

    /**
     * @param PluginFamily[] $families
     */
    private function filterFamilies(array $families, PluginListRequest $request): array
    {
        $filtered = $families;

        if ($request->getFamily() !== null) {
            $filtered = array_filter($filtered, function (PluginFamily $family) use ($request) {
                return $family->getName() === $request->getFamily();
            });
        }

        if ($request->getStatus() !== null) {
            $filtered = array_filter($filtered, function (PluginFamily $family) use ($request) {
                return $this->getFamilyStatus($family) === $request->getStatus();
            });
        }

        return array_values($filtered);
    }

    /**
     * @param PluginFamily[] $families
     */
    private function paginateFamilies(array $families, PluginListRequest $request): array
    {
        $offset = ($request->getPage() - 1) * $request->getPerPage();
        return array_slice($families, $offset, $request->getPerPage());
    }

        private function familyToArray(PluginFamily $family): array
    {
        $plugins = [];

        // Add free plugin if available
        try {
            $freePlugin = $family->getFreePlugin();
            $plugins[] = [
                'id' => $freePlugin->getSlug(),
                'name' => $freePlugin->getName(),
                'slug' => $freePlugin->getSlug(),
                'version' => $freePlugin->getVersion(),
                'status' => $this->getPluginStatus($freePlugin),
                'family' => $family->getName(),
                'is_installed' => $freePlugin->isInstalled(),
                'is_active' => $freePlugin->isActive(),
                'is_licensed' => $freePlugin->isLicensed(),
                'details_url' => $freePlugin->getDetailsUrl(),
                'type' => 'free',
            ];
        } catch (\RuntimeException $e) {
            // Free plugin not available
        }

        // Add pro plugin if available
        try {
            $proPlugin = $family->getProPlugin();
            $plugins[] = [
                'id' => $proPlugin->getSlug(),
                'name' => $proPlugin->getName(),
                'slug' => $proPlugin->getSlug(),
                'version' => $proPlugin->getVersion(),
                'status' => $this->getPluginStatus($proPlugin),
                'family' => $family->getName(),
                'is_installed' => $proPlugin->isInstalled(),
                'is_active' => $proPlugin->isActive(),
                'is_licensed' => $proPlugin->isLicensed(),
                'details_url' => $proPlugin->getDetailsUrl(),
                'type' => 'pro',
            ];
        } catch (\RuntimeException $e) {
            // Pro plugin not available
        }

        return $plugins;
    }

        private function getPluginStatus($plugin): string
    {
        if ($plugin->isActive()) {
            return 'active';
        }

        if ($plugin->isInstalled()) {
            return 'installed';
        }

        return 'available';
    }

    private function getFamilyStatus(PluginFamily $family): string
    {
        if ($family->hasAnyVersionActive()) {
            return 'active';
        }

        if ($family->hasAnyVersionInstalled()) {
            return 'installed';
        }

        return 'available';
    }
}
