<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\AdminMenu\Contract;

interface AdminMenuAdapterInterface
{
    public function addMenuPage(
        string $pageTitle,
        string $menuTitle,
        string $capability,
        string $menuSlug,
        callable $callback,
        string $iconUrl = '',
        ?int $position = null
    ): void;

    public function addSubmenuPage(
        string $parentSlug,
        string $pageTitle,
        string $menuTitle,
        string $capability,
        string $menuSlug,
        callable $callback,
        int $position = null
    ): void;
}
