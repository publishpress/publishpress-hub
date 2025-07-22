<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Remote;

use PublishPress\Hub\Infrastructure\Remote\Contract\RemoteServiceInterface;

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
        return wp_remote_get($url, $args);
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
    public function decodeResponseBody(array $response)
    {
        return json_decode($this->getResponseBody($response), true);
    }
}
