<?php

/**
 * Admin menu service interface.
 *
 * @package PublishPress\Hub\Infrastructure\AdminMenu\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\AdminMenu\Contract;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Infrastructure\AdminMenu\Entity\MenuPage;
use PublishPress\Hub\Infrastructure\AdminMenu\Entity\SubmenuPage;

interface AdminMenuServiceInterface extends BootableInterface
{
    /**
     * Add a menu page.
     *
     * @param MenuPage $menuPage The menu page to add.
     * @since 1.0.0
     */
    public function addMenuPage(MenuPage $menuPage): void;

    /**
     * Add a submenu page.
     *
     * @param SubmenuPage $submenuPage The submenu page to add.
     * @since 1.0.0
     */
    public function addSubmenuPage(SubmenuPage $submenuPage): void;

    /**
     * Set the main menu page.
     *
     * @param string $menuSlug The slug of the main menu page.
     * @since 1.0.0
     */
    public function setMainMenuPage(string $menuSlug): void;
}
