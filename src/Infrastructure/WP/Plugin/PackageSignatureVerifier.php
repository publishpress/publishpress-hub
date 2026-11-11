<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WP\Plugin;

defined('ABSPATH') || exit;

use RuntimeException;

class PackageSignatureVerifier
{
    public const PUBLIC_KEYS = [
        'publishpress-2026' => '3lrm9KcDTOt0Bapj04Wav/eaU7YaHsVwBd4MUHMDx18=',
        'metaslider-2026' => 'I63LA0oHn3BjOUaj2wcXKLaCX6AkDBi3FxaKQhtEjZ4=',
    ];

    private array $publicKeys;

    private array $requiredRepositories;

    public function __construct(array $publicKeys, array $requiredRepositories)
    {
        $this->publicKeys = $publicKeys;
        $this->requiredRepositories = array_map('strtolower', $requiredRepositories);
    }

    public function requiresSignature(string $downloadUrl): bool
    {
        $path = (string) parse_url($downloadUrl, PHP_URL_PATH); // phpcs:ignore WordPress.WP.AlternativeFunctions.parse_url_parse_url
        if (!preg_match('#/v1/packages/download/([^/]+)/#', $path, $matches)) {
            return false;
        }

        return in_array(strtolower(rawurldecode($matches[1])), $this->requiredRepositories, true);
    }

    public function verify(string $downloadUrl, string $file, array $headers): void
    {
        $signature = $headers['x-publishpress-signature'] ?? '';
        $keyId = $headers['x-publishpress-signature-key-id'] ?? '';

        if (!$this->requiresSignature($downloadUrl) && $signature === '' && $keyId === '') {
            return;
        }

        if ($signature === '' || $keyId === '') {
            throw new RuntimeException('The package signature headers are missing or invalid.');
        }

        if (!isset($this->publicKeys[$keyId])) {
            throw new RuntimeException('The package was signed with an unknown key.');
        }

        if (!function_exists('sodium_crypto_sign_verify_detached')) {
            throw new RuntimeException('Ed25519 package verification is not available on this server.');
        }

        $publicKey = base64_decode((string) $this->publicKeys[$keyId], true);
        $decodedSignature = base64_decode((string) $signature, true);
        // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents, WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown -- Reads a local temporary ZIP.
        $contents = file_get_contents($file);

        if (
            $publicKey === false || strlen($publicKey) !== SODIUM_CRYPTO_SIGN_PUBLICKEYBYTES
            || $decodedSignature === false || strlen($decodedSignature) !== SODIUM_CRYPTO_SIGN_BYTES
            || $contents === false
            || !sodium_crypto_sign_verify_detached($decodedSignature, $contents, $publicKey)
        ) {
            throw new RuntimeException('The downloaded package signature is invalid.');
        }
    }
}
