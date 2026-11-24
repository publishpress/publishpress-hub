<?php

/**
 * Plugin family repository interface.
 *
 * @package PublishPress\Hub\Domain\Plugin\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Contract;

\defined('ABSPATH') || exit;

interface PluginFamilyRepositoryInterface
{
    /**
     * Registers a plugin family.
     *
     * @param PluginFamilyInterface $family The plugin family to register.
     * @return void
     * @since 1.0.0
     */
    public function registerFamily(PluginFamilyInterface $family): void;

    /**
     * Finds a plugin family by slug.
     *
     * @param string $slug The slug of the plugin family.
     * @return PluginFamilyInterface|null The plugin family.
     * @since 1.0.0
     */
    public function findFamilyBySlug(string $slug): ?PluginFamilyInterface;

    /**
     * Finds a plugin family by download ID.
     *
     * @param int $downloadId The download ID of the plugin family.
     * @return PluginFamilyInterface|null The plugin family.
     * @since 1.0.0
     */
    public function findFamilyByDownloadId(int $downloadId): ?PluginFamilyInterface;

    /**
     * Gets all plugin families.
     *
     * @return array<PluginFamilyInterface> The plugin families.
     * @since 1.0.0
     */
    public function getAllFamilies(): array;

    /**
     * Gets all plugin family slugs.
     *
     * @return array<string> The plugin family slugs.
     * @since 1.0.0
     */
    public function getAllFamilySlugs(): array;

    /**
     * Resets the plugin family repository.
     *
     * @return void
     * @since 1.0.0
     */
    public function reset(): void;
}
