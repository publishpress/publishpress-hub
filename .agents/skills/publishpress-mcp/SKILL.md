---
name: publishpress-mcp
description: Implement or extend the PublishPress Hub MCP connection and plugin Abilities API integrations. Use for server registration, exposure, authentication, or adding PublishPress actions.
---

# PublishPress MCP integration

Hub provides an optional connection through the separately installed WordPress MCP Adapter; it does not bundle the adapter or implement MCP transport. Users connect through a compatible external MCP client. The integration does not require a particular AI provider or integrate with WordPress.com's hosted MCP service.

## Hub ownership

- Follow Hub's container registration: add IDs to `AbstractDependencies`, factories to `src/definitions.php`, and resolve bootable services through `$container->get(...)`. Inject the existing options adapter, admin menu service and view service; register menus during `onInit` and render with template context. Do not construct integration objects inside the bootstrap list.
- In Hub, start with `src/Application/Service/Mcp/McpConnectionService.php`, `src/Admin/Page/McpPageController.php`, and its template.
- Keep the endpoint `rest_url('mcp/publishpress')` and opt-in option `publishpress_hub_mcp_enabled`. Use `HubAccessService::MCP_CAPABILITY` and `canManageMcp()` for MCP administration and transport access; this currently requires `manage_options`, independently of Hub viewer access.
- Match neighboring controllers structurally: build the submenu array before passing it to the menu service, use a named page callback, and pass prepared data through view context. Templates must not load dependencies or call application services. Installation orchestration belongs in `McpAdapterInstallationService`, which reuses Hub's existing plugin API and lifecycle adapters.
- Register through `mcp_adapter_init` and `create_server`; pass explicit ability names from category `publishpress`. Do not add plugin business logic to Hub or enable the adapter's default public discovery for our abilities.
- Discover participating plugins through their registered abilities, without maintaining plugin names or per-plugin routes in Hub. Adding a plugin integration must not require changing Hub's registration code.
- Hub's write-action exposure switch defaults off. Respect per-action selection and classify unannotated abilities as writes. These are exposure controls, not another permission system.
- Do not filter registration by the current user's capabilities: REST authentication can happen later. Each ability enforces its own permissions on execution.
- Missing dependencies, older WordPress, HTTP-only sites, and switching off MCP must leave existing Hub features operational. Do not disable the site's other MCP servers.

## Plugin ownership

- Register abilities independently of Hub on `wp_abilities_api_init`, outside admin-only bootstrap paths. Check API availability to preserve older WordPress compatibility.
- Register shared category `publishpress` on `wp_abilities_api_categories_init` if `wp_has_ability_category('publishpress')` is false. Do not probe with `wp_get_ability_category`: a missing category emits a developer notice. Every participating plugin must work alone and coexist with other category registrants.
- Use names in the form `{plugin-namespace}/{action-name}`, explicit input/output JSON schemas, clear descriptions, and an execution callback that reuses plugin services.
- Set `meta.public`, `meta.mcp.public`, and `meta.show_in_rest` to false. Custom-server registration is explicit; public default-server discovery is a different route.
- Match the operation's existing permission checks, including object-specific checks where relevant. Never replace permissions with a nonce or trust a tool annotation as authorization.
- Check the actual operation capability with `current_user_can`; do not bypass a denial just because the user has the administrator role. Respect application-password capability restrictions.
- Preserve each plugin's validation, storage formats, filters and lockout protections. Validate all bulk targets before writing, and reuse existing services instead of simulating admin forms or minting nonces.
- Gate edition-specific registrations on the active edition and network operations on their existing network permissions. Update shared dependencies through the normal release process instead of editing vendored copies.
- Do not change the authenticated MCP identity or return authentication secrets.
- Annotate read-only, destructive, and idempotent behavior truthfully. Avoid arbitrary PHP, SQL, option writes, or generic unrestricted method dispatch.
- Keep Free/Pro bootstrap and minimum PHP compatibility in mind. Do not register duplicates when Pro loads shared Free code.

## Verification

Verify the released adapter version, not just trunk: [adapter source](https://github.com/WordPress/mcp-adapter), [transport permissions](https://github.com/WordPress/mcp-adapter/blob/trunk/docs/guides/transport-permissions.md), and [custom/default servers](https://github.com/WordPress/mcp-adapter/blob/trunk/docs/guides/default-server.md).

Test disabled/missing-dependency states, subscriber/editor connection denial, administrator connection with denied plugin actions, successful authorized calls, malformed input, plugin deactivation, shared category registration, and default-server discovery/execution rejection. Use MCP initialization and session headers when testing HTTP. Never commit application passwords.

Hub's `tests/Mcp/connection-smoke.php` checks real adapter schemas and REST protocol. `tests/Mcp/admin-smoke.php` verifies the container, lifecycle, rendering and exposure persistence. Both use synthetic abilities from `tests/Mcp/fixture-abilities.php`, without loading a participating plugin. Use an isolated `mcp_smoke_` database prefix for tests that persist connection settings.

Keep each plugin's action implementations, feature tests, implementation notes and coverage in that plugin's repository. Hub owns shared connection documentation and tests; do not maintain per-plugin inventories here.

Skills here guide developers and their coding agents. They are separate from optional end-user instructions for AI clients consuming tools.
