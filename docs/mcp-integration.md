# PublishPress MCP integration

Hub provides one optional MCP connection for participating PublishPress plugins. Available actions depend on the active plugins and the connection's access settings.

Actions from supported plugins appear automatically in Hub's action selection. Users connect through a compatible external MCP client. The connection supports different AI providers and is separate from WordPress.com's hosted MCP service.

## Setup

Requires WordPress 6.9+, HTTPS site and WordPress addresses, and separately installed MCP Adapter 0.7.1+. In Hub > AI Connections, enable the connection and install/activate the adapter. The installer uses WordPress APIs and direct filesystem access; hosts requiring filesystem credentials can use their normal installation workflow and the plugin-page fallback.

Configure a compatible MCP client or bridge with `https://yoursite.com/wp-json/mcp/publishpress`, a WordPress username, and an application password. The user must have `manage_options`; actions additionally enforce plugin/object permissions and applicable application-password restrictions, including for administrators. The client or bridge needs to support the adapter's transport and application-password authentication.

The setup checklist shows site prerequisites, account application-password availability, and links to connection settings and client setup. The app selector provides setup instructions for Claude Desktop and an assisted setup option for other compatible clients. Save Changes remembers the selected setup method for the current user on this site. Configuration can be copied or downloaded with the site URL and current username filled in and a placeholder for the application password. The assisted-setup prompt asks an AI assistant for a setup script tailored to the selected app and operating system. The user runs the script locally and enters the application password in the terminal. Hub uses an existing WordPress account and does not provision a dedicated AI account. External AI app configuration remains a client-side step; Hub does not report it as complete.

Claude Desktop users can download a site-specific `.mcpb` extension from the app selector. The extension bundles the WordPress remote bridge and its dependencies, uses the desktop client's Node.js runtime, and requires no manual JSON configuration. Each download creates a separate application password for the current WordPress account. The site URL, username and new password are prefilled; the password is marked as sensitive client configuration. The download contains that password and should be deleted after import. The corresponding **PublishPress - Claude Desktop** application password can be revoked in the WordPress profile. Repeated downloads create separate passwords. The installer requires PHP ZIP support and an enabled, available HTTPS connection; manual configuration remains available. Hub does not store a plaintext copy of the password or bundle.

Read-only actions are exposed by default. Enable **Allow actions that change site data** to expose selected write actions. Each action also has its own exposure checkbox. Plugin actions appear in separate tabs derived from their ability namespaces, with search, behavior filters and ten actions per page. Action pages, plugin tabs, filters and settings saves use background requests. Selections remain in a browser draft while navigating; Save Changes applies the draft across visited tabs and pages while preserving other selections. Drafts live in the current browser page until saved. Descriptions and technical identifiers are expandable. Plugins can supply a display name through `meta.publishpress.plugin_name`; otherwise the namespace supplies the tab label. Reconnect clients after changing selection or plugin activation. Diagnostics show dependency versions, HTTPS/application-password availability and action counts.

Switching off removes the PublishPress endpoint on subsequent requests; it does not revoke application passwords or disable other MCP servers. Existing Hub features do not depend on the adapter.

## Multisite

The connection and its exposure settings are site-scoped. Access to the connection requires the configured capability on that site.

## References

- [PublishPress AI connection guide](https://publishpress.com/knowledge-base/hub-mcp/)

- [WordPress MCP Adapter](https://wordpress.org/plugins/mcp-adapter/)
- [WordPress remote bridge](https://github.com/Automattic/mcp-wordpress-remote)
- [Transport permissions](https://github.com/WordPress/mcp-adapter/blob/trunk/docs/guides/transport-permissions.md)
- [Custom servers](https://github.com/WordPress/mcp-adapter/blob/trunk/docs/guides/default-server.md)
- [WordPress Abilities API](https://developer.wordpress.org/apis/abilities-api/)
