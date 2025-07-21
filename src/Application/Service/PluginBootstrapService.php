<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Entity\FreePlugin;
use PublishPress\Hub\Domain\Plugin\Entity\PluginFamily;
use PublishPress\Hub\Domain\Plugin\Entity\ProPlugin;
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
     * @var PluginFamilyRepositoryInterface
     */
    private $pluginFamilyRepository;

    /**
     * @param BootableInterface[] $servicesToInit
     */
    public function __construct(
        HooksServiceInterface $hooksService,
        array $servicesToInit,
        MainMenuController $mainMenuController,
        PluginFamilyRepositoryInterface $pluginFamilyRepository
    ) {
        $this->hooksService = $hooksService;
        $this->servicesToInit = $servicesToInit;
        $this->mainMenuController = $mainMenuController;
        $this->pluginFamilyRepository = $pluginFamilyRepository;
    }

    protected function onLoad(): void
    {
        $this->addHooks();
        $this->loadServices();

        $this->mainMenuController->load();

        $this->pluginFamilyRepository->reset();
    }

    protected function onInit(): void
    {
        $this->initServices();
        $this->registerPluginFamilies();
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

    private function registerPluginFamilies(): void
    {
        $pluginFamilies = require __DIR__ . '/../../Domain/Plugin/plugin-families.php';

        foreach ($pluginFamilies as $pluginFamily) {
            $family = new PluginFamily(
                $pluginFamily['name'],
                $pluginFamily['slug'],
                $pluginFamily['icon_file_name'],
                $pluginFamily['description'],
                $pluginFamily['changelog_url']
            );

            $freePlugin = new FreePlugin(
                $pluginFamily['free_name'],
                $pluginFamily['free_slug'],
                $pluginFamily['free_file_name'],
                $pluginFamily['free_details_url']
            );

            $proPlugin = new ProPlugin(
                $pluginFamily['pro_name'],
                $pluginFamily['pro_slug'],
                $pluginFamily['pro_file_name'],
                $pluginFamily['pro_details_url'],
                $pluginFamily['edd_item_id']
            );

            $freePlugin->setFamily($family);
            $proPlugin->setFamily($family);

            $family->setFreePlugin($freePlugin);
            $family->setProPlugin($proPlugin);

            $this->pluginFamilyRepository->registerFamily($family);
        }
    }
}
