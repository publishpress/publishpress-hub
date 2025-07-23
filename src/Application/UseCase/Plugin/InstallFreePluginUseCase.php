<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginInstallException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Infrastructure\WordPress\Plugin\WordPressPluginLifecycleAdapter;
use WP_REST_Request;

class InstallFreePluginUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;
    private WordPressPluginLifecycleAdapter $pluginLifecycle;

    public function __construct(
        PluginStatusService $pluginStatusService,
        WordPressPluginLifecycleAdapter $pluginLifecycle
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->pluginLifecycle = $pluginLifecycle;
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
            throw new PluginNotFoundException(['family_slug' => $familySlug]);
        }

        $plugin = $family->getFreePlugin();

        if (!$plugin) {
            throw new PluginNotFoundException(['family_slug' => $familySlug, 'plugin_type' => 'free']);
        }

        if ($plugin->isInstalled()) {
            throw new PluginAlreadyInstalledException(['plugin_slug' => $plugin->getSlug()]);
        }

        try {
            $this->pluginLifecycle->installPlugin($plugin->getSlug());

            // Update plugin status after installation to reflect current state
            $this->pluginStatusService->updatePluginStatus($plugin);

            return [
                'slug' => $plugin->getSlug(),
                'installed' => $plugin->isInstalled(),
            ];
        } catch (\Exception $e) {
            throw new PluginInstallException(['plugin_slug' => $plugin->getSlug(), 'error_message' => $e->getMessage()]);
        }
    }
}
