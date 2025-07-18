<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\AdminMenu\Entity;

class MenuPage
{
    private string $pageTitle;

    private string $menuTitle;

    private string $capability;

    private string $menuSlug;

    /**
     * @var callable
     */
    private $callback;

    private string $iconUrl;

    private ?int $position;

    public function __construct(
        string $pageTitle,
        string $menuTitle,
        string $capability,
        string $menuSlug,
        callable $callback,
        string $iconUrl = '',
        ?int $position = null
    ) {
        $this->pageTitle = $pageTitle;
        $this->menuTitle = $menuTitle;
        $this->capability = $capability;
        $this->menuSlug = $menuSlug;
        $this->callback = $callback;
        $this->iconUrl = $iconUrl;
        $this->position = $position;
    }

    public function getPageTitle(): string
    {
        return $this->pageTitle;
    }

    public function getMenuTitle(): string
    {
        return $this->menuTitle;
    }

    public function getCapability(): string
    {
        return $this->capability;
    }

    public function getMenuSlug(): string
    {
        return $this->menuSlug;
    }

    /**
     * @return callable
     */
    public function getCallback()
    {
        return $this->callback;
    }

    public function getIconUrl(): string
    {
        return $this->iconUrl;
    }

    public function getPosition(): ?int
    {
        return $this->position;
    }
}
