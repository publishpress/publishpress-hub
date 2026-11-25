# Serve Hub licensing from a License Worker module on the Package Server

Hub license calls to publishpress.com fail for some clients when Kinsta's Cloudflare layer returns a managed challenge (rule `1aac0f7fc84c4696a3f5dd145a8c2500`). An AWS API Gateway proxy in front of EDD does not fix this: requests still pass through Kinsta, a regional HTTP API has no edge network, AWS WAF does not support HTTP APIs, and the proxy does not help when the origin is down.

We put an EDD-only **License Worker** module inside the existing PublishPress **Package Server** Worker. It is served on `license.publishpress.com`, with a separate D1 **License Mirror**. License keys and site URLs are stored only as keyed hashes. The Hub calls that hostname for every licensing action. License Reads (`check_license`, `get_version`) are answered from the mirror. License Writes (`activate_license`, `deactivate_license`) are forwarded to the License Server, and the Worker updates the mirror from the response. Download Tokens for Pro packages are issued by the Worker and checked by the Package Server without a call to publishpress.com. Simba / MetaSlider deployments keep their current download flow and do not enable the license module.

## Status

proposed

## Considered Options

- **AWS API Gateway + Lambda proxy** (chillmedialabs post): rejected. Does not remove Kinsta from the path, adds pay-per-request cost risk, and does not serve reads during an origin outage.
- **Cloudflare-only zone skip rules and a Kinsta exemption, with no Worker**: still needed for old Hub versions and as a short-term mitigation, but does not give stale-on-origin-outage reads or remove Kinsta from the long-term Hub path.
- **A separate Cloudflare Worker for licensing**: rejected. The Package Server already has Hono, D1, R2, CI, Download Token verification, and a WordPress push channel. One Worker with two hostnames avoids a second shared secret for download links.
- **Workers KV for the License Mirror**: rejected. Eventual consistency of up to 60 s, and weak query support for reconciliation. D1 gives strong consistency and SQL reconciliation at our scale (~3,800 activations).
- **Simba support in the License Worker**: deferred. MetaSlider keeps license checks on metaslider.com; only package downloads use the Package Server.

## Consequences

- Hub default `EDD_SUBSCRIPTION_API_URL` becomes `https://license.publishpress.com`. Old Hub versions keep calling publishpress.com until they are deprecated.
- Hub Statistics move to daily D1 aggregates on the Worker; the Ramble Dashboard pulls them. `publishpress-hub-statistics` on publishpress.com covers only the deprecation period.
- Download Token claims must stop carrying raw license keys and site URLs (today claim `l` / `s` are plaintext in `?token=`).
- A kill switch on the Worker can forward all licensing traffic to publishpress.com.
- Phase 1 (Kinsta ticket + our zone skip rule) still runs so old clients and License Writes that hit the origin stay reliable during the migration.
