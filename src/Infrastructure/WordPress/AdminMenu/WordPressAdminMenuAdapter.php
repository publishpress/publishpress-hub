<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\AdminMenu;

use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuAdapterInterface;

class WordPressAdminMenuAdapter implements AdminMenuAdapterInterface
{
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
