<?php

/**
 * Welcome page controller.
 *
 * @package PublishPress\Hub\Admin\Page
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Admin\Page;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuServiceInterface;
use PublishPress\Hub\Infrastructure\AdminMenu\Entity\SubmenuPage;
use PublishPress\Hub\Infrastructure\Asset\Contract\AssetServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;
use PublishPress\Hub\Infrastructure\Security\Contract\SecurityServiceInterface;
use PublishPress\Hub\Infrastructure\View\Contract\ViewServiceInterface;
use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;

class WelcomePageController implements BootableInterface
{
    use BootableTrait;

    private HooksServiceInterface $hooksService;

    private ViewServiceInterface $viewService;

    private AdminMenuServiceInterface $adminMenuService;

    private AssetServiceInterface $assetService;

    private WPOptionsAdapterInterface $optionsAdapter;

    private SecurityServiceInterface $securityService;

    private const OPTION_NAME = 'publishpress_hub_welcome_page_disabled';

    private const DISMISS_ACTION = 'publishpress_hub_dismiss_welcome_page';

    /**
     * Constructor.
     *
     * @param HooksServiceInterface $hooksService
     * @param ViewServiceInterface $viewService
     * @param AdminMenuServiceInterface $adminMenuService
     * @param AssetServiceInterface $assetService
     * @param WPOptionsAdapterInterface $optionsAdapter
     * @param SecurityServiceInterface $securityService
     * @since 1.0.0
     */
    public function __construct(
        HooksServiceInterface $hooksService,
        ViewServiceInterface $viewService,
        AdminMenuServiceInterface $adminMenuService,
        AssetServiceInterface $assetService,
        WPOptionsAdapterInterface $optionsAdapter,
        SecurityServiceInterface $securityService
    ) {
        $this->hooksService = $hooksService;
        $this->viewService = $viewService;
        $this->adminMenuService = $adminMenuService;
        $this->assetService = $assetService;
        $this->optionsAdapter = $optionsAdapter;
        $this->securityService = $securityService;
    }

    /**
     * On load.
     *
     * @return void
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        if ($this->isWelcomePageDisabled()) {
            return;
        }

        $this->addHooks();
    }

    /**
     * On init.
     *
     * @return void
     * @since 1.0.0
     */
    protected function onInit(): void
    {
        if ($this->isWelcomePageDisabled()) {
            return;
        }

        $this->registerAdminMenu();
    }

    /**
     * Check if welcome page is disabled.
     *
     * @return bool
     * @since 1.0.0
     */
    private function isWelcomePageDisabled(): bool
    {
        return self::checkIfWelcomePageDisabled($this->optionsAdapter);
    }

    /**
     * Check if welcome page is disabled (static helper).
     *
     * @param WPOptionsAdapterInterface|null $optionsAdapter Optional options adapter.
     * @return bool
     * @since 1.0.0
     */
    public static function checkIfWelcomePageDisabled(?WPOptionsAdapterInterface $optionsAdapter = null): bool
    {
        // Check constant first
        if (defined('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE')
            && constant('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE')) {
            return true;
        }

        // Check option
        if ($optionsAdapter !== null) {
            return (bool) $optionsAdapter->getOption(self::OPTION_NAME, false);
        }

        // Fallback to direct WordPress option check
        return (bool) get_option(self::OPTION_NAME, false);
    }

    /**
     * Handle dismiss action.
     *
     * @return void
     * @since 1.0.0
     */
    public function handleDismissAction(): void
    {
        if (! isset($_GET['action']) || self::DISMISS_ACTION !== $_GET['action']) {
            return;
        }

        if (! $this->securityService->userCan('manage_options')) {
            wp_die(esc_html__('You do not have sufficient permissions to access this page.', 'publishpress-hub'));
            return;
        }

        // Use check_admin_referer which verifies both nonce and referer
        check_admin_referer(self::DISMISS_ACTION, '_wpnonce');

        $this->optionsAdapter->updateOption(self::OPTION_NAME, true);

        // Redirect to the main menu page (which will be Plugins Dashboard after welcome is disabled)
        $redirectUrl = admin_url('admin.php?page=publishpress-hub');
        wp_safe_redirect($redirectUrl);
        exit;
    }

    /**
     * Add hooks.
     *
     * @return void
     * @since 1.0.0
     */
    private function addHooks(): void
    {
        $this->hooksService->addAction(AbstractHooks::ACTION_ADMIN_ENQUEUE_SCRIPTS, [$this, 'enqueueAssets']);
        $this->hooksService->addAction(AbstractHooks::ACTION_ADMIN_INIT, [$this, 'handleDismissAction']);
    }

    /**
     * Register admin menu.
     *
     * @return void
     * @since 1.0.0
     */
    private function registerAdminMenu(): void
    {
        $submenu = new SubmenuPage(
            'publishpress-hub',
            __('Welcome', 'publishpress-hub'),
            __('Welcome', 'publishpress-hub'),
            'manage_options',
            'publishpress-hub-welcome',
            [$this, 'showWelcomePage'],
            0
        );

        $this->adminMenuService->addSubmenuPage($submenu);
        $this->adminMenuService->setMainMenuPage('publishpress-hub-welcome');
    }

    /**
     * Show welcome page.
     *
     * @return void
     * @since 1.0.0
     */
    public function showWelcomePage(): void
    {
        // Use the main menu page for the dismiss action, not the welcome page itself
        // This ensures the action works even if the page structure changes
        $dismissUrl = $this->securityService->getNonceUrl(
            admin_url('admin.php?page=publishpress-hub&action=' . self::DISMISS_ACTION),
            self::DISMISS_ACTION
        );

        $this->viewService->render(
            'Welcome/welcome-page',
            [
                'dismiss_url' => $dismissUrl,
            ]
        );
    }

    /**
     * Enqueue assets.
     *
     * @param string $hookSuffix
     * @return void
     * @since 1.0.0
     */
    public function enqueueAssets(string $hookSuffix): void
    {
        if ('toplevel_page_publishpress-hub' !== $hookSuffix) {
            return;
        }

        $this->assetService->enqueueStyle(
            'publishpress-hub-admin-page',
            'css/admin-page.css',
            [
                'wp-components',
            ]
        );
    }
}

