<?php

declare(strict_types=1);

namespace Tests\Unit\Infrastructure\WP\Plugin;

use Codeception\Test\Unit;
use PublishPress\Hub\Infrastructure\WP\Plugin\PackageSignatureVerifier;
use RuntimeException;

class PackageSignatureVerifierTest extends Unit
{
    public function testVerifiesMatchingPackageBytes(): void
    {
        if (!function_exists('sodium_crypto_sign_keypair')) {
            $this->markTestSkipped('The Sodium extension is not available.');
        }

        $keyPair = \sodium_crypto_sign_keypair();
        $publicKey = \sodium_crypto_sign_publickey($keyPair);
        $secretKey = \sodium_crypto_sign_secretkey($keyPair);
        $contents = 'signed package bytes';
        $file = tempnam(sys_get_temp_dir(), 'hub-signature-');
        file_put_contents($file, $contents);

        $verifier = new PackageSignatureVerifier(
            ['publishpress-2026' => base64_encode($publicKey)],
            ['publishpress-authors-pro']
        );
        $verifier->verify(
            'https://pkg.publishpress.com/v1/packages/download/publishpress-authors-pro/4.0.0',
            $file,
            [
                'x-publishpress-signature' => base64_encode(\sodium_crypto_sign_detached($contents, $secretKey)),
                'x-publishpress-signature-key-id' => 'publishpress-2026',
            ]
        );

        unlink($file);
        $this->assertTrue(true);
    }

    public function testRejectsMissingHeadersForRequiredRepository(): void
    {
        $file = tempnam(sys_get_temp_dir(), 'hub-signature-');
        file_put_contents($file, 'package');
        $verifier = new PackageSignatureVerifier([], ['publishpress-authors-pro']);

        try {
            $verifier->verify(
                'https://pkg.publishpress.com/v1/packages/download/publishpress-authors-pro/4.0.0',
                $file,
                []
            );
            $this->fail('Expected missing signature headers to be rejected.');
        } catch (RuntimeException $error) {
            $this->assertSame('The package signature headers are missing or invalid.', $error->getMessage());
        } finally {
            unlink($file);
        }
    }

    public function testLeavesUnenrolledDownloadsUnchanged(): void
    {
        $verifier = new PackageSignatureVerifier([], ['publishpress-authors-pro']);
        $verifier->verify('https://downloads.wordpress.org/plugin/example.zip', __FILE__, []);

        $this->assertTrue(true);
    }

    public function testRejectsChangedBytesAndUnknownKeys(): void
    {
        if (!function_exists('sodium_crypto_sign_keypair')) {
            $this->markTestSkipped('The Sodium extension is not available.');
        }

        $pair = \sodium_crypto_sign_keypair();
        $key = \sodium_crypto_sign_publickey($pair);
        $signature = base64_encode(\sodium_crypto_sign_detached('original bytes', \sodium_crypto_sign_secretkey($pair)));
        $file = tempnam(sys_get_temp_dir(), 'hub-signature-');
        file_put_contents($file, 'changed bytes');
        $url = 'https://pkg.publishpress.com/v1/packages/download/plugin-pro/1.0.0';
        $verifier = new PackageSignatureVerifier(['test-key' => base64_encode($key)], ['plugin-pro']);

        try {
            foreach (['test-key', 'unknown-key'] as $keyId) {
                try {
                    $verifier->verify($url, $file, [
                        'x-publishpress-signature' => $signature,
                        'x-publishpress-signature-key-id' => $keyId,
                    ]);
                    $this->fail('Expected invalid signature data to be rejected.');
                } catch (RuntimeException $error) {
                    $this->assertSame(
                        $keyId === 'test-key' ? 'The downloaded package signature is invalid.' : 'The package was signed with an unknown key.',
                        $error->getMessage()
                    );
                }
            }
        } finally {
            unlink($file);
        }
    }
}
