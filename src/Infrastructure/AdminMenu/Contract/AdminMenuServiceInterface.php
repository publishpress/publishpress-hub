<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\AdminMenu\Contract;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Infrastructure\AdminMenu\Entity\MenuPage;
use PublishPress\Hub\Infrastructure\AdminMenu\Entity\SubmenuPage;

interface AdminMenuServiceInterface extends BootableInterface
{
    public function addMenuPage(MenuPage $menuPage): void;

    public function addSubmenuPage(SubmenuPage $submenuPage): void;

    public function setMainMenuPage(string $menuSlug): void;
}
