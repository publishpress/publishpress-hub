# License Worker plan (issue #125)

Durable plan from the grill on GitHub issue #125. Domain terms live in [CONTEXT.md](../../CONTEXT.md). Decision record: [ADR 0001](../adr/0001-license-worker-on-package-server.md).

## Problem

Some Hub license calls to `https://publishpress.com/` receive a Cloudflare managed challenge from Kinsta's edge (example Ray ID `a5f0f44d2e8f01c1-GRU`, rule `1aac0f7fc84c4696a3f5dd145a8c2500`). The Hub cannot solve the challenge and shows "Remote access denied". The challenge is selective; most Hub traffic still returns 200. License keys also appear in GET query strings for `check_license` and in Package Server JWT claim `l`.

## Target architecture

```text
Hub  -->  license.publishpress.com  (License Worker module)
                |-- License Read  -->  License Mirror (D1)
                |-- License Write -->  License Server (publishpress.com) --> update Mirror
                |-- get_version   -->  Mirror + Download Token for pkg.publishpress.com
                '-- Hub Statistics -->  D1 hub_stats_daily --> Ramble Dashboard

License Server  --push/cron-->  License Mirror
Account page / site activate  stays on License Server
Package downloads             stay on Package Server (R2)
Simba / MetaSlider            unchanged (license module off)
```

## Phase 0 — short-term reliability (old clients and origin path)

1. Open a Kinsta ticket: identify rule `1aac0f7fc84c4696a3f5dd145a8c2500`, request exemption for path `/` GET|POST when User-Agent starts with `PublishPress-Hub/` or query contains `edd_action`. Attach Ray IDs `a5f0f44d2e8f01c1-GRU` and `a0c1f98cbdc02ff6-PHX`.
2. On our Cloudflare zone, edit the existing "edd_action Whitelist" rule in place (zone is over Free custom-rule limit). Match Hub UA or `edd_action` on `/`. Skip only `bic` and `securityLevel`. Keep Managed Rules and Rate Limiting. Needs explicit approval before any prod change.
3. Runbook in `docs/dev/`: kill switch (disable skip rule), how to look up a Ray ID, how to tell our zone events from Kinsta's.
4. Hub: send `check_license` as POST ([LicenseInfoService.php](../../src/Infrastructure/Edd/Subscription/LicenseInfoService.php)).
5. Hub: rewrite [RemoteAccessDeniedException](../../src/Infrastructure/Remote/Exception/RemoteAccessDeniedException.php) message (challenge ≠ blocked license). Regenerate `.pot`. Tests via `composer test`.

## Phase 1 — License Mirror and Worker

Lives in sibling repo `package-server` (PublishPress production env only).

1. New module + route on `license.publishpress.com`.
2. Separate D1 binding `LICENSE_DB` (`publishpress-license-mirror-production`).
3. Mirror schema: license hash, status, expiry, limit, item IDs / price ID, activations as Site Hash rows, `updated_at`.
4. Worker computes `check_license` answers from mirrored data (same rules as EDD). Shared URL normalization + HMAC pepper with the License Server. Contract tests vs live EDD responses for each status.
5. License Writes: forward to publishpress.com, then write result into the Mirror before answering the Hub.
6. `get_version`: return metadata from Mirror; `download_link` = Package Server URL with Download Token. Package Server accepts Worker issuer. Token claims use license hash + site hash (no raw keys).
7. Kill-switch env var: when off, forward every licensing request to publishpress.com.

### Sync from License Server (`edd-package-server-integration`)

1. Instant push on EDD SL events (status, renewal, expiry, account-page activate/deactivate, delete, price ID change). Full license record per push, HMAC + timestamp + `updated_at`. Worker drops older records.
2. Failed pushes go to an Action Scheduler outbox with backoff.
3. Hourly incremental sync; daily full reconciliation in batches of ~500 (~3,800 activations → ~8 requests). Delete only after a complete run ID.
4. Initial full load before any Hub release points at the Worker.

## Phase 2 — Statistics

1. License Worker upserts `hub_stats_daily` (Site Hash, item, action, hub_version, day). Keyed Site Hash only (breaks per-site continuity with old unkeyed SHA-256; totals by item/version continue).
2. Authenticated admin API for Ramble Dashboard (token + `X-Ramble-Origin`), same pattern as `ramble/v1`.
3. Expose Package Server `download_log` aggregates on the same admin path.
4. Keep `publishpress-hub-statistics` on publishpress.com for old Hub versions until deprecation.

## Phase 3 — Rollout

1. **Shadow:** deploy Worker + initial load. Nightly sample of license/site pairs; compare Worker vs EDD; Slack on diff (Package Server notification channel). Exit after 7 days with no diffs.
2. **Hub release:** default `EDD_SUBSCRIPTION_API_URL` → `https://license.publishpress.com`. No automatic fallback. Support override via existing filter/constant.
3. **Deprecate old path:** when Hub Statistics show old versions under ~5% of active sites, admin notice, then drop special handling on publishpress.com. EDD endpoint stays for Pro plugins that do not use the Hub.
4. Kill switch remains available.

## Explicit non-goals

- AWS API Gateway / Lambda license proxy.
- Simba license checks in the License Worker.
- Moving the customer account page off publishpress.com.
- Automatic Hub fallback to publishpress.com after cutover.

## Sibling repos

| Repo | Role |
|------|------|
| `package-server` | License Worker module, LICENSE_DB, Download Token issuer support, stats API |
| `edd-package-server-integration` | Mirror push, cron, outbox, initial load |
| `publishpress-hub` | Point API URL at Worker; POST `check_license`; clearer 403 message |
| `publishpress-hub-statistics` | Legacy collector until deprecation |
| `ramble-ventures-overview` | Pull Hub + Download Statistics from Worker |
| `package-server-dashboard` | Ops UI if admin endpoints need it |

## Open before implementation

- Confirm Package Server already uses Workers Paid plan (or enable it).
- Exact EDD SL hooks for the push list (map in `edd-package-server-integration`).
- Shadow sample size and Slack channel name.
- Ownership of Download Token claim migration (Worker + WordPress `DownloadUrlService`).
