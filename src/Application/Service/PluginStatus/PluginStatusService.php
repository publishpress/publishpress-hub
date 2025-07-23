<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\PluginStatus;

use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginInterface;
use PublishPress\Hub\Infrastructure\WordPress\Plugin\WordPressPluginStatusAdapter;

/**
 * Application service responsible for managing plugin status across the system.
 *
 * This service centralizes the logic for updating plugin status from WordPress,
 * ensuring consistent state across all use cases and avoiding code duplication.
 *
 * @since 1.0.0
 */
class PluginStatusService
{
    private WordPressPluginStatusAdapter $pluginStatusAdapter;
    private PluginFamilyRepositoryInterface $pluginFamilyRepository;

    public function __construct(
        WordPressPluginStatusAdapter $pluginStatusAdapter,
        PluginFamilyRepositoryInterface $pluginFamilyRepository
    ) {
        $this->pluginStatusAdapter = $pluginStatusAdapter;
        $this->pluginFamilyRepository = $pluginFamilyRepository;
    }

    /**
     * Updates status for all plugin families from WordPress.
     *
     * This method fetches fresh status information from WordPress
     * and updates all plugin entities accordingly.
     */
    public function updateAllPluginStatuses(): void
    {
        $families = $this->pluginFamilyRepository->getAllFamilies();

        foreach ($families as $family) {
            $this->updatePluginFamilyStatus($family);
        }
    }

    /**
     * Updates status for a specific plugin family.
     *
     * @param PluginFamilyInterface $family The plugin family to update
     */
    public function updatePluginFamilyStatus(PluginFamilyInterface $family): void
    {
        $freePlugin = $family->getFreePlugin();
        $proPlugin = $family->getProPlugin();

        $this->updatePluginStatus($freePlugin);
        $this->updatePluginStatus($proPlugin);
    }

    /**
     * Updates status for a specific plugin family by slug.
     *
     * @param string $familySlug The slug of the plugin family to update
     * @return PluginFamilyInterface|null The updated family or null if not found
     */
    public function updatePluginFamilyStatusBySlug(string $familySlug): ?PluginFamilyInterface
    {
        $family = $this->pluginFamilyRepository->findFamilyBySlug($familySlug);

        if (!$family) {
            return null;
        }

        $this->updatePluginFamilyStatus($family);

        return $family;
    }

    /**
     * Updates status for a specific plugin.
     *
     * @param PluginInterface $plugin The plugin to update
     */
    public function updatePluginStatus(PluginInterface $plugin): void
    {
        $isInstalled = $this->pluginStatusAdapter->checkIfPluginIsInstalled($plugin);
        $isActive = $this->pluginStatusAdapter->checkIfPluginIsActive($plugin);
        $version = $this->pluginStatusAdapter->getPluginVersion($plugin);

        $plugin->setInstalled($isInstalled, $version);
        $plugin->setActive($isActive);
    }

    /**
     * Gets a plugin family with updated status information.
     *
     * This is a convenience method that fetches a family and ensures
     * its status is current before returning it.
     *
     * @param string $familySlug The slug of the plugin family
     * @return PluginFamilyInterface|null The family with updated status or null if not found
     */
    public function getPluginFamilyWithUpdatedStatus(string $familySlug): ?PluginFamilyInterface
    {
        return $this->updatePluginFamilyStatusBySlug($familySlug);
    }

    /**
     * Gets all plugin families with updated status information.
     *
     * This is a convenience method that fetches all families and ensures
     * their status is current before returning them.
     *
     * @return array Array of PluginFamilyInterface objects with updated status
     */
    public function getAllPluginFamiliesWithUpdatedStatus(): array
    {
        $this->updateAllPluginStatuses();
        return $this->pluginFamilyRepository->getAllFamilies();
    }
}
