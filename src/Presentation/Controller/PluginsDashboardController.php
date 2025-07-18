<?php

declare(strict_types=1);

namespace PublishPress\Hub\Presentation\Controller;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\AdminMenu\Contract\AdminMenuServiceInterface;
use PublishPress\Hub\Infrastructure\AdminMenu\Entity\SubmenuPage;
use PublishPress\Hub\Infrastructure\Asset\Contract\AssetServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;
use PublishPress\Hub\Infrastructure\View\Contract\ViewServiceInterface;
use PublishPress\Hub\Infrastructure\Security\Contract\SecurityServiceInterface;

class PluginsDashboardController implements BootableInterface
{
    use BootableTrait;

    private HooksServiceInterface $hooksService;

    private ViewServiceInterface $viewService;

    private AdminMenuServiceInterface $adminMenuService;

    private AssetServiceInterface $assetService;

    private SecurityServiceInterface $securityService;

    public function __construct(
        HooksServiceInterface $hooksService,
        ViewServiceInterface $viewService,
        AdminMenuServiceInterface $adminMenuService,
        AssetServiceInterface $assetService,
        SecurityServiceInterface $securityService
    ) {
        $this->hooksService = $hooksService;
        $this->viewService = $viewService;
        $this->adminMenuService = $adminMenuService;
        $this->assetService = $assetService;
        $this->securityService = $securityService;
    }

    protected function onLoad(): void
    {
        $this->registerAdminMenu();
        $this->addHooks();
    }

    protected function onInit(): void
    {
    }

    private function addHooks(): void
    {
        $this->hooksService->addAction(AbstractHooks::ACTION_ADMIN_ENQUEUE_SCRIPTS, [$this, 'enqueueAssets']);
    }

    private function registerAdminMenu(): void
    {
        $submenu = new SubmenuPage(
            'publishpress-hub',
            'Plugins',
            'Plugins',
            'manage_options',
            'publishpress-hub-plugins-dashboard',
            [$this, 'showDashboard']
        );

        $this->adminMenuService->addSubmenuPage($submenu);
        $this->adminMenuService->setMainMenuPage('publishpress-hub-plugins-dashboard');
    }

    public function showDashboard(): void
    {
        $this->viewService->render(
            'Admin/PluginsDashboard/plugins-dashboard-container',
            [
                'loading_message' => __('Please wait while we load the plugins dashboard...', 'publishpress-hub'),
            ]
        );
    }

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

        $this->assetService->enqueueScript(
            'publishpress-hub-plugins-dashboard',
            'js/plugins-dashboard.js',
            [
                'publishpress-hub-i18n',
                'wp-element',
                'wp-components',
                'wp-data-controls',
                'wp-api-fetch',
                'wp-notices',
            ]
        );

        $this->assetService->localizeScript(
            'publishpress-hub-plugins-dashboard',
            'ppHubPluginsDashboardConfig',
            [
                'logoUrl' => $this->assetService->getPluginAssetUrl('images/publishpress-logo.png'),
                'apiNonce' => $this->securityService->createNonceForRest(),
                'pluginIconBaseUrl' => $this->assetService->getPluginAssetsBaseUrl(),
            ]
        );
    }
}
