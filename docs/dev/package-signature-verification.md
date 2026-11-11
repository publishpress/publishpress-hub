# Package Signature Verification

Hub verifies detached Ed25519 signatures before installing or upgrading enrolled Pro packages. Package Server returns `X-PublishPress-Signature` and `X-PublishPress-Signature-Key-Id`. Hub checks the downloaded bytes before WordPress unpacks or copies them. Bad signatures, unknown keys, or missing required headers abort the operation and leave the installed plugin in place.

## Public Keys

`PackageSignatureVerifier::PUBLIC_KEYS` pins `publishpress-2026` and `metaslider-2026`. Values are raw 32-byte Ed25519 public keys encoded as base64, not PEM wrappers. No private key ships in Hub.

For controlled key rotation, `PUBLISHPRESS_HUB_PACKAGE_SIGNATURE_PUBLIC_KEYS` can provide a replacement map in WordPress configuration. Include every trusted key still used by downloadable packages. Normal installations need no key setting.

## Enrollment

Enrollment remains opt-in during rollout:

```php
define('PUBLISHPRESS_HUB_SIGNED_PACKAGE_REPOSITORIES', [
    'publishpress-authors-pro',
]);
```

Before enrolling a repository, its CI workflow must upload `<zip-name>.sig`, and Package Server must have verified signatures for all versions Hub may install. Existing packages are signed without rebuilding. Package Server compares signed GitHub bytes with immutable R2 bytes before adding metadata. Different bytes require a new release version.

Test matching bytes, changed bytes, unknown key IDs, and missing headers in staging before production enrollment. Unenrolled downloads without headers retain their prior behavior. When signature headers are present, Hub verifies them even before enrollment. WordPress.org downloads remain unchanged.

MetaSlider does not currently use Hub. Its standalone updater continues working, with signature verification for enrolled packages performed by Package Server before storage. Pinning a MetaSlider key does not onboard its products into Hub.
