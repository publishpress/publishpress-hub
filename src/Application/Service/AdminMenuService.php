<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Hooks as ApplicationHooks;
use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;

/**
 * Admin menu service.
 *
 * @since 1.0.0
 */
class AdminMenuService implements ServiceInterface
{
    private bool $initialized = false;

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
    }

    /**
     * Register the admin menu.
     *
     * @since 1.0.0
     */
    public function registerAdminMenu(): void
    {
        add_menu_page(
            'PublishPress Hub',
            'PublishPress Hub',
            $this->getAdminMenuCapability(),
            'publishpress-hub',
            function () {
                require_once PUBLISHPRESS_HUB_SRC_PATH . 'templates/admin/dashboard.php';
            },
            $this->getAdminMenuIcon()
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
            file_get_contents(PUBLISHPRESS_HUB_PATH . 'assets/images/penguin-icon.svg')
        );
    }
}
