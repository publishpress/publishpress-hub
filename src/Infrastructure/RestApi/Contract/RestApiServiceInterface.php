<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\RestApi\Contract;

use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestResponse;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRequest;

interface RestApiServiceInterface
{
    public function addRoute(RestRoute $route): void;

    public function createResponse(array $data, int $status = 200, array $headers = []): RestResponse;

    public function createErrorResponse(string $message, int $status = 400, string $code = 'error'): RestResponse;

    public function getRequestData(RestRequest $request): array;

    public function getRequestParam(RestRequest $request, string $param, $default = null);

    public function checkPermissions(string $capability = 'manage_options'): bool;

    public function verifyNonce(string $nonce, string $action = 'wp_rest'): bool;
}
