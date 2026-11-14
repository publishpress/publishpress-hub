<?php

/**
 * Rest API service interface.
 *
 * @package PublishPress\Hub\Infrastructure\RestApi\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\RestApi\Contract;

use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use WP_REST_Response;
use WP_REST_Request;
use WP_Error;

\defined('ABSPATH') || exit;

interface RestApiServiceInterface
{
    /**
     * Add a route.
     *
     * @param RestRoute $route The route.
     * @since 1.0.0
     */
    public function addRoute(RestRoute $route): void;

    /**
     * Create a response.
     *
     * @param array<string, mixed> $data The data.
     * @param int $status The status.
     * @param array<string, mixed> $headers The headers.
     * @return WP_REST_Response The response.
     * @since 1.0.0
     */
    public function createResponse(array $data, int $status = 200, array $headers = []): WP_REST_Response;

    /**
     * Create a success response.
     *
     * @param array<string, mixed> $data The data.
     * @param int $status The status.
     * @param array<string, mixed> $headers The headers.
     * @return WP_REST_Response The response.
     * @since 1.0.0
     */
    public function createSuccessResponse(array $data, int $status = 200, array $headers = []): WP_REST_Response;

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
    public function createErrorResponse(string $message, int $status = 400, $code = 'error');

    /**
     * Get the request data.
     *
     * @param WP_REST_Request $request The request.
     * @return array<string, mixed> The request data.
     * @since 1.0.0
     */
    public function getRequestData(WP_REST_Request $request): array;

    /**
     * Get a request parameter.
     *
     * @param WP_REST_Request $request The request.
     * @param string $param The parameter.
     * @param mixed $default The default value.
     * @return mixed The request parameter.
     * @since 1.0.0
     */
    public function getRequestParam(WP_REST_Request $request, string $param, $default = null);
}
