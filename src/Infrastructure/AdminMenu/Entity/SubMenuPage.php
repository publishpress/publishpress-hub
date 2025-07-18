<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\AdminMenu\Entity;

class SubmenuPage
{
    private string $pageTitle;

    private string $menuTitle;

    private string $capability;

    private string $menuSlug;

    /**
     * @var callable
     */
    private $callback;

    private ?int $position;

    private string $parentSlug;

    public function __construct(
        string $parentSlug,
        string $pageTitle,
        string $menuTitle,
        string $capability,
        string $menuSlug,
        callable $callback,
        ?int $position = null
    ) {
        $this->parentSlug = $parentSlug;
        $this->pageTitle = $pageTitle;
        $this->menuTitle = $menuTitle;
        $this->capability = $capability;
        $this->menuSlug = $menuSlug;
        $this->callback = $callback;
        $this->position = $position;
    }

    public function getParentSlug(): string
    {
        return $this->parentSlug;
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

    public function getPosition(): ?int
    {
        return $this->position;
    }
}
