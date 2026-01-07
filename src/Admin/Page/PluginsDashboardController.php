<?php

/**
 * Plugins dashboard controller.
 *
 * @package PublishPress\Hub\Admin\Page
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
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

class PluginsDashboardController implements BootableInterface
{
    use BootableTrait;

    private ViewServiceInterface $viewService;

    private AdminMenuServiceInterface $adminMenuService;

    private AssetServiceInterface $assetService;

    /**
     * Constructor.
     *
     * @param ViewServiceInterface $viewService
     * @param AdminMenuServiceInterface $adminMenuService
     * @param AssetServiceInterface $assetService
     * @since 1.0.0
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
     * On load.
     *
     * @return void
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        $this->addHooks();
    }

    /**
     * On init.
     *
     * @return void
     * @since 1.0.0
     */
    protected function onInit(): void
    {
        $this->registerAdminMenu();
    }

    /**
     * Add hooks.
     *
     * @return void
     * @since 1.0.0
     */
    private function addHooks(): void
    {
        add_action(AbstractHooks::ACTION_ADMIN_ENQUEUE_SCRIPTS, [$this, 'enqueueAssets']);
    }

    /**
     * Register admin menu.
     *
     * @return void
     * @since 1.0.0
     */
    private function registerAdminMenu(): void
    {
        $submenu = [
            'parent_slug' => 'publishpress-hub',
            'page_title' => 'Plugins',
            'menu_title' => 'Plugins',
            'capability' => HubAccessService::CAPABILITY,
            'menu_slug' => 'publishpress-hub-plugins-dashboard',
            'callback' => [$this, 'showDashboard'],
            'position' => null,
        ];

        $this->adminMenuService->addSubmenuPage($submenu);

        if ($this->isWelcomePageDisabled()) {
            $this->adminMenuService->setMainMenuPage('publishpress-hub-plugins-dashboard');
        }
    }

    /**
     * Check if welcome page is disabled.
     *
     * @return bool
     * @since 1.0.0
     */
    private function isWelcomePageDisabled(): bool
    {
        return \PublishPress\Hub\Admin\Page\WelcomePageController::checkIfWelcomePageDisabled();
    }

    /**
     * Show dashboard.
     *
     * @return void
     * @since 1.0.0
     */
    public function showDashboard(): void
    {
        $this->viewService->render(
            'PluginsDashboard/plugins-dashboard-container',
            [
                'loading_message' => __('Please wait while we load the plugins dashboard...', 'publishpress-hub'),
            ]
        );
    }

    /**
     * Enqueue assets.
     *
     * @param string $hookSuffix
     * @return void
     * @since 1.0.0
     */
    public function enqueueAssets(string $hookSuffix): void
    {
        // When welcome page is disabled, Plugins is the main menu page
        $isMainMenuPage = 'toplevel_page_publishpress-hub' === $hookSuffix && $this->isWelcomePageDisabled();
        // When welcome page is enabled, Plugins is a submenu page
        $isSubmenuPage = 'publishpress_page_publishpress-hub-plugins-dashboard' === $hookSuffix;

        if (! $isMainMenuPage && ! $isSubmenuPage) {
            return;
        }

        $this->assetService->enqueueStyle(
            'publishpress-hub-admin-page',
            'css/admin-page.css',
            [
                'wp-components',
            ]
        );

        $this->assetService->enqueueScript(
            'publishpress-hub-plugins-dashboard',
            'js/plugins-dashboard.js',
            [
                'publishpress-hub-i18n',
                'wp-element',
                'wp-components',
                'wp-data-controls',
                'wp-api-fetch',
                'wp-notices',
            ]
        );

        $this->assetService->localizeScript(
            'publishpress-hub-plugins-dashboard',
            'ppHubPluginsDashboardConfig',
            [
                'logoUrl' => $this->assetService->getPluginAssetUrl('images/publishpress-logo.png'),
                'apiNonce' => $this->securityService->createNonceForRest(),
                'pluginIconBaseUrl' => $this->assetService->getPluginAssetsBaseUrl(),
            ]
        );
    }
}
