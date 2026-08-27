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

    private const LEGACY_CONSTANT = 'PUBLISHPRESS_HUB_DEBUG_REMOTE';

    private const DEBUG_MODE_OPTION = 'publishpress_hub_debug_mode';

    private static bool $initialized = false;

    private static ?string $logFilePath = null;

    /**
     * Returns the current UTC timestamp with millisecond precision.
     *
     * @return string Formatted as "Y-m-d H:i:s.mmm".
     * @since 1.0.0
     */
    private static function timestamp(): string
    {
        $microtime = microtime(true);
        $milliseconds = sprintf('%03d', (int) (($microtime - floor($microtime)) * 1000));

        return gmdate('Y-m-d H:i:s', (int) $microtime) . '.' . $milliseconds;
    }

    /**
     * Sets the path to the debug log file.
     *
     * Must be called before initialize() so that log entries are written to
     * the correct location rather than falling back to error_log.
     *
     * @param string $logFilePath Absolute path to the log file.
     * @return void
     * @since 1.0.0
     */
    public static function setLogFilePath(string $logFilePath): void
    {
        self::$logFilePath = $logFilePath;
    }

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
        if (self::$initialized) {
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

        $debugInfo = [
            'timestamp' => self::timestamp(),
            'method' => $parsed_args['method'] ?? 'GET',
            'url' => $url,
            'body' => self::redactSensitiveFields($parsed_args['body'] ?? []),
            'timeout' => $parsed_args['timeout'] ?? null,
            'sslverify' => $parsed_args['sslverify'] ?? null,
            'headers' => $parsed_args['headers'] ?? [],
            'cookies' => $parsed_args['cookies'] ?? [],
            'user_agent' => $parsed_args['user-agent'] ?? null,
        ];

        self::log('REQUEST', $debugInfo);

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
            'timestamp' => self::timestamp(),
            'error' => true,
            'error_message' => $response->get_error_message(),
            'error_code' => $response->get_error_code(),
            'error_data' => $response->get_error_data(),
        ] : [
            'timestamp' => self::timestamp(),
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

        $headers = $args['headers'] ?? [];
        foreach ($headers as $name => $value) {
            $request .= $name . ': ' . $value . "\r\n";
        }

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
     * Check if debugging is enabled.
     *
     * Debugging is active when the constant PUBLISHPRESS_HUB_DEBUG_REMOTE is
     * truthy OR when the publishpress_hub_debug_mode WP option is set to true.
     *
     * @return bool True if debugging is enabled, false otherwise.
     * @since 1.0.0
     */
    public static function isDebugEnabled(): bool
    {
        if (defined(self::LEGACY_CONSTANT) && constant(self::LEGACY_CONSTANT)) {
            return true;
        }

        return (bool) get_option(self::DEBUG_MODE_OPTION, false);
    }

    /**
     * Log debug information to the configured log file or PHP error log.
     *
     * @param string $type The type.
     * @param array<string, mixed> $data The data.
     * @since 1.0.0
     */
    private static function log(string $type, array $data): void
    {
        $directionPrefix = self::getDirectionPrefix($type);
        $logMessage = sprintf(
            '[%s] %s: %s',
            self::DEBUG_PREFIX,
            $directionPrefix . ' ' . $type,
            wp_json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );

        if (self::$logFilePath !== null) {
            if (!self::ensureLogDirectoryExists(dirname(self::$logFilePath))) {
                return;
            }

            // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents, WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_file_put_contents
            $bytesWritten = file_put_contents(self::$logFilePath, $logMessage . "\n", FILE_APPEND | LOCK_EX);

            if ($bytesWritten !== false) {
                // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_chmod, WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_chmod, WordPressVIPMinimum.Functions.RestrictedFunctions.chmod_chmod
                chmod(self::$logFilePath, 0600);
            }

            return;
        }

        // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
        error_log($logMessage);
    }

    /**
     * Redacts sensitive fields from a request body before logging.
     *
     * Any field whose key matches a known sensitive name is replaced with
     * a masked value that preserves the first and last characters so the
     * key can still be identified in the log without exposing the full value.
     *
     * @param mixed $body The raw request body (array or string).
     * @return mixed The sanitized body.
     * @since 1.0.0
     */
    private static function redactSensitiveFields($body)
    {
        if (!is_array($body)) {
            return $body;
        }

        $sensitiveKeys = ['license', 'license_key', 'key', 'secret', 'password', 'token', 'api_key'];

        foreach ($body as $field => $value) {
            if (!in_array(strtolower((string) $field), $sensitiveKeys, true)) {
                continue;
            }

            $value = (string) $value;
            $length = strlen($value);

            if ($length <= 4) {
                $body[$field] = str_repeat('*', $length);
            } else {
                $body[$field] = $value[0] . str_repeat('*', $length - 2) . $value[$length - 1];
            }
        }

        return $body;
    }

    /**
     * Returns a visual direction prefix for request/response log entries.
     *
     * @param string $type Log entry type.
     * @return string Direction marker.
     * @since 1.0.0
     */
    private static function getDirectionPrefix(string $type): string
    {
        if ($type === 'REQUEST' || $type === 'RAW_REQUEST') {
            return '->';
        }

        if ($type === 'RESPONSE') {
            return '<-';
        }

        return '--';
    }

    /**
     * Ensure the target log directory exists before writing logs.
     *
     * @param string $logDir Absolute path to the log directory.
     * @return bool True when the directory is ready for secure log writes.
     * @since 1.0.0
     */
    private static function ensureLogDirectoryExists(string $logDir): bool
    {
        if (is_dir($logDir)) {
            return true;
        }

        if (!wp_mkdir_p($logDir)) {
            return false;
        }

        // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_chmod, WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_chmod, WordPressVIPMinimum.Functions.RestrictedFunctions.chmod_chmod
        return chmod($logDir, 0700);
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
