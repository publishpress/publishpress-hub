<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\RestApi;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;
use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiAdapterInterface;
use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiServiceInterface;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;

class RestApiService implements RestApiServiceInterface, BootableInterface
{
    use BootableTrait;

    private HooksServiceInterface $hooksService;
    private RestApiAdapterInterface $restApiAdapter;

    /**
     * @var array<RestRoute>
     */
    private array $routes = [];

    public function __construct(
        HooksServiceInterface $hooksService,
        RestApiAdapterInterface $restApiAdapter
    ) {
        $this->hooksService = $hooksService;
        $this->restApiAdapter = $restApiAdapter;
    }

    protected function onLoad(): void
    {
        $this->hooksService->addAction(AbstractHooks::ACTION_REST_API_INIT, [$this, 'registerRoutes']);
    }

    protected function onInit(): void
    {
    }

    public function addRoute(RestRoute $route): void
    {
        $this->routes[] = $route;
    }

    public function registerRoutes(): void
    {
        foreach ($this->routes as $route) {
            $this->restApiAdapter->registerRoute($route);
        }
    }

    public function createResponse(array $data, int $status = 200, array $headers = []): \PublishPress\Hub\Infrastructure\RestApi\Entity\RestResponse
    {
        return $this->restApiAdapter->createResponse($data, $status, $headers);
    }

    public function createErrorResponse(string $message, int $status = 400, string $code = 'error'): \PublishPress\Hub\Infrastructure\RestApi\Entity\RestResponse
    {
        return $this->restApiAdapter->createErrorResponse($message, $status, $code);
    }

    public function getRequestData(\PublishPress\Hub\Infrastructure\RestApi\Entity\RestRequest $request): array
    {
        return $this->restApiAdapter->getRequestData($request);
    }

    public function getRequestParam(\PublishPress\Hub\Infrastructure\RestApi\Entity\RestRequest $request, string $param, $default = null)
    {
        return $this->restApiAdapter->getRequestParam($request, $param, $default);
    }

    public function validateRequest(\PublishPress\Hub\Infrastructure\RestApi\Entity\RestRequest $request, array $rules): array
    {
        return $this->restApiAdapter->validateRequest($request, $rules);
    }

    public function checkPermissions(string $capability = 'manage_options'): bool
    {
        return $this->restApiAdapter->checkPermissions($capability);
    }

    public function verifyNonce(string $nonce, string $action = 'wp_rest'): bool
    {
        return $this->restApiAdapter->verifyNonce($nonce, $action);
    }
}
