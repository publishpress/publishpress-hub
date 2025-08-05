<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginInstallException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Infrastructure\WordPress\Plugin\WordPressPluginLifecycleAdapter;
use PublishPress\Hub\Infrastructure\WordPressOrg\Api\WordPressOrgPluginApiAdapter;
use WP_REST_Request;

class InstallFreePluginUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;
    private WordPressPluginLifecycleAdapter $pluginLifecycle;

    private WordPressOrgPluginApiAdapter $freePluginApi;

    public function __construct(
        PluginStatusService $pluginStatusService,
        WordPressPluginLifecycleAdapter $pluginLifecycle,
        WordPressOrgPluginApiAdapter $freePluginApi
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->pluginLifecycle = $pluginLifecycle;
        $this->freePluginApi = $freePluginApi;
    }

    /**
     * @throws PluginNotFoundException
     * @throws PluginAlreadyInstalledException
     * @throws PluginInstallException
     */
    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');

        // Get family with updated status to ensure we have current information
        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => esc_html($familySlug)]);
        }

        $plugin = $family->getFreePlugin();

        if (!$plugin) {
            throw new PluginNotFoundException(['family_slug' => esc_html($familySlug), 'plugin_type' => 'free']);
        }

        $pluginSlug = $plugin->getSlug();

        if ($plugin->isInstalled()) {
            throw new PluginAlreadyInstalledException(['plugin_slug' => esc_html($pluginSlug)]);
        }

        $pluginInfo = $this->freePluginApi->getLastVersionInfo($pluginSlug);

        $this->pluginLifecycle->installPlugin($pluginSlug, $pluginInfo['download_link']);

        // Update plugin status after installation to reflect current state
        $this->pluginStatusService->updatePluginStatus($plugin);

        return [
            'slug' => esc_html($pluginSlug),
            'installed' => $plugin->isInstalled(),
        ];
    }
}
