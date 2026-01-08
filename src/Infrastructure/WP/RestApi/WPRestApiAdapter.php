<?php

/**
 * WordPress REST API adapter.
 *
 * @package PublishPress\Hub\Infrastructure\WP\RestApi
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WP\RestApi;

use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiAdapterInterface;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

class WPRestApiAdapter implements RestApiAdapterInterface
{
    /**
     * Register a REST route.
     *
     * @param RestRoute $route The route.
     * @param callable $callback The callback.
     * @since 1.0.0
     */
    public function registerRoute(RestRoute $route, $callback): void
    {
        register_rest_route(
            $route->getNamespace(),
            $route->getRoute(),
            [
                'methods' => $route->getMethods(),
                'callback' => fn(WP_REST_Request $request) => $callback($request, $route->getCallback()),
                'permission_callback' => $route->getPermissionCallback(),
                'args' => $route->getArgs(),
            ]
        );
    }

    /**
     * Create a response.
     *
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
     * Create an error response.
     *
     * @param string $message The message.
     * @param int $status The status.
     * @param string|int $code The code.
     * @param array<string, mixed> $context The context.
     * @return WP_REST_Response|WP_Error The response.
     * @since 1.0.0
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

    /**
     * Get the request data.
     *
     * @param WP_REST_Request $request The request.
     * @return array<string, mixed> The request data.
     * @since 1.0.0
     */
    public function getRequestData(WP_REST_Request $request): array
    {
        return $request->get_params();
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
        return $request->get_param($param) ?? $default;
    }
}
