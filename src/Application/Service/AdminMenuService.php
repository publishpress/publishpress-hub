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
     * The plugins dashboard view.
    /**
     * @since 1.0.0
     */
    private ViewInterface $pluginsDashboardView;

    /**
     * The components showcase view.
     *
     * @since 1.0.0
     */
    private ViewInterface $componentsShowcaseView;

    private bool $displayShowcase = false;

    /**
     * The constructor.
     *
     * @since 1.0.0
     */
    public function __construct(ViewInterface $pluginsDashboardView, ViewInterface $componentsShowcaseView)
    {
        $this->pluginsDashboardView = $pluginsDashboardView;
        $this->componentsShowcaseView = $componentsShowcaseView;

        $this->displayShowcase = defined('PUBLISHPRESS_HUB_DISPLAY_SHOWCASE')
            && constant('PUBLISHPRESS_HUB_DISPLAY_SHOWCASE') == true;
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
            [$this, 'renderPluginsDashboardView'],
            $this->getAdminMenuIcon()
        );

        add_submenu_page(
            'publishpress-hub-dashboard',
            'Plugins',
            'Plugins',
            $this->getAdminMenuCapability(),
            'publishpress-hub-dashboard',
            [$this, 'renderPluginsDashboardView'],
            $this->getAdminMenuIcon()
        );

        if ($this->displayShowcase) {
            add_submenu_page(
                'publishpress-hub-dashboard',
                'Components Showcase',
                'Components Showcase',
                $this->getAdminMenuCapability(),
                'publishpress-hub-components-showcase',
                [$this, 'renderComponentsShowcaseView'],
                $this->getAdminMenuIcon()
            );
        }
    }

    /**
     * Enqueue the scripts.
     *
     * @since 1.0.0
     * @param string $hookSuffix The hook suffix.
     */
    public function enqueueScripts(string $hookSuffix): void
    {
        $this->pluginsDashboardView->enqueueScripts($hookSuffix);

        if ($this->displayShowcase) {
            $this->componentsShowcaseView->enqueueScripts($hookSuffix);
        }
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
    public function renderPluginsDashboardView(): void
    {
        $this->pluginsDashboardView->render();
    }

    /**
     * Render the components showcase view.
     *
     * @since 1.0.0
     */
    public function renderComponentsShowcaseView(): void
    {
        $this->componentsShowcaseView->render();
    }
}
