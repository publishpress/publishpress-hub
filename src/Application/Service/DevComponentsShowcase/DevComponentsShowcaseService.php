<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\DevComponentsShowcase;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Presentation\Controller\DevComponentsShowcaseController;

class DevComponentsShowcaseService implements BootableInterface
{
    use BootableTrait;

    private DevComponentsShowcaseController $devComponentsShowcaseController;

    public function __construct(
        DevComponentsShowcaseController $devComponentsShowcaseController
    ) {
        $this->devComponentsShowcaseController = $devComponentsShowcaseController;
    }

    protected function onLoad(): void
    {
        $this->devComponentsShowcaseController->load();
    }

    protected function onInit(): void
    {
        $this->devComponentsShowcaseController->init();
    }
}
