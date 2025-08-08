<?php

/**
 * Main menu controller.
 *
 * @package PublishPress\Hub\Admin
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Admin;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuServiceInterface;
use PublishPress\Hub\Infrastructure\AdminMenu\Entity\MenuPage;
use PublishPress\Hub\Infrastructure\Asset\Contract\AssetServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;

class MenuController implements BootableInterface
{
    use BootableTrait;

    private AdminMenuServiceInterface $adminMenuService;

    private AssetServiceInterface $assetService;

    private HooksServiceInterface $hooksService;

    /**
     * Constructor.
     *
     * @param AdminMenuServiceInterface $adminMenuService
     * @param AssetServiceInterface $assetService
     * @param HooksServiceInterface $hooksService
     * @since 1.0.0
     */
    public function __construct(
        AdminMenuServiceInterface $adminMenuService,
        AssetServiceInterface $assetService,
        HooksServiceInterface $hooksService
    ) {
        $this->adminMenuService = $adminMenuService;
        $this->assetService = $assetService;
        $this->hooksService = $hooksService;
    }

    /**
     * On load.
     *
     * @return void
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        $this->registerAdminMenu();
        $this->addHooks();
    }

    /**
     * On init.
     *
     * @return void
     * @since 1.0.0
     */
    protected function onInit(): void
    {
    }

    /**
     * Register admin menu.
     *
     * @return void
     * @since 1.0.0
     */
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

    /**
     * Add hooks.
     *
     * @return void
     * @since 1.0.0
     */
    private function addHooks(): void
    {
        $this->hooksService->addAction(
            AbstractHooks::ACTION_ADMIN_ENQUEUE_SCRIPTS,
            [$this, 'enqueueAdminMenuStyles'],
        );
    }

    /**
     * Enqueue admin menu styles.
     *
     * @return void
     * @since 1.0.0
     */
    public function enqueueAdminMenuStyles(): void
    {
        $this->assetService->enqueueStyle(
            'publishpress-hub-admin-menu',
            'css/admin-menu.css',
        );
    }
}
