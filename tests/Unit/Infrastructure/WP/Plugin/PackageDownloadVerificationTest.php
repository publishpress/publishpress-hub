<?php

declare(strict_types=1);

namespace {
    if (!function_exists('wp_tempnam')) {
        function wp_tempnam($url)
        {
            return tempnam(sys_get_temp_dir(), 'hub-download-');
        }
    }
}

namespace PublishPress\Hub\Infrastructure\WP\Plugin {
    final class PackageDownloadTestState
    {
        public static array $response = [];
        public static string $temporaryFile = '';
    }

    function wp_safe_remote_get($url, $args)
    {
        PackageDownloadTestState::$temporaryFile = $args['filename'];
        file_put_contents($args['filename'], 'downloaded package bytes');
        return PackageDownloadTestState::$response;
    }

    function is_wp_error($response)
    {
        return false;
    }

    function wp_remote_retrieve_response_code($response)
    {
        return 200;
    }

    function wp_remote_retrieve_header($response, $name)
    {
        return $response['headers'][$name] ?? '';
    }
}

namespace Tests\Unit\Infrastructure\WP\Plugin {
    use Codeception\Test\Unit;
    use PublishPress\Hub\Infrastructure\WP\Filesystem\WPFileSystemAdapter;
    use PublishPress\Hub\Infrastructure\WP\Plugin\PackageDownloadTestState as State;
    use PublishPress\Hub\Infrastructure\WP\Plugin\WPPluginLifecycleAdapter;
    use ReflectionMethod;
    use RuntimeException;

    class PackageDownloadVerificationTest extends Unit
    {
        private WPPluginLifecycleAdapter $adapter;

        protected function setUp(): void
        {
            parent::setUp();
            $filesystem = $this->getMockBuilder(WPFileSystemAdapter::class)->disableOriginalConstructor()->getMock();
            $this->adapter = new WPPluginLifecycleAdapter($filesystem, []);
            State::$response = [];
            State::$temporaryFile = '';
        }

        protected function tearDown(): void
        {
            if (is_file(State::$temporaryFile)) {
                unlink(State::$temporaryFile);
            }
            parent::tearDown();
        }

        private function download(string $requested, ?string $final = null): string
        {
            if ($final !== null) {
                State::$response['http_response'] = new class ($final) {
                    private string $url;
                    public function __construct(string $url) { $this->url = $url; }
                    public function get_response_object() { return (object) ['url' => $this->url]; }
                };
            }
            $method = new ReflectionMethod($this->adapter, 'downloadPackage');
            $method->setAccessible(true);
            return $method->invoke($this->adapter, $requested);
        }

        public function testRedirectsCannotStripSignatureRequirementAndRejectedFilesAreDeleted(): void
        {
            foreach ([
                ['https://pkg.publishpress.com/v1/packages/download/new-plugin/1.0.0', null],
                ['https://pkg.publishpress.com/v1/packages/download/new-plugin/1.0.0', 'https://cdn.example.org/plugin.zip'],
                ['https://store.example.org/download', 'https://pkg-staging.publishpress.com/v1/packages/download/new-plugin/1.0.0'],
            ] as [$requested, $final]) {
                try {
                    $this->download($requested, $final);
                    $this->fail('Expected missing headers to reject the download.');
                } catch (RuntimeException $error) {
                    $this->assertSame('The package signature headers are missing or invalid.', $error->getMessage());
                    $this->assertFileDoesNotExist(State::$temporaryFile);
                }
            }
        }

        public function testWordPressOrgDownloadsRemainUsableWithoutSignatureHeaders(): void
        {
            $file = $this->download('https://downloads.wordpress.org/plugin/example.zip');
            $this->assertFileExists($file);
        }

        public function testVerifiedPackageIsReturnedAndTamperedPackageIsDeleted(): void
        {
            if (!function_exists('sodium_crypto_sign_keypair')) {
                $this->markTestSkipped('The Sodium extension is not available.');
            }
            $pair = sodium_crypto_sign_keypair();
            $publicKey = sodium_crypto_sign_publickey($pair);
            $secretKey = sodium_crypto_sign_secretkey($pair);
            $filesystem = $this->getMockBuilder(WPFileSystemAdapter::class)->disableOriginalConstructor()->getMock();
            $this->adapter = new WPPluginLifecycleAdapter($filesystem, [], ['test-key' => base64_encode($publicKey)]);
            $url = 'https://pkg.publishpress.com/v1/packages/download/new-plugin/1.0.0';
            foreach (['downloaded package bytes', 'different package bytes'] as $signedBytes) {
                State::$response = ['headers' => [
                    'x-publishpress-signature' => base64_encode(sodium_crypto_sign_detached($signedBytes, $secretKey)),
                    'x-publishpress-signature-key-id' => 'test-key',
                ]];
                if ($signedBytes === 'downloaded package bytes') {
                    $file = $this->download($url);
                    $this->assertFileExists($file);
                    unlink($file);
                    continue;
                }
                try {
                    $this->download($url);
                    $this->fail('Expected altered bytes to fail verification.');
                } catch (RuntimeException $error) {
                    $this->assertSame('The downloaded package signature is invalid.', $error->getMessage());
                    $this->assertFileDoesNotExist(State::$temporaryFile);
                }
            }
        }
    }
}
