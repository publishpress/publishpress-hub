<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin;

use PublishPress\Hub\Domain\Plugin\Contracts\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginFamilyRepositoryInterface;

class PluginFamilyRepository implements PluginFamilyRepositoryInterface
{
    /**
     * The registered plugin families.
     *
     * @since 1.0.0
     * @var PluginFamilyInterface[]
     */
    private array $pluginFamilies = [];

    /**
     * Register a plugin family.
     *
     * @since 1.0.0
     * @param PluginFamilyInterface $pluginFamily
     */
    public function registerFamily(PluginFamilyInterface $pluginFamily): void
    {
        $this->pluginFamilies[$pluginFamily->getSlug()] = $pluginFamily;
    }

    /**
     * Find a plugin family by its slug.
     *
     * @since 1.0.0
     * @param string $slug
     * @return PluginFamilyInterface|null
     */
    public function findByFamilySlug(string $slug): ?PluginFamilyInterface
    {
        return $this->pluginFamilies[$slug] ?? null;
    }

    /**
     * Get all registered plugin families.
     *
     * @since 1.0.0
     * @return PluginFamilyInterface[]
     */
    public function getAllPluginFamilies(): array
    {
        return array_values($this->pluginFamilies);
    }

    /**
     * Reset the plugin family repository.
     *
     * @since 1.0.0
     */
    public function reset(): void
    {
        $this->pluginFamilies = [];
    }
}
