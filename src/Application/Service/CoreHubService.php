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
use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;
use PublishPress\Hub\Domain\DomainException;
use PublishPress\Hub\Infrastructure\Container\ServiceCollection;

/**
 * Application service for managing the PublishPress Hub library.
 *
 * This service coordinates domain operations and provides the main entry point
 * for the library functionality following DDD principles.
 *
 * @since 1.0.0
 */
class CoreHubService implements ServiceInterface
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
     * The service collection.
     *
     * @since 1.0.0
     * @var ServiceCollection
     */
    private ServiceCollection $services;

    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct(
        PluginRepositoryInterface $pluginRepository,
        ServiceCollection $services
    ) {
        $this->pluginRepository = $pluginRepository;
        $this->services = $services;
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
        $this->services->initialize();

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
        add_action(ApplicationHooks::ACTION_INIT, [$this, 'start']);
        add_action(ApplicationHooks::ACTION_REGISTER_PLUGIN, [$this, 'registerPlugin'], 10, 4);
    }

    /**
     * Start the service.
     *
     * @since 1.0.0
     */
    public function start(): void
    {

    }

    /**
     * Register a plugin as installed.
     *
     * @since 1.0.0
     * @param string $slug
     * @param string $version
     * @param string $path
     *
     * @throws DomainException
     */
    public function registerPlugin(string $slug, string $version, string $path): void
    {
        // Fire before registration hook
        do_action(DomainHooks::ACTION_BEFORE_PLUGIN_REGISTER, $slug, $version, $path);

        try {
            $plugin = $this->pluginRepository->findBySlug($slug);

            if (!$plugin) {
                throw new DomainException('Plugin not found');
            }

            $plugin->register($version, $path);

            // Fire after successful registration hook
            do_action(DomainHooks::ACTION_PLUGIN_REGISTERED, $plugin);
        } catch (\Exception $e) {
            // Fire registration failed hook
            do_action(
                DomainHooks::ACTION_PLUGIN_REGISTRATION_FAILED,
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
