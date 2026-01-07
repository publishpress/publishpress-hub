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

interface AdminMenuServiceInterface extends BootableInterface
{
    /**
     * Add a menu page.
     *
     * @param array<string, mixed> $menuPage The menu page to add.
     * @since 1.0.0
     */
    public function addMenuPage(array $menuPage): void;

    /**
     * Add a submenu page.
     *
     * @param array<string, mixed> $submenuPage The submenu page to add.
     * @since 1.0.0
     */
    public function addSubmenuPage(array $submenuPage): void;

    /**
     * Set the main menu page.
     *
     * @param string $menuSlug The slug of the main menu page.
     * @since 1.0.0
     */
    public function setMainMenuPage(string $menuSlug): void;
}
