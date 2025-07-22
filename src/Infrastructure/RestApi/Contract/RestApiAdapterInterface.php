<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\RestApi\Contract;

use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use WP_REST_Response;
use WP_REST_Request;

interface RestApiAdapterInterface
{
    /**
     * @param callable $callback
     */
    public function registerRoute(RestRoute $route, $callback): void;

    public function createResponse(array $data, int $status = 200, array $headers = []): WP_REST_Response;

    /**
     * @param string|int $code
     * @return WP_REST_Response|WP_Error
     */
    public function createErrorResponse(string $message, int $status = 400, $code = 'error');

    public function getRequestData(WP_REST_Request $request): array;

    public function getRequestParam(WP_REST_Request $request, string $param, $default = null);
}
