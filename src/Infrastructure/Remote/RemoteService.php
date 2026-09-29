<?php

/**
 * Remote service for making HTTP requests.
 *
 * @package PublishPress\Hub\Infrastructure\Remote
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Remote;

defined('ABSPATH') || exit;

use PublishPress\Hub\Infrastructure\Remote\Contract\RemoteServiceInterface;
use WP_Error;

class RemoteService implements RemoteServiceInterface
{
    private RemoteServiceInterface $remoteAdapter;

    /**
     * @param RemoteServiceInterface $remoteAdapter The remote adapter.
     * @since 1.0.0
     */
    public function __construct(RemoteServiceInterface $remoteAdapter)
    {
        $this->remoteAdapter = $remoteAdapter;
    }

    /**
     * Send a request to the remote service.
     *
     * @param string $url The URL to send the request to.
     * @param array<string, mixed> $args The arguments to send with the request.
     * @return array|WP_Error The response from the remote service.
     * @since 1.0.0
     */
    public function request(string $url, array $args = [])
    {
        return $this->remoteAdapter->request($url, $args);
    }

    /**
     * Send a GET request to the remote service.
     *
     * @param string $url The URL to send the request to.
     * @param array<string, mixed> $args The arguments to send with the request.
     * @return array|WP_Error The response from the remote service.
     * @since 1.0.0
     */
    public function get(string $url, array $args = [])
    {
        return $this->remoteAdapter->get($url, $args);
    }

    /**
     * Send a POST request to the remote service.
     *
     * @param string $url The URL to send the request to.
     * @param array<string, mixed> $args The arguments to send with the request.
     * @return array|WP_Error The response from the remote service.
     * @since 1.0.0
     */
    public function post(string $url, array $args = [])
    {
        return $this->remoteAdapter->post($url, $args);
    }

    /**
     * Send a HEAD request to the remote service.
     *
     * @param string $url The URL to send the request to.
     * @param array<string, mixed> $args The arguments to send with the request.
     * @return array|WP_Error The response from the remote service.
     * @since 1.0.0
     */
    public function head(string $url, array $args = [])
    {
        return $this->remoteAdapter->head($url, $args);
    }

    /**
     * Send a safe request to the remote service.
     *
     * @param string $url The URL to send the request to.
     * @param array<string, mixed> $args The arguments to send with the request.
     * @return array|WP_Error The response from the remote service.
     * @since 1.0.0
     */
    public function safeRequest(string $url, array $args = [])
    {
        return $this->remoteAdapter->safeRequest($url, $args);
    }

    /**
     * Send a safe GET request to the remote service.
     *
     * @param string $url The URL to send the request to.
     * @param array<string, mixed> $args The arguments to send with the request.
     * @return array|WP_Error The response from the remote service.
     * @since 1.0.0
     */
    public function safeGet(string $url, array $args = [])
    {
        return $this->remoteAdapter->safeGet($url, $args);
    }

    /**
     * Send a safe POST request to the remote service.
     *
     * @param string $url The URL to send the request to.
     * @param array<string, mixed> $args The arguments to send with the request.
     * @return array|WP_Error The response from the remote service.
     * @since 1.0.0
     */
    public function safePost(string $url, array $args = [])
    {
        return $this->remoteAdapter->safePost($url, $args);
    }

    /**
     * Send a safe HEAD request to the remote service.
     *
     * @param string $url The URL to send the request to.
     * @param array<string, mixed> $args The arguments to send with the request.
     * @return array|WP_Error The response from the remote service.
     * @since 1.0.0
     */
    public function safeHead(string $url, array $args = [])
    {
        return $this->remoteAdapter->safeHead($url, $args);
    }

    /**
     * Get the response body.
     *
     * @param array<string, mixed> $response The response from the remote service.
     * @return string The response body.
     * @since 1.0.0
     */
    public function getResponseBody(array $response): string
    {
        return $this->remoteAdapter->getResponseBody($response);
    }

    /**
     * Get the decoded body from the response.
     *
     * @param array<string, mixed> $response The response from the remote service.
     * @return mixed The decoded body.
     * @since 1.0.0
     */
    public function getDecodedBodyFromResponse(array $response)
    {
        return $this->remoteAdapter->getDecodedBodyFromResponse($response);
    }

    /**
     * Get the response status code.
     *
     * @param array<string, mixed> $response The response from the remote service.
     * @return int The response status code.
     * @since 1.0.0
     */
    public function getResponseStatusCode(array $response): int
    {
        return $this->remoteAdapter->getResponseStatusCode($response);
    }

    /**
     * Get the response headers.
     *
     * @param array<string, mixed> $response The response from the remote service.
     * @return array The response headers.
     * @since 1.0.0
     */
    public function getResponseHeaders(array $response): array
    {
        return $this->remoteAdapter->getResponseHeaders($response);
    }

    /**
     * Check if the response contains a Cloudflare ray ID and return it if it does.
     *
     * @param array<string, mixed> $response The response from the remote service.
     * @return string|null The Cloudflare Ray ID.
     * @since 1.0.0
     */
    public function getCloudflareRayId(array $response): ?string
    {
        return $this->remoteAdapter->getCloudflareRayId($response);
    }
}
