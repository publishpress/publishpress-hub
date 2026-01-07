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
use PublishPress\Hub\Application\Service\Access\HubAccessService;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuServiceInterface;
use PublishPress\Hub\Infrastructure\Asset\Contract\AssetServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\View\Contract\ViewServiceInterface;
use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;

class WelcomePageController implements BootableInterface
{
    use BootableTrait;

    private ViewServiceInterface $viewService;

    private AdminMenuServiceInterface $adminMenuService;

    private AssetServiceInterface $assetService;

    private WPOptionsAdapterInterface $optionsAdapter;

    private const OPTION_NAME = 'publishpress_hub_welcome_page_disabled';

    private const DISMISS_ACTION = 'publishpress_hub_dismiss_welcome_page';

    /**
     * Constructor.
     *
     * @param ViewServiceInterface $viewService
     * @param AdminMenuServiceInterface $adminMenuService
     * @param AssetServiceInterface $assetService
     * @param WPOptionsAdapterInterface $optionsAdapter
     * @since 1.0.0
     */
    public function __construct(
        ViewServiceInterface $viewService,
        AdminMenuServiceInterface $adminMenuService,
        AssetServiceInterface $assetService,
        WPOptionsAdapterInterface $optionsAdapter
    ) {
        $this->viewService = $viewService;
        $this->adminMenuService = $adminMenuService;
        $this->assetService = $assetService;
        $this->optionsAdapter = $optionsAdapter;
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
        if (
            defined('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE') &&
            constant('PUBLISHPRESS_HUB_DISABLE_WELCOME_PAGE')
        ) {
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
        add_action(AbstractHooks::ACTION_ADMIN_ENQUEUE_SCRIPTS, [$this, 'enqueueAssets']);
        add_action(AbstractHooks::ACTION_ADMIN_INIT, [$this, 'handleDismissAction']);
    }

    /**
     * Register admin menu.
     *
     * @return void
     * @since 1.0.0
     */
    private function registerAdminMenu(): void
    {
        $submenu = [
            'parent_slug' => 'publishpress-hub',
            'page_title' => __('Welcome', 'publishpress-hub'),
            'menu_title' => __('Welcome', 'publishpress-hub'),
            'capability' => HubAccessService::CAPABILITY,
            'menu_slug' => 'publishpress-hub-welcome',
            'callback' => [$this, 'showWelcomePage'],
            'position' => 0,
        ];

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
        $this->viewService->render(
            'Welcome/welcome-page',
            [
                'loading_message' => __('Please wait while we load the welcome page...', 'publishpress-hub'),
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

        $this->assetService->enqueueStyle(
            'publishpress-hub-welcome-page-styles',
            'css/welcome-page-styles.css'
        );

        $this->assetService->enqueueScript(
            'publishpress-hub-welcome-page',
            'js/welcome-page.js',
            [
                'publishpress-hub-i18n',
                'wp-element',
                'wp-components',
            ]
        );

        $dismissUrl = $this->securityService->getNonceUrl(
            admin_url('admin.php?page=publishpress-hub&action=' . self::DISMISS_ACTION),
            self::DISMISS_ACTION
        );

        $this->assetService->localizeScript(
            'publishpress-hub-welcome-page',
            'ppHubWelcomePageConfig',
            [
                'logoUrl' => $this->assetService->getPluginAssetUrl('images/publishpress-logo.png'),
                'welcomeImageUrl' => $this->assetService->getPluginAssetUrl('images/welcome.png'),
                'dismissUrl' => $dismissUrl,
                'pluginSlug' => 'publishpress-hub',
                'pluginName' => __('PublishPress Hub', 'publishpress-hub'),
                'pluginDocumentationUrl' => 'https://publishpress.com/knowledge-base/',
                'pluginAboutUrl' => 'https://publishpress.com/',
                'pluginSupportUrl' => 'https://publishpress.com/contact/',
                'pluginsDashboardUrl' => admin_url('admin.php?page=publishpress-hub-plugins-dashboard'),
            ]
        );
    }
}
