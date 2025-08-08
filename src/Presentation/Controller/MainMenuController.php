<?php

declare(strict_types=1);

namespace PublishPress\Hub\Presentation\Controller;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuServiceInterface;
use PublishPress\Hub\Infrastructure\AdminMenu\Entity\MenuPage;
use PublishPress\Hub\Infrastructure\Asset\Contract\AssetServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;

class MainMenuController implements BootableInterface
{
    use BootableTrait;

    private AdminMenuServiceInterface $adminMenuService;

    private AssetServiceInterface $assetService;

    private HooksServiceInterface $hooksService;

    public function __construct(
        AdminMenuServiceInterface $adminMenuService,
        AssetServiceInterface $assetService,
        HooksServiceInterface $hooksService
    ) {
        $this->adminMenuService = $adminMenuService;
        $this->assetService = $assetService;
        $this->hooksService = $hooksService;
    }

    protected function onLoad(): void
    {
        $this->registerAdminMenu();
        $this->addHooks();
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
            // $this->assetService->getPluginAssetUrl('images/menu-publishpress-inverted.svg'),
            $this->assetService->getPluginAssetUrl('images/menu-publishpress-inverted.svg'),
            99
        );

        $this->adminMenuService->addMenuPage($adminPage);
    }

    private function addHooks(): void
    {
        $this->hooksService->addAction(
            AbstractHooks::ACTION_ADMIN_ENQUEUE_SCRIPTS,
            [$this, 'enqueueAdminMenuStyles'],
        );
    }

    public function enqueueAdminMenuStyles(): void
    {
        $this->assetService->enqueueStyle(
            'publishpress-hub-admin-menu',
            'css/admin-menu.css',
        );
    }
}
