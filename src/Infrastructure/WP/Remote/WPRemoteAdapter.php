<?php

/**
 * WordPress remote adapter.
 *
 * @package PublishPress\Hub\Infrastructure\WP\Remote
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WP\Remote;

use PublishPress\Hub\Infrastructure\Remote\Contract\RemoteServiceInterface;
use WP_Error;

class WPRemoteAdapter implements RemoteServiceInterface
{
    /**
     * Request a remote URL.
     *
     * @param string $url The URL.
     * @param array<string, mixed> $args The arguments.
     * @return array|WP_Error The response.
     * @since 1.0.0
     * @return array|WP_Error
     */
    public function request(string $url, array $args = [])
    {
        return wp_remote_request($url, $args);
    }

    /**
     * Get a remote URL.
     *
     * @param string $url The URL.
     * @param array<string, mixed> $args The arguments.
     * @return array|WP_Error The response.
     * @since 1.0.0
     * @return array|WP_Error
     */
    public function get(string $url, array $args = [])
    {
        return $this->remoteGet($url, $args);
    }

    /**
     * Post a remote URL.
     *
     * @param string $url The URL.
     * @param array<string, mixed> $args The arguments.
     * @return array|WP_Error The response.
     * @since 1.0.0
     * @return array|WP_Error
     */
    public function post(string $url, array $args = [])
    {
        return wp_remote_post($url, $args);
    }

    /**
     * Head a remote URL.
     *
     * @param string $url The URL.
     * @param array<string, mixed> $args The arguments.
     * @return array|WP_Error The response.
     * @since 1.0.0
     * @return array|WP_Error
     */
    public function head(string $url, array $args = [])
    {
        return wp_remote_head($url, $args);
    }

    /**
     * Safe request a remote URL.
     *
     * @param string $url The URL.
     * @param array<string, mixed> $args The arguments.
     * @return array|WP_Error The response.
     * @since 1.0.0
     * @return array|WP_Error
     */
    public function safeRequest(string $url, array $args = [])
    {
        return wp_safe_remote_request($url, $args);
    }

    /**
     * Safe get a remote URL.
     *
     * @param string $url The URL.
     * @param array<string, mixed> $args The arguments.
     * @return array|WP_Error The response.
     * @since 1.0.0
     * @return array|WP_Error
     */
    public function safeGet(string $url, array $args = [])
    {
        return wp_safe_remote_get($url, $args);
    }

    /**
     * Safe post a remote URL.
     *
     * @param string $url The URL.
     * @param array<string, mixed> $args The arguments.
     * @return array|WP_Error The response.
     * @since 1.0.0
     * @return array|WP_Error
     */
    public function safePost(string $url, array $args = [])
    {
        return wp_safe_remote_post($url, $args);
    }

    /**
     * Safe head a remote URL.
     *
     * @param string $url The URL.
     * @param array<string, mixed> $args The arguments.
     * @return array|WP_Error The response.
     * @since 1.0.0
     * @return array|WP_Error
     */
    public function safeHead(string $url, array $args = [])
    {
        return wp_safe_remote_head($url, $args);
    }

    /**
     * Get the response body.
     *
     * @param array<string, mixed> $response The response.
     * @return string The response body.
     * @since 1.0.0
     */
    public function getResponseBody(array $response): string
    {
        return wp_remote_retrieve_body($response);
    }

    /**
     * Get the response body.
     *
     * @param array<string, mixed> $response The response.
     * @return string The response body.
     * @since 1.0.0
     * @return mixed
     */
    public function getDecodedBodyFromResponse(array $response)
    {
        return json_decode($this->getResponseBody($response), true);
    }

    /**
     * Get the response status code.
     *
     * @param array<string, mixed> $response The response.
     * @return int The response status code.
     * @since 1.0.0
     */
    public function getResponseStatusCode(array $response): int
    {
        return (int) wp_remote_retrieve_response_code($response);
    }

    /**
     * Get the response headers.
     *
     * @param array<string, mixed> $response The response.
     * @return array The response headers.
     * @since 1.0.0
     */
    public function getResponseHeaders(array $response): array
    {
        $headers = wp_remote_retrieve_headers($response);

        // WordPress returns WpOrg\Requests\Utility\CaseInsensitiveDictionary, convert to array
        if (is_array($headers)) {
            return $headers;
        }

        // Convert CaseInsensitiveDictionary to array
        if (is_object($headers)) {
            if (method_exists($headers, 'getAll')) {
                return $headers->getAll();
            }
            // Fallback: convert object to array
            return (array) $headers;
        }

        return [];
    }

    /**
     * Get the Cloudflare Ray ID.
     *
     * @param array<string, mixed> $response The response.
     * @return string|null The Cloudflare Ray ID.
     * @since 1.0.0
     */
    public function getCloudflareRayId(array $response): ?string
    {
        try {
            // First check response headers (most reliable)
            $headers = $this->getResponseHeaders($response);

            // Convert headers to array if it's an object
            $headersArray = [];
            if (is_array($headers)) {
                $headersArray = $headers;
            } elseif (is_object($headers)) {
                // Try getAll method if available
                if (method_exists($headers, 'getAll')) {
                    try {
                        $headersArray = $headers->getAll();
                    } catch (\Throwable $e) {
                        // If getAll() fails, try direct array access
                        if (isset($headers['cf-ray'])) {
                            $cfRay = $headers['cf-ray'];
                            return is_array($cfRay) ? $cfRay[0] : $cfRay;
                        }
                    }
                } elseif (isset($headers['cf-ray'])) {
                    // Try direct access if object supports array access
                    $cfRay = $headers['cf-ray'];
                    return is_array($cfRay) ? $cfRay[0] : $cfRay;
                }
            }

            // Check for cf-ray header (case-insensitive)
            if (!empty($headersArray)) {
                foreach (['cf-ray', 'CF-Ray', 'Cf-Ray'] as $headerName) {
                    if (isset($headersArray[$headerName])) {
                        $cfRay = $headersArray[$headerName];
                        return is_array($cfRay) ? $cfRay[0] : $cfRay;
                    }
                }
            }
        } catch (\Throwable $e) {
            // If header access fails, fall through to body parsing
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log(esc_html('Error accessing headers in getCloudflareRayId: ' . $e->getMessage())); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
            }
        }

        // Fallback to parsing response body
        try {
            $body = $this->getResponseBody($response);

            if (strpos($body, '_cf_chl_opt') !== false || strpos($body, 'ray=') !== false) {
                preg_match('/ray=(.*?)\';/', $body, $matches);
                $rayId = $matches[1] ?? null;

                return $rayId;
            }
        } catch (\Throwable $e) {
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log(esc_html('Error parsing response body in getCloudflareRayId: ' . $e->getMessage())); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
            }
        }

        return null;
    }

    /**
     * Get a remote URL.
     *
     * @param string $url The URL.
     * @param array<string, mixed> $args The arguments.
     * @return array|WP_Error The response.
     * @since 1.0.0
     */
    private function remoteGet(string $url, array $args = [])
    {
        if (function_exists('vip_safe_wp_remote_get')) {
            return call_user_func('vip_safe_wp_remote_get', $url, $args);
        }

        // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.wp_remote_get_wp_remote_get
        return wp_remote_get($url, $args);
    }
}
