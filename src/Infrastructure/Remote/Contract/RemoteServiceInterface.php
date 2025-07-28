<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Remote\Contract;

interface RemoteServiceInterface
{
    /**
     * @return array|WP_Error
     */
    public function request(string $url, array $args = []);

    /**
     * @return array|WP_Error
     */
    public function get(string $url, array $args = []);

    /**
     * @return array|WP_Error
     */
    public function post(string $url, array $args = []);

    /**
     * @return array|WP_Error
     */
    public function head(string $url, array $args = []);

    /**
     * @return array|WP_Error
     */
    public function safeRequest(string $url, array $args = []);

    /**
     * @return array|WP_Error
     */
    public function safeGet(string $url, array $args = []);

    /**
     * @return array|WP_Error
     */
    public function safePost(string $url, array $args = []);

    /**
     * @return array|WP_Error
     */
    public function safeHead(string $url, array $args = []);

    public function getResponseBody(array $response): string;

    /**
     * @return mixed
     */
    public function getDecodedBodyFromResponse(array $response);

    public function getResponseStatusCode(array $response): int;

    /**
     * @return array
     */
    public function getResponseHeaders(array $response): array;

    public function getCloudflareRayId(array $response): ?string;
}
