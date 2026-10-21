<?php

/**
 * Admin controls for the optional MCP connection.
 *
 * @package PublishPress\Hub\Admin\Page
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Admin\Page;

defined('ABSPATH') || exit;

use Exception;
use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Service\Access\HubAccessService;
use PublishPress\Hub\Application\Service\Mcp\McpAdapterInstallationService;
use PublishPress\Hub\Application\Service\Mcp\McpConnectionService;
use PublishPress\Hub\Application\Service\Mcp\McpDesktopInstallerService;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuServiceInterface;
use PublishPress\Hub\Infrastructure\Asset\Contract\AssetServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\View\Contract\ViewServiceInterface;

class McpPageController implements BootableInterface
{
    use BootableTrait;

    private const CLIENT_OPTION = 'publishpress_hub_mcp_client';

    private const SETUP_OPTION = 'publishpress_hub_mcp_setup_complete';

    private McpDesktopInstallerService $mcpDesktopInstallerService;

    private AssetServiceInterface $assetService;

    private McpConnectionService $mcpConnectionService;

    private ViewServiceInterface $viewService;

    private AdminMenuServiceInterface $adminMenuService;

    private McpAdapterInstallationService $mcpAdapterInstallationService;

    /**
     * Constructor.
     *
     * @param McpConnectionService $mcpConnectionService
     * @param ViewServiceInterface $viewService
     * @param AdminMenuServiceInterface $adminMenuService
     * @param McpAdapterInstallationService $mcpAdapterInstallationService
     * @param McpDesktopInstallerService $mcpDesktopInstallerService
     * @param AssetServiceInterface $assetService
     * @since 1.2.0
     */
    public function __construct(
        McpConnectionService $mcpConnectionService,
        ViewServiceInterface $viewService,
        AdminMenuServiceInterface $adminMenuService,
        McpAdapterInstallationService $mcpAdapterInstallationService,
        AssetServiceInterface $assetService,
        McpDesktopInstallerService $mcpDesktopInstallerService
    ) {
        $this->mcpDesktopInstallerService = $mcpDesktopInstallerService;
        $this->assetService = $assetService;
        $this->mcpConnectionService = $mcpConnectionService;
        $this->viewService = $viewService;
        $this->adminMenuService = $adminMenuService;
        $this->mcpAdapterInstallationService = $mcpAdapterInstallationService;
    }

    /**
     * Register request handlers.
     *
     * @return void
     * @since 1.2.0
     */
    protected function onLoad(): void
    {
        $this->addHooks();
    }

    /**
     * Register the connection page with the shared menu service.
     *
     * @return void
     * @since 1.2.0
     */
    protected function onInit(): void
    {
        $this->registerAdminMenu();
    }

    /**
     * Add request hooks.
     *
     * @return void
     * @since 1.2.0
     */
    private function addHooks(): void
    {
        add_action(AbstractHooks::ACTION_ADMIN_ENQUEUE_SCRIPTS, [$this, 'enqueueAssets']);
        add_action(AbstractHooks::ACTION_MCP_AJAX_SAVE_CONNECTION, [$this, 'save']);
        add_action(AbstractHooks::ACTION_MCP_SAVE_CONNECTION, [$this, 'save']);
        add_action(AbstractHooks::ACTION_MCP_DOWNLOAD_INSTALLER, [$this, 'downloadInstaller']);
        add_action(AbstractHooks::ACTION_MCP_INSTALL_ADAPTER, [$this, 'installAdapter']);
    }

    /**
     * Register the admin submenu.
     *
     * @return void
     * @since 1.2.0
     */
    private function registerAdminMenu(): void
    {
        $submenu = [
            'parent_slug' => 'publishpress-hub',
            'page_title' => __('AI Connections', 'publishpress-hub'),
            'menu_title' => __('AI Connections', 'publishpress-hub'),
            'capability' => HubAccessService::MCP_CAPABILITY,
            'menu_slug' => 'publishpress-hub-mcp',
            'callback' => [$this, 'showConnectionPage'],
            'position' => null,
        ];

        $this->adminMenuService->addSubmenuPage($submenu);
    }

    /**
     * Save connection exposure settings after authorization and nonce validation.
     *
     * @return void
     * @since 1.2.0
     */
    public function save(): void
    {
        if (!HubAccessService::canManageMcp()) {
            if (wp_doing_ajax()) {
                wp_send_json_error(['message' => __('You cannot manage AI connections.', 'publishpress-hub')], 403);
            }
            wp_die(esc_html__('You cannot manage AI connections.', 'publishpress-hub'), '', ['response' => 403]);
        }

        if (wp_doing_ajax()) {
            if (!check_ajax_referer('publishpress_hub_mcp_save', '_wpnonce', false)) {
                wp_send_json_error(['message' => __('Your session has expired. Refresh the page and try again.', 'publishpress-hub')], 403);
            }
        } else {
            check_admin_referer('publishpress_hub_mcp_save');
        }
        if (sanitize_text_field(wp_unslash($_SERVER['REQUEST_METHOD'] ?? '')) !== 'POST') {
            if (wp_doing_ajax()) {
                wp_send_json_error(['message' => __('Use the connection settings form.', 'publishpress-hub')], 405);
            }
            wp_die(esc_html__('Use the connection settings form.', 'publishpress-hub'), '', ['response' => 405]);
        }
        $enabled = isset($_POST['mcp_enabled']) && '1' === $_POST['mcp_enabled'];
        $writesEnabled = isset($_POST['mcp_writes_enabled']) && '1' === $_POST['mcp_writes_enabled'];
        $submitted = isset($_POST['enabled_actions']) && is_array($_POST['enabled_actions'])
            ? array_map('sanitize_text_field', wp_unslash($_POST['enabled_actions'])) : [];
        $displayed = isset($_POST['displayed_actions']) && is_array($_POST['displayed_actions'])
            ? array_map('sanitize_text_field', wp_unslash($_POST['displayed_actions'])) : [];
        $this->mcpConnectionService->saveExposureSettings($enabled, $writesEnabled, $submitted, $displayed);
        $client = isset($_POST['mcp_client']) && is_string($_POST['mcp_client'])
            ? sanitize_key(wp_unslash($_POST['mcp_client'])) : '';
        if (array_key_exists($client, $this->getClientSetups())) {
            update_user_option(get_current_user_id(), self::CLIENT_OPTION, $client);
        }
        if (isset($_POST['mcp_setup_complete']) && is_string($_POST['mcp_setup_complete'])) {
            update_user_option(get_current_user_id(), self::SETUP_OPTION, $_POST['mcp_setup_complete'] === '1');
        }
        if (wp_doing_ajax()) {
            ob_start();
            $this->showConnectionPage();
            $html = ob_get_clean();
            wp_send_json_success([
                'html' => $html,
                'message' => __('Connection settings saved. Reconnect your AI app to refresh its actions.', 'publishpress-hub'),
            ]);
        }
        $returnUrl = isset($_POST['return_url']) && is_string($_POST['return_url'])
            ? wp_validate_redirect(esc_url_raw(wp_unslash($_POST['return_url'])), '') : '';
        $pageUrl = admin_url('admin.php?page=publishpress-hub-mcp');
        if (strpos($returnUrl, $pageUrl) !== 0) {
            $returnUrl = $pageUrl;
        }
        wp_safe_redirect(add_query_arg('updated', '1', $returnUrl));
        exit;
    }

    /**
     * Download a site-specific desktop extension after explicit authorization.
     *
     * @return void
     * @since 1.2.0
     */
    public function downloadInstaller(): void
    {
        if (!HubAccessService::canManageMcp()) {
            wp_die(esc_html__('You cannot manage AI connections.', 'publishpress-hub'), '', ['response' => 403]);
        }
        if (sanitize_text_field(wp_unslash($_SERVER['REQUEST_METHOD'] ?? '')) !== 'POST') {
            wp_die(esc_html__('Use the installer download button.', 'publishpress-hub'), '', ['response' => 405]);
        }
        check_admin_referer('publishpress_hub_mcp_installer');
        try {
            $bundle = $this->mcpDesktopInstallerService->create();
        } catch (\Throwable $exception) {
            wp_die(esc_html__('The installer could not be created. Check the connection prerequisites or use manual configuration.', 'publishpress-hub'), '', ['response' => 500]);
        }
        nocache_headers();
        header('Cache-Control: no-store, private');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . $bundle['filename'] . '"');
        header('X-Content-Type-Options: nosniff');
        // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Binary ZIP download generated by the installer service.
        echo $bundle['content'];
        exit;
    }

    /**
     * Render the connection settings page.
     *
     * @return void
     * @since 1.2.0
     */
    public function showConnectionPage(): void
    {
        if (!HubAccessService::canManageMcp()) {
            return;
        }

        require_once ABSPATH . 'wp-admin/includes/plugin.php';

        $adapterFile = McpAdapterInstallationService::PLUGIN_FILE;
        $setupSteps = $this->getSetupSteps();
        $catalog = $this->mcpConnectionService->getActionCatalog();
        $nextStep = null;
        foreach ($setupSteps as $step) {
            if (
                (in_array($step['key'], ['wordpress', 'adapter', 'https', 'passwords'], true) && !$step['complete'])
                || ($step['key'] === 'actions' && !$catalog)
            ) {
                $nextStep = $step;
                break;
            }
        }
        $setupComplete = (bool) get_user_option(self::SETUP_OPTION);
        $stage = !$this->mcpConnectionService->isEnabled() ? 'disabled'
            : ($nextStep ? 'prerequisite'
                : (!$this->mcpConnectionService->getAbilityNames() ? 'access' : ($setupComplete ? 'manage' : 'connect')));

        $this->viewService->render(
            'Mcp/connection-page',
            [
                'adapterFile' => $adapterFile,
                'adapterInstalled' => file_exists(WP_PLUGIN_DIR . '/' . $adapterFile),
                'adapterActive' => is_plugin_active($adapterFile),
                'supportsAbilities' => function_exists('wp_get_abilities'),
                'catalog' => $catalog,
                'disabledActions' => $this->mcpConnectionService->getDisabledActions(),
                'writesEnabled' => $this->mcpConnectionService->areWritesEnabled(),
                'connectionEnabled' => $this->mcpConnectionService->isEnabled(),
                'connectionAvailable' => $this->mcpConnectionService->isAvailable(),
                'diagnostics' => $this->mcpConnectionService->getDiagnostics(),
                'abilityNames' => $this->mcpConnectionService->getAbilityNames(),
                'actionView' => $this->getActionView(),
                'setupComplete' => $setupComplete,
                'setupStage' => $stage,
                'welcomeImageUrl' => $this->assetService->getPluginAssetUrl('images/welcome.png'),
                'nextStep' => $nextStep,
                'clientConfiguration' => $this->getClientConfiguration(),
                'clientSetups' => $this->getClientSetups(),
                'selectedClient' => array_key_exists((string) get_user_option(self::CLIENT_OPTION), $this->getClientSetups())
                    ? get_user_option(self::CLIENT_OPTION) : 'desktop',
                'installerAvailable' => $this->mcpDesktopInstallerService->isAvailable(),
                'connectionUrl' => rest_url('mcp/publishpress'),
                'username' => wp_get_current_user()->user_login,
            ]
        );
    }

    /**
     * Enqueue this page's assets through the shared asset service.
     *
     * @param string $hookSuffix Admin page hook.
     * @return void
     * @since 1.2.0
     */
    public function enqueueAssets(string $hookSuffix): void
    {
        if ('publishpress_page_publishpress-hub-mcp' !== $hookSuffix) {
            return;
        }
        $this->assetService->enqueueStyle(
            'publishpress-hub-admin-page',
            'css/admin-page.css',
            ['wp-components']
        );
        $this->assetService->enqueueStyle(
            'publishpress-hub-mcp',
            'css/mcp-page-styles.css',
            ['publishpress-hub-admin-page']
        );
        $this->assetService->enqueueScript(
            'publishpress-hub-mcp',
            'js/mcp-page.js',
            [
                'wp-element',
                'wp-components',
                'wp-data',
                'wp-notices',
                'publishpress-hub-i18n',
            ]
        );
        $this->assetService->localizeScript('publishpress-hub-mcp', 'ppHubMcpConfig', [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'logoUrl' => $this->assetService->getPluginAssetUrl('images/publishpress-logo.png'),
        ]);
    }

    /**
     * Prepare bounded action lists with plugin tabs and read-only query filters.
     *
     * @return array<string, mixed>
     * @since 1.2.0
     */
    private function getActionView(): array
    {
        // phpcs:disable WordPress.Security.NonceVerification.Recommended -- Read-only display filters; saving uses a separate nonce-protected POST.
        $plugin = isset($_GET['plugin']) && is_string($_GET['plugin'])
            ? sanitize_key(wp_unslash($_GET['plugin'])) : '';
        $search = isset($_GET['search']) && is_string($_GET['search'])
            ? sanitize_text_field(wp_unslash($_GET['search'])) : '';
        $behavior = isset($_GET['behavior']) && is_string($_GET['behavior'])
            ? sanitize_key(wp_unslash($_GET['behavior'])) : '';
        $page = isset($_GET['action_page']) && is_scalar($_GET['action_page'])
            ? max(1, absint($_GET['action_page'])) : 1;
        // phpcs:enable WordPress.Security.NonceVerification.Recommended
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
        $url = add_query_arg([
            'page' => 'publishpress-hub-mcp', 'plugin' => $plugin, 'search' => $search,
            'behavior' => $behavior, 'action_page' => $page,
        ], admin_url('admin.php'));
        return [
            'groups' => $groups, 'plugin' => $plugin, 'search' => $search, 'behavior' => $behavior,
            'actions' => array_slice($actions, ($page - 1) * 10, 10), 'total' => $total,
            'page' => $page, 'pages' => $pages, 'url' => $url,
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
                'label' => __('Install or update MCP Adapter', 'publishpress-hub'),
                'description' => __('Install or update the free WordPress MCP Adapter plugin to connect your AI app. Version 0.7.1 or newer is required.', 'publishpress-hub'),
                'url' => $this->mcpConnectionService->isAvailable()
                    ? self_admin_url('plugins.php') : '#mcp-adapter-setup',
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
                'complete' => $this->mcpConnectionService->isEnabled(),
                'key' => 'enabled',
                'label' => __('PublishPress connection is enabled', 'publishpress-hub'),
                'description' => __('Enable the connection above and save your changes.', 'publishpress-hub'),
                'url' => '#mcp-connection-settings',
                'action' => __('Open connection settings', 'publishpress-hub'),
            ],
            [
                'complete' => (bool) $this->mcpConnectionService->getAbilityNames(),
                'key' => 'actions',
                'label' => __('Add a PublishPress plugin with AI actions', 'publishpress-hub'),
                'description' => __('Install or activate a PublishPress plugin that provides AI actions to continue.', 'publishpress-hub'),
                'url' => $this->mcpConnectionService->getActionCatalog()
                    ? '#mcp-actions-heading' : admin_url('admin.php?page=publishpress-hub'),
                'action' => $this->mcpConnectionService->getActionCatalog()
                    ? __('Choose actions', 'publishpress-hub') : __('Open PublishPress plugins', 'publishpress-hub'),
            ],
            [
                'complete' => $passwordsAvailable,
                'key' => 'passwords',
                'label' => __('Allow application passwords for your account', 'publishpress-hub'),
                'description' => $passwordsAvailable
                    ? __('The Claude Desktop installer creates an application password for you. For assisted or manual setup, create one in your WordPress profile.', 'publishpress-hub')
                    : __('Application passwords are unavailable for your account. HTTPS or security plugin settings may need attention.', 'publishpress-hub'),
                'url' => admin_url('profile.php#application-passwords-section'),
                'action' => __('Open application passwords', 'publishpress-hub'),
            ],
            [
                'complete' => null,
                'key' => 'client',
                'label' => __('Connect your AI app and try an action', 'publishpress-hub'),
                'description' => __('Complete this step in your AI app using the instructions below. Hub cannot detect whether your app has been configured.', 'publishpress-hub'),
                'url' => '#mcp-client-setup',
                'action' => __('View client setup instructions', 'publishpress-hub'),
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
            'desktop' => [
                'label' => __('Claude Desktop', 'publishpress-hub'),
                'description' => __('Download an extension with your connection details prefilled.', 'publishpress-hub'),
                'content' => $configuration, 'filename' => 'publishpress-claude-desktop.json',
            ],
            'assistant' => [
                'label' => __('Ask my AI to help', 'publishpress-hub'),
                'description' => __('Ask your AI for a setup script to run on your computer.', 'publishpress-hub'),
                'content' => sprintf(
                    // translators: 1: site MCP endpoint, 2: WordPress username, 3: site-specific MCP server identifier, 4: path-safe connection display name.
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
4. Check Node.js and npx. If missing, link to the official installer and tell me to reopen the terminal. Back up existing settings. Use a JSON/TOML parser or supported client command to merge only this server, preserving other settings and sites. Stop on invalid configuration or a conflicting endpoint. Quote paths and values safely.
5. Give brief run, restart and approval instructions. Verify by listing PublishPress actions through the connection, or give me a prompt to test in the app. Saving configuration alone is not proof of a connection. Clarify the target site when ambiguous and ask for review before changing site data.', 'publishpress-hub'),
                    rest_url('mcp/publishpress'),
                    wp_get_current_user()->user_login,
                    $this->mcpConnectionService->getClientIdentifier(),
                    $this->mcpConnectionService->getClientDisplayName()
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

    /**
     * Use WordPress installation and activation APIs without collecting credentials.
     *
     * @return void
     * @since 1.2.0
     */
    public function installAdapter(): void
    {
        if (!HubAccessService::canManageMcp() || !current_user_can('activate_plugins')) {
            wp_die(esc_html__('You cannot install this connection.', 'publishpress-hub'), '', ['response' => 403]);
        }

        check_admin_referer('publishpress_hub_mcp_install');
        if (sanitize_text_field(wp_unslash($_SERVER['REQUEST_METHOD'] ?? '')) !== 'POST') {
            wp_die(esc_html__('Use the adapter installation button.', 'publishpress-hub'), '', ['response' => 405]);
        }
        try {
            $installed = $this->mcpAdapterInstallationService->install();
        } catch (Exception $exception) {
            $installed = false;
        }

        $status = $installed ? 'installed' : 'install-failed';
        wp_safe_redirect(admin_url('admin.php?page=publishpress-hub-mcp&mcp_status=' . $status));
        exit;
    }
}
