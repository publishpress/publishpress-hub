<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\RestApi\Contract;

use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use WP_REST_Response;
use WP_REST_Request;

interface RestApiAdapterInterface
{
    public function registerRoute(RestRoute $route): void;

    public function createResponse(array $data, int $status = 200, array $headers = []): WP_REST_Response;

    /**
     * @return WP_REST_Response|WP_Error
     */
    public function createErrorResponse(string $message, int $status = 400, string $code = 'error');

    public function getRequestData(WP_REST_Request $request): array;

    public function getRequestParam(WP_REST_Request $request, string $param, $default = null);

    public function mapCallbackRequest(callable $callback): callable;
}
