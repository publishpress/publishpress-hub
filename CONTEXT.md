# PublishPress Hub

The Hub is a WordPress plugin. It manages PublishPress licenses, updates, and packages on a customer site.

Plan for issue #125: [docs/dev/license-worker-plan.md](docs/dev/license-worker-plan.md). Decision: [docs/adr/0001-license-worker-on-package-server.md](docs/adr/0001-license-worker-on-package-server.md).

## Language

### Licensing

**License Server**:
The EDD Software Licensing install on publishpress.com. It is the source of truth for all PublishPress licenses.
_Avoid_: license API, EDD server, store

**License Worker**:
The licensing module of the PublishPress Package Server Worker, served on license.publishpress.com. It is the only licensing endpoint that the Hub calls. Preferred form: a reverse proxy to the License Server.
_Avoid_: gateway, license cache

**License Mirror**:
An optional D1 copy of license records (hashed keys and site URLs). Build it only if the License Worker reverse proxy cannot reach the License Server without a managed challenge.
_Avoid_: cache, replica

**Site Hash**:
The keyed hash of a normalized site URL. Used if a License Mirror exists. The License Server and the License Worker compute it with the same normalization rules.
_Avoid_: site ID, URL hash

**License Read**:
A licensing request that does not change state (`check_license`, `get_version`).

**License Write**:
A licensing request that changes state (`activate_license`, `deactivate_license`).

### Packages

**Package Server**:
The Cloudflare Worker on pkg.publishpress.com that stores and serves signed plugin packages, including Pro packages.
_Avoid_: download server, CDN

**Download Token**:
A short-lived signed token in a Package Server link. It proves that the holder can download one version of one package.
_Avoid_: download key, package key

### Statistics

**Hub Statistics**:
Counts of License Reads and License Writes tagged with Hub version (today on the License Server; may move later if a mirror ships).
_Avoid_: telemetry, usage logs

**Download Statistics**:
Counts of package downloads from the Package Server, for each package and version.

**Ramble Dashboard**:
The reporting site on rambleventuresdashboard.com.
_Avoid_: stats site, overview

## Relationships

- The **License Worker** supports only EDD. Package Server deployments that use Simba, such as MetaSlider, do not enable it.
- Preferred path: the **License Worker** reverse-proxies every Hub licensing request to the **License Server**.
- The **License Server** remains the source of truth. A **License Mirror** is not part of the preferred path.
- The **License Server** keeps the customer account page: download links, site activation, and site deactivation.
- Package downloads stay on the **Package Server**.

## Example dialogue

> **Dev:** "Does the Hub call publishpress.com for `check_license`?"
> **Domain expert:** "No. After cutover the Hub calls the **License Worker**. The Worker forwards the request to the **License Server**, unless we have fallen back to a **License Mirror** because the proxy back hop was challenged."

## Flagged ambiguities

- "proxy" once meant the rejected AWS API Gateway design. Resolved: the preferred Cloudflare path is the **License Worker** reverse proxy; AWS stays rejected.
- "cache" / **License Mirror**: deferred optional path only; not a TTL cache in front of EDD on the preferred path.
