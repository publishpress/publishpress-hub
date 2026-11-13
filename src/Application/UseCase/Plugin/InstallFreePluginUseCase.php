<?php

/**
 * Use case for installing a free plugin.
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
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginInstallException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Infrastructure\WP\Plugin\WPPluginLifecycleAdapter;
use PublishPress\Hub\Infrastructure\WPOrg\Api\WPOrgPluginApiAdapter;
use WP_REST_Request;

\defined('ABSPATH') || exit;

class InstallFreePluginUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;

    private WPPluginLifecycleAdapter $pluginLifecycle;

    private WPOrgPluginApiAdapter $freePluginApi;

    /**
     * @since 1.0.0
     */
    public function __construct(
        PluginStatusService $pluginStatusService,
        WPPluginLifecycleAdapter $pluginLifecycle,
        WPOrgPluginApiAdapter $freePluginApi
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->pluginLifecycle = $pluginLifecycle;
        $this->freePluginApi = $freePluginApi;
    }

    /**
     * Installs a free plugin.
     *
     * @param WP_REST_Request $request Request containing familySlug parameter.
     * @throws PluginNotFoundException
     * @throws PluginAlreadyInstalledException
     * @throws PluginInstallException
     * @return array<string, mixed> The response data with plugin slug and installation status.
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');

        $plugin = $this->getPlugin($familySlug);

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

    /**
     * Gets the plugin for a given family slug.
     *
     * @param string $familySlug The slug of the family.
     * @throws PluginNotFoundException
     * @return PluginInterface The plugin.
     * @since 1.0.0
     */
    private function getPlugin(string $familySlug): PluginInterface
    {
        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => esc_html($familySlug)]);
        }

        return $family->getFreePlugin();
    }
}
