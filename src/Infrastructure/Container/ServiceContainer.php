<?php declare(strict_types=1);
/**
 * Service container for dependency injection.
 *
 * @package PublishPress\Hub\Infrastructure\Container
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

namespace PublishPress\Hub\Infrastructure\Container;

use Closure;
use PublishPress\Hub\Infrastructure\Contracts\ServiceContainerInterface;

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
     */
    public static function getInstance(): ServiceContainerInterface
    {
        if (empty(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Finds an entry of the container by its identifier and returns it.
     *
     * @return mixed Service entry.
     * @since 1.0.0
     */
    public function get(string $id)
    {
        if (! $this->has($id)) {
            throw new NotFoundException(sprintf('Service "%s" not found in container.', $id));
        }

        if (array_key_exists($id, $this->resolvedEntries)) {
            return $this->resolvedEntries[$id];
        }

        $service = $this->services[$id];

        if ($service instanceof Closure) {
            $service = $service($this);
        }

        $this->resolvedEntries[$id] = $service;

        return $service;
    }

    /**
     * Returns true if the container can return an entry for the given identifier.
     * Returns false otherwise.
     *
     * `has($id)` returning true does not mean that `get($id)` will not throw an exception.
     * It does however mean that `get($id)` will not throw a `NotFoundExceptionInterface`.
     *
     * @since 1.0.0
     */
    public function has(string $id): bool
    {
        return array_key_exists($id, $this->services)
               || array_key_exists($id, $this->resolvedEntries);
    }
}
