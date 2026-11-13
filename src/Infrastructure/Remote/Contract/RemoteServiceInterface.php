<?php

/**
 * Remote service interface.
 *
 * @package PublishPress\Hub\Infrastructure\Remote\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Remote\Contract;

use WP_Error;

\defined('ABSPATH') || exit;

interface RemoteServiceInterface
{
    /**
     * Send a request to the remote service.
     *
     * @param string $url The URL to send the request to.
     * @param array<string, mixed> $args The arguments to send with the request.
     * @return array|WP_Error The response from the remote service.
     * @since 1.0.0
     */
    public function request(string $url, array $args = []);

    /**
     * Send a GET request to the remote service.
     *
     * @param string $url The URL to send the request to.
     * @param array<string, mixed> $args The arguments to send with the request.
     * @return array|WP_Error The response from the remote service.
     * @since 1.0.0
     */
    public function get(string $url, array $args = []);

    /**
     * Send a POST request to the remote service.
     *
     * @param string $url The URL to send the request to.
     * @param array<string, mixed> $args The arguments to send with the request.
     * @return array|WP_Error The response from the remote service.
     * @since 1.0.0
     */
    public function post(string $url, array $args = []);

    /**
     * Send a HEAD request to the remote service.
     *
     * @param string $url The URL to send the request to.
     * @param array<string, mixed> $args The arguments to send with the request.
     * @return array|WP_Error The response from the remote service.
     * @since 1.0.0
     */
    public function head(string $url, array $args = []);

    /**
     * Send a safe request to the remote service.
     *
     * @param string $url The URL to send the request to.
     * @param array<string, mixed> $args The arguments to send with the request.
     * @return array|WP_Error The response from the remote service.
     * @since 1.0.0
     */
    public function safeRequest(string $url, array $args = []);

    /**
     * Send a safe GET request to the remote service.
     *
     * @param string $url The URL to send the request to.
     * @param array<string, mixed> $args The arguments to send with the request.
     * @return array|WP_Error The response from the remote service.
     * @since 1.0.0
     */
    public function safeGet(string $url, array $args = []);

    /**
     * Send a safe POST request to the remote service.
     *
     * @param string $url The URL to send the request to.
     * @param array<string, mixed> $args The arguments to send with the request.
     * @return array|WP_Error The response from the remote service.
     * @since 1.0.0
     */
    public function safePost(string $url, array $args = []);

    /**
     * Send a safe HEAD request to the remote service.
     *
     * @param string $url The URL to send the request to.
     * @param array<string, mixed> $args The arguments to send with the request.
     * @return array|WP_Error The response from the remote service.
     * @since 1.0.0
     */
    public function safeHead(string $url, array $args = []);

    /**
     * Get the response body.
     *
     * @param array<string, mixed> $response The response from the remote service.
     * @return string The response body.
     * @since 1.0.0
     */
    public function getResponseBody(array $response): string;

    /**
     * Get the decoded body from the response.
     *
     * @param array<string, mixed> $response The response from the remote service.
     * @return mixed The decoded body.
     * @since 1.0.0
     */
    public function getDecodedBodyFromResponse(array $response);

    /**
     * Get the response status code.
     *
     * @param array<string, mixed> $response The response from the remote service.
     * @return int The response status code.
     * @since 1.0.0
     */
    public function getResponseStatusCode(array $response): int;

    /**
     * Get the response headers.
     *
     * @param array<string, mixed> $response The response from the remote service.
     * @return array The response headers.
     * @since 1.0.0
     */
    public function getResponseHeaders(array $response): array;

    /**
     * Get the Cloudflare Ray ID from the response.
     *
     * @param array<string, mixed> $response The response from the remote service.
     * @return string|null The Cloudflare Ray ID.
     * @since 1.0.0
     */
    public function getCloudflareRayId(array $response): ?string;
}
