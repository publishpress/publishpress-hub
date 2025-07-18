<?php

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

    protected function onLoad(): void
    {
    }

    protected function onInit(): void
    {
        $this->hooksService->addAction(AbstractHooks::ACTION_ADMIN_MENU, [$this, 'registerAdminMenu']);
    }

    public function addMenuPage(MenuPage $menuPage): void {
        $this->menuPages[$menuPage->getMenuSlug()] = $menuPage;
    }

    public function addSubMenuPage(SubmenuPage $subMenuPage): void {
        $this->submenuPages[$subMenuPage->getMenuSlug()] = $subMenuPage;
    }

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
            $menuSlug = $this->mainMenuPageSlug ?? $submenuPage->getParentSlug();

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

    public function setMainMenuPage(string $menuSlug): void
    {
        $this->mainMenuPageSlug = $menuSlug;
    }
}
