<?php

/**
 * Admin menu service.
 *
 * @package PublishPress\Hub\Infrastructure\AdminMenu
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\AdminMenu;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuAdapterInterface;
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;
use PublishPress\Hub\Infrastructure\AdminMenu\Entity\MenuPage;
use PublishPress\Hub\Infrastructure\AdminMenu\Entity\SubmenuPage;

class AdminMenuService implements AdminMenuServiceInterface, BootableInterface
{
    use BootableTrait;

    private AdminMenuAdapterInterface $adminMenuAdapter;

    private HooksServiceInterface $hooksService;

    /**
     * @var array<MenuPage>
     */
    private array $menuPages;

    /**
     * @var array<SubmenuPage>
     */
    private array $submenuPages;

    private ?string $mainMenuPageSlug;

    /**
     * @param AdminMenuAdapterInterface $adminMenuAdapter The admin menu adapter.
     * @param HooksServiceInterface $hooksService The hooks service.
     * @since 1.0.0
     */
    public function __construct(
        AdminMenuAdapterInterface $adminMenuAdapter,
        HooksServiceInterface $hooksService
    ) {
        $this->adminMenuAdapter = $adminMenuAdapter;
        $this->hooksService = $hooksService;

        $this->menuPages = [];
        $this->submenuPages = [];
        $this->mainMenuPageSlug = null;
    }

    /**
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
    }

    /**
     * @since 1.0.0
     */
    protected function onInit(): void
    {
        $this->hooksService->addAction(AbstractHooks::ACTION_ADMIN_MENU, [$this, 'registerAdminMenu']);
    }

    /**
     * Add a menu page.
     *
     * @param MenuPage $menuPage The menu page to add.
     * @since 1.0.0
     */
    public function addMenuPage(MenuPage $menuPage): void
    {
        $this->menuPages[$menuPage->getMenuSlug()] = $menuPage;
    }

    /**
     * Add a submenu page.
     *
     * @param SubmenuPage $submenuPage The submenu page to add.
     * @since 1.0.0
     */
    public function addSubmenuPage(SubmenuPage $submenuPage): void
    {
        $this->submenuPages[$submenuPage->getMenuSlug()] = $submenuPage;
    }

    /**
     * Register the admin menu.
     *
     * @since 1.0.0
     */
    public function registerAdminMenu(): void
    {
        foreach ($this->menuPages as $menuPage) {
            $this->adminMenuAdapter->addMenuPage(
                $menuPage->getPageTitle(),
                $menuPage->getMenuTitle(),
                $menuPage->getCapability(),
                $menuPage->getMenuSlug(),
                $menuPage->getCallback(),
                $menuPage->getIconUrl(),
                $menuPage->getPosition()
            );
        }

        foreach ($this->submenuPages as $submenuPage) {
            $menuSlug = $submenuPage->getMenuSlug();

            // If the submenu page is the main menu page, use the parent slug to override the menu page.
            if ($this->mainMenuPageSlug === $menuSlug) {
                $menuSlug = $submenuPage->getParentSlug();
            }

            $this->adminMenuAdapter->addSubmenuPage(
                $submenuPage->getParentSlug(),
                $submenuPage->getPageTitle(),
                $submenuPage->getMenuTitle(),
                $submenuPage->getCapability(),
                $menuSlug,
                $submenuPage->getCallback(),
                $submenuPage->getPosition()
            );
        }
    }

    /**
     * Set the main menu page.
     *
     * @param string $menuSlug The slug of the main menu page.
     * @since 1.0.0
     */
    public function setMainMenuPage(string $menuSlug): void
    {
        $this->mainMenuPageSlug = $menuSlug;
    }
}
