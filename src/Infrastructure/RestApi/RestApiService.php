<?php

/**
 * Rest API service.
 *
 * @package PublishPress\Hub\Infrastructure\RestApi
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\RestApi;

use Exception;
use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Exception\Contract\WithContextInterface;
use PublishPress\Hub\Domain\Exception\ExceptionCode;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;
use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiAdapterInterface;
use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiServiceInterface;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use PublishPress\Hub\Infrastructure\Security\Contract\SecurityServiceInterface;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

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

    /**
     * @param HooksServiceInterface $hooksService The hooks service.
     * @param RestApiAdapterInterface $restApiAdapter The rest API adapter.
     * @param SecurityServiceInterface $securityService The security service.
     * @since 1.0.0
     */
    public function __construct(
        HooksServiceInterface $hooksService,
        RestApiAdapterInterface $restApiAdapter,
        SecurityServiceInterface $securityService
    ) {
        $this->hooksService = $hooksService;
        $this->restApiAdapter = $restApiAdapter;
        $this->securityService = $securityService;
    }

    /**
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        $this->hooksService->addAction(AbstractHooks::ACTION_REST_API_INIT, [$this, 'registerRoutes']);
    }

    /**
     * @since 1.0.0
     */
    protected function onInit(): void
    {
    }

    /**
     * Add a route.
     *
     * @param RestRoute $route The route.
     * @since 1.0.0
     */
    public function addRoute(RestRoute $route): void
    {
        $this->routes[] = $route;
    }

    /**
     * Register routes.
     *
     * @since 1.0.0
     */
    public function registerRoutes(): void
    {
        foreach ($this->routes as $route) {
            $this->restApiAdapter->registerRoute($route, [$this, 'executeUseCase']);
        }
    }

    /**
     * Create a response.
     *
     * @param array<string, mixed> $data The data.
     * @param int $status The status.
     * @param array<string, mixed> $headers The headers.
     * @return WP_REST_Response The response.
     * @since 1.0.0
     */
    public function createResponse(array $data, int $status = 200, array $headers = []): WP_REST_Response
    {
        return $this->restApiAdapter->createResponse($data, $status, $headers);
    }

    /**
     * Create a success response.
     *
     * @param array<string, mixed> $data The data.
     * @param int $status The status.
     * @param array<string, mixed> $headers The headers.
     * @return WP_REST_Response The response.
     * @since 1.0.0
     */
    public function createSuccessResponse(array $data, int $status = 200, array $headers = []): WP_REST_Response
    {
        $data['success'] = true;

        return $this->createResponse($data, $status, $headers);
    }

    /**
     * Create an error response.
     *
     * @param string $message The message.
     * @param int $status The status.
     * @param string|int $code The code.
     * @param array<string, mixed> $context The context.
     * @return WP_REST_Response|WP_Error The response.
     * @since 1.0.0
     */
    public function createErrorResponse(
        string $message,
        int $status = 400,
        $code = 'error',
        array $context = []
    ) {
        return $this->restApiAdapter->createErrorResponse(
            $message,
            $status,
            $code,
            $context
        );
    }

    /**
     * Get the request data.
     *
     * @param WP_REST_Request $request The request.
     * @return array<string, mixed> The request data.
     * @since 1.0.0
     */
    public function getRequestData(WP_REST_Request $request): array
    {
        return $this->restApiAdapter->getRequestData($request);
    }

    /**
     * Get a request parameter.
     *
     * @param WP_REST_Request $request The request.
     * @param string $param The parameter.
     * @param mixed $default The default value.
     * @return mixed The request parameter.
     * @since 1.0.0
     */
    public function getRequestParam(WP_REST_Request $request, string $param, $default = null)
    {
        return $this->restApiAdapter->getRequestParam($request, $param, $default);
    }

    /**
     * Check permissions.
     *
     * @param string $capability The capability.
     * @return bool True if the user has the capability, false otherwise.
     * @since 1.0.0
     */
    public function checkPermissions(string $capability = 'manage_options'): bool
    {
        return $this->securityService->userCan($capability);
    }

    /**
     * Verify a nonce.
     *
     * @param string $nonce The nonce.
     * @param string $action The action.
     * @return bool True if the nonce is valid, false otherwise.
     * @since 1.0.0
     */
    public function verifyNonce(string $nonce, string $action = 'wp_rest'): bool
    {
        return $this->securityService->verifyNonce($nonce, $action);
    }

    /**
     * Execute a use case.
     *
     * @param WP_REST_Request $request The request.
     * @param UseCaseInterface $useCase The use case.
     * @return WP_REST_Response|WP_Error The response.
     * @since 1.0.0
     */
    public function executeUseCase(WP_REST_Request $request, UseCaseInterface $useCase)
    {
        try {
            $response = $useCase->execute($request);

            return $this->createSuccessResponse($response);
        } catch (WithContextInterface $e) {
            return $this->createErrorResponse(
                $e->getMessage(),
                400,
                $this->getErrorCodeFromException($e),
                $e->getContext()
            );
        } catch (Exception $e) {
            return $this->createErrorResponse(
                $e->getMessage(),
                400,
                ExceptionCode::UNKNOWN_ERROR
            );
        }
    }

    /**
     * Get a meaningful error code from an exception.
     *
     * @param WithContextInterface $e The exception.
     * @return string The error code.
     * @since 1.0.0
     */
    private function getErrorCodeFromException(WithContextInterface $e): string
    {
        // Use the exception's code directly (now standardized)
        // Cast to string since we always set string codes
        return (string) $e->getCode();
    }

    /**
     * Get a meaningful error message from an exception.
     *
     * @param WithContextInterface $e The exception.
     * @return string The error message.
     * @since 1.0.0
     */
    private function getErrorMessageFromException(WithContextInterface $e): string
    {
        $context = $e->getContext();

        if (isset($context['error_message'])) {
            return $context['error_message'];
        }

        return $e->getMessage();
    }
}
