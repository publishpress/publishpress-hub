<?php

/**
 * Admin menu service.
 *
 * @package PublishPress\Hub\Infrastructure\AdminMenu
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\AdminMenu;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Service\Access\HubAccessService;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Application\UseCase\Plugin\ListPluginsUseCase;
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuServiceInterface;
use PublishPress\Hub\Infrastructure\Asset\Contract\AssetServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;

\defined('ABSPATH') || exit;

class AdminMenuService implements AdminMenuServiceInterface, BootableInterface
{
    use BootableTrait;

    private const MENU_SLUG = 'publishpress-hub';

    // Pre-encoded SVG: WordPress requires this prefix for menu rendering and color-scheme support.
    private const MENU_ICON_DATA_URI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE2MCIgaGVpZ2h0PSIxMTYwIiB2aWV3Qm94PSIwIDAgMTE2MCAxMTYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMC40NzE4NjMgNTc5LjczNFY5OTkuNTkxQzAuNDcxODYzIDEwODcuNzEgNzIuMDM3NSAxMTU5LjI2IDE2MC4xOTEgMTE1OS4yNkgxMDAwLjIyQzEwODguMzggMTE1OS4yNiAxMTU5Ljk0IDEwODcuNzEgMTE1OS45NCA5OTkuNTkxQzExNTkuOTQgOTk5LjU5MSAxMTU5Ljk0IDg4NC42MzQgMTE1OS45NCA1NzkuNzM0QzExNTkuOTQgMjU5Ljg4OCA5MDAuMTcyIDAuMjA2Mjk5IDU4MC4yMDYgMC4yMDYyOTlDMjYwLjI0MSAwLjIwNjI5OSAwLjQ3MTg2MyAyNTkuODg4IDAuNDcxODYzIDU3OS43MzRaTTk0MC44MDMgMTEwNS4wOUM5MjcuNzg4IDEwODEuMTIgOTE0LjE3NSAxMDUwLjM1IDkwOC44MzQgMTAxOS41NEM4OTcuMzUgOTUzLjI1NiA5MDQuODY2IDkwMy4zMjIgOTEwLjY0NCA4ODMuNzEzQzkyMi4xNzggODQ0LjU1NiA5MzguOTUgODAzLjE3OCA5NjAuMjk0IDc3My4yNjlDOTc1LjI3NSA3NTIuMjc1IDk4My41ODcgNzM0LjI0NCA5OTQuNTg0IDcxMC4zODhDMTAwOC4yMyA2ODAuNzcyIDEwMjQuOTEgNjMxLjk5NyAxMDMyLjEgNTkxLjI3NUMxMDM5LjI5IDU1MC41NTMgMTA0Mi4zNyA1MzkuNjEzIDEwMzkuMTcgNDc2LjE3OEMxMDM2LjY2IDQyNi4zIDEwMDUuMzEgMzgxLjc5NCA5ODMuNjA5IDM2MS4zMDlDOTYxLjc0MSAzNDAuNjYzIDkzNS42NjIgMzIyLjU1OSA5MDYuODc4IDMxMy44NDFDODc3LjQ2MiAzMDQuOTI4IDg0NS4yODQgMzAwLjc4MSA4MDcuMTI4IDMwNy44NDRDNzgyLjc2NiAzMTIuMzU2IDc1Ny41MzEgMzE4LjI5MSA3MzQuOTQxIDMyOC40NjZDNzEwLjE4MSAzMzkuNjEzIDY5Ny4zNzUgMzQ5LjkwMyA2ODIuMDU2IDM2NC4wMTlDNjcyLjE2MiAzNzMuMTM4IDY2Ny4xODQgMzg0LjAxNiA2NTguNTE2IDM5Ny43OTRDNjQ4LjcyOCA0MTMuMzU2IDYzOC4wNDQgNDM1LjY5NyA2MzEuMTg4IDQ1NS42MDZDNjIwLjk0NCA0ODUuMzQxIDYxNy42NjIgNDk1Ljc5MSA2MTQuMDUgNTQxLjE5MUM2MTMuMDU2IDU1My42ODEgNjEzLjY2MiA1NjMuOTU2IDYxMi45NTYgNTgxLjEyMkM2MTEuNjY2IDYxMi4zODQgNjMyLjYwMyA2NjkuNDk3IDYzMi42NTYgNjY5LjMyMkM2NjIuMjAzIDY5NS4xMzQgNzE1LjEwNiA3MTguNzA5IDc2Ni4wNDEgNzE1LjI1Qzc1MC4yMTIgNzU4LjI2OSA3MjUuNTY5IDc5Ny43MTkgNjk0LjExNiA4MjkuMjQ3QzY2Ni4zOTQgODU3LjA0MSA2MjMuMzc4IDg4Ny40NDQgNTg3LjIxOSA5MDAuOTgxQzU4Ny4zMjUgOTAxLjIxOSA1ODAuNTk3IDkwMy4zMDYgNTc5LjM2OSA5MDMuNjg4VjkwMy43NDdMNTc5LjI3MiA5MDMuNzE2TDU3OS4xNzUgOTAzLjc0N1Y5MDMuNjg4QzU3Ny45NDcgOTAzLjMwOSA1NzEuMjE5IDkwMS4yMTkgNTcxLjMyNSA5MDAuOTgxQzUzNS4xNjMgODg3LjQ0NCA0OTIuMTUgODU3LjA0MSA0NjQuNDI4IDgyOS4yNDdDNDMyLjk3NSA3OTcuNzE5IDQwOC4zMzEgNzU4LjI2OSAzOTIuNTAzIDcxNS4yNUM0NDMuNDM0IDcxOC43MDkgNDk2LjM0MSA2OTUuMTM0IDUyNS44ODcgNjY5LjMyMkM1MjUuOTQxIDY2OS40OTcgNTQ2Ljg3OCA2MTIuMzg0IDU0NS41ODcgNTgxLjEyMkM1NDQuODgxIDU2My45NTYgNTQ1LjQ4NCA1NTMuNjgxIDU0NC40OTQgNTQxLjE5MUM1NDAuODgxIDQ5NS43OTEgNTM3LjYgNDg1LjM0MSA1MjcuMzU2IDQ1NS42MDZDNTIwLjUgNDM1LjY5NyA1MDkuODE2IDQxMy4zNTYgNTAwLjAyOCAzOTcuNzk0QzQ5MS4zNTkgMzg0LjAxNiA0ODYuMzgxIDM3My4xMzggNDc2LjQ4NyAzNjQuMDE5QzQ2MS4xNjkgMzQ5LjkwMyA0NDguMzU5IDMzOS42MTMgNDIzLjYwMyAzMjguNDY2QzQwMS4wMDkgMzE4LjI5MSAzNzUuNzc4IDMxMi4zNTYgMzUxLjQxNiAzMDcuODQ0QzMxMy4yNTkgMzAwLjc4MSAyODEuMDgxIDMwNC45MjggMjUxLjY2NiAzMTMuODQxQzIyMi44ODEgMzIyLjU1OSAxOTYuODAzIDM0MC42NjMgMTc0LjkzNCAzNjEuMzA5QzE1My4yMzQgMzgxLjc5NCAxMjEuODgxIDQyNi4zIDExOS4zNjkgNDc2LjE3OEMxMTYuMTc1IDUzOS42MTMgMTE5LjI1MyA1NTAuNTUzIDEyNi40NDQgNTkxLjI3NUMxMzMuNjM0IDYzMS45OTcgMTUwLjMwOSA2ODAuNzcyIDE2My45NTkgNzEwLjM4OEMxNzQuOTU2IDczNC4yNDQgMTgzLjI2OSA3NTIuMjc1IDE5OC4yNSA3NzMuMjY5QzIxOS41OTQgODAzLjE3OCAyMzYuMzY2IDg0NC41NTYgMjQ3LjkgODgzLjcxM0MyNTMuNjc4IDkwMy4zMjIgMjYxLjE5NCA5NTMuMjU2IDI0OS43MDkgMTAxOS41NEMyNDQuMzY5IDEwNTAuMzUgMjMwLjc1NiAxMDgxLjEyIDIxNy43NDEgMTEwNS4wOUgxNjAuMTkxQzEwMS45MzcgMTEwNS4wOSA1NC42Mzc1IDEwNTcuODIgNTQuNjM3NSA5OTkuNTkxVjU3OS43MzFDNTQuNjQwNiAyODkuNzc1IDI5MC4xNDEgNTQuMzcxOSA1ODAuMjA2IDU0LjM3MTlDODcwLjI3MiA1NC4zNzE5IDExMDUuNzcgMjg5Ljc3NSAxMTA1Ljc3IDU3OS43MzRWOTk5LjU5MUMxMTA1Ljc3IDEwNTcuODIgMTA1OC40OCAxMTA1LjA5IDEwMDAuMjIgMTEwNS4wOUg5NDAuODAzWk01NzkuMTgxIDc3OC42MjJINTc5LjE3NUM1NzYuMTM3IDc3OC43NTYgNTc0LjM4MSA3NzguNzgxIDU3NC41MjggNzc4LjY5N0M1NzQuNSA3NzguNTg4IDU3NC40NzIgNzc4LjQ3NSA1NzQuNDQ3IDc3OC4zNjNDNTYxLjA1NiA3NzcuNjA2IDUzNy4yMDYgNzc1Ljc0MSA1MjQuNDI1IDc3Mi45MzFDNDg0LjY0NCA3NjguMzUzIDQ0OC44MzcgNzQ3LjA0NCA0NDkgNzQ5LjAwOUM0NTEuNzQ0IDc1NC43ODEgNDc5LjcyMiA3OTIuNDA5IDQ5OS41MDkgODA5LjgwM0M1MjAuOTA5IDgyOC42MTIgNTU1LjUzNCA4NTMuNDc4IDU3OS4yNzIgODY0LjU0NEM1NzkuMjY5IDg2NC41MzQgNTc4Ljk2MiA4NjQuNjAzIDU3OS4yNzIgODY0LjU0NEM1ODguNSA4NjIuODE5IDYxNy4xOTEgODUwLjQxMyA2NjIuOTYyIDgwNC43ODFDNjY2LjEzNCA4MDEuNjE5IDY5OC45NzggNzY3LjEwMyA3MDkuMTIyIDc0Ny44NDRDNzA4Ljk0MSA3NDcuOTc1IDY3Mi4xNjYgNzY1LjU1NiA2MjguNzk3IDc3My42NTZDNjA4LjA1MyA3NzcuNTM0IDU3OS42NTkgNzc4LjYwNiA1NzkuMTgxIDc3OC42MjJaTTU3OS4zNjIgNzc4LjYyMkg1NzkuMTgxQzU3OS4yNTMgNzc4LjkwMyA1NzkuMTg0IDc3OS4zMTYgNTc5LjM2MiA3NzguNjIyWk0zMzMuNjM0IDQ2OS45NjNDNDAwLjA3OCA0NjkuOTYzIDQxMy4zOTQgNDgzLjI4MSA0MTMuMzk0IDU0OS43MjJDNDEzLjM5NCA2MTYuMTYzIDQwMC4wNzggNjI5LjQ3OCAzMzMuNjM0IDYyOS40NzhDMjY3LjE5NCA2MjkuNDc4IDI1My44NzggNjE2LjE2MyAyNTMuODc4IDU0OS43MjJDMjUzLjg3OCA0ODMuMjgxIDI2Ny4xOTQgNDY5Ljk2MyAzMzMuNjM0IDQ2OS45NjNaTTgyNC45MDkgNDY5Ljk2M0M4OTEuMzUgNDY5Ljk2MyA5MDQuNjY2IDQ4My4yODEgOTA0LjY2NiA1NDkuNzIyQzkwNC42NjYgNjE2LjE2MyA4OTEuMzUgNjI5LjQ3OCA4MjQuOTA5IDYyOS40NzhDNzU4LjQ2NiA2MjkuNDc4IDc0NS4xNSA2MTYuMTYzIDc0NS4xNSA1NDkuNzIyQzc0NS4xNSA0ODMuMjgxIDc1OC40NjYgNDY5Ljk2MyA4MjQuOTA5IDQ2OS45NjNaIiBmaWxsPSIjQTJBMkEyIi8+Cjwvc3ZnPg==';

    private AssetServiceInterface $assetService;

    private ListPluginsUseCase $listPlugins;

    /**
     * @var array<string, array>
     */
    private array $menuPages;

    /**
     * @var array<string, array>
     */
    private array $submenuPages;

    private ?string $mainMenuPageSlug;

    /**
     * @param AssetServiceInterface $assetService The asset service.
     * @param ListPluginsUseCase $listPlugins The plugins dashboard use case.
     * @since 1.0.0
     */
    public function __construct(
        AssetServiceInterface $assetService,
        ListPluginsUseCase $listPlugins
    ) {
        $this->assetService = $assetService;
        $this->listPlugins = $listPlugins;

        $this->menuPages = [];
        $this->submenuPages = [];
        $this->mainMenuPageSlug = null;
    }

    /**
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        $this->registerMainMenu();
        add_action(
            AbstractHooks::ACTION_ADMIN_ENQUEUE_SCRIPTS,
            [$this, 'enqueueAdminMenuStyles']
        );
    }

    /**
     * @since 1.0.0
     */
    protected function onInit(): void
    {
        add_action(AbstractHooks::ACTION_ADMIN_MENU, [$this, 'registerAdminMenu']);
    }

    /**
     * Register the main PublishPress menu.
     *
     * @return void
     * @since 1.0.0
     */
    private function registerMainMenu(): void
    {
        $adminPage = [
            'page_title' => 'PublishPress',
            'menu_title' => 'PublishPress',
            'capability' => HubAccessService::CAPABILITY,
            'menu_slug' => self::MENU_SLUG,
            /*
             * This is a placeholder for the callback. It will be overridden
             * by another service by setting setMainMenuPage().
             */
            'callback' => '__return_empty_string',
            'icon_url' => self::MENU_ICON_DATA_URI,
            'position' => 99,
        ];

        $this->addMenuPage($adminPage);
    }

    /**
     * Enqueue admin menu styles.
     *
     * @return void
     * @since 1.0.0
     */
    public function enqueueAdminMenuStyles(): void
    {
        $this->assetService->enqueueStyle(
            'publishpress-hub-admin-menu',
            'css/admin-menu.css'
        );
    }

    /**
     * Add a menu page.
     *
     * @param array<string, mixed> $menuPage The menu page to add.
     * @since 1.0.0
     */
    public function addMenuPage(array $menuPage): void
    {
        $this->menuPages[$menuPage['menu_slug']] = $menuPage;
    }

    /**
     * Add a submenu page.
     *
     * @param array<string, mixed> $submenuPage The submenu page to add.
     * @since 1.0.0
     */
    public function addSubmenuPage(array $submenuPage): void
    {
        $this->submenuPages[$submenuPage['menu_slug']] = $submenuPage;
    }

    /**
     * Register the admin menu.
     *
     * @since 1.0.0
     */
    public function registerAdminMenu(): void
    {
        foreach ($this->menuPages as $menuPage) {
            add_menu_page(
                $menuPage['page_title'],
                $menuPage['menu_title'],
                $menuPage['capability'],
                $menuPage['menu_slug'],
                $menuPage['callback'],
                $menuPage['icon_url'],
                $menuPage['position']
            );
        }

        foreach ($this->submenuPages as $submenuPage) {
            $menuSlug = $submenuPage['menu_slug'];

            // If the submenu page is the main menu page, use the parent slug to override the menu page.
            if ($this->mainMenuPageSlug === $menuSlug) {
                $menuSlug = $submenuPage['parent_slug'];
            }

            add_submenu_page(
                $submenuPage['parent_slug'],
                $submenuPage['page_title'],
                $submenuPage['menu_title'],
                $submenuPage['capability'],
                $menuSlug,
                $submenuPage['callback'],
                $submenuPage['position']
            );
        }

        $this->appendPluginUpdateBadge();
    }

    /**
     * Appends the badge to the sidebar label after WordPress registers the page hooks.
     */
    private function appendPluginUpdateBadge(): void
    {
        global $menu;

        $badge = $this->getPluginUpdateBadge();

        if ($badge === '') {
            return;
        }

        foreach ($menu as $position => $item) {
            if ($item[2] === self::MENU_SLUG) {
                $menu[$position][0] .= $badge;
                return;
            }
        }
    }

    /**
     * Builds the update badge for users who can update plugins.
     */
    private function getPluginUpdateBadge(): string
    {
        if (!HubAccessService::canUpdatePlugins()) {
            return '';
        }

        $count = $this->listPlugins->countAvailableUpdates();

        if ($count === 0) {
            return '';
        }

        $formattedCount = number_format_i18n($count);
        $description = sprintf(
            /* translators: %s: Number of available PublishPress plugin updates. */
            _n('%s plugin update available', '%s plugin updates available', $count, 'publishpress-hub'),
            $formattedCount
        );

        return sprintf(
            ' <span class="update-plugins count-%1$d"><span aria-hidden="true">%2$s</span>'
            . '<span class="screen-reader-text">%3$s</span></span>',
            $count,
            esc_html($formattedCount),
            esc_html($description)
        );
    }

    /**
     * Set the main menu page.
     *
     * @param string $menuSlug The slug of the main menu page.
     * @since 1.0.0
     */
    public function setMainMenuPage(string $menuSlug): void
    {
        $this->mainMenuPageSlug = $menuSlug;
    }
}
