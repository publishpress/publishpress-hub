<?php

/**
 * Use case for updating a plugin.
 *
 * @package PublishPress\Hub\Application\UseCase\Plugin
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginInterface;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotInstalledException;
use PublishPress\Hub\Infrastructure\WP\Plugin\WPPluginLifecycleAdapter;
use WP_REST_Request;

class UpdatePluginUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;

    private WPPluginLifecycleAdapter $pluginLifecycle;

    /**
     * @since 1.0.0
     */
    public function __construct(
        PluginStatusService $pluginStatusService,
        WPPluginLifecycleAdapter $pluginLifecycle
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->pluginLifecycle = $pluginLifecycle;
    }

    /**
     * Updates a plugin.
     *
     * @param WP_REST_Request $request Request containing familySlug parameter.
     * @throws PluginNotFoundException
     * @throws PluginNotInstalledException
     * @return array<string, mixed> The response data with plugin slug and update status.
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');

        if (empty($familySlug)) {
            throw new PluginNotFoundException(['family_slug' => esc_html('missing')]);
        }

        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => esc_html($familySlug)]);
        }

        $installedPlugin = $family->getInstalledPlugin();

        if (!$installedPlugin) {
            throw new PluginNotInstalledException(['family_slug' => esc_html($familySlug)]);
        }

        $pluginPath = $installedPlugin->getPath();

        $this->pluginLifecycle->updatePlugin($pluginPath);

        // Update plugin status after update to reflect current state
        $this->pluginStatusService->updatePluginStatus($installedPlugin);

        return [
            'slug' => esc_html($installedPlugin->getSlug()),
            'updated' => true,
            'version' => esc_html($installedPlugin->getVersion()),
        ];
    }
}

