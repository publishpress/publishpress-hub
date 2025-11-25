<?php

/**
 * Use case for installing a pro plugin.
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
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginInstallException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Application\Service\License\LicenseManagementService;
use PublishPress\Hub\Domain\Plugin\Contract\ProPluginInterface;
use PublishPress\Hub\Infrastructure\WP\Plugin\WPPluginLifecycleAdapter;
use WP_REST_Request;

class InstallProPluginUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;

    private WPPluginLifecycleAdapter $pluginLifecycle;

    private LicenseManagementService $licenseManagement;

    /**
     * @since 1.0.0
     */
    public function __construct(
        PluginStatusService $pluginStatusService,
        WPPluginLifecycleAdapter $pluginLifecycle,
        LicenseManagementService $licenseManagement
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->pluginLifecycle = $pluginLifecycle;
        $this->licenseManagement = $licenseManagement;
    }

    /**
     * Installs a pro plugin.
     *
     * @param WP_REST_Request $request Request containing familySlug and licenseKey parameters.
     * @throws PluginNotFoundException
     * @throws LicenseInvalidException
     * @throws PluginAlreadyInstalledException
     * @throws PluginInstallException
     * @throws LicenseException
     * @return array<string, mixed> The response data with plugin slug and installation status.
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');

        $plugin = $this->getPlugin($familySlug);

        if ($plugin->isInstalled()) {
            throw new PluginAlreadyInstalledException(['plugin_slug' => esc_html($plugin->getSlug())]);
        }

        $licenseKey = $request->get_param('licenseKey');

        if (!$licenseKey) {
            throw new LicenseInvalidException(['family_slug' => esc_html($familySlug)]);
        }

        $downloadId = $plugin->getDownloadId();

        $this->licenseManagement->validateAndEnsureActiveLicense($licenseKey, $downloadId);

        $pluginInfo = $this->licenseManagement->getLastVersionInfo($licenseKey, $downloadId);

        $downloadUrl = $pluginInfo['download_link'];

        $this->pluginLifecycle->installPlugin($plugin->getSlug(), $downloadUrl);
        $this->pluginStatusService->updatePluginStatus($plugin);

        // Activating the plugin ensures it is immediately usable after installation
        $this->pluginLifecycle->activatePlugin($plugin->getPath());

        return [
            'slug' => esc_html($plugin->getSlug()),
            'installed' => $plugin->isInstalled(),
        ];
    }

    /**
     * Gets the plugin for a given family slug.
     *
     * @param string $familySlug The slug of the family.
     * @return ProPluginInterface The plugin.
     * @since 1.0.0
     */
    private function getPlugin(string $familySlug): ProPluginInterface
    {
        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => esc_html($familySlug)]);
        }

        return $family->getProPlugin();
    }
}
