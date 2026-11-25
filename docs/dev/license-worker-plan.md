# License Worker plan (issue #125)

Durable plan from the grill on GitHub issue #125. Domain terms live in [CONTEXT.md](../../CONTEXT.md). Decision record: [ADR 0001](../adr/0001-license-worker-on-package-server.md).

## Problem

Some Hub license calls to `https://publishpress.com/` receive a Cloudflare managed challenge from Kinsta's edge (example Ray ID `a5f0f44d2e8f01c1-GRU`, rule `1aac0f7fc84c4696a3f5dd145a8c2500`). The Hub cannot solve the challenge and shows "Remote access denied". The challenge is selective; most Hub traffic still returns 200. License keys also appear in GET query strings for `check_license`.

## Preferred architecture: reverse proxy

```text
Hub  -->  license.publishpress.com  (License Worker = Cloudflare reverse proxy)
                |
                v
          License Server (publishpress.com or a Worker-only origin host)
                |
                +-- EDD answers check / activate / deactivate / get_version
                +-- Hub Statistics still land via forwarded api_data.hub_version
                +-- Account page / site activate stay on License Server
                +-- Package downloads stay on Package Server (R2)

Simba / MetaSlider  unchanged (license module off)
```

No D1 License Mirror. No sync. No recomputed EDD rules. The Worker forwards the request and returns the response.

### Gate for the proxy

The proxy only solves the Hub 403 if the **back hop** (Worker → License Server) is not challenged.

1. Spike a thin proxy on `license.publishpress.com` in the PublishPress Package Server env.
2. Pass: proxied `check_license`, `activate_license`, `deactivate_license`, and `get_version` return 200 from origin (or a clean EDD error body), including from client classes that previously got a managed challenge.
3. Fail: back hop still gets rule `1aac0f7f…` / managed challenge → do not ship the proxy as the fix; use Phase 0 alone short-term, and only then consider the optional License Mirror (Appendix).

If the public orange-cloud hostname is challenged from the Worker, try a **Worker-only origin host** (gray-cloud / Kinsta origin), locked down so only the Worker can call it. Do not expose that host to the public.

## Phase 0 — origin path (required either way)

Old Hub versions and Pro plugins without the Hub still call `publishpress.com`. Phase 0 stays.

1. Open a Kinsta ticket: identify rule `1aac0f7fc84c4696a3f5dd145a8c2500`, request exemption for path `/` GET|POST when User-Agent starts with `PublishPress-Hub/` or query contains `edd_action`. Attach Ray IDs `a5f0f44d2e8f01c1-GRU` and `a0c1f98cbdc02ff6-PHX`.
2. On our Cloudflare zone, edit the existing "edd_action Whitelist" rule in place (zone is over Free custom-rule limit). Match Hub UA or `edd_action` on `/`. Skip only `bic` and `securityLevel`. Keep Managed Rules and Rate Limiting. Needs explicit approval before any prod change.
3. Runbook in `docs/dev/`: kill switch (disable skip rule), how to look up a Ray ID, how to tell our zone events from Kinsta's.
4. Hub: send `check_license` as POST ([LicenseInfoService.php](../../src/Infrastructure/Edd/Subscription/LicenseInfoService.php)).
5. Hub: rewrite [RemoteAccessDeniedException](../../src/Infrastructure/Remote/Exception/RemoteAccessDeniedException.php) message (challenge ≠ blocked license). Regenerate `.pot`. Tests via `composer test`.

## Phase 1 — proxy spike and cutover

Lives in sibling repo `package-server` (PublishPress production env only).

1. Add a License Worker module on `license.publishpress.com` that reverse-proxies EDD licensing requests to the License Server.
2. Forward method, query/body (`edd_action`, license, item_id, url, `api_data.hub_version`), and return status + body. Prefer POST for all actions from the Hub.
3. Do not log raw license keys. Rate-limit the license hostname separately from package downloads.
4. Kill-switch env var: disable the route or DNS; Hub support override via existing `EDD_SUBSCRIPTION_API_URL` filter/constant.
5. Run the gate tests above. Ship only on pass.
6. Hub release: default `EDD_SUBSCRIPTION_API_URL` → `https://license.publishpress.com`. No automatic fallback to publishpress.com (that reopens the challenged path).
7. Keep `publishpress-hub-statistics` on publishpress.com: proxied requests still hit WordPress `$_REQUEST` if the back hop is the normal site. If the back hop is a Worker-only origin that skips WP logging, add a small forward or Worker-side log before cutover.

## Phase 2 — deprecation of direct Hub → publishpress.com

1. Use Hub Statistics to see when old Hub versions fall under ~5% of active sites.
2. Admin notice in old versions, then drop special handling that exists only for those clients.
3. EDD endpoint on publishpress.com stays for Pro plugins that do not use the Hub, and for the account page.

## Explicit non-goals (current preferred path)

- AWS API Gateway / Lambda license proxy.
- Simba license checks in the License Worker.
- Moving the customer account page off publishpress.com.
- Automatic Hub fallback to publishpress.com after cutover.
- Building the License Mirror before the proxy spike fails.

## Sibling repos (preferred path)

| Repo | Role |
|------|------|
| `package-server` | License Worker reverse proxy on `license.publishpress.com` |
| `publishpress-hub` | Point API URL at Worker; POST `check_license`; clearer 403 message |
| `publishpress-hub-statistics` | Continues on License Server while requests still reach WP |
| `edd-package-server-integration` | Unchanged unless a Worker-only origin needs allowlisting |

## Open before implementation

- Confirm Package Server Workers plan / quotas for the extra hostname traffic.
- Choose back-hop URL: public `publishpress.com` vs Worker-only origin host.
- Define spike pass/fail checklist and who runs it.
- Confirm Hub Statistics still appear after a proxied request.

---

## Appendix — License Mirror (only if proxy back hop fails)

Do not start this appendix until the Phase 1 spike fails and Phase 0 is in place.

Previous grill decided: EDD-only module on Package Server; separate D1 `LICENSE_DB`; hashed keys/sites; Worker computes License Reads; License Writes forward then update mirror; License Server pushes via `edd-package-server-integration` (instant + outbox + hourly/daily reconcile; ~3,800 activations); Hub Statistics in `hub_stats_daily` pulled by Ramble; 7-day shadow compare before Hub cutover; Simba stays off.

Full prior detail is preserved in git history of this file and in the appendix of [ADR 0001](../adr/0001-license-worker-on-package-server.md). Rebuild the detailed mirror phases from that ADR appendix if the spike fails.
