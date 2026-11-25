# Serve Hub licensing through a Cloudflare reverse proxy on the Package Server

Hub license calls to publishpress.com fail for some clients when Kinsta's Cloudflare layer returns a managed challenge (rule `1aac0f7fc84c4696a3f5dd145a8c2500`). An AWS API Gateway proxy does not fix this: public traffic still tends to hit the same edge path, a regional HTTP API has no edge network, AWS WAF does not support HTTP APIs, and pay-per-request pricing is a flood risk.

**Decision (preferred):** put an EDD-only **License Worker** module inside the existing PublishPress **Package Server** Worker on `license.publishpress.com`. The first implementation is a **Cloudflare reverse proxy**: the Hub calls that hostname; the Worker forwards each licensing request to the **License Server** and returns the response. No License Mirror, no sync, no recomputed EDD rules. Ship only after a spike proves the Worker → origin back hop is not managed-challenged (use a Worker-only origin host if the public hostname is still challenged).

**Fallback:** if the proxy back hop fails the spike, keep Phase 0 (Kinsta exemption + our zone skip) as the short-term fix, then reconsider a D1 **License Mirror** (see appendix). Do not build the mirror until the proxy is ruled out.

Simba / MetaSlider deployments keep their current download flow and do not enable the license module.

## Status

proposed

## Considered Options

- **AWS API Gateway + Lambda proxy** (chillmedialabs post): rejected. Does not reliably remove Kinsta from the client path, adds pay-per-request cost risk, and does not help when the origin is down.
- **Phase 0 only (Kinsta exemption + zone skip `bic`/`securityLevel`)**: required for old clients that still hit publishpress.com. Alone it does not give the Hub a dedicated hostname or a path we control at the edge.
- **Cloudflare reverse proxy on Package Server** (preferred): small change, one hostname, reuses existing Worker ops. Depends on a clean back hop.
- **License Mirror on D1** (deferred): solves origin-outage reads and removes Kinsta from License Reads entirely, but needs sync, EDD-rule parity, stats migration, and a multi-week rollout. Use only if the proxy spike fails.
- **Separate Cloudflare Worker for licensing**: rejected for the preferred path. Package Server already has Hono, CI, and deploy docs; one Worker with two hostnames is enough for a proxy.
- **Simba support in the License Worker**: deferred. MetaSlider keeps license checks on metaslider.com.

## Consequences

- Hub default `EDD_SUBSCRIPTION_API_URL` becomes `https://license.publishpress.com` after a successful spike. Old Hub versions keep calling publishpress.com until deprecated.
- Origin outages still break licensing while we stay on the proxy (unlike a mirror).
- Hub Statistics continue on publishpress.com if the back hop still reaches WordPress with `api_data.hub_version`. A Worker-only origin that skips WP must get an explicit stats plan before cutover.
- Phase 0 still runs so direct callers of publishpress.com stay reliable.
- Kill switch: disable the Worker route or DNS; support can point a site back via the existing URL filter.

## Appendix — License Mirror (deferred)

If the proxy spike fails: separate D1 `LICENSE_DB`; store only keyed hashes; Worker computes License Reads; License Writes forward then update the mirror; License Server pushes through `edd-package-server-integration`; optional Hub Statistics aggregates for Ramble; 7-day shadow compare before cutover. Scale is about 3,800 activations. Details: [license-worker-plan.md](../dev/license-worker-plan.md) appendix and prior git revisions of that file.
