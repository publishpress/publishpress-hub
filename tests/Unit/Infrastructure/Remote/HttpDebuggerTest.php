<?php

declare(strict_types=1);

namespace {
    if (!function_exists('wp_json_encode')) {
        function wp_json_encode($value, int $flags = 0, int $depth = 512)
        {
            // phpcs:ignore WordPress.WP.AlternativeFunctions.json_encode_json_encode -- WordPress is not loaded in unit tests.
            return json_encode($value, $flags, $depth);
        }
    }

    if (!function_exists('wp_parse_url')) {
        function wp_parse_url(string $url)
        {
            // phpcs:ignore WordPress.WP.AlternativeFunctions.parse_url_parse_url -- WordPress is not loaded in unit tests.
            return parse_url($url);
        }
    }

    if (!function_exists('wp_mkdir_p')) {
        function wp_mkdir_p(string $path): bool
        {
            // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.directory_mkdir -- Test stub for WordPress function.
            return is_dir($path) || mkdir($path, 0777, true);
        }
    }

    if (!function_exists('is_wp_error')) {
        function is_wp_error($thing): bool
        {
            return false;
        }
    }

    if (!function_exists('wp_remote_retrieve_response_code')) {
        function wp_remote_retrieve_response_code(array $response): int
        {
            return (int) ($response['response']['code'] ?? 0);
        }
    }

    if (!function_exists('wp_remote_retrieve_response_message')) {
        function wp_remote_retrieve_response_message(array $response): string
        {
            return (string) ($response['response']['message'] ?? '');
        }
    }

    if (!function_exists('wp_remote_retrieve_body')) {
        function wp_remote_retrieve_body(array $response): string
        {
            return (string) ($response['body'] ?? '');
        }
    }
}

namespace PublishPress\Hub\Infrastructure\Remote {
    if (!function_exists('PublishPress\Hub\Infrastructure\Remote\get_option')) {
        function get_option(string $option, $default = false)
        {
            return $option === 'publishpress_hub_debug_mode' ? true : $default;
        }
    }
}

namespace Tests\Unit\Infrastructure\Remote {

    use Codeception\Test\Unit;
    use PublishPress\Hub\Infrastructure\Remote\HttpDebugger;
    use ReflectionMethod;

    /**
     * Unit tests for HTTP debugger response redaction.
     *
     * @coversDefaultClass \PublishPress\Hub\Infrastructure\Remote\HttpDebugger
     */
    class HttpDebuggerTest extends Unit
    {
        protected function setUp(): void
        {
            parent::setUp();

            HttpDebugger::setAllowedRequestUrls(
                'https://publishpress.com',
                ['pkg.publishpress.com', 'downloads.wordpress.org']
            );
        }

        /**
         * Tests that unrelated WordPress HTTP API traffic is ignored.
         *
         * @covers ::debugHttpApiRequest
         */
        public function testDebugHttpApiRequestIgnoresNonHubRequests(): void
        {
            $logFile = $this->createTempLogPath();
            HttpDebugger::setLogFilePath($logFile);

            HttpDebugger::debugHttpApiRequest(
                [
                    'response' => ['code' => 200, 'message' => 'OK'],
                    'body' => wp_json_encode(['token' => 'response-secret']),
                ],
                'response',
                'WP_Http_Curl',
                [
                    'method' => 'POST',
                    'headers' => ['Authorization' => 'Bearer request-secret'],
                    'body' => ['token' => 'request-secret'],
                    'cookies' => ['session' => 'cookie-secret'],
                ],
                'https://api.other-plugin.test/v1/resources'
            );

            $this->assertFileDoesNotExist($logFile);
        }

        /**
         * Tests that Hub-owned request logs redact sensitive request and response data.
         *
         * @covers ::debugHttpApiRequest
         * @covers ::sanitizeBody
         * @covers ::sanitizeHeaders
         * @covers ::sanitizeCookies
         */
        public function testDebugHttpApiRequestRedactsHubRequestData(): void
        {
            $logFile = $this->createTempLogPath();
            HttpDebugger::setLogFilePath($logFile);

            HttpDebugger::debugHttpApiRequest(
                [
                    'response' => ['code' => 200, 'message' => 'OK'],
                    'body' => wp_json_encode([
                        'success' => true,
                        'download_link' => 'https://pkg.publishpress.com/plugin.zip?token=response-secret',
                        'nested' => ['token' => 'response-secret'],
                    ]),
                ],
                'response',
                'WP_Http_Curl',
                [
                    'method' => 'POST',
                    'headers' => [
                        'Authorization' => 'Bearer request-secret',
                        'Cookie' => 'session=cookie-secret',
                        'X-API-Key' => 'header-secret',
                        'Accept' => 'application/json',
                    ],
                    'body' => [
                        'license_key' => 'license-secret',
                        'nested' => ['token' => 'body-secret'],
                    ],
                    'cookies' => ['session' => 'cookie-secret'],
                    'user-agent' => 'PublishPress-Hub/1.0.6; https://example.test',
                ],
                'https://publishpress.com/edd-sl-api/'
            );

            // phpcs:ignore WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown -- Local test log file.
            $logContents = (string) file_get_contents($logFile);

            $this->assertStringContainsString('https://publishpress.com/edd-sl-api/', $logContents);
            $this->assertStringContainsString('[REDACTED]', $logContents);
            $this->assertStringContainsString('application/json', $logContents);
            $this->assertStringNotContainsString('request-secret', $logContents);
            $this->assertStringNotContainsString('header-secret', $logContents);
            $this->assertStringNotContainsString('license-secret', $logContents);
            $this->assertStringNotContainsString('body-secret', $logContents);
            $this->assertStringNotContainsString('cookie-secret', $logContents);
            $this->assertStringNotContainsString('response-secret', $logContents);
            $this->assertStringNotContainsString('download_link', $logContents);
        }

