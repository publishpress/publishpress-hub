<?php

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

    public function getUseCase(): UseCaseInterface
    {
        return $this->useCase;
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
