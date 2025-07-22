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
use PublishPress\Hub\Infrastructure\Security\Contract\SecurityServiceInterface;
use WP_REST_Request;
use WP_REST_Response;

class RestApiService implements RestApiServiceInterface, BootableInterface
{
    use BootableTrait;

    private HooksServiceInterface $hooksService;
    private RestApiAdapterInterface $restApiAdapter;
    private SecurityServiceInterface $securityService;

    /**
     * @var array<RestRoute>
     */
    private array $routes = [];

    public function __construct(
        HooksServiceInterface $hooksService,
        RestApiAdapterInterface $restApiAdapter,
        SecurityServiceInterface $securityService
    ) {
        $this->hooksService = $hooksService;
        $this->restApiAdapter = $restApiAdapter;
        $this->securityService = $securityService;
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

    public function createResponse(array $data, int $status = 200, array $headers = []): WP_REST_Response
    {
        return $this->restApiAdapter->createResponse($data, $status, $headers);
    }

    public function createSuccessResponse(array $data, int $status = 200, array $headers = []): WP_REST_Response
    {
        $data['success'] = true;

        return $this->createResponse($data, $status, $headers);
    }

    /**
     * @return WP_REST_Response|WP_Error
     */
    public function createErrorResponse(string $message, int $status = 400, string $code = 'error')
    {
        return $this->restApiAdapter->createErrorResponse($message, $status, $code);
    }

    public function getRequestData(WP_REST_Request $request): array
    {
        return $this->restApiAdapter->getRequestData($request);
    }

    public function getRequestParam(WP_REST_Request $request, string $param, $default = null)
    {
        return $this->restApiAdapter->getRequestParam($request, $param, $default);
    }

    public function checkPermissions(string $capability = 'manage_options'): bool
    {
        return $this->securityService->userCan($capability);
    }

    public function verifyNonce(string $nonce, string $action = 'wp_rest'): bool
    {
        return $this->securityService->verifyNonce($nonce, $action);
    }
}
