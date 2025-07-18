<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\RestApi\Entity;

use WP_REST_Response;

class RestResponse
{
    private WP_REST_Response $wpResponse;

    public function __construct(WP_REST_Response $wpResponse)
    {
        $this->wpResponse = $wpResponse;
    }

    public function getWpResponse(): WP_REST_Response
    {
        return $this->wpResponse;
    }

    public function getData(): array
    {
        return $this->wpResponse->get_data();
    }

    public function getStatus(): int
    {
        return $this->wpResponse->get_status();
    }

    public function getHeaders(): array
    {
        return $this->wpResponse->get_headers();
    }

    public function setData($data): self
    {
        $this->wpResponse->set_data($data);
        return $this;
    }

    public function setStatus(int $status): self
    {
        $this->wpResponse->set_status($status);
        return $this;
    }

    public function addHeader(string $key, string $value): self
    {
        $this->wpResponse->header($key, $value);
        return $this;
    }
}
