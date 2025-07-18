<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\RestApi;

use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiAdapterInterface;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestResponse;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRequest;

class WordPressRestApiAdapter implements RestApiAdapterInterface
{
    public function registerRoute(RestRoute $route): void
    {
        register_rest_route(
            $route->getNamespace(),
            $route->getRoute(),
            [
                'methods' => $route->getMethods(),
                'callback' => $route->getCallback(),
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

    public function validateRequest(RestRequest $request, array $rules): array
    {
        $wpRequest = $request->getWpRequest();
        $validated = [];
        $errors = [];

        foreach ($rules as $param => $rule) {
            $value = $wpRequest->get_param($param);

            if (isset($rule['required']) && $rule['required'] && empty($value)) {
                $errors[$param] = sprintf('Parameter "%s" is required', $param);
                continue;
            }

            if (!empty($value)) {
                if (isset($rule['type'])) {
                    $value = $this->validateType($value, $rule['type']);
                }

                if (isset($rule['sanitize_callback']) && is_callable($rule['sanitize_callback'])) {
                    $value = call_user_func($rule['sanitize_callback'], $value);
                }

                $validated[$param] = $value;
            } elseif (isset($rule['default'])) {
                $validated[$param] = $rule['default'];
            }
        }

        if (!empty($errors)) {
            throw new \InvalidArgumentException(json_encode($errors));
        }

        return $validated;
    }

    private function validateType($value, string $type)
    {
        switch ($type) {
            case 'string':
                return (string) $value;
            case 'integer':
                return (int) $value;
            case 'boolean':
                return (bool) $value;
            case 'array':
                return is_array($value) ? $value : [$value];
            default:
                return $value;
        }
    }

    public function checkPermissions(string $capability = 'manage_options'): bool
    {
        return current_user_can($capability);
    }

    public function verifyNonce(string $nonce, string $action = 'wp_rest'): bool
    {
        return wp_verify_nonce($nonce, $action) !== false;
    }
}
