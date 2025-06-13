<?php

/**
 * Service container for dependency injection.
 *
 * @package PublishPress\Hub\Infrastructure\Container
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Container;

use Closure;
use PublishPress\Hub\Infrastructure\Container\Contracts\ServiceContainerInterface;

/**
 * PHP Dependency Injection Container PSR-11.
 * Based on code from https://dev.to/fadymr/php-create-dependency-injection-container-psr-11-like-php-di-or-pimple-128i
 *
 * @copyright 2019 F.R Michel
 * @copyright 2024 PublishPress
 * @since 1.0.0
 */
class ServiceContainer implements ServiceContainerInterface
{
    /**
     * Singleton instance. This should be kept until we are
     * able to finish the code refactoring removing deprecated
     * legacy code. Otherwise, the legacy code can't reuse the
     * new code structure.
     *
     * @var ServiceContainerInterface
     * @since 1.0.0
     */
    private static $instance;

    /**
     * @var array
     * @since 1.0.0
     */
    private $resolvedEntries = [];

    /**
     * @var array
     * @since 1.0.0
     */
    private $services = [];

    /**
     * @since 1.0.0
     */
    public function __construct(array $services = [])
    {
        if (! empty($services)) {
            $this->registerServices($services);
        }

        self::$instance = $this;
    }

    /**
     * @since 1.0.0
     */
    public function registerServices(array $services): void
    {
        $this->services = array_merge(
            $this->services,
            $services
        );
    }

    /**
     * @since 1.0.0
     * @param array $services The services to register
     * @return ServiceContainerInterface
     */
    public static function getInstance(array $services = []): ServiceContainerInterface
    {
        if (empty(self::$instance)) {
            self::$instance = new self($services);
        }

        return self::$instance;
    }

    /**
     * Finds an entry of the container by its identifier and returns it.
     *
     * @return mixed Service entry.
     * @since 1.0.0
     */
    public function get(string $serviceId)
    {
        if (! $this->has($serviceId)) {
            throw new NotFoundException(
                sprintf(
                    esc_html__('Service "%s" not found in container.', 'publishpress-hub'),
                    esc_html($serviceId)
                )
            );
        }

        if (array_key_exists($serviceId, $this->resolvedEntries)) {
            return $this->resolvedEntries[$serviceId];
        }

        $service = $this->services[$serviceId];

        if ($service instanceof Closure) {
            $service = $service($this);
        }

        $this->resolvedEntries[$serviceId] = $service;

        return $service;
    }

    /**
     * Returns true if the container can return an entry for the given identifier.
     * Returns false otherwise.
     *
     * `has($serviceId)` returning true does not mean that `get($serviceId)` will not throw an exception.
     * It does however mean that `get($serviceId)` will not throw a `NotFoundExceptionInterface`.
     *
     * @since 1.0.0
     */
    public function has(string $serviceId): bool
    {
        return array_key_exists($serviceId, $this->services)
               || array_key_exists($serviceId, $this->resolvedEntries);
    }
}
