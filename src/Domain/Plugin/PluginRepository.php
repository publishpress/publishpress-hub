<?php declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin;

use PublishPress\Hub\Domain\Plugin\Contracts\PluginRepositoryInterface;

class PluginRepository implements PluginRepositoryInterface
{
    /**
     * The registered plugins.
     *
     * @since 1.0.0
     * @var Plugin[]
     */
    private array $plugins = [];

    /**
     * Register a plugin.
     *
     * @since 1.0.0
     * @param Plugin $plugin
     */
    public function register(Plugin $plugin): void
    {
        $existingPlugin = $this->findBySlug($plugin->getSlug());

        if ($existingPlugin && $existingPlugin->isNewerThan($plugin)) {
            return;
        }

        $this->plugins[$plugin->getSlug()] = $plugin;
    }

    /**
     * Find a plugin by its slug.
     *
     * @since 1.0.0
     * @param string $slug
     * @return Plugin|null
     */
    public function findBySlug(string $slug): ?Plugin
    {
        return $this->plugins[$slug] ?? null;
    }

    /**
     * Check if a plugin is registered.
     *
     * @since 1.0.0
     * @param string $slug
     * @return bool
     */
    public function isRegistered(string $slug): bool
    {
        return isset($this->plugins[$slug]);
    }

    /**
     * Get all registered plugins.
     *
     * @since 1.0.0
     * @return Plugin[]
     */
    public function getAllPlugins(): array
    {
        return array_values($this->plugins);
    }

    /**
     * Reset the plugin repository.
     *
     * @since 1.0.0
     */
    public function reset(): void
    {
        $this->plugins = [];
    }
}
