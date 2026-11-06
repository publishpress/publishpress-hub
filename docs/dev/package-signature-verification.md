# Package Signature Verification

PublishPress Hub verifies detached Ed25519 signatures before installing or upgrading enrolled Pro packages. Package Server returns the signature, key ID, and algorithm in response headers; Hub checks those headers against a public key pinned in WordPress configuration before WordPress unpacks or copies any files.

## Configuration

Define the public key map and enrolled repositories in `wp-config.php`:

```php
define('PUBLISHPRESS_HUB_PACKAGE_SIGNATURE_PUBLIC_KEYS', [
    'publishpress-2026' => 'BASE64_RAW_ED25519_PUBLIC_KEY',
]);

define('PUBLISHPRESS_HUB_SIGNED_PACKAGE_REPOSITORIES', [
    'publishpress-authors-pro',
]);
```

The public key value is the base64 encoding of the raw 32-byte Ed25519 public key. Keep old keys in the map while packages signed by them can still be downloaded.

## Rollout

1. Configure the Pro release workflow to upload `<zip-name>.sig`.
2. Configure the matching public key in Package Server.
3. Enroll one repository in Package Server and resync its existing releases. Package Server verifies that the signed GitHub bytes match R2 before adding signature metadata; it does not replace the ZIP.
4. Confirm every stored release returns the three signature headers.
5. Add that repository to `PUBLISHPRESS_HUB_SIGNED_PACKAGE_REPOSITORIES`.

An enrolled package with missing, unknown, or invalid signature data fails before installation or upgrade. Unenrolled repositories and WordPress.org downloads retain their existing behavior.
