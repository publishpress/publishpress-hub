# Package Signature Verification

Hub requires detached Ed25519 signatures for every Package Server download before installing or upgrading a plugin. Package Server returns `X-PublishPress-Signature` and `X-PublishPress-Signature-Key-Id`. Hub checks the downloaded bytes before WordPress unpacks or copies them. Bad signatures, unknown keys, or missing required headers abort the operation and leave the installed plugin in place.

## Public Keys

`PackageSignatureVerifier::PUBLIC_KEYS` pins `publishpress-2026` and `metaslider-2026`. Values are raw 32-byte Ed25519 public keys encoded as base64, not PEM wrappers. No private key ships in Hub.

For controlled key rotation, `PUBLISHPRESS_HUB_PACKAGE_SIGNATURE_PUBLIC_KEYS` can provide a replacement map in WordPress configuration. Include every trusted key still used by downloadable packages. Normal installations need no key setting.

## Required Verification

Verification is automatic for PublishPress and MetaSlider Package Server hosts, and for URLs using the `/v1/packages/download/` path on other allowed hosts. The existing download-domain allowlist still applies. Both the requested URL and final response URL are considered, so a Package Server redirect cannot remove the signature requirement and a store redirect to Package Server cannot avoid it.

No repository enrollment constant or setting can disable this requirement. The former `PUBLISHPRESS_HUB_SIGNED_PACKAGE_REPOSITORIES` constant is no longer read and can be removed from existing site configuration.

Before deploying this Hub version, CI must upload `<zip-name>.sig`, and Package Server must have verified signatures for all versions Hub may install. Existing packages are signed without rebuilding. Package Server compares signed GitHub bytes with immutable R2 bytes before adding metadata. Different bytes require a new release version. An unsigned historical package fails installation or upgrade; do not disable verification to work around it.

Test matching bytes, changed bytes, unknown key IDs, and missing headers in staging before production deployment. WordPress.org downloads without these headers remain unchanged. When signature headers are present on another download, Hub still verifies them.

MetaSlider does not currently use Hub. Its standalone updater continues working, with signature verification for enrolled packages performed by Package Server before storage. Pinning a MetaSlider key does not onboard its products into Hub.
