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

    private const NON_JSON_BODY_REDACTED = '[non-JSON body redacted]';

    private const REDACTED_VALUE = '[REDACTED]';

    private const SENSITIVE_KEYS = [
        'api_key',
        'apikey',
        'auth',
        'authorization',
        'bearer',
        'client_secret',
        'cookie',
        'key',
        'license',
        'license_key',
        'password',
        'secret',
        'token',
    ];

    private const DEFAULT_ALLOWED_REQUEST_HOSTS = [
        'api.wordpress.org',
        'downloads.wordpress.org',
        'pkg.publishpress.com',
        'publishpress.com',
    ];

    private const OMITTED_RESPONSE_KEYS = [
        'activation_count',
        'activations',
        'activations_left',
        'cookies',
        'customer_email',
        'customer_first_name',
        'customer_last_name',
        'customer_name',
        'download_link',
        'download_url',
        'email',
        'expiration',
        'expiration_date',
        'expires',
        'headers',
        'license_limit',
        'site_count',
    ];

    private static bool $initialized = false;

    private static ?string $logFilePath = null;

    /**
     * @var array<string>
     */
    private static array $allowedRequestHosts = self::DEFAULT_ALLOWED_REQUEST_HOSTS;

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
     * Sets the URLs and hosts that may be logged by the HTTP debugger.
     *
     * @param string $eddSubscriptionApiUrl Configured EDD API endpoint URL.
     * @param array<string> $downloadDomains Trusted plugin download domains.
     * @return void
     * @since 1.0.6
     */
    public static function setAllowedRequestUrls(string $eddSubscriptionApiUrl, array $downloadDomains = []): void
    {
        $allowedHosts = self::DEFAULT_ALLOWED_REQUEST_HOSTS;
        $eddHost = self::extractHost($eddSubscriptionApiUrl);

        if ($eddHost !== null) {
            $allowedHosts[] = $eddHost;
        }

        foreach ($downloadDomains as $domain) {
            $normalizedDomain = self::normalizeHost((string) $domain);

            if ($normalizedDomain !== '') {
                $allowedHosts[] = $normalizedDomain;
            }
        }

        self::$allowedRequestHosts = array_values(array_unique($allowedHosts));
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

        if (!self::isAllowedRequestUrl($url)) {
            return;
        }

        $debugInfo = [
            'timestamp' => self::timestamp(),
            'method' => $parsed_args['method'] ?? 'GET',
            'url' => $url,
            'body' => self::sanitizeBody($parsed_args['body'] ?? []),
            'timeout' => $parsed_args['timeout'] ?? null,
            'sslverify' => $parsed_args['sslverify'] ?? null,
            'headers' => self::sanitizeHeaders($parsed_args['headers'] ?? []),
            'cookies' => self::sanitizeCookies($parsed_args['cookies'] ?? []),
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

        $debugInfo = ['timestamp' => self::timestamp()] + self::formatResponse($response);

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

        if (!self::isAllowedRequestUrl($url)) {
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
        $headers = self::sanitizeHeaders(is_array($headers) ? $headers : []);

        foreach ($headers as $name => $value) {
            $request .= $name . ': ' . self::formatHeaderValue($value) . "\r\n";
        }

        if (isset($args['body'])) {
            $sanitizedBody = self::sanitizeBody($args['body']);
            $body = is_array($sanitizedBody) ? http_build_query($sanitizedBody) : (string) $sanitizedBody;
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
     * Redacts sensitive fields before logging.
     *
     * Any field whose key matches a known sensitive name is replaced with
     * a masked value that preserves the first and last characters so the
     * key can still be identified in the log without exposing the full value.
     *
     * @param mixed $body The data to sanitize.
     * @return mixed The sanitized body.
     * @since 1.0.0
     */
    private static function redactSensitiveFields($body)
    {
        if (!is_array($body)) {
            return $body;
        }

        foreach ($body as $field => $value) {
            $normalizedField = self::normalizeSensitiveKey((string) $field);

            if (in_array($normalizedField, self::OMITTED_RESPONSE_KEYS, true)) {
                unset($body[$field]);
                continue;
            }

            if (self::isSensitiveKey($normalizedField)) {
                $body[$field] = self::REDACTED_VALUE;
                continue;
            }

            if ($normalizedField === 'body' && is_string($value)) {
                $body[$field] = self::sanitizeResponseBody($value);
                continue;
            }

            $body[$field] = self::redactSensitiveFields($value);
        }

        return $body;
    }

    /**
     * Sanitizes an HTTP response body for debug logging.
     *
     * @param string $rawBody The raw response body.
     * @return string The sanitized JSON body or a redaction notice.
     * @since 1.0.6
     */
    private static function sanitizeResponseBody(string $rawBody): string
    {
        $decodedBody = json_decode($rawBody, true);

        if (!is_array($decodedBody)) {
            return self::NON_JSON_BODY_REDACTED;
        }

        $safeBody = wp_json_encode(
            self::redactSensitiveFields($decodedBody),
            JSON_UNESCAPED_SLASHES
        );

        return is_string($safeBody) ? $safeBody : self::NON_JSON_BODY_REDACTED;
    }

    /**
     * Sanitizes a request or response body before logging.
     *
     * @param mixed $body Body value.
     * @return mixed Sanitized body.
     * @since 1.0.6
     */
    private static function sanitizeBody($body)
    {
        if (is_array($body)) {
            return self::redactSensitiveFields($body);
        }

        if (!is_string($body)) {
            return $body;
        }

        $decodedJson = json_decode($body, true);
        if (is_array($decodedJson)) {
            $safeBody = wp_json_encode(self::redactSensitiveFields($decodedJson), JSON_UNESCAPED_SLASHES);

            return is_string($safeBody) ? $safeBody : self::NON_JSON_BODY_REDACTED;
        }

        if (strpos($body, '=') === false) {
            return self::NON_JSON_BODY_REDACTED;
        }

        parse_str($body, $parsedBody);
        if (is_array($parsedBody) && !empty($parsedBody)) {
            return http_build_query(self::redactSensitiveFields($parsedBody));
        }

        return self::NON_JSON_BODY_REDACTED;
    }

    /**
     * Sanitizes request headers before logging.
     *
     * @param mixed $headers Request headers.
     * @return array<string, mixed>
     * @since 1.0.6
     */
    private static function sanitizeHeaders($headers): array
    {
        if (!is_array($headers)) {
            return [];
        }

        foreach ($headers as $name => $value) {
            if (self::isSensitiveKey(self::normalizeSensitiveKey((string) $name))) {
                $headers[$name] = self::REDACTED_VALUE;
                continue;
            }

            $headers[$name] = is_array($value) ? self::redactSensitiveFields($value) : $value;
        }

        return $headers;
    }

    /**
     * Sanitizes cookies before logging.
     *
     * @param mixed $cookies Request cookies.
     * @return array<string, string>|string
     * @since 1.0.6
     */
    private static function sanitizeCookies($cookies)
    {
        if (empty($cookies)) {
            return [];
        }

        return self::REDACTED_VALUE;
    }

    /**
     * Checks whether the URL belongs to PublishPress Hub HTTP traffic.
     *
     * @param string $url Request URL.
     * @return bool
     * @since 1.0.6
     */
    private static function isAllowedRequestUrl(string $url): bool
    {
        $host = self::extractHost($url);

        return $host !== null && in_array($host, self::$allowedRequestHosts, true);
    }

    /**
     * Extracts and normalizes the host from a URL.
     *
     * @param string $url URL.
     * @return string|null
     * @since 1.0.6
     */
    private static function extractHost(string $url): ?string
    {
        $parsedUrl = wp_parse_url($url);

        if (!is_array($parsedUrl) || empty($parsedUrl['host'])) {
            return null;
        }

        $host = self::normalizeHost((string) $parsedUrl['host']);

        return $host !== '' ? $host : null;
    }

    /**
     * Normalizes a host for exact allowlist comparison.
     *
     * @param string $host Hostname.
     * @return string
     * @since 1.0.6
     */
    private static function normalizeHost(string $host): string
    {
        return rtrim(strtolower(trim($host)), '.');
    }

    /**
     * Normalizes keys before sensitive-name comparison.
     *
     * @param string $key Field or header name.
     * @return string
     * @since 1.0.6
     */
    private static function normalizeSensitiveKey(string $key): string
    {
        return str_replace(['-', ' '], '_', strtolower($key));
    }

    /**
     * Checks whether a key or header name is sensitive.
     *
     * @param string $normalizedKey Normalized field or header name.
     * @return bool
     * @since 1.0.6
     */
    private static function isSensitiveKey(string $normalizedKey): bool
    {
        if (in_array($normalizedKey, self::SENSITIVE_KEYS, true)) {
            return true;
        }

        return strpos($normalizedKey, 'api_key') !== false
            || strpos($normalizedKey, 'auth_token') !== false
            || strpos($normalizedKey, 'authorization') !== false
            || strpos($normalizedKey, 'bearer') !== false
            || strpos($normalizedKey, 'cookie') !== false
            || strpos($normalizedKey, 'password') !== false
            || strpos($normalizedKey, 'secret') !== false
            || strpos($normalizedKey, 'token') !== false;
    }

    /**
     * Formats a sanitized header value for raw request logs.
     *
     * @param mixed $value Header value.
     * @return string
     * @since 1.0.6
     */
    private static function formatHeaderValue($value): string
    {
        if (is_array($value)) {
            return implode(', ', array_map('strval', $value));
        }

        return (string) $value;
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
            'body' => self::sanitizeBody($args['body'] ?? []),
            'timeout' => $args['timeout'] ?? null,
            'sslverify' => $args['sslverify'] ?? null,
            'headers' => self::sanitizeHeaders($args['headers'] ?? []),
            'cookies' => self::sanitizeCookies($args['cookies'] ?? []),
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
            ];
        }

        return [
            'error' => false,
            'status_code' => wp_remote_retrieve_response_code($response),
            'status_message' => wp_remote_retrieve_response_message($response),
            'body' => self::sanitizeResponseBody(wp_remote_retrieve_body($response)),
        ];
    }
}
