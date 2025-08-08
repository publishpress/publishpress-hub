<?php

/**
 * Rest route entity.
 *
 * @package PublishPress\Hub\Infrastructure\RestApi\Entity
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\RestApi\Entity;

use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;

class RestRoute
{
    private string $namespace;

    private string $route;

    private string $methods;

    private UseCaseInterface $useCase;

    /**
     * @var callable
     */
    private $permissionCallback;

    private array $args;

    /**
     * @param string $namespace The namespace.
     * @param string $route The route.
     * @param string $methods The methods.
     * @param UseCaseInterface $useCase The use case.
     * @param callable $permissionCallback The permission callback.
     * @param array<string, mixed> $args The arguments.
     * @since 1.0.0
     */
    public function __construct(
        string $namespace,
        string $route,
        string $methods,
        UseCaseInterface $useCase,
        callable $permissionCallback,
        array $args = []
    ) {
        $this->namespace = $namespace;
        $this->route = $route;
        $this->methods = $methods;
        $this->useCase = $useCase;
        $this->permissionCallback = $permissionCallback;
        $this->args = $args;
    }

    /**
     * Get the namespace.
     *
     * @return string The namespace.
     * @since 1.0.0
     */
    public function getNamespace(): string
    {
        return $this->namespace;
    }

    /**
     * Get the route.
     *
     * @return string The route.
     * @since 1.0.0
     */
    public function getRoute(): string
    {
        return $this->route;
    }

    /**
     * Get the methods.
     *
     * @return string The methods.
     * @since 1.0.0
     */
    public function getMethods(): string
    {
        return $this->methods;
    }

    /**
     * Get the use case.
     *
     * @return UseCaseInterface The use case.
     * @since 1.0.0
     */
    public function getUseCase(): UseCaseInterface
    {
        return $this->useCase;
    }

    /**
     * Get the permission callback.
     *
     * @return callable The permission callback.
     * @since 1.0.0
     */
    public function getPermissionCallback(): callable
    {
        return $this->permissionCallback;
    }

    /**
     * Get the arguments.
     *
     * @return array<string, mixed> The arguments.
     * @since 1.0.0
     */
    public function getArgs(): array
    {
        return $this->args;
    }
}
