<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;
use PublishPress\Hub\Presentation\Controller\MainMenuController;

class PluginBootstrapService implements BootableInterface
{
    use BootableTrait;

    /**
     * @var HooksServiceInterface
     */
    private $hooksService;

    /**
     * @var BootableInterface[]
     */
    private $servicesToInit = [];

    /**
     * @var MainMenuController
     */
    private $mainMenuController;

    /**
     * @param BootableInterface[] $servicesToInit
     */
    public function __construct(
        HooksServiceInterface $hooksService,
        array $servicesToInit,
        MainMenuController $mainMenuController
    ) {
        $this->hooksService = $hooksService;
        $this->servicesToInit = $servicesToInit;
        $this->mainMenuController = $mainMenuController;
    }

    protected function onLoad(): void
    {
        $this->addHooks();
        $this->loadServices();

        $this->mainMenuController->load();
    }

    protected function onInit(): void
    {
        $this->initServices();

        $this->mainMenuController->init();
    }

    private function addHooks(): void
    {
        $this->hooksService->addAction(AbstractHooks::ACTION_INIT, [$this, 'init']);
    }

    private function loadServices(): void
    {
        foreach ($this->servicesToInit as $service) {
            $service->load();
        }
    }

    private function initServices(): void
    {
        foreach ($this->servicesToInit as $service) {
            $service->init();
        }
    }
}
