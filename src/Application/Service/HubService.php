<?php declare(strict_types=1);
/**
 * Hub service for the PublishPress Hub library.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Domain\Plugin\Contracts\PluginRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Plugin;

/**
 * Application service for managing the PublishPress Hub library.
 *
 * This service coordinates domain operations and provides the main entry point
 * for the library functionality following DDD principles.
 *
 * @since 1.0.0
 */
class HubService
{
    /**
     * Whether the service has been initialized.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $initialized = false;

    /**
     * The plugin repository.
     *
     * @since 1.0.0
     * @var PluginRepositoryInterface
     */
    private PluginRepositoryInterface $pluginRepository;

    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct(
        PluginRepositoryInterface $pluginRepository
    ) {
        $this->pluginRepository = $pluginRepository;
    }

    /**
     * Initialize the service.
     *
     * @since 1.0.0
     * @return self
     */
    public function initialize(): self
    {
        if ($this->initialized) {
            return $this;
        }

        // Merge additional config
        $this->initialized = true;

        $this->registerHooks();

        return $this;
    }

    /**
     * Check if the service is initialized.
     *
     * @since 1.0.0
     * @return bool
     */
    public function isInitialized(): bool
    {
        return $this->initialized;
    }

    /**
     * Register the hooks.
     *
     * @since 1.0.0
     */
    private function registerHooks(): void
    {
        add_action('publishpress_hub_register_plugin', [$this, 'registerPlugin']);
    }

    /**
     * Register a plugin.
     *
     * @since 1.0.0
     * @param string $name
     * @param string $slug
     * @param string $version
     * @param string $path
     */
    public function registerPlugin(string $name, string $slug, string $version, string $path): void
    {
        $plugin = new Plugin($name, $slug, $version, $path);
        $this->pluginRepository->register($plugin);
    }

    /**
     * Get the plugins.
     *
     * @since 1.0.0
     * @return array
     */
    public function getPlugins(): array
    {
        return $this->pluginRepository->getAllPlugins();
    }
}
