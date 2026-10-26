<?php

/**
 * Prepare and persist AI connection setup data for Hub administration.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Mcp;

defined('ABSPATH') || exit;

use PublishPress\Hub\Application\Service\Access\HubAccessService;
use RuntimeException;

class McpSetupService
{
    private const CLIENT_OPTION = 'publishpress_hub_mcp_client';
    private const SETUP_OPTION = 'publishpress_hub_mcp_setup_complete';
    private const ACTIONS_REVIEWED_OPTION = 'publishpress_hub_mcp_actions_reviewed';

    private McpConnectionService $mcpConnectionService;

    /**
     * @param McpConnectionService $connection Connection exposure settings.
     * @since 1.2.0
     */
    public function __construct(McpConnectionService $connection)
    {
        $this->mcpConnectionService = $connection;
    }

    /**
     * Return structured page data without application passwords or rendered HTML.
     *
     * @param array<string, mixed> $filters Action filters.
     * @return array<string, mixed>
     * @since 1.2.0
     */
    public function getState(array $filters = []): array
    {
        if (!HubAccessService::canManageMcp()) {
            throw new RuntimeException('You cannot manage AI connections.');
        }
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
        require_once ABSPATH . 'wp-admin/includes/file.php';
        $adapterInstalled = file_exists(WP_PLUGIN_DIR . '/' . McpAdapterInstallationService::PLUGIN_FILE);
        $adapterActive = is_plugin_active(McpAdapterInstallationService::PLUGIN_FILE);
        $nextStep = null;
        foreach ($this->getSetupSteps() as $step) {
            if (!$step['complete']) {
                $nextStep = $step;
                break;
            }
        }
        $setupComplete = (bool) get_user_option(self::SETUP_OPTION);
        $actionsReviewed = $setupComplete || (bool) get_user_option(self::ACTIONS_REVIEWED_OPTION);
        $stage = !$this->mcpConnectionService->isEnabled() ? 'disabled'
            : ($nextStep ? 'prerequisite'
                : (!$actionsReviewed || !$this->mcpConnectionService->getAbilityNames()
                    ? 'access' : ($setupComplete ? 'manage' : 'connect')));
        $clients = $this->getClientSetups();
        $client = (string) get_user_option(self::CLIENT_OPTION);
        return [
            'connectionEnabled' => $this->mcpConnectionService->isEnabled(),
            'writesEnabled' => $this->mcpConnectionService->areWritesEnabled(),
            'disabledActions' => $this->mcpConnectionService->getDisabledActions(),
            'actionView' => $this->getActionView($filters),
            'setupComplete' => $setupComplete,
            'setupStage' => $stage,
            'nextStep' => $nextStep,
            'clientSetups' => $clients,
            'selectedClient' => array_key_exists($client, $clients) ? $client : 'assistant',
            'diagnostics' => $this->mcpConnectionService->getDiagnostics(),
            'adapterInstalled' => $adapterInstalled,
            'adapterActive' => $adapterActive,
            'canInstallAdapter' => current_user_can('activate_plugins') && !$adapterActive
                && ($adapterInstalled || (current_user_can('install_plugins')
                    && wp_is_file_mod_allowed('plugins') && get_filesystem_method() === 'direct')),
            'profileUrl' => admin_url('profile.php#application-passwords-section'),
            'pluginsUrl' => self_admin_url('plugins.php'),
        ];
    }

    /**
     * Persist validated settings while retaining action selections outside the draft scope.
     *
     * @param array<string, mixed> $data Validated settings and filters.
     * @return array<string, mixed>
     * @since 1.2.0
     */
    public function save(array $data): array
    {
        if (!HubAccessService::canManageMcp()) {
            throw new RuntimeException('You cannot manage AI connections.');
        }
        $wasComplete = (bool) get_user_option(self::SETUP_OPTION);
        $previousActions = $this->mcpConnectionService->getAbilityNames();
        $this->mcpConnectionService->saveExposureSettings(
            $data['enabled'],
            $data['writesEnabled'],
            $data['selectedActions'] ?? [],
            $data['displayedActions'] ?? []
        );
        $actions = $this->mcpConnectionService->getAbilityNames();
        $reviewed = $data['reviewActions'] ?? false;
        if ($wasComplete || ($data['enabled'] && $reviewed && $actions)) {
            update_user_option(get_current_user_id(), self::ACTIONS_REVIEWED_OPTION, true);
        }
        $client = $data['client'] ?? '';
        if (array_key_exists($client, $this->getClientSetups())) {
            update_user_option(get_current_user_id(), self::CLIENT_OPTION, $client);
        }
        if (array_key_exists('setupComplete', $data)) {
            update_user_option(get_current_user_id(), self::SETUP_OPTION, $data['setupComplete']);
        }
        $message = __('Changes saved.', 'publishpress-hub');
        if ($wasComplete && $data['enabled'] && $previousActions !== $actions) {
            $message = __('Changes saved. Restart your AI app or refresh its PublishPress connection to update the available actions.', 'publishpress-hub');
        } elseif ($data['enabled'] && $reviewed) {
            $message = $actions ? __('Changes saved. Connect your AI app to continue.', 'publishpress-hub')
                : __('Changes saved. Select at least one available action to continue.', 'publishpress-hub');
        }
        return ['state' => $this->getState($data), 'message' => $message];
    }

    /**
     * Prepare bounded action lists with plugin tabs and read-only query filters.
     *
     * @param array<string, mixed> $filters Validated action filters.
     * @return array<string, mixed>
     * @since 1.2.0
     */
    private function getActionView(array $filters): array
    {
        $plugin = isset($filters['plugin']) && is_string($filters['plugin']) ? sanitize_key($filters['plugin']) : '';
        $search = isset($filters['search']) && is_string($filters['search']) ? sanitize_text_field($filters['search']) : '';
        $behavior = isset($filters['behavior']) && is_string($filters['behavior']) ? sanitize_key($filters['behavior']) : '';
        $page = max(1, absint($filters['action_page'] ?? 1));
        $groups = [];
        $disabled = $this->mcpConnectionService->getDisabledActions();
        $catalog = $this->mcpConnectionService->getActionCatalog();
        foreach ($catalog as $action) {
            $key = $action['plugin'];
            if (!isset($groups[$key])) {
                $groups[$key] = ['label' => $action['pluginLabel'], 'total' => 0, 'selected' => 0];
            }
            ++$groups[$key]['total'];
            if (!in_array($action['name'], $disabled, true)) {
                ++$groups[$key]['selected'];
            }
        }
        if (!isset($groups[$plugin])) {
            $plugin = (string) (array_key_first($groups) ?? '');
        }
        if (!in_array($behavior, ['read', 'write', 'destructive'], true)) {
            $behavior = '';
        }
        $actions = array_values(array_filter($catalog, static function (array $action) use ($plugin, $search, $behavior): bool {
            return $action['plugin'] === $plugin
                && ($search === '' || stripos($action['label'] . ' ' . $action['description'] . ' ' . $action['name'], $search) !== false)
                && ($behavior !== 'read' || $action['readonly'])
                && ($behavior !== 'write' || !$action['readonly'])
                && ($behavior !== 'destructive' || (!$action['readonly'] && $action['destructive']));
        }));
        $total = count($actions);
        $pages = max(1, (int) ceil($total / 10));
        $page = min($page, $pages);
        return [
            'groups' => $groups, 'plugin' => $plugin, 'search' => $search, 'behavior' => $behavior,
            'actions' => array_slice($actions, ($page - 1) * 10, 10), 'total' => $total,
            'page' => $page, 'pages' => $pages,
        ];
    }

    /**
     * Build setup states from the current site's connection prerequisites.
     *
     * @return array<int, array<string, mixed>>
     * @since 1.2.0
     */
    private function getSetupSteps(): array
    {
        $passwordsAvailable = wp_is_application_passwords_available_for_user(wp_get_current_user());

        return [
            [
                'complete' => function_exists('wp_get_abilities'),
                'key' => 'wordpress',
                'label' => __('Update WordPress to continue', 'publishpress-hub'),
                'description' => __('WordPress 6.9 or newer is required.', 'publishpress-hub'),
                'url' => self_admin_url('update-core.php'),
                'action' => __('Open WordPress updates', 'publishpress-hub'),
            ],
            [
                'complete' => $this->mcpConnectionService->isAvailable(),
                'key' => 'adapter',
                'label' => __('Install the MCP Adapter plugin', 'publishpress-hub'),
                'description' => __('Install the official WordPress MCP Adapter plugin to connect your AI service.', 'publishpress-hub'),
                'url' => self_admin_url('plugins.php'),
                'action' => $this->mcpConnectionService->isAvailable()
                    ? __('Manage plugins', 'publishpress-hub') : __('Set up MCP Adapter', 'publishpress-hub'),
            ],
            [
                'complete' => wp_is_using_https(),
                'key' => 'https',
                'label' => __('Use HTTPS to connect your AI', 'publishpress-hub'),
                'description' => __('Both WordPress and site addresses must use HTTPS.', 'publishpress-hub'),
                'url' => admin_url('options-general.php'),
                'action' => __('Open site settings', 'publishpress-hub'),
            ],
            [
                'complete' => (bool) $this->mcpConnectionService->getActionCatalog(),
                'key' => 'actions',
                'label' => __('Add a PublishPress plugin with AI actions', 'publishpress-hub'),
                'description' => __('Install or activate a PublishPress plugin that provides AI actions to continue.', 'publishpress-hub'),
                'url' => admin_url('admin.php?page=publishpress-hub-plugins-dashboard'),
                'action' => __('Open PublishPress plugins', 'publishpress-hub'),
            ],
            [
                'complete' => $passwordsAvailable,
                'key' => 'passwords',
                'label' => __('Allow application passwords for your account', 'publishpress-hub'),
                'description' => $passwordsAvailable
                    ? __('Create an application password in your WordPress profile for assisted or manual setup.', 'publishpress-hub')
                    : __('Application passwords are unavailable for your account. HTTPS or security plugin settings may need attention.', 'publishpress-hub'),
                'url' => admin_url('profile.php#application-passwords-section'),
                'action' => __('Open application passwords', 'publishpress-hub'),
            ],
        ];
    }

    /**
     * Provide a site-specific remote bridge example without storing credentials.
     *
     * @return string
     * @since 1.2.0
     */
    private function getClientConfiguration(): string
    {
        return (string) wp_json_encode([
            'mcpServers' => [
                $this->mcpConnectionService->getClientIdentifier() => [
                    'command' => 'npx',
                    'args' => ['-y', '@automattic/mcp-wordpress-remote@latest'],
                    'env' => [
                        'WP_API_URL' => rest_url('mcp/publishpress'),
                        'WP_API_USERNAME' => wp_get_current_user()->user_login,
                        'WP_API_PASSWORD' => __('PASTE_YOUR_APPLICATION_PASSWORD_HERE', 'publishpress-hub'),
                        'OAUTH_ENABLED' => 'false',
                    ],
                ],
            ],
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    }

    /**
     * Prepare client-specific instructions and configuration without credentials.
     *
     * @return array<string, array<string, mixed>>
     * @since 1.2.0
     */
    private function getClientSetups(): array
    {
        $configuration = $this->getClientConfiguration();
        return [
            'assistant' => [
                'label' => __('Ask my AI to help', 'publishpress-hub'),
                'description' => __('Recommended. Ask your AI for a setup script to run on your computer.', 'publishpress-hub'),
                'content' => sprintf(
                    // translators: 1: endpoint, 2: username, 3: server identifier, 4: display name, 5: write access state.
                    __('Connect my AI app to PublishPress. Create a setup script and give me the exact terminal command to run it.

1. Ask me to select my AI app and OS (Windows, macOS or Linux). Use interactive choices if available, otherwise numbered options.
2. Create the script using your file tools. Request the specific permission if needed. If you cannot write locally, attach a downloadable script. Only fall back to code with save instructions when neither is possible. Use PowerShell on Windows and an appropriate script on macOS or Linux. Do not stop at explaining access limitations or provide only JSON.
3. Configure this local stdio server:
Name: %3$s
Display name: %4$s
Command: npx
Arguments: -y @automattic/mcp-wordpress-remote@latest
Environment: OAUTH_ENABLED=false, WP_API_URL=%1$s, WP_API_USERNAME=%2$s
Read WP_API_PASSWORD through a hidden terminal prompt.
Hub write access: %5$s. Only individually selected actions are exposed.
4. Check Node.js and npx. If missing, link to the official installer and tell me to reopen the terminal. Back up existing settings. Use a JSON/TOML parser or supported client command to merge only this server, preserving other settings and sites. Stop on invalid configuration or a conflicting endpoint. If replacing an old PublishPress desktop extension for this site, guide me to disable only that extension to avoid duplicate connections. Quote paths and values safely.
5. Give brief run, restart and approval instructions. Verify through the connection or give me a prompt to test in the app: confirm the site URL, list actual tools and perform a read-only lookup. Report whether write tools are available. If expected write tools are missing, ask me to check Allow actions that change site data and the selected actions in Hub, then refresh the connection. Do not claim success from saved configuration alone. Do not test writes during setup. Clarify the target site when ambiguous and ask for review before changing site data.', 'publishpress-hub'),
                    rest_url('mcp/publishpress'),
                    wp_get_current_user()->user_login,
                    $this->mcpConnectionService->getClientIdentifier(),
                    $this->mcpConnectionService->getClientDisplayName(),
                    $this->mcpConnectionService->areWritesEnabled() ? __('enabled', 'publishpress-hub') : __('disabled', 'publishpress-hub')
                ),
                'filename' => 'publishpress-setup-prompt.txt',
            ],
            'manual' => [
                'label' => __('Set up manually', 'publishpress-hub'),
                'description' => __('Copy the configuration into your MCP client.', 'publishpress-hub'),
                'content' => $configuration,
                'filename' => 'publishpress-mcp-config.json',
            ],
        ];
    }
}
