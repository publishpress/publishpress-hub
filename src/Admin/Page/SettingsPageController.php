<?php

/**
 * Settings page controller.
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

class SettingsPageController implements BootableInterface
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
        // Disabled until we have settings to show
        // $this->registerAdminMenu();
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
            'page_title' => __('Settings', 'publishpress-hub'),
            'menu_title' => __('Settings', 'publishpress-hub'),
            'capability' => HubAccessService::CAPABILITY,
            'menu_slug' => 'publishpress-hub-settings',
            'callback' => [$this, 'showSettingsPage'],
            'position' => null,
        ];

        $this->adminMenuService->addSubmenuPage($submenu);
    }

    /**
     * Show settings page.
     *
     * @return void
     * @since 1.0.0
     */
    public function showSettingsPage(): void
    {
        $this->viewService->render(
            'Settings/settings-page',
            [
                'loading_message' => __('Please wait while we load the settings page...', 'publishpress-hub'),
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
        if ('publishpress_page_publishpress-hub-settings' !== $hookSuffix) {
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
            'publishpress-hub-settings-page',
            'js/settings-page.js',
            [
                'wp-element',
                'wp-components',
                'wp-data',
                'wp-primitives',
                'publishpress-hub-i18n',
            ]
        );

        $this->assetService->localizeScript(
            'publishpress-hub-settings-page',
            'ppHubSettingsPageConfig',
            [
                'logoUrl' => $this->assetService->getPluginAssetUrl('images/publishpress-logo.png'),
            ]
        );
    }
}