        /**
         * Tests public debug info generation sanitizes request metadata.
         *
         * @covers ::getDebugInfo
         */
        public function testGetDebugInfoRedactsSensitiveRequestMetadata(): void
        {
            $debugInfo = HttpDebugger::getDebugInfo(
                'POST',
                'https://publishpress.com/edd-sl-api/',
                [
                    'headers' => [
                        'Authorization' => 'Bearer request-secret',
                        'X-Auth-Token' => 'token-secret',
                        'Accept' => 'application/json',
                    ],
                    'body' => '{"client_secret":"body-secret","version":"1.2.3"}',
                    'cookies' => ['session' => 'cookie-secret'],
                ]
            );

            $this->assertSame('[REDACTED]', $debugInfo['headers']['Authorization']);
            $this->assertSame('[REDACTED]', $debugInfo['headers']['X-Auth-Token']);
            $this->assertSame('application/json', $debugInfo['headers']['Accept']);
            $this->assertSame('[REDACTED]', $debugInfo['cookies']);
            $this->assertStringContainsString('"version":"1.2.3"', $debugInfo['body']);
            $this->assertStringNotContainsString('body-secret', $debugInfo['body']);

            $debugInfo = HttpDebugger::getDebugInfo(
                'POST',
                'https://publishpress.com/edd-sl-api/',
                ['body' => 'opaque-secret-body']
            );

            $this->assertSame('[non-JSON body redacted]', $debugInfo['body']);
        }

        /**
         * Tests that sensitive EDD response fields are recursively removed or redacted.
         *
         * @covers ::sanitizeResponseBody
         * @covers ::redactSensitiveFields
         */
        public function testSanitizeResponseBodyRedactsSensitiveEddData(): void
        {
            $responseBody = wp_json_encode([
                'success' => true,
                'license' => 'active',
                'expires' => '2026-12-31',
                'activations_left' => 2,
                'customer_email' => 'user@example.com',
                'download_link' => 'https://example.com/plugin.zip?token=secret-token',
                'nested' => [
                    'customer_name' => 'Example User',
                    'token' => 'nested-secret',
                    'version' => '1.2.3',
                ],
            ]);

            $safeBody = $this->invokePrivateMethod('sanitizeResponseBody', [$responseBody]);
            $decodedSafeBody = json_decode($safeBody, true);

            $this->assertTrue($decodedSafeBody['success']);
            $this->assertSame('[REDACTED]', $decodedSafeBody['license']);
            $this->assertSame('[REDACTED]', $decodedSafeBody['nested']['token']);
            $this->assertSame('1.2.3', $decodedSafeBody['nested']['version']);
            $this->assertArrayNotHasKey('expires', $decodedSafeBody);
            $this->assertArrayNotHasKey('activations_left', $decodedSafeBody);
            $this->assertArrayNotHasKey('customer_email', $decodedSafeBody);
            $this->assertArrayNotHasKey('download_link', $decodedSafeBody);
            $this->assertArrayNotHasKey('customer_name', $decodedSafeBody['nested']);
            $this->assertStringNotContainsString('secret-token', $safeBody);
            $this->assertStringNotContainsString('user@example.com', $safeBody);
        }

        /**
         * Tests that non-JSON response bodies are never written to the debug log.
         *
         * @covers ::sanitizeResponseBody
         */
        public function testSanitizeResponseBodyRedactsNonJsonContent(): void
        {
            $safeBody = $this->invokePrivateMethod(
                'sanitizeResponseBody',
                ['<html>Signed download response</html>']
            );

            $this->assertSame('[non-JSON body redacted]', $safeBody);
        }

        /**
         * Tests redaction of an HTTP response embedded in WordPress error data.
         *
         * @covers ::redactSensitiveFields
         * @covers ::sanitizeResponseBody
         */
        public function testRedactSensitiveFieldsSanitizesEmbeddedResponseData(): void
        {
            $errorData = [
                'body' => wp_json_encode([
                    'download_link' => 'https://example.com/plugin.zip?token=secret-token',
                    'customer_email' => 'user@example.com',
                    'version' => '1.2.3',
                ]),
                'headers' => ['set-cookie' => 'license=secret-license'],
                'cookies' => ['license' => 'secret-license'],
            ];

            $safeErrorData = $this->invokePrivateMethod('redactSensitiveFields', [$errorData]);
            $decodedSafeBody = json_decode($safeErrorData['body'], true);

            $this->assertSame('1.2.3', $decodedSafeBody['version']);
            $this->assertArrayNotHasKey('download_link', $decodedSafeBody);
            $this->assertArrayNotHasKey('customer_email', $decodedSafeBody);
            $this->assertArrayNotHasKey('headers', $safeErrorData);
            $this->assertArrayNotHasKey('cookies', $safeErrorData);
        }

        /**
         * Invokes a private static method for focused sanitizer tests.
         *
         * @param string $methodName Method name.
         * @param array<int, mixed> $arguments Method arguments.
         * @return mixed Method result.
         */
        private function invokePrivateMethod(string $methodName, array $arguments)
        {
            $method = new ReflectionMethod(HttpDebugger::class, $methodName);
            $method->setAccessible(true);

            return $method->invokeArgs(null, $arguments);
        }

        /**
         * Creates a unique temporary log path for a test.
         *
         * @return string
         */
        private function createTempLogPath(): string
        {
            // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_tempnam -- Local test log file.
            $logFile = tempnam(sys_get_temp_dir(), 'pp-hub-http-debug-');

            if ($logFile !== false && file_exists($logFile)) {
                // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.file_ops_unlink -- Local test log file.
                unlink($logFile);
            }

            return (string) $logFile;
        }
    }
}
