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

class DevComponentsShowcaseController implements BootableInterface
{
    use BootableTrait;

    private HooksServiceInterface $hooksService;

    private ViewServiceInterface $viewService;

    private AdminMenuServiceInterface $adminMenuService;

    private AssetServiceInterface $assetService;

    public function __construct(
        HooksServiceInterface $hooksService,
        ViewServiceInterface $viewService,
        AdminMenuServiceInterface $adminMenuService,
        AssetServiceInterface $assetService
    ) {
        $this->hooksService = $hooksService;
        $this->viewService = $viewService;
        $this->adminMenuService = $adminMenuService;
        $this->assetService = $assetService;
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
            'Components Showcase',
            'Components Showcase',
            'manage_options',
            'publishpress-hub-dev-components-showcase',
            [$this, 'showComponentsShowcase']
        );

        $this->adminMenuService->addSubmenuPage($submenu);
    }

    public function showComponentsShowcase(): void
    {
        $this->viewService->render(
            'Admin/DevComponentsShowcase/dev-components-showcase-container',
            [
                'loading_message' => __('Please wait while we load the components showcase...', 'publishpress-hub'),
            ]
        );
    }

    public function enqueueAssets(string $hookSuffix): void
    {
        if ('publishpress-hub_page_publishpress-hub-dev-components-showcase' !== $hookSuffix) {
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
            'publishpress-hub-components-showcase',
            'js/components-showcase.js',
            [
                'publishpress-hub-i18n',
                'wp-element',
                'wp-components',
                'wp-notices',
            ]
        );

        $this->assetService->localizeScript(
            'publishpress-hub-components-showcase',
            'ppHubComponentsShowcaseConfig',
            [
                'logoUrl' => $this->assetService->getPluginAssetUrl('images/publishpress-logo.png'),
            ]
        );
    }

}
