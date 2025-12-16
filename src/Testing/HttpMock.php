<?php

/**
 * HTTP Mock for testing.
 *
 * Intercepts HTTP requests to external services and returns mock responses.
 * Only enabled in local/test environments.
 *
 * @package PublishPress\Hub\Testing
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Testing;

/**
 * HTTP Mock class for intercepting external HTTP requests during tests.
 *
 * @since 1.0.0
 */
class HttpMock
{
    private static bool $enabled = false;

    /**
     * Enable HTTP mocking.
     *
     * @since 1.0.0
     */
    public static function enable(): void
    {
        if (self::$enabled) {
            return;
        }

        self::$enabled = true;

        // Register the filter with high priority to intercept before any other filters
        add_filter('pre_http_request', [self::class, 'interceptRequest'], PHP_INT_MAX, 3);

        // Also hook into plugins_api for WordPress.org plugin information
        add_filter('plugins_api', [self::class, 'mockPluginsApi'], PHP_INT_MAX, 3);
    }

    /**
     * Mock plugins_api for WordPress.org plugin information.
     *
     * @param false|object|\WP_Error $result
     * @param string $action
     * @param object $args
     * @return false|object|\WP_Error
     * @since 1.0.0
     */
    public static function mockPluginsApi($result, string $action, $args)
    {
        if ($action !== 'plugin_information') {
            return $result;
        }

        $slug = is_object($args) && isset($args->slug) ? $args->slug : '';
        if (empty($slug)) {
            return $result;
        }

        return (object) [
            'name' => ucwords(str_replace('-', ' ', $slug)),
            'slug' => $slug,
            'version' => '1.0.0',
            'author' => 'Test Author',
            'author_profile' => 'https://wordpress.org/plugins/',
            'contributors' => [],
            'requires' => '5.0',
            'tested' => '6.4',
            'requires_php' => '7.4',
            'compatibility' => [],
            'rating' => 100,
            'ratings' => [],
            'num_ratings' => 0,
            'support_threads' => 0,
            'support_threads_resolved' => 0,
            'active_installs' => 0,
            'downloaded' => 0,
            'last_updated' => gmdate('Y-m-d H:i:s'),
            'added' => gmdate('Y-m-d'),
            'homepage' => 'https://wordpress.org/plugins/' . $slug . '/',
            'short_description' => 'Test plugin description',
            'description' => 'Test plugin description',
            'download_link' => 'https://downloads.wordpress.org/plugin/' . $slug . '.zip',
            'sections' => [
                'description' => 'Test plugin description',
            ],
            'banners' => [],
            'icons' => [],
        ];
    }

    /**
     * Intercept HTTP requests.
     *
     * @param false|array|\WP_Error $preempt
     * @param array<string, mixed> $args
     * @param string $url
     * @return false|array|\WP_Error
     * @since 1.0.0
     */
    public static function interceptRequest($preempt, array $args, string $url)
    {
        // Already preempted by another filter
        if ($preempt !== false) {
            return $preempt;
        }

        // Check if this is a publishpress.com request (except pkg.publishpress.com for downloads)
        if (strpos($url, 'publishpress.com') !== false && strpos($url, 'pkg.publishpress.com') === false) {
            return self::mockEddResponse($url, $args);
        }

        // Check for WordPress.org API calls
        if (strpos($url, 'api.wordpress.org') !== false) {
            return self::mockWpOrgResponse($url, $args);
        }

        // Check for plugin download URLs
        if (self::isPluginDownloadUrl($url)) {
            return self::mockPluginDownload($url);
        }

        return $preempt;
    }

    /**
     * Check if URL is a plugin download URL.
     *
     * @param string $url The URL to check.
     * @return bool True if it's a download URL.
     * @since 1.0.0
     */
    private static function isPluginDownloadUrl(string $url): bool
    {
        $downloadDomains = [
            'downloads.wordpress.org',
            'pkg.publishpress.com',
        ];

        foreach ($downloadDomains as $domain) {
            if (strpos($url, $domain) !== false && strpos($url, '.zip') !== false) {
                return true;
            }
        }

        return false;
    }

