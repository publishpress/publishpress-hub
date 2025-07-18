<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuServiceInterface;
use PublishPress\Hub\Infrastructure\AdminMenu\Entity\MenuPage;

class PluginBootstrapService implements BootableInterface
{
    use BootableTrait;

    /**
     * @var HooksServiceInterface
     */
    private $hooksService;

    /**
     * @var AdminMenuServiceInterface
     */
    private $adminMenuService;

    /**
     * @var BootableInterface[]
     */
    private $servicesToInit = [];

    /**
     * @param BootableInterface[] $servicesToInit
     */
    public function __construct(
        HooksServiceInterface $hooksService,
        AdminMenuServiceInterface $adminMenuService,
        array $servicesToInit
    ) {
        $this->hooksService = $hooksService;
        $this->adminMenuService = $adminMenuService;
        $this->servicesToInit = $servicesToInit;
    }

    protected function onLoad(): void
    {
        $this->addHooks();
        $this->loadServices();
        $this->registerAdminMenu();
    }

    protected function onInit(): void
    {
        $this->initServices();
    }

    private function addHooks(): void
    {
        $this->hooksService->addAction(AbstractHooks::ACTION_INIT, [$this, 'init']);
    }

    private function loadServices(): void
    {
        $this->adminMenuService->load();

        foreach ($this->servicesToInit as $service) {
            $service->load();
        }
    }

    private function initServices(): void
    {
        $this->adminMenuService->init();

        foreach ($this->servicesToInit as $service) {
            $service->init();
        }
    }

    private function registerAdminMenu(): void
    {
        $adminPage = new MenuPage(
            'PublishPress Hub',
            'PublishPress Hub',
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
