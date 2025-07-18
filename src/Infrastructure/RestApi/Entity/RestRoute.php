<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\RestApi\Entity;

class RestRoute
{
    private string $namespace;

    private string $route;

    private string $methods;
    /**
     * @var callable
     */
    private $callback;
    /**
     * @var callable
     */
    private $permissionCallback;

    private array $args;

    public function __construct(
        string $namespace,
        string $route,
        string $methods,
        callable $callback,
        callable $permissionCallback,
        array $args = []
    ) {
        $this->namespace = $namespace;
        $this->route = $route;
        $this->methods = $methods;
        $this->callback = $callback;
        $this->permissionCallback = $permissionCallback;
        $this->args = $args;
    }

    public function getNamespace(): string
    {
        return $this->namespace;
    }

    public function getRoute(): string
    {
        return $this->route;
    }

    public function getMethods(): string
    {
        return $this->methods;
    }

    public function getCallback(): callable
    {
        return $this->callback;
    }

    public function getPermissionCallback(): callable
    {
        return $this->permissionCallback;
    }

    public function getArgs(): array
    {
        return $this->args;
    }
}