    /**
     * Mock EDD API response.
     *
     * @param string $url The request URL.
     * @param array<string, mixed> $args The request arguments.
     * @return array<string, mixed> The mock response.
     * @since 1.0.0
     */
    private static function mockEddResponse(string $url, array $args): array
    {
        // Extract parameters from body
        $body = $args['body'] ?? [];
        if (is_string($body)) {
            parse_str($body, $body);
        }
        if (!is_array($body)) {
            $body = [];
        }

        $action = $body['edd_action'] ?? '';
        $licenseKey = $body['license'] ?? '';
        $downloadId = isset($body['item_id']) ? (int) $body['item_id'] : 0;

        // If no action detected, assume activate_license (most common during plugin install)
        if (empty($action) && !empty($body)) {
            $action = 'activate_license';
        }

        // Determine license status - only treat obviously fake keys as invalid
        $isFakeLicense = $licenseKey === '1234567890' || empty($licenseKey);
        $licenseStatus = $isFakeLicense ? 'invalid' : 'valid';

        $responseData = [];

        switch ($action) {
            case 'check_license':
                $responseData = [
                    'license' => $licenseStatus,
                    'item_id' => $downloadId,
                    'item_name' => 'Test Plugin',
                    'success' => !$isFakeLicense,
                    'expires' => gmdate('Y-m-d', strtotime('+1 year')),
                    'payment_id' => 12345,
                    'customer_name' => 'Test Customer',
                    'customer_email' => 'test@example.com',
                ];
                break;

            case 'activate_license':
                $responseData = [
                    'license' => $licenseStatus,
                    'item_id' => $downloadId,
                    'item_name' => 'Test Plugin',
                    'success' => !$isFakeLicense,
                    'expires' => gmdate('Y-m-d', strtotime('+1 year')),
                ];
                break;

            case 'deactivate_license':
                $responseData = [
                    'license' => 'deactivated',
                    'item_id' => $downloadId,
                    'success' => true,
                ];
                break;

            case 'get_version':
                if ($isFakeLicense) {
                    return self::formatResponse([
                        'success' => false,
                        'error' => 'Invalid license key',
                    ], 400);
                }
                $responseData = [
                    'new_version' => '1.0.0',
                    'stable_version' => '1.0.0',
                    'name' => 'Test Plugin Pro',
                    'slug' => 'test-plugin-pro',
                    'url' => 'https://publishpress.com/test-plugin/',
                    'package' => 'https://pkg.publishpress.com/test-plugin-pro.zip',
                    'download_link' => 'https://pkg.publishpress.com/test-plugin-pro.zip',
                    'sections' => [
                        'description' => 'Test plugin description',
                        'changelog' => 'Test changelog',
                    ],
                    'banners' => [],
                    'icons' => [],
                    'tested' => '6.4',
                    'requires' => '5.0',
                    'requires_php' => '7.4',
                ];
                break;

            default:
                // Return a generic success for unknown actions
                $responseData = [
                    'success' => !$isFakeLicense,
                    'license' => $licenseStatus,
                ];
                break;
        }

        return self::formatResponse($responseData);
    }

    /**
     * Mock WordPress.org API response.
     *
     * @param string $url The request URL.
     * @param array<string, mixed> $args The request arguments.
     * @return array<string, mixed> The mock response.
     * @since 1.0.0
     */
    private static function mockWpOrgResponse(string $url, array $args): array
    {
        // Extract plugin slug from URL
        $slug = '';
        if (preg_match('/plugins\/info\/[^\/]+\/([^\/\?]+)/', $url, $matches)) {
            $slug = $matches[1];
        }

        $responseData = [
            'name' => ucwords(str_replace('-', ' ', $slug ?: 'Test Plugin')),
            'slug' => $slug ?: 'test-plugin',
            'version' => '1.0.0',
            'author' => 'Test Author',
            'download_link' => 'https://downloads.wordpress.org/plugin/' . ($slug ?: 'test-plugin') . '.zip',
            'tested' => '6.4',
            'requires' => '5.0',
            'requires_php' => '7.4',
            'sections' => [
                'description' => 'Test plugin description',
            ],
        ];

        // WordPress.org API returns serialized data for some endpoints
        $body = maybe_serialize((object) $responseData);

        return [
            'headers' => ['content-type' => 'application/php-serialized'],
            'body' => $body,
            'response' => ['code' => 200, 'message' => 'OK'],
            'cookies' => [],
            'filename' => null,
        ];
    }

    /**
     * Mock plugin download response.
     *
     * @param string $url The download URL.
     * @return array<string, mixed> The mock response.
     * @since 1.0.0
     */
    private static function mockPluginDownload(string $url): array
    {
        // Create a minimal valid ZIP file for testing
        $tmpFile = tempnam(sys_get_temp_dir(), 'pp_mock_plugin_');

        if (class_exists('ZipArchive')) {
            $zip = new \ZipArchive();
            if ($zip->open($tmpFile, \ZipArchive::CREATE) === true) {
                // Extract plugin slug from URL
                preg_match('/([^\/]+)\.zip/', $url, $matches);
                $slug = $matches[1] ?? 'test-plugin';

                $zip->addFromString($slug . '/' . $slug . '.php', '<?php
/**
 * Plugin Name: ' . ucwords(str_replace('-', ' ', $slug)) . '
 * Version: 1.0.0
 */
');
                $zip->addFromString($slug . '/readme.txt', '=== ' . ucwords(str_replace('-', ' ', $slug)) . ' ===
Version: 1.0.0
');
                $zip->close();
            }
        }

        $content = '';
        if (file_exists($tmpFile)) {
            $content = file_get_contents($tmpFile);
            unlink($tmpFile);
        }

        return [
            'headers' => ['content-type' => 'application/zip'],
            'body' => $content,
            'response' => ['code' => 200, 'message' => 'OK'],
            'cookies' => [],
            'filename' => null,
        ];
    }

    /**
     * Format response for WordPress HTTP API.
     *
     * @param array<string, mixed> $data The response data.
     * @param int $statusCode The HTTP status code.
     * @return array<string, mixed> The formatted response.
     * @since 1.0.0
     */
    private static function formatResponse(array $data, int $statusCode = 200): array
    {
        return [
            'headers' => ['content-type' => 'application/json'],
            'body' => wp_json_encode($data),
            'response' => [
                'code' => $statusCode,
                'message' => $statusCode === 200 ? 'OK' : 'Bad Request',
            ],
            'cookies' => [],
            'filename' => null,
        ];
    }
}

