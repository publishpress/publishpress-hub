<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;
use PublishPress\Hub\Infrastructure\I18n\Contract\I18nServiceInterface;
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
     * @var I18nServiceInterface
     */
    private $i18nService;

    /**
     * @var AdminMenuServiceInterface
     */
    private $adminMenuService;

    public function __construct(
        HooksServiceInterface $hooksService,
        I18nServiceInterface $i18nService,
        AdminMenuServiceInterface $adminMenuService
    ) {
        $this->hooksService = $hooksService;
        $this->i18nService = $i18nService;
        $this->adminMenuService = $adminMenuService;
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
        $this->i18nService->load();
        $this->adminMenuService->load();
    }

    private function initServices(): void
    {
        $this->adminMenuService->init();
    }

    private function registerAdminMenu(): void
    {
        $adminPage = new MenuPage(
            'PublishPress Hub',
            'PublishPress Hub',
            'manage_options',
            'publishpress-hub',
            function () {
                echo __('That is a shame, this should be overridden by another service.', 'publishpress-hub');
            },
            'dashicons-admin-page',
            99
        );

        $this->adminMenuService->addMenuPage($adminPage);
    }
}
