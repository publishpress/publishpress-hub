# PublishPress MCP integration

Hub provides one optional MCP connection for WordPress lookups and participating PublishPress plugins through the separately installed WordPress MCP Adapter. Supported plugins contribute their own actions to this connection. Available actions depend on the active plugins and the site's exposure settings.

Users connect through an external MCP client. This integration is separate from WordPress.com's hosted MCP service.

## Requirements

- WordPress 6.9 or later.
- MCP Adapter 0.7.1 or later, installed and activated separately.
- HTTPS for both the WordPress and site addresses.
- WordPress application passwords available for the connecting account.
- A compatible MCP client or bridge that supports the adapter's transport and application-password authentication.

## Setup

1. Open **Hub > AI Connections** and enable AI connections.
2. Install and activate MCP Adapter when prompted. If the host blocks installation, use the linked plugin page or the host's normal plugin installation process.
3. Choose the allowed actions and whether AI can change site data. Select **Save and continue** before connecting an app.
4. Choose a connection method and follow its instructions. Once the app can list PublishPress actions, select **I have connected my AI app**.

The connection endpoint is:

```text
https://yoursite.com/wp-json/mcp/publishpress
```

The client authenticates with a WordPress username and an application password. Hub remembers the selected setup method for the current user on this site. **Connect another AI app** reopens the instructions without resetting allowed actions.

### Claude Desktop

Download the site's `.mcpb` extension and install it in Claude Desktop. It includes the connection details and remote bridge, uses Claude Desktop's Node.js runtime, and requires no manual JSON configuration. Creating the installer requires PHP ZIP support and an enabled HTTPS connection.

Each download creates a new application password for the current WordPress account and includes it in the file. Delete the downloaded file after installation. To revoke its access, remove the corresponding **PublishPress - Claude Desktop** application password in the WordPress profile. Hub does not retain a plaintext copy of the password or installer.

### Ask my AI to help

Create a WordPress application password, then copy the setup prompt into an AI agent. The prompt asks for a local setup script and the command to run it for the chosen app and operating system. Enter the password locally rather than in the chat.

### Manual configuration

Create a WordPress application password and use the supplied configuration in a compatible MCP client. Set the password locally in the client's configuration.

## Actions and access

The **WordPress** tab provides read-only user searches, exact user lookup with effective primitive capabilities, content searches and post type discovery. Content results include actual IDs and permalinks. User results include IDs, usernames, display names and roles without email addresses or authentication data. User listing requires `list_users`, and detailed user inspection also requires permission to edit that user. Content searches use the post type's WordPress REST permissions.

User searches can filter by an effective primitive capability. Filtering happens within each candidate page, so clients must visit every reported page even if a filtered page is empty. Custom content types must be REST-enabled. These lookups do not change users or content.

Opening the PublishPress connection requires `manage_options` on the target site. Each action also checks the connected WordPress user's plugin and object permissions, including applicable application-password restrictions. These checks apply to administrators too.

Read-only actions are exposed by default. Enable **Allow actions that change site data** to make selected write actions available. Individual actions can also be excluded. Save changes to apply the selection.

After changing allowed actions or activating or deactivating a participating plugin, restart the AI app or refresh its PublishPress connection to update its available actions. Completing setup records the user's confirmation and does not detect a live client connection.

Turning off AI connections removes the PublishPress endpoint on subsequent requests. It does not revoke application passwords or disable other MCP servers. Other Hub features remain available without MCP Adapter.

## Multiple sites

Each site has a distinct, stable connection name so multiple sites can coexist in one AI app. Repeating setup uses the same connection name for that site. Labels use a site-specific slug, and the server description includes the full site address. Specify the target site when making requests if more than one site is connected.

On WordPress multisite, the connection and allowed actions are configured separately for each site. The connecting user must have the required access on that site.

## References

- [PublishPress AI connection guide](https://publishpress.com/knowledge-base/hub-mcp/)
- [WordPress MCP Adapter](https://wordpress.org/plugins/mcp-adapter/)
- [WordPress remote bridge](https://github.com/Automattic/mcp-wordpress-remote)
- [Transport permissions](https://github.com/WordPress/mcp-adapter/blob/trunk/docs/guides/transport-permissions.md)
- [Custom servers](https://github.com/WordPress/mcp-adapter/blob/trunk/docs/guides/default-server.md)
- [WordPress Abilities API](https://developer.wordpress.org/apis/abilities-api/)
