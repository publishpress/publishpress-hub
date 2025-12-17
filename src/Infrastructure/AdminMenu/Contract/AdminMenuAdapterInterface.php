<?php

/**
 * Admin menu adapter interface.
 *
 * @package PublishPress\Hub\Infrastructure\AdminMenu\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\AdminMenu\Contract;

interface AdminMenuAdapterInterface
{
    /**
     * Add a menu page.
     *
     * @param string $pageTitle The title of the page.
     * @param string $menuTitle The title of the menu item.
     * @param string $capability The capability required for this menu page.
     * @param string $menuSlug The slug of the menu page.
     * @param callable $callback The callback function to display the page content.
     * @param string $iconUrl The URL of the icon for the menu page.
     * @param int|null $position The position of the menu page in the menu.
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
    ): void;

    /**
     * Add a submenu page.
     *
     * @param string $parentSlug The slug of the parent menu page.
     * @param string $pageTitle The title of the page.
     * @param string $menuTitle The title of the menu item.
     * @param string $capability The capability required for this submenu page.
     * @param string $menuSlug The slug of the submenu page.
     * @param callable $callback The callback function to display the page content.
     * @param int|null $position The position of the submenu page in the parent menu.
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
    ): void;
}
