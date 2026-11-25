# PublishPress Hub

The Hub is a WordPress plugin. It manages PublishPress licenses, updates, and packages on a customer site.

Plan for issue #125: [docs/dev/license-worker-plan.md](docs/dev/license-worker-plan.md). Decision: [docs/adr/0001-license-worker-on-package-server.md](docs/adr/0001-license-worker-on-package-server.md).

## Language

### Licensing

**License Server**:
The EDD Software Licensing install on publishpress.com. It is the source of truth for all PublishPress licenses.
_Avoid_: license API, EDD server, store

**License Worker**:
The licensing module of the PublishPress Package Server Worker, served on license.publishpress.com. It is the only licensing endpoint that the Hub calls.
_Avoid_: proxy, gateway, license cache

**License Mirror**:
The copy of license records that the License Worker keeps, with license keys and site URLs stored only as hashes.
_Avoid_: cache, replica

**Site Hash**:
The keyed hash of a normalized site URL. The License Server and the License Worker compute it with the same normalization rules.
_Avoid_: site ID, URL hash

**License Read**:
A licensing request that does not change state (`check_license`, `get_version`). The License Worker answers it from the License Mirror.

**License Write**:
A licensing request that changes state (`activate_license`, `deactivate_license`). The License Worker forwards it to the License Server.

### Packages

**Package Server**:
The Cloudflare Worker on pkg.publishpress.com that stores and serves signed plugin packages, including Pro packages.
_Avoid_: download server, CDN

**Download Token**:
A short-lived signed token in a Package Server link. It proves that the holder can download one version of one package.
_Avoid_: download key, package key

### Statistics

**Hub Statistics**:
Daily counts of License Reads and License Writes for each Site Hash, item, action, and Hub version.
_Avoid_: telemetry, usage logs

**Download Statistics**:
Counts of package downloads from the Package Server, for each package and version.

**Ramble Dashboard**:
The reporting site on rambleventuresdashboard.com. It pulls Hub Statistics and Download Statistics from the Package Server Worker.
_Avoid_: stats site, overview

## Relationships

- The **License Worker** supports only EDD. Package Server deployments that use Simba, such as MetaSlider, do not enable it.
- The **License Mirror** is a separate D1 database from the **Package Server** data.
- The **License Server** keeps the **License Mirror** up to date.
- The **License Worker** answers each **License Read** from the **License Mirror**. It computes the answer from mirrored license data, with the same rules as the **License Server**.
- A license in the **License Mirror** has zero or more activations. Each activation is one **Site Hash**.
- The **License Server** keeps the customer account page: download links, site activation, and site deactivation.
- The **License Worker** and the **License Server** both issue **Download Tokens**. The **Package Server** checks a **Download Token** without a call to the **License Server**.
- The **License Worker** forwards each **License Write** to the **License Server**, then writes the result into the **License Mirror**.
- The **License Worker** records **Hub Statistics**. The **License Server** records them only for old Hub versions, until they are deprecated.

## Example dialogue

> **Dev:** "After a customer activates a site, can the next `check_license` return 'inactive'?"
> **Domain expert:** "No. The **License Worker** writes the result of the **License Write** into the **License Mirror** before it answers the Hub."

## Flagged ambiguities

- "cache" was used for the **License Mirror**. Resolved: the mirror is not a cache with a TTL. The **License Server** pushes records to it.
