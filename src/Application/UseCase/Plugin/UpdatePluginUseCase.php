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
defined( 'ABSPATH' ) || exit;

use PublishPress\Hub\Application\Service\License\LicenseManagementService;
use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginInterface;
use PublishPress\Hub\Domain\Plugin\Contract\ProPluginInterface;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotInstalledException;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;
use PublishPress\Hub\Infrastructure\WP\Plugin\WPPluginLifecycleAdapter;
use WP_REST_Request;

class UpdatePluginUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;

    private WPPluginLifecycleAdapter $pluginLifecycle;

    private LicenseManagementService $licenseManagement;

    private LicensePersistenceInterface $licensePersistence;

    /**
     * @since 1.0.0
     */
    public function __construct(
        PluginStatusService $pluginStatusService,
        WPPluginLifecycleAdapter $pluginLifecycle,
        LicenseManagementService $licenseManagement,
        LicensePersistenceInterface $licensePersistence
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->pluginLifecycle = $pluginLifecycle;
        $this->licenseManagement = $licenseManagement;
        $this->licensePersistence = $licensePersistence;
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
        $updateInfo = $this->getHubDetectedUpdateInfo($installedPlugin);
        $wasActive = $installedPlugin->isActive();

        $this->pluginLifecycle->updatePlugin($pluginPath, $updateInfo);

        if ($wasActive) {
            $this->pluginLifecycle->activatePlugin($pluginPath);
        }

        // Update plugin status after update to reflect current state
        $this->pluginStatusService->updatePluginStatus($installedPlugin);

        return [
            'slug' => esc_html($installedPlugin->getSlug()),
            'updated' => true,
            'version' => esc_html($installedPlugin->getVersion()),
        ];
    }

    /**
     * Get update info detected by Hub for Pro plugins.
     *
     * @param PluginInterface $installedPlugin The installed plugin.
     * @return array<string, mixed>|null The update information.
     * @since 1.0.0
     */
    private function getHubDetectedUpdateInfo(PluginInterface $installedPlugin): ?array
    {
        if (!$installedPlugin instanceof ProPluginInterface) {
            return null;
        }

        $downloadId = $installedPlugin->getDownloadId();
        $licenseKey = $this->licensePersistence->getLicenseKey($downloadId);

        if (empty($licenseKey)) {
            return null;
        }

        return $this->licenseManagement->getLastVersionInfo($licenseKey, $downloadId, true);
    }
}
