<?php declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Contracts;

use PublishPress\Hub\Domain\Plugin\Plugin;

interface PluginRepositoryInterface
{
    /**
     * Register a plugin.
     *
     * @since 1.0.0
     * @param Plugin $plugin
     */
    public function register(Plugin $plugin): void;

    /**
     * Find a plugin by its slug.
     *
     * @since 1.0.0
     * @param string $slug
     * @return Plugin|null
     */
    public function findBySlug(string $slug): ?Plugin;

    /**
     * Check if a plugin is registered.
     *
     * @since 1.0.0
     * @param string $slug
     * @return bool
     */
    public function isRegistered(string $slug): bool;

    /**
     * Get all registered plugins.
     *
     * @since 1.0.0
     * @return Plugin[]
     */
    public function getAllPlugins(): array;

    /**
     * Reset the plugin repository.
     *
     * @since 1.0.0
     */
    public function reset(): void;
}
