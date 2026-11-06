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
                'x-package-signature' => base64_encode(\sodium_crypto_sign_detached($contents, $secretKey)),
                'x-package-signature-key-id' => 'publishpress-2026',
                'x-package-signature-algorithm' => 'Ed25519',
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
}
