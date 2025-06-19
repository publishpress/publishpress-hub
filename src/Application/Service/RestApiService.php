<?php

/**
 * REST API service for the PublishPress Hub library.
 *
 * This service manages all REST API endpoints.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Hooks as ApplicationHooks;
use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;
use PublishPress\Hub\Application\Service\RestApi\Contracts\PluginMapperInterface;
use PublishPress\Hub\Application\Service\RestApi\Endpoints\PluginsEndpoint;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginRepositoryInterface;

/**
 * REST API service for managing API endpoints.
 *
 * This service coordinates REST API endpoints registration and follows
 * Domain Driven Development principles.
 *
 * @since 1.0.0
 */
class RestApiService implements ServiceInterface
{
    /**
     * Whether the service has been initialized.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $initialized = false;

    /**
     * The REST API namespace.
     *
     * @since 1.0.0
     * @var string
     */
    private string $namespace = 'publishpress-hub/v1';

    /**
     * The endpoints to register.
     *
     * @since 1.0.0
     * @var array
     */
    private array $endpoints = [];

    /**
     * The plugin repository.
     *
     * @since 1.0.0
     * @var PluginRepositoryInterface
     */
    private PluginRepositoryInterface $pluginRepository;

    /**
     * The plugin mapper.
     *
     * @since 1.0.0
     * @var PluginMapperInterface
     */
    private PluginMapperInterface $pluginMapper;

    /**
     * Constructor.
     *
     * @since 1.0.0
     * @param PluginRepositoryInterface $pluginRepository The plugin repository
     */
    public function __construct(
        PluginRepositoryInterface $pluginRepository,
        PluginMapperInterface $pluginMapper
    ) {
        $this->pluginRepository = $pluginRepository;
        $this->pluginMapper = $pluginMapper;

        $this->endpoints = [
            new PluginsEndpoint($this->pluginRepository, $this->pluginMapper),
        ];
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
        add_action(ApplicationHooks::ACTION_REST_API_INIT, [$this, 'registerEndpoints']);
    }

    /**
     * Register all REST API endpoints.
     *
     * @since 1.0.0
     */
    public function registerEndpoints(): void
    {
        foreach ($this->endpoints as $endpoint) {
            $endpoint->register($this->namespace);
        }
    }

    /**
     * Get the API namespace.
     *
     * @since 1.0.0
     * @return string
     */
    public function getNamespace(): string
    {
        return $this->namespace;
    }
}
