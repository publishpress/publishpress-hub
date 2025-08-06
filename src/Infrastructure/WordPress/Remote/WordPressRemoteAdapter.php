<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Remote;

use PublishPress\Hub\Infrastructure\Remote\Contract\RemoteServiceInterface;
use WP_Error;

class WordPressRemoteAdapter implements RemoteServiceInterface
{
    /**
     * @return array|WP_Error
     */
    public function request(string $url, array $args = [])
    {
        return wp_remote_request($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function get(string $url, array $args = [])
    {
        return $this->remoteGet($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function post(string $url, array $args = [])
    {
        return wp_remote_post($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function head(string $url, array $args = [])
    {
        return wp_remote_head($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function safeRequest(string $url, array $args = [])
    {
        return wp_safe_remote_request($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function safeGet(string $url, array $args = [])
    {
        return wp_safe_remote_get($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function safePost(string $url, array $args = [])
    {
        return wp_safe_remote_post($url, $args);
    }

    /**
     * @return array|WP_Error
     */
    public function safeHead(string $url, array $args = [])
    {
        return wp_safe_remote_head($url, $args);
    }

    public function getResponseBody(array $response): string
    {
        return wp_remote_retrieve_body($response);
    }

    /**
     * @return mixed
     */
    public function getDecodedBodyFromResponse(array $response)
    {
        return json_decode($this->getResponseBody($response), true);
    }

    public function getResponseStatusCode(array $response): int
    {
        return (int) wp_remote_retrieve_response_code($response);
    }

    /**
     * @return array
     */
    public function getResponseHeaders(array $response): array
    {
        return wp_remote_retrieve_headers($response);
    }

    public function getCloudflareRayId(array $response): ?string
    {
        $body = $this->getResponseBody($response);

        if (strpos($body, '_cf_chl_opt') !== false || strpos($body, 'ray=') !== false) {
            preg_match('/ray=(.*?)\';/', $body, $matches);
            $rayId = $matches[1] ?? null;

            return $rayId;
        }

        return null;
    }

    private function remoteGet(string $url, array $args = [])
    {
        if (function_exists('vip_safe_wp_remote_get')) {
            return call_user_func('vip_safe_wp_remote_get', $url, $args);
        }

        // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.wp_remote_get_wp_remote_get
        return wp_remote_get($url, $args);
    }
}
