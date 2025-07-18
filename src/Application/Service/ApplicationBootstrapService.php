<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;

class ApplicationBootstrapService implements BootableInterface
{
    use BootableTrait;

    /**
     * @var HooksServiceInterface
     */
    private $hooksService;

    public function __construct(
        HooksServiceInterface $hooksService
    ) {
        $this->hooksService = $hooksService;
    }

    protected function onLoad(): void
    {
        $this->addHooks();
    }

    protected function onInitialize(): void
    {
    }

    private function addHooks(): void
    {
        $this->hooksService->addAction(AbstractHooks::ACTION_INIT, [$this, 'initialize']);
    }
}
