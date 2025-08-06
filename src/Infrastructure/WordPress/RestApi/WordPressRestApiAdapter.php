<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\RestApi;

use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiAdapterInterface;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

class WordPressRestApiAdapter implements RestApiAdapterInterface
{
    /**
     * @param callable $callback
     */
    public function registerRoute(RestRoute $route, $callback): void
    {
        register_rest_route(
            $route->getNamespace(),
            $route->getRoute(),
            [
                'methods' => $route->getMethods(),
                'callback' => fn(WP_REST_Request $request) => $callback($request, $route->getUseCase()),
                'permission_callback' => $route->getPermissionCallback(),
                'args' => $route->getArgs(),
            ]
        );
    }

    /**
     * @param array<string, mixed> $data
     * @param int $status
     * @param array<string, string> $headers
     * @return WP_REST_Response
     */
    public function createResponse(array $data, int $status = 200, array $headers = []): WP_REST_Response
    {
        $response = new WP_REST_Response($data, $status);

        foreach ($headers as $key => $value) {
            $response->header($key, $value);
        }

        return $response;
    }

    /**
     * @param string|int $code
     * @return WP_REST_Response|WP_Error
     */
    public function createErrorResponse(string $message, int $status = 400, $code = 'error', array $context = [])
    {
        // Ensure code is always a string to avoid WordPress REST API issues
        $errorCode = is_numeric($code) ? 'error_' . $code : (string) $code;

        $error = new WP_Error($errorCode, $message, ['status' => $status]);

        // Create a proper REST response instead of using rest_ensure_response
        $response = new WP_REST_Response([
            'success' => false,
            'message' => $message,
            'code' => $errorCode,
            'context' => $context,
        ], $status);

        return $response;
    }

    public function getRequestData(WP_REST_Request $request): array
    {
        return $request->get_params();
    }

    public function getRequestParam(WP_REST_Request $request, string $param, $default = null)
    {
        return $request->get_param($param) ?? $default;
    }
}
