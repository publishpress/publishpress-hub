<?php

/**
 * Plugin family repository.
 *
 * @package PublishPress\Hub\Domain\Plugin\Repository
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Repository;

defined('ABSPATH') || exit;

use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;

class PluginFamilyRepository implements PluginFamilyRepositoryInterface
{
    /**
     * @var array<string, PluginFamilyInterface>
     */
    private array $familiesBySlug = [];

    /**
     * @var array<int, string>
     */
    private array $familiesSlugsByDownloadId = [];

    /**
     * Register a plugin family.
     *
     * @param PluginFamilyInterface $family The plugin family to register.
     * @since 1.0.0
     */
    public function registerFamily(PluginFamilyInterface $family): void
    {
        $this->familiesBySlug[$family->getSlug()] = $family;

        $downloadId = $family->getProPlugin()->getDownloadId();
        $this->familiesSlugsByDownloadId[$downloadId] = $family->getSlug();
    }

    /**
     * Find a plugin family by slug.
     *
     * @param string $slug The slug of the plugin family to find.
     * @return PluginFamilyInterface|null The plugin family if found, null otherwise.
     * @since 1.0.0
     */
    public function findFamilyBySlug(string $slug): ?PluginFamilyInterface
    {
        return $this->familiesBySlug[$slug] ?? null;
    }

    /**
     * Find a plugin family by download ID.
     *
     * @param int $downloadId The download ID of the plugin family to find.
     * @return PluginFamilyInterface|null The plugin family if found, null otherwise.
     * @since 1.0.0
     */
    public function findFamilyByDownloadId(int $downloadId): ?PluginFamilyInterface
    {
        $slug = $this->familiesSlugsByDownloadId[$downloadId] ?? null;

        if (empty($slug)) {
            return null;
        }

        return $this->findFamilyBySlug($slug);
    }

    /**
     * Get all plugin families.
     *
     * @return PluginFamilyInterface[] An array of all plugin families.
     * @since 1.0.0
     */
    public function getAllFamilies(): array
    {
        return array_values($this->familiesBySlug);
    }

    /**
     * Get all plugin family slugs.
     *
     * @return string[] An array of all plugin family slugs.
     * @since 1.0.0
     */
    public function getAllFamilySlugs(): array
    {
        return array_keys($this->familiesBySlug);
    }

    /**
     * Reset the plugin family repository.
     *
     * @since 1.0.0
     */
    public function reset(): void
    {
        $this->familiesBySlug = [];
    }
}
