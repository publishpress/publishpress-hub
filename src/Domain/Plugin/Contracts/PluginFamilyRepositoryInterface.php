<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Contracts;

interface PluginFamilyRepositoryInterface
{
    /**
     * Register a plugin family.
     *
     * @since 1.0.0
     * @param PluginFamilyInterface $pluginFamily
     */
    public function registerFamily(PluginFamilyInterface $pluginFamily): void;

    /**
     * Find a plugin family by its slug.
     *
     * @since 1.0.0
     * @param string $slug
     * @return PluginFamilyInterface|null
     */
    public function findByFamilySlug(string $slug): ?PluginFamilyInterface;

    /**
     * Get all registered plugin families.
     *
     * @since 1.0.0
     * @return PluginFamilyInterface[]
     */
    public function getAllPluginFamilies(): array;

    /**
     * Reset the plugin family repository.
     *
     * @since 1.0.0
     */
    public function reset(): void;
}
