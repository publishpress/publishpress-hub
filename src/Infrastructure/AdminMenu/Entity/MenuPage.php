<?php

/**
 * Menu page entity.
 *
 * @package PublishPress\Hub\Infrastructure\AdminMenu\Entity
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

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

    /**
     * @param string $pageTitle The title of the page.
     * @param string $menuTitle The title of the menu item.
     * @param string $capability The capability required for this menu page.
     * @param string $menuSlug The slug of the menu page.
     * @param callable $callback The callback function to display the page content.
     * @param string $iconUrl The URL of the icon for the menu page.
     * @param int|null $position The position of the menu page in the menu.
     * @since 1.0.0
     */
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

    /**
     * Get the title of the page.
     *
     * @return string The title of the page.
     * @since 1.0.0
     */
    public function getPageTitle(): string
    {
        return $this->pageTitle;
    }

    /**
     * Get the title of the menu item.
     *
     * @return string The title of the menu item.
     * @since 1.0.0
     */
    public function getMenuTitle(): string
    {
        return $this->menuTitle;
    }

    /**
     * Get the capability required for this menu page.
     *
     * @return string The capability required for this menu page.
     * @since 1.0.0
     */
    public function getCapability(): string
    {
        return $this->capability;
    }

    /**
     * Get the slug of the menu page.
     *
     * @return string The slug of the menu page.
     * @since 1.0.0
     */
    public function getMenuSlug(): string
    {
        return $this->menuSlug;
    }

    /**
     * Get the callback function to display the page content.
     *
     * @return callable
     * @since 1.0.0
     */
    public function getCallback()
    {
        return $this->callback;
    }

    /**
     * Get the URL of the icon for the menu page.
     *
     * @return string The URL of the icon for the menu page.
     * @since 1.0.0
     */
    public function getIconUrl(): string
    {
        return $this->iconUrl;
    }

    /**
     * Get the position of the menu page in the menu.
     *
     * @return int|null The position of the menu page in the menu.
     * @since 1.0.0
     */
    public function getPosition(): ?int
    {
        return $this->position;
    }
}
