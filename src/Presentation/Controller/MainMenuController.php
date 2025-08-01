<?php

declare(strict_types=1);

namespace PublishPress\Hub\Presentation\Controller;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuServiceInterface;
use PublishPress\Hub\Infrastructure\AdminMenu\Entity\MenuPage;

class MainMenuController implements BootableInterface
{
    use BootableTrait;

    private AdminMenuServiceInterface $adminMenuService;

    public function __construct(
        AdminMenuServiceInterface $adminMenuService
    ) {
        $this->adminMenuService = $adminMenuService;
    }

    protected function onLoad(): void
    {
        $this->registerAdminMenu();
    }

    protected function onInit(): void
    {
    }

    private function registerAdminMenu(): void
    {
        $adminPage = new MenuPage(
            'PublishPress',
            'PublishPress',
            'manage_options',
            'publishpress-hub',
            /*
             * This is a placeholder for the callback. It will be overridden
             * by another service by setting setMainMenuPage().
             */
            '__return_empty_string',
            'dashicons-admin-page',
            99
        );

        $this->adminMenuService->addMenuPage($adminPage);
    }
}
