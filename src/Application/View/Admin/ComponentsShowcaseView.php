<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\View\Admin;

use PublishPress\Hub\Application\View\Contracts\ViewInterface;
use PublishPress\Hub\Infrastructure\Asset\AssetManager;

/**
 * ComponentsShowcaseView view.
 *
 * @since 1.0.0
 */
class ComponentsShowcaseView implements ViewInterface
{
    /**
     * The asset manager.
     *
     * @since 1.0.0
     */
    private AssetManager $assetManager;

    /**
     * The constructor.
     *
     * @since 1.0.0
     */
    public function __construct(AssetManager $assetManager)
    {
        $this->assetManager = $assetManager;
    }

    /**
     * Enqueue the scripts.
     *
     * @since 1.0.0
     */
    public function enqueueScripts(string $hookSuffix): void
    {
        if ('publishpress_page_publishpress-hub-components-showcase' !== $hookSuffix) {
            return;
        }

        $this->assetManager->enqueueStyle(
            'publishpress-hub-plugin-dashboard',
            'dist/css/admin-page.css',
            [
                'wp-components',
            ]
        );

        $this->assetManager->enqueueScript(
            'publishpress-hub-components-showcase',
            'dist/js/components-showcase.js',
            [
                'wp-element',
                'wp-components',
            ]
        );

        $this->assetManager->localizeScript(
            'publishpress-hub-components-showcase',
            'ppHubComponentsShowcaseConfig',
            [
                'logoUrl' => $this->assetManager->getAssetUrl('images/publishpress-logo.png'),
            ]
        );
    }

    /**
     * Render the view.
     *
     * @since 1.0.0
     */
    public function render(): void
    {
        include PUBLISHPRESS_HUB_TEMPLATES_PATH . 'admin/components-showcase.php';
    }
}
