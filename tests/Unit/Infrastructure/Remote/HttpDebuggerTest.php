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
    }
}
