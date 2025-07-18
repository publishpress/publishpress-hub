<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;
use PublishPress\Hub\Infrastructure\I18n\Contract\I18nServiceInterface;

class ApplicationBootstrapService implements BootableInterface
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

    public function __construct(
        HooksServiceInterface $hooksService,
        I18nServiceInterface $i18nService
    ) {
        $this->hooksService = $hooksService;
        $this->i18nService = $i18nService;
    }

    protected function onLoad(): void
    {
        $this->addHooks();

        $this->i18nService->load();
    }

    protected function onInit(): void
    {
    }

    private function addHooks(): void
    {
        $this->hooksService->addAction(AbstractHooks::ACTION_INIT, [$this, 'init']);
    }
}
