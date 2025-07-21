<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\RestApi;

use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiAdapterInterface;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestResponse;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRequest;
use WP_REST_Request;

class WordPressRestApiAdapter implements RestApiAdapterInterface
{
    public function registerRoute(RestRoute $route): void
    {
        register_rest_route(
            $route->getNamespace(),
            $route->getRoute(),
            [
                'methods' => $route->getMethods(),
                'callback' => $this->mapCallbackRequest($route->getCallback()),
                'permission_callback' => $route->getPermissionCallback(),
                'args' => $route->getArgs(),
            ]
        );
    }

    public function createResponse(array $data, int $status = 200, array $headers = []): RestResponse
    {
        $response = new \WP_REST_Response($data, $status);

        foreach ($headers as $key => $value) {
            $response->header($key, $value);
        }

        return new RestResponse($response);
    }

    public function createErrorResponse(string $message, int $status = 400, string $code = 'error'): RestResponse
    {
        $error = new \WP_Error($code, $message, ['status' => $status]);
        $response = rest_ensure_response($error);

        return new RestResponse($response);
    }

    public function getRequestData(RestRequest $request): array
    {
        return $request->getWpRequest()->get_params();
    }

    public function getRequestParam(RestRequest $request, string $param, $default = null)
    {
        return $request->getWpRequest()->get_param($param) ?? $default;
    }

    public function mapCallbackRequest(callable $callback): callable
    {
        return function (WP_REST_Request $request) use ($callback) {
            return $callback(new RestRequest($request));
        };
    }
}
