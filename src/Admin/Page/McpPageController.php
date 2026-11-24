<?php

/**
 * Mount the React AI Connections page.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Admin\Page;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Service\Access\HubAccessService;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuServiceInterface;
use PublishPress\Hub\Infrastructure\Asset\Contract\AssetServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\View\Contract\ViewServiceInterface;

\defined('ABSPATH') || exit;

class McpPageController implements BootableInterface
{
    use BootableTrait;

    private ViewServiceInterface $viewService;

    private AdminMenuServiceInterface $adminMenuService;

    private AssetServiceInterface $assetService;

    /**
     * @param ViewServiceInterface $viewService Admin templates.
     * @param AdminMenuServiceInterface $adminMenuService Hub menu.
     * @param AssetServiceInterface $assetService Page assets.
     * @since 1.2.0
     */
    public function __construct(
        ViewServiceInterface $viewService,
        AdminMenuServiceInterface $adminMenuService,
        AssetServiceInterface $assetService
    ) {
        $this->viewService = $viewService;
        $this->adminMenuService = $adminMenuService;
        $this->assetService = $assetService;
    }

    /**
     * Register page hooks.
     *
     * @return void
     * @since 1.2.0
     */
    protected function onLoad(): void
    {
        $this->addHooks();
    }

    /**
     * @return void
     * @since 1.2.0
     */
    private function addHooks(): void
    {
        add_action(AbstractHooks::ACTION_ADMIN_ENQUEUE_SCRIPTS, [$this, 'enqueueAssets']);
    }

    /**
     * Register the Hub submenu.
     *
     * @return void
     * @since 1.2.0
     */
    protected function onInit(): void
    {
        $this->registerAdminMenu();
    }

    /**
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
     * Mount the React page for authorized administrators.
     *
     * @return void
     * @since 1.2.0
     */
    public function showConnectionPage(): void
    {
        if (!HubAccessService::canManageMcp()) {
            return;
        }
        $this->viewService->render('Mcp/connection-page', [
            'loading_message' => __('Please wait while we load AI connections...', 'publishpress-hub'),
        ]);
    }

    /**
     * @param string $hookSuffix Current admin page.
     * @since 1.2.0
     */
    public function enqueueAssets(string $hookSuffix): void
    {
        if ('publishpress_page_publishpress-hub-mcp' !== $hookSuffix) {
            return;
        }
        $this->assetService->enqueueStyle('publishpress-hub-admin-page', 'css/admin-page.css', ['wp-components']);
        $this->assetService->enqueueStyle('publishpress-hub-mcp', 'css/mcp-page-styles.css', ['publishpress-hub-admin-page']);
        $this->assetService->enqueueScript('publishpress-hub-mcp', 'js/mcp-page.js', [
            'wp-element', 'wp-components', 'wp-data', 'wp-notices', 'wp-api-fetch', 'publishpress-hub-i18n',
        ]);
        $this->assetService->localizeScript('publishpress-hub-mcp', 'ppHubMcpConfig', [
            'apiNonce' => wp_create_nonce('wp_rest'),
            'logoUrl' => $this->assetService->getPluginAssetUrl('images/publishpress-logo.png'),
            'welcomeImageUrl' => add_query_arg(
                'ver',
                '2',
                $this->assetService->getPluginAssetUrl('images/welcome.png')
            ),
        ]);
    }
}
