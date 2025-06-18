<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Hooks as ApplicationHooks;
use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;
use PublishPress\Hub\Application\View\Contracts\ViewInterface;
use PublishPress\Hub\Infrastructure\Asset\AssetManager;

/**
 * Admin menu service.
 *
 * @since 1.0.0
 */
class AdminMenuService implements ServiceInterface
{
    /**
     * Whether the service is initialized.
     *
     * @since 1.0.0
     */
    private bool $initialized = false;

    /**
     * The dashboard view.
     *
     * @since 1.0.0
     */
    private ViewInterface $dashboardView;

    /**
     * The asset manager.
     *
     * @since 1.0.0
     */
    private AssetManager $assetManager;

    /**
     * The constructor.
     *
     * @since 1.0.0
     */
    public function __construct(ViewInterface $dashboardView, AssetManager $assetManager    )
    {
        $this->dashboardView = $dashboardView;
        $this->assetManager = $assetManager;
    }

    /**
     * Initialize the service.
     *
     * @since 1.0.0
     * @return self
     */
    public function initialize(): self
    {
        if ($this->initialized) {
            return $this;
        }

        $this->initialized = true;

        $this->registerHooks();

        return $this;
    }

    /**
     * Check if the service is initialized.
     *
     * @since 1.0.0
     * @return bool
     */
    public function isInitialized(): bool
    {
        return $this->initialized;
    }

    /**
     * Register the hooks.
     *
     * @since 1.0.0
     */
    private function registerHooks(): void
    {
        add_action(ApplicationHooks::ACTION_ADMIN_MENU, [$this, 'registerAdminMenu']);
        add_action(ApplicationHooks::ACTION_ENQUEUE_SCRIPTS, [$this, 'enqueueScripts']);
    }

    /**
     * Register the admin menu.
     *
     * @since 1.0.0
     */
    public function registerAdminMenu(): void
    {
        add_menu_page(
            'PublishPress',
            'PublishPress',
            $this->getAdminMenuCapability(),
            'publishpress-hub-dashboard',
            [$this, 'renderDashboardView'],
            $this->getAdminMenuIcon()
        );

        add_submenu_page(
            'publishpress-hub-dashboard',
            'Plugins',
            'Plugins',
            $this->getAdminMenuCapability(),
            'publishpress-hub-dashboard',
            [$this, 'renderDashboardView'],
            $this->getAdminMenuIcon()
        );
    }

    /**
     * Enqueue the scripts.
     *
     * @since 1.0.0
     * @param string $hookSuffix The hook suffix.
     */
    public function enqueueScripts(string $hookSuffix): void
    {
        if ('toplevel_page_publishpress-hub-dashboard' !== $hookSuffix) {
            return;
        }

        $this->assetManager->enqueueStyle(
            'publishpress-hub-dashboard',
            'css/admin-page.css',
            []
        );

        $this->assetManager->enqueueScript(
            'publishpress-hub-dashboard',
            'dist/js/hub-dashboard.js',
            [
                'publishpress-hub-i18n',
                'wp-element',
                'wp-components',
            ]
        );

        $this->assetManager->localizeScript(
            'publishpress-hub-dashboard',
            'publishpressHubDashboardConfig',
            [
                'logoUrl' => $this->assetManager->getAssetUrl('images/publishpress-logo.png'),
            ]
        );
    }

    /**
     * Get the admin menu capability.
     *
     * @return string
     */
    private function getAdminMenuCapability(): string
    {
        return 'manage_options';
    }

    /**
     * Get the admin menu icon.
     *
     * @return string
     */
    private function getAdminMenuIcon(): string
    {
        // TODO: Add a proper icon and avoid converting to base64 on the fly.
        return 'data:image/svg+xml;base64,' . base64_encode(
            file_get_contents(PUBLISHPRESS_HUB_ASSETS_PATH . 'images/penguin-icon.svg')
        );
    }

    /**
     * Render the dashboard view.
     *
     * @since 1.0.0
     */
    public function renderDashboardView(): void
    {
        $this->dashboardView->render();
    }
}
