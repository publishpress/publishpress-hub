<?php

/**
 * WordPress admin menu adapter.
 *
 * @package PublishPress\Hub\Infrastructure\WP\AdminMenu
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WP\AdminMenu;

use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuAdapterInterface;

class WPAdminMenuAdapter implements AdminMenuAdapterInterface
{
    /**
     * Add a menu page.
     *
     * @param string $pageTitle The page title.
     * @param string $menuTitle The menu title.
     * @param string $capability The capability.
     * @param string $menuSlug The menu slug.
     * @param callable $callback The callback.
     * @param string $iconUrl The icon URL.
     * @param int|null $position The position.
     * @since 1.0.0
     */
    public function addMenuPage(
        string $pageTitle,
        string $menuTitle,
        string $capability,
        string $menuSlug,
        callable $callback,
        string $iconUrl = '',
        ?int $position = null
    ): void {
        add_menu_page(
            $pageTitle,
            $menuTitle,
            $capability,
            $menuSlug,
            $callback,
            $iconUrl,
            $position
        );
    }

    /**
     * Add a submenu page.
     *
     * @param string $parentSlug The parent slug.
     * @param string $pageTitle The page title.
     * @param string $menuTitle The menu title.
     * @param string $capability The capability.
     * @param string $menuSlug The menu slug.
     * @param callable $callback The callback.
     * @param int|null $position The position.
     * @since 1.0.0
     */
    public function addSubmenuPage(
        string $parentSlug,
        string $pageTitle,
        string $menuTitle,
        string $capability,
        string $menuSlug,
        callable $callback,
        ?int $position = null
    ): void {
        add_submenu_page(
            $parentSlug,
            $pageTitle,
            $menuTitle,
            $capability,
            $menuSlug,
            $callback
        );
    }
}
