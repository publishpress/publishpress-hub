<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container;

use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;

/**
 * Collection of application services.
 *
 * @since 1.0.0
 */
class ServiceCollection
{
    /**
     * The services.
     *
     * @since 1.0.0
     * @var array<string, ServiceInterface>
     */
    private array $services = [];

    /**
     * Add a service to the collection.
     *
     * @since 1.0.0
     * @param string $name The service name
     * @param ServiceInterface $service The service instance
     * @return self
     */
    public function add(string $name, ServiceInterface $service): self
    {
        $this->services[$name] = $service;
        return $this;
    }

    /**
     * Get a service by name.
     *
     * @since 1.0.0
     * @param string $name The service name
     * @return ServiceInterface|null
     */
    public function get(string $name): ?ServiceInterface
    {
        return $this->services[$name] ?? null;
    }

    /**
     * Get all services.
     *
     * @since 1.0.0
     * @return array<string, ServiceInterface>
     */
    public function getAll(): array
    {
        return $this->services;
    }

    /**
     * Initialize all services.
     *
     * @since 1.0.0
     * @return self
     */
    public function initialize(): self
    {
        foreach ($this->services as $service) {
            $service->initialize();
        }

        return $this;
    }
}
