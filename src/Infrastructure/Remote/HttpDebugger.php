<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Remote;

/**
 * HTTP Debugger utility for debugging HTTP requests and responses
 */
class HttpDebugger
{
    private const DEBUG_PREFIX = 'HTTP_DEBUG';

    /**
     * Debug HTTP request details
     */
    public static function debugRequest(string $method, string $url, array $args): void
    {
        if (!self::isDebugEnabled()) {
            return;
        }

        $debugInfo = [
            'timestamp' => date('Y-m-d H:i:s'),
            'method' => $method,
            'url' => $url,
            'body' => $args['body'] ?? [],
            'timeout' => $args['timeout'] ?? null,
            'sslverify' => $args['sslverify'] ?? null,
            'headers' => $args['headers'] ?? [],
            'cookies' => $args['cookies'] ?? [],
            'user_agent' => $args['user-agent'] ?? null,
        ];

        self::log('REQUEST', $debugInfo);
    }

    /**
     * Debug HTTP response details
     */
    public static function debugResponse($response): void
    {
        if (!self::isDebugEnabled()) {
            return;
        }

        if (is_wp_error($response)) {
            $debugInfo = [
                'timestamp' => date('Y-m-d H:i:s'),
                'error' => true,
                'error_message' => $response->get_error_message(),
                'error_code' => $response->get_error_code(),
                'error_data' => $response->get_error_data(),
            ];
        } else {
            $debugInfo = [
                'timestamp' => date('Y-m-d H:i:s'),
                'error' => false,
                'status_code' => wp_remote_retrieve_response_code($response),
                'status_message' => wp_remote_retrieve_response_message($response),
                'headers' => wp_remote_retrieve_headers($response),
                'body' => wp_remote_retrieve_body($response),
                'cookies' => wp_remote_retrieve_cookies($response),
            ];
        }

        self::log('RESPONSE', $debugInfo);
    }

    /**
     * Debug raw HTTP request (for advanced debugging)
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
     */
    private static function buildRawRequest(string $method, string $url, array $args): string
    {
        $parsedUrl = parse_url($url);
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
     */
    private static function isDebugEnabled(): bool
    {
        return defined('PUBLISHPRESS_HUB_DEBUG_REMOTE') && constant('PUBLISHPRESS_HUB_DEBUG_REMOTE');
    }

    /**
     * Log debug information
     */
    private static function log(string $type, array $data): void
    {
        $logMessage = sprintf(
            '[%s] %s: %s',
            self::DEBUG_PREFIX,
            $type,
            json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );

        error_log($logMessage);
    }

    /**
     * Get debug information as array (useful for testing)
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
