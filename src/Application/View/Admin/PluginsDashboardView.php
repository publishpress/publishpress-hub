<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\View\Admin;

use PublishPress\Hub\Application\View\Contracts\ViewInterface;
use PublishPress\Hub\Infrastructure\Asset\AssetManager;

/**
 * PluginsDashboardView view.
 *
 * @since 1.0.0
 */
class PluginsDashboardView implements ViewInterface
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
        if ('toplevel_page_publishpress-hub-dashboard' !== $hookSuffix) {
            return;
        }

        $this->assetManager->enqueueStyle(
            'publishpress-hub-plugin-dashboard',
            'css/admin-page.css',
            [
                // 'wp-components',
            ]
        );

        $this->assetManager->enqueueScript(
            'publishpress-hub-plugin-dashboard',
            'dist/js/plugins-dashboard.js',
            [
                'publishpress-hub-i18n',
                'wp-element',
                'wp-components',
                'wp-data-controls',
            ]
        );

        $this->assetManager->localizeScript(
            'publishpress-hub-plugin-dashboard',
            'ppHubPluginsDashboardConfig',
            [
                'logoUrl' => $this->assetManager->getAssetUrl('images/publishpress-logo.png'),
                'apiNonce' => wp_create_nonce('wp_rest'),
                'apiV1Url' => 'publishpress-hub/v1',
                'pluginIconBaseUrl' => $this->assetManager->getAssetBaseUrl(),
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
        include PUBLISHPRESS_HUB_TEMPLATES_PATH . 'admin/plugins-dashboard.php';
    }
}
