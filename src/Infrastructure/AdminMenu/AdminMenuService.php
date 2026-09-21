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
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuServiceInterface;
use PublishPress\Hub\Infrastructure\Asset\Contract\AssetServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;

class AdminMenuService implements AdminMenuServiceInterface, BootableInterface
{
    use BootableTrait;

    private const MENU_SLUG = 'publishpress-hub';

    private const MENU_ICON = '<svg width="1160" height="1160" viewBox="0 0 1160 1160" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.471863 579.734V999.591C0.471863 1087.71 72.0375 1159.26 160.191 1159.26H1000.22C1088.38 1159.26 1159.94 1087.71 1159.94 999.591C1159.94 999.591 1159.94 884.634 1159.94 579.734C1159.94 259.888 900.172 0.206299 580.206 0.206299C260.241 0.206299 0.471863 259.888 0.471863 579.734ZM940.803 1105.09C927.788 1081.12 914.175 1050.35 908.834 1019.54C897.35 953.256 904.866 903.322 910.644 883.713C922.178 844.556 938.95 803.178 960.294 773.269C975.275 752.275 983.587 734.244 994.584 710.388C1008.23 680.772 1024.91 631.997 1032.1 591.275C1039.29 550.553 1042.37 539.613 1039.17 476.178C1036.66 426.3 1005.31 381.794 983.609 361.309C961.741 340.663 935.662 322.559 906.878 313.841C877.462 304.928 845.284 300.781 807.128 307.844C782.766 312.356 757.531 318.291 734.941 328.466C710.181 339.613 697.375 349.903 682.056 364.019C672.162 373.138 667.184 384.016 658.516 397.794C648.728 413.356 638.044 435.697 631.188 455.606C620.944 485.341 617.662 495.791 614.05 541.191C613.056 553.681 613.662 563.956 612.956 581.122C611.666 612.384 632.603 669.497 632.656 669.322C662.203 695.134 715.106 718.709 766.041 715.25C750.212 758.269 725.569 797.719 694.116 829.247C666.394 857.041 623.378 887.444 587.219 900.981C587.325 901.219 580.597 903.306 579.369 903.688V903.747L579.272 903.716L579.175 903.747V903.688C577.947 903.309 571.219 901.219 571.325 900.981C535.163 887.444 492.15 857.041 464.428 829.247C432.975 797.719 408.331 758.269 392.503 715.25C443.434 718.709 496.341 695.134 525.887 669.322C525.941 669.497 546.878 612.384 545.587 581.122C544.881 563.956 545.484 553.681 544.494 541.191C540.881 495.791 537.6 485.341 527.356 455.606C520.5 435.697 509.816 413.356 500.028 397.794C491.359 384.016 486.381 373.138 476.487 364.019C461.169 349.903 448.359 339.613 423.603 328.466C401.009 318.291 375.778 312.356 351.416 307.844C313.259 300.781 281.081 304.928 251.666 313.841C222.881 322.559 196.803 340.663 174.934 361.309C153.234 381.794 121.881 426.3 119.369 476.178C116.175 539.613 119.253 550.553 126.444 591.275C133.634 631.997 150.309 680.772 163.959 710.388C174.956 734.244 183.269 752.275 198.25 773.269C219.594 803.178 236.366 844.556 247.9 883.713C253.678 903.322 261.194 953.256 249.709 1019.54C244.369 1050.35 230.756 1081.12 217.741 1105.09H160.191C101.937 1105.09 54.6375 1057.82 54.6375 999.591V579.731C54.6406 289.775 290.141 54.3719 580.206 54.3719C870.272 54.3719 1105.77 289.775 1105.77 579.734V999.591C1105.77 1057.82 1058.48 1105.09 1000.22 1105.09H940.803ZM579.181 778.622H579.175C576.137 778.756 574.381 778.781 574.528 778.697C574.5 778.588 574.472 778.475 574.447 778.363C561.056 777.606 537.206 775.741 524.425 772.931C484.644 768.353 448.837 747.044 449 749.009C451.744 754.781 479.722 792.409 499.509 809.803C520.909 828.612 555.534 853.478 579.272 864.544C579.269 864.534 578.962 864.603 579.272 864.544C588.5 862.819 617.191 850.413 662.962 804.781C666.134 801.619 698.978 767.103 709.122 747.844C708.941 747.975 672.166 765.556 628.797 773.656C608.053 777.534 579.659 778.606 579.181 778.622ZM579.362 778.622H579.181C579.253 778.903 579.184 779.316 579.362 778.622ZM333.634 469.963C400.078 469.963 413.394 483.281 413.394 549.722C413.394 616.163 400.078 629.478 333.634 629.478C267.194 629.478 253.878 616.163 253.878 549.722C253.878 483.281 267.194 469.963 333.634 469.963ZM824.909 469.963C891.35 469.963 904.666 483.281 904.666 549.722C904.666 616.163 891.35 629.478 824.909 629.478C758.466 629.478 745.15 616.163 745.15 549.722C745.15 483.281 758.466 469.963 824.909 469.963Z" fill="#A2A2A2"/>
</svg>';

    private AssetServiceInterface $assetService;

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
     * @since 1.0.0
     */
    public function __construct(
        AssetServiceInterface $assetService
    ) {
        $this->assetService = $assetService;

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
        $iconDataUri = 'data:image/svg+xml,' . rawurlencode(self::MENU_ICON);

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
            'icon_url' => $iconDataUri,
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
