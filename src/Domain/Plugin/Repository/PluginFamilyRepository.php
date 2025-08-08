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

use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;

class PluginFamilyRepository implements PluginFamilyRepositoryInterface
{
    private array $families = [];

    /**
     * Register a plugin family.
     *
     * @param PluginFamilyInterface $family The plugin family to register.
     * @since 1.0.0
     */
    public function registerFamily(PluginFamilyInterface $family): void
    {
        $this->families[$family->getSlug()] = $family;
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
        return $this->families[$slug] ?? null;
    }

    /**
     * Get all plugin families.
     *
     * @return PluginFamilyInterface[] An array of all plugin families.
     * @since 1.0.0
     */
    public function getAllFamilies(): array
    {
        return array_values($this->families);
    }

    /**
     * Get all plugin family slugs.
     *
     * @return string[] An array of all plugin family slugs.
     * @since 1.0.0
     */
    public function getAllFamilySlugs(): array
    {
        return array_keys($this->families);
    }

    /**
     * Reset the plugin family repository.
     *
     * @since 1.0.0
     */
    public function reset(): void
    {
        $this->families = [];
    }
}
