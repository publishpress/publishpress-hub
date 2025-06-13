<?php

/**
 * Hub service for the PublishPress Hub library.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Hooks as ApplicationHooks;
use PublishPress\Hub\Domain\Hooks as DomainHooks;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Plugin;
use PublishPress\Hub\Application\Service\AdminMenuService;
use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;

/**
 * Application service for managing the PublishPress Hub library.
 *
 * This service coordinates domain operations and provides the main entry point
 * for the library functionality following DDD principles.
 *
 * @since 1.0.0
 */
class HubService implements ServiceInterface
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
     * The admin menu service.
     *
     * @since 1.0.0
     * @var ServiceInterface
     */
    private ServiceInterface $adminMenuService;

    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct(
        PluginRepositoryInterface $pluginRepository,
        ServiceInterface $adminMenuService
    ) {
        $this->pluginRepository = $pluginRepository;
        $this->adminMenuService = $adminMenuService;
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

        $this->initialized = true;

        $this->registerHooks();
        $this->adminMenuService->initialize();

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
        add_action(ApplicationHooks::ACTION_INIT, [$this->adminMenuService, 'start']);
        add_action(ApplicationHooks::ACTION_REGISTER_PLUGIN, [$this, 'registerPlugin'], 10, 4);
    }

    /**
     * Start the service.
     *
     * @since 1.0.0
     */
    public function start(): void
    {
        ray('start');
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
        // Fire before registration hook
        do_action(DomainHooks::ACTION_BEFORE_PLUGIN_REGISTER, $name, $slug, $version, $path);

        try {
            $plugin = new Plugin($name, $slug, $version, $path);

            $this->pluginRepository->register($plugin);

            // Fire after successful registration hook
            do_action(DomainHooks::ACTION_PLUGIN_REGISTERED, $plugin);
        } catch (\Exception $e) {
            // Fire registration failed hook
            do_action(
                DomainHooks::ACTION_PLUGIN_REGISTRATION_FAILED,
                $name,
                $slug,
                $version,
                $path,
                $e
            );
            throw $e;
        }
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
