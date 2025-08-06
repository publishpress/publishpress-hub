<?php

/**
 * Plugin upgrade use case for handling free to pro plugin upgrades.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginInterface;
use PublishPress\Hub\Domain\Plugin\Contract\ProPluginInterface;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginInstallException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotInstalledException;
use PublishPress\Hub\Application\Service\License\LicenseManagementService;
use PublishPress\Hub\Infrastructure\WordPress\Plugin\WordPressPluginLifecycleAdapter;
use WP_REST_Request;

class UpgradePluginUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;
    private WordPressPluginLifecycleAdapter $pluginLifecycle;
    private LicenseManagementService $licenseManagement;

    public function __construct(
        PluginStatusService $pluginStatusService,
        WordPressPluginLifecycleAdapter $pluginLifecycle,
        LicenseManagementService $licenseManagement
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->pluginLifecycle = $pluginLifecycle;
        $this->licenseManagement = $licenseManagement;
    }

    /**
     * Execute the plugin upgrade from free to pro version.
     *
     * @param WP_REST_Request $request The REST request containing familySlug and licenseKey
     * @return array{slug: string, installed: bool} The result of the upgrade operation
     * @throws PluginNotFoundException When the plugin family is not found
     * @throws LicenseInvalidException When the license key is invalid or missing
     * @throws PluginNotInstalledException When the free plugin is not installed
     * @throws PluginInstallException When the pro plugin installation fails
     * @throws LicenseException When there are license-related issues
     * @throws PluginAlreadyInstalledException When there are conflicting installations
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $this->extractFamilySlug($request);
        $licenseKey = $this->extractLicenseKey($request);

        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);
        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => esc_html($familySlug)]);
        }

        if ($family->hasConflictingInstallations()) {
            throw new PluginAlreadyInstalledException(['family_slug' => esc_html($familySlug)]);
        }

        $freePlugin = $family->getFreePlugin();
        if (!$freePlugin) {
            throw new PluginNotFoundException(['family_slug' => esc_html($familySlug), 'plugin_type' => 'free']);
        }

        if (!$freePlugin->isInstalled()) {
            throw new PluginNotInstalledException(['plugin_slug' => esc_html($freePlugin->getSlug())]);
        }


        $proPlugin = $family->getProPlugin();
        $this->licenseManagement->validateAndEnsureActiveLicense($licenseKey, (int) $proPlugin->getDownloadId());

        $this->performUpgrade($freePlugin, $proPlugin, $licenseKey);

        return [
            'slug' => esc_html($proPlugin->getSlug()),
            'installed' => $proPlugin->isInstalled(),
        ];
    }

    /**
     * Extract and validate the family slug from the request.
     *
     * @param WP_REST_Request $request
     * @return string
     * @throws PluginNotFoundException
     * @since 1.0.0
     */
    private function extractFamilySlug(WP_REST_Request $request): string
    {
        $familySlug = $request->get_param('familySlug');

        if (empty($familySlug)) {
            throw new PluginNotFoundException(['family_slug' => esc_html('missing')]);
        }

        return $familySlug;
    }

    private function extractLicenseKey(WP_REST_Request $request): string
    {
        $licenseKey = $request->get_param('licenseKey');

        if (empty($licenseKey)) {
            throw new LicenseInvalidException(['license_key' => esc_html('missing')]);
        }

        return $licenseKey;
    }

    /**
     * Perform the actual upgrade from free to pro plugin.
     *
     * @param PluginInterface $freePlugin
     * @param ProPluginInterface $proPlugin
     * @param string $licenseKey
     * @throws PluginInstallException
     * @since 1.0.0
     */
    private function performUpgrade(PluginInterface $freePlugin, ProPluginInterface $proPlugin, string $licenseKey): void
    {
        // Uninstall free plugin
        $this->pluginLifecycle->uninstallPlugin($freePlugin->getPath());
        $this->pluginLifecycle->deletePlugin($freePlugin->getPath());

        // Install pro plugin
        $downloadId = $proPlugin->getDownloadId();
        $pluginInfo = $this->licenseManagement->getLastVersionInfo($licenseKey, $downloadId);
        $downloadUrl = $pluginInfo['download_link'];

        $this->pluginLifecycle->installPlugin($proPlugin->getSlug(), $downloadUrl);
        $this->pluginStatusService->updatePluginStatus($proPlugin);
    }
}
