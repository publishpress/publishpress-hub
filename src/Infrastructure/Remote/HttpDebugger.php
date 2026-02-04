<?php

/**
 * HTTP Debugger utility for debugging HTTP requests and responses
 *
 * @package PublishPress\Hub\Infrastructure\Remote
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Remote;

use WP_Error;

class HttpDebugger
{
    private const DEBUG_PREFIX = 'HTTP_DEBUG';

    private static bool $initialized = false;

    /**
     * Initialize HTTP debugging hooks.
     *
     * This method hooks into WordPress's http_api_debug action to log requests
     * and responses AFTER all filters have been applied, ensuring we see the
     * actual data being sent over the wire.
     *
     * @return void
     * @since 1.0.0
     */
    public static function initialize(): void
    {
        if (self::$initialized || !self::isDebugEnabled()) {
            return;
        }

        add_action('http_api_debug', [self::class, 'debugHttpApiRequest'], 10, 5);
        self::$initialized = true;
    }

    /**
     * Debug HTTP API request (called by WordPress after all filters).
     *
     * @param array<string, mixed>|\WP_Error $response The response or WP_Error on failure.
     * @param string $context Context under which the hook is fired.
     * @param string $class HTTP transport used.
     * @param array<string, mixed> $parsed_args HTTP request arguments.
     * @param string $url The request URL.
     * @return void
     * @since 1.0.0
     */
    public static function debugHttpApiRequest($response, string $context, string $class, array $parsed_args, string $url): void
    {
        if (!self::isDebugEnabled()) {
            return;
        }

        // Log request (with final args after all filters)
        $debugInfo = [
            'timestamp' => gmdate('Y-m-d H:i:s'),
            'method' => $parsed_args['method'] ?? 'GET',
            'url' => $url,
            'body' => $parsed_args['body'] ?? [],
            'timeout' => $parsed_args['timeout'] ?? null,
            'sslverify' => $parsed_args['sslverify'] ?? null,
            'headers' => $parsed_args['headers'] ?? [],
            'cookies' => $parsed_args['cookies'] ?? [],
            'user_agent' => $parsed_args['user-agent'] ?? null,
        ];

        self::log('REQUEST', $debugInfo);

        // Log response
        self::debugResponse($response);
    }

    /**
     * Debug HTTP request details (deprecated - use initialize() instead).
     *
     * @deprecated 1.0.3 Use initialize() to hook into http_api_debug instead.
     * @param string $method The HTTP method.
     * @param string $url The URL.
     * @param array<string, mixed> $args The arguments.
     * @since 1.0.0
     */
    public static function debugRequest(string $method, string $url, array $args): void
    {
        // This method is deprecated but kept for backward compatibility
        // It's no longer needed since we now hook into http_api_debug
    }

    /**
     * Debug HTTP response details (private - called by debugHttpApiRequest).
     *
     * @param array<string, mixed>|\WP_Error $response The response.
     * @since 1.0.0
     */
    private static function debugResponse($response): void
    {
        if (!self::isDebugEnabled()) {
            return;
        }

        $debugInfo = (is_wp_error($response)) ? [
            'timestamp' => gmdate('Y-m-d H:i:s'),
            'error' => true,
            'error_message' => $response->get_error_message(),
            'error_code' => $response->get_error_code(),
            'error_data' => $response->get_error_data(),
        ] : [
            'timestamp' => gmdate('Y-m-d H:i:s'),
            'error' => false,
            'status_code' => wp_remote_retrieve_response_code($response),
            'status_message' => wp_remote_retrieve_response_message($response),
            'headers' => wp_remote_retrieve_headers($response),
            'body' => wp_remote_retrieve_body($response),
            'cookies' => wp_remote_retrieve_cookies($response),
        ];

        self::log('RESPONSE', $debugInfo);
    }

    /**
     * Debug raw HTTP request (for advanced debugging)
     *
     * @param string $method The HTTP method.
     * @param string $url The URL.
     * @param array<string, mixed> $args The arguments.
     * @since 1.0.0
     */
    public static function debugRawRequest(string $method, string $url, array $args): void
    {
        if (!self::isDebugEnabled()) {
            return;
        }

        $rawRequest = self::buildRawRequest($method, $url, $args);
        self::log('RAW_REQUEST', ['raw_request' => $rawRequest]);
    }

    /**
     * Build a raw HTTP request string for debugging
     *
     * @param string $method The HTTP method.
     * @param string $url The URL.
     * @param array<string, mixed> $args The arguments.
     * @return string The raw request.
     * @since 1.0.0
     */
    private static function buildRawRequest(string $method, string $url, array $args): string
    {
        $parsedUrl = wp_parse_url($url);
        $path = $parsedUrl['path'] ?? '/';
        if (isset($parsedUrl['query'])) {
            $path .= '?' . $parsedUrl['query'];
        }

        $request = $method . ' ' . $path . ' HTTP/1.1' . "\r\n";
        $request .= 'Host: ' . ($parsedUrl['host'] ?? '') . "\r\n";

        // Add headers
        $headers = $args['headers'] ?? [];
        foreach ($headers as $name => $value) {
            $request .= $name . ': ' . $value . "\r\n";
        }

        // Add body
        if (isset($args['body'])) {
            $body = is_array($args['body']) ? http_build_query($args['body']) : $args['body'];
            $request .= 'Content-Length: ' . strlen($body) . "\r\n";
            $request .= "\r\n";
            $request .= $body;
        } else {
            $request .= "\r\n";
        }

        return $request;
    }

    /**
     * Check if debugging is enabled
     *
     * @return bool True if debugging is enabled, false otherwise.
     * @since 1.0.0
     */
    private static function isDebugEnabled(): bool
    {
        return defined('PUBLISHPRESS_HUB_DEBUG_REMOTE') && constant('PUBLISHPRESS_HUB_DEBUG_REMOTE');
    }

    /**
     * Log debug information
     *
     * @param string $type The type.
     * @param array<string, mixed> $data The data.
     * @since 1.0.0
     */
    private static function log(string $type, array $data): void
    {
        $logMessage = sprintf(
            '[%s] %s: %s',
            self::DEBUG_PREFIX,
            $type,
            wp_json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );

        // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
        error_log($logMessage);
    }

    /**
     * Get debug information as array (useful for testing)
     *
     * @param string $method The HTTP method.
     * @param string $url The URL.
     * @param array<string, mixed> $args The arguments.
     * @return array<string, mixed> The debug information.
     * @since 1.0.0
     */
    public static function getDebugInfo(string $method, string $url, array $args): array
    {
        return [
            'method' => $method,
            'url' => $url,
            'body' => $args['body'] ?? [],
            'timeout' => $args['timeout'] ?? null,
            'sslverify' => $args['sslverify'] ?? null,
            'headers' => $args['headers'] ?? [],
            'cookies' => $args['cookies'] ?? [],
            'user_agent' => $args['user-agent'] ?? null,
        ];
    }

    /**
     * Format response for debugging
     *
     * @param array<string, mixed>|WP_Error $response The response.
     * @return array<string, mixed> The formatted response.
     * @since 1.0.0
     */
    public static function formatResponse($response): array
    {
        if (is_wp_error($response)) {
            return [
                'error' => true,
                'error_message' => $response->get_error_message(),
                'error_code' => $response->get_error_code(),
                'error_data' => $response->get_error_data(),
            ];
        }

        return [
            'error' => false,
            'status_code' => wp_remote_retrieve_response_code($response),
            'status_message' => wp_remote_retrieve_response_message($response),
            'headers' => wp_remote_retrieve_headers($response),
            'body' => wp_remote_retrieve_body($response),
            'cookies' => wp_remote_retrieve_cookies($response),
        ];
    }
}
