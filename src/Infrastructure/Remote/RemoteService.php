<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Remote;

use PublishPress\Hub\Infrastructure\Remote\Contract\RemoteServiceInterface;
use WP_Error;

class RemoteService implements RemoteServiceInterface
{
    private RemoteServiceInterface $remoteAdapter;

    public function __construct(RemoteServiceInterface $remoteAdapter)
    {
        $this->remoteAdapter = $remoteAdapter;
    }

    /**
     * @return array|WP_Error
     */
    public function request(string $url, array $args = [])
    {
        return $this->remoteAdapter->request($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function get(string $url, array $args = [])
    {
        return $this->remoteAdapter->get($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function post(string $url, array $args = [])
    {
        return $this->remoteAdapter->post($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function head(string $url, array $args = [])
    {
        return $this->remoteAdapter->head($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function safeRequest(string $url, array $args = [])
    {
        return $this->remoteAdapter->safeRequest($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function safeGet(string $url, array $args = [])
    {
        return $this->remoteAdapter->safeGet($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function safePost(string $url, array $args = [])
    {
        return $this->remoteAdapter->safePost($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function safeHead(string $url, array $args = [])
    {
        return $this->remoteAdapter->safeHead($url, $args);
    }

    public function getResponseBody(array $response): string
    {
        return $this->remoteAdapter->getResponseBody($response);
    }

    /**
     * @return mixed
     */
    public function getDecodedBodyFromResponse(array $response)
    {
        return $this->remoteAdapter->getDecodedBodyFromResponse($response);
    }

    public function getResponseStatusCode(array $response): int
    {
        return $this->remoteAdapter->getResponseStatusCode($response);
    }

    /**
     * @return array
     */
    public function getResponseHeaders(array $response): array
    {
        return $this->remoteAdapter->getResponseHeaders($response);
    }

    /**
     * Check if the response contains a Cloudflare ray ID and return it if it does.
     *
     * @param array $response
     * @return null|string
     */
    public function getCloudflareRayId(array $response): ?string
    {
        return $this->remoteAdapter->getCloudflareRayId($response);
    }
}
