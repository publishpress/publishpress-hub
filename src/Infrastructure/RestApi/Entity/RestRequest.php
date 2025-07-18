<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\RestApi\Entity;

use WP_REST_Request;

class RestRequest
{
    private WP_REST_Request $wpRequest;

    public function __construct(WP_REST_Request $wpRequest)
    {
        $this->wpRequest = $wpRequest;
    }

    public function getWpRequest(): WP_REST_Request
    {
        return $this->wpRequest;
    }

    public function getParam(string $param, $default = null)
    {
        return $this->wpRequest->get_param($param) ?? $default;
    }

    public function getParams(): array
    {
        return $this->wpRequest->get_params();
    }

    public function getMethod(): string
    {
        return $this->wpRequest->get_method();
    }

    public function getHeaders(): array
    {
        return $this->wpRequest->get_headers();
    }

    public function getHeader(string $header): ?string
    {
        return $this->wpRequest->get_header($header);
    }
}
