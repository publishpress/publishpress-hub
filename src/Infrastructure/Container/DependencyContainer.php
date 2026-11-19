<?php

/**
 * Dependency container.
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
use PublishPress\Hub\Infrastructure\Container\Contracts\DependencyContainerInterface;
use PublishPress\Hub\Infrastructure\Container\Exception\NotFoundException;
use RuntimeException;

\defined('ABSPATH') || exit;

/**
 * PHP Dependency Injection Container PSR-11.
 * Services renamed to dependencies so we don't confuse with
 * services from the DDD layer.
 *
 * Based on code from https://dev.to/fadymr/php-create-dependency-injection-container-psr-11-like-php-di-or-pimple-128i
 *
 * @copyright 2019 F.R Michel
 * @copyright 2025 PublishPress
 * @since 1.0.0
 */
class DependencyContainer implements DependencyContainerInterface
{
    /**
     * @var array<callable|mixed>
     * @since 1.0.0
     */
    private array $resolvedDependencies = [];

    /**
     * @var array<callable|mixed>
     * @since 1.0.0
     */
    private array $dependencies = [];

    private static self $instance;

    /**
     * @param array<callable|mixed> $dependencies The dependencies to register.
     * @since 1.0.0
     */
    public function __construct(array $dependencies = [])
    {
        if (! empty($dependencies)) {
            $this->register($dependencies);
        }

        self::$instance = $this;
    }

    /**
     * @since 1.0.0
     */
    public static function getInstance(): self
    {
        if (! self::$instance) {
            throw new RuntimeException('DependencyContainer not initialized');
        }

        return self::$instance;
    }

    /**
     * @param array<callable|mixed> $dependencies The dependencies to register.
     * @since 1.0.0
     */
    public function register(array $dependencies): void
    {
        $this->dependencies = array_merge(
            $this->dependencies,
            $dependencies
        );

        $this->clearResolvedDependencies(array_keys($dependencies));
    }

    /**
     * Finds an entry of the container by its identifier and returns it.
     *
     * @param string $dependencyId The identifier of the dependency to get.
     * @throws NotFoundException
     * @return mixed The dependency entry.
     * @since 1.0.0
     */
    public function get(string $dependencyId)
    {
        if (! $this->has($dependencyId)) {
            throw new NotFoundException(
                sprintf(
                    // translators: %s is the dependency ID.
                    esc_html__('Dependency "%s" not found in container.', 'publishpress-hub'),
                    esc_html($dependencyId)
                )
            );
        }

        if (array_key_exists($dependencyId, $this->resolvedDependencies)) {
            return $this->resolvedDependencies[$dependencyId];
        }

        $dependency = $this->dependencies[$dependencyId];

        if ($dependency instanceof Closure) {
            $dependency = $dependency($this);
        }

        $this->resolvedDependencies[$dependencyId] = $dependency;

        return $dependency;
    }

    /**
     * Returns true if the container can return an entry for the given identifier.
     * Returns false otherwise.
     *
     * `has($dependencyId)` returning true does not mean that `get($dependencyId)` will not throw an exception.
     * It does however mean that `get($dependencyId)` will not throw a `NotFoundExceptionInterface`.
     *
     * @param string $dependencyId The identifier of the dependency to check.
     * @return bool True if the dependency is resolved, false otherwise.
     * @since 1.0.0
     */
    public function has(string $dependencyId): bool
    {
        return array_key_exists($dependencyId, $this->dependencies)
               || array_key_exists($dependencyId, $this->resolvedDependencies);
    }

    /**
     * Checks if a dependency is resolved.
     *
     * @param string $dependencyId The identifier of the dependency to check.
     * @return bool True if the dependency is resolved, false otherwise.
     * @since 1.0.0
     */
    private function isDependencyResolved(string $dependencyId): bool
    {
        return array_key_exists($dependencyId, $this->resolvedDependencies);
    }

    /**
     * Clears the resolved dependencies.
     *
     * @param array<string> $dependencyIds
     * @since 1.0.0
     */
    private function clearResolvedDependencies(array $dependencyIds): void
    {
        foreach ($dependencyIds as $dependencyId) {
            if ($this->isDependencyResolved($dependencyId)) {
                unset($this->resolvedDependencies[$dependencyId]);
            }
        }
    }
}
