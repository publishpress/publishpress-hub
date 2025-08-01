<?php

declare(strict_types=1);

/**
 * Plugin upgrade use case for handling free to pro plugin upgrades.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

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

        $family = $this->getPluginFamily($familySlug);
        $this->validateLicenseKey($licenseKey, $familySlug);
        $this->validateNoConflictingInstallations($family, $familySlug);

        $freePlugin = $this->getFreePlugin($family, $familySlug);
        $this->validateFreePluginInstalled($freePlugin);

        $proPlugin = $family->getProPlugin();
        $this->validateAndActivateLicense($licenseKey, (int) $proPlugin->getDownloadId());

        $this->performUpgrade($freePlugin, $proPlugin, $licenseKey);

        return $this->buildResponse($proPlugin);
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
            throw new PluginNotFoundException(['family_slug' => 'missing']);
        }

        return $familySlug;
    }

    /**
     * Extract and validate the license key from the request.
     *
     * @param WP_REST_Request $request
     * @return string
     * @throws LicenseInvalidException
     * @since 1.0.0
     */
    private function extractLicenseKey(WP_REST_Request $request): string
    {
        $licenseKey = $request->get_param('licenseKey');

        if (empty($licenseKey)) {
            throw new LicenseInvalidException(['license_key' => 'missing']);
        }

        return $licenseKey;
    }

    /**
     * Get the plugin family with updated status.
     *
     * @param string $familySlug
     * @return PluginFamilyInterface The plugin family object
     * @throws PluginNotFoundException
     * @since 1.0.0
     */
    private function getPluginFamily(string $familySlug): PluginFamilyInterface
    {
        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => $familySlug]);
        }

        return $family;
    }

    /**
     * Validate that the license key is provided.
     *
     * @param string $licenseKey
     * @param string $familySlug
     * @throws LicenseInvalidException
     * @since 1.0.0
     */
    private function validateLicenseKey(string $licenseKey, string $familySlug): void
    {
        if (empty($licenseKey)) {
            throw new LicenseInvalidException(['family_slug' => $familySlug]);
        }
    }

    /**
     * Validate that there are no conflicting installations.
     *
     * @param mixed $family
     * @param string $familySlug
     * @throws PluginAlreadyInstalledException
     * @since 1.0.0
     */
    private function validateNoConflictingInstallations($family, string $familySlug): void
    {
        if ($family->hasConflictingInstallations()) {
            throw new PluginAlreadyInstalledException(['family_slug' => $familySlug]);
        }
    }

    /**
     * Get and validate the free plugin.
     *
     * @param mixed $family
     * @param string $familySlug
     * @return PluginInterface The free plugin object
     * @throws PluginNotFoundException
     * @since 1.0.0
     */
    private function getFreePlugin(PluginFamilyInterface $family, string $familySlug): PluginInterface
    {
        $freePlugin = $family->getFreePlugin();

        if (!$freePlugin) {
            throw new PluginNotFoundException(['family_slug' => $familySlug, 'plugin_type' => 'free']);
        }

        return $freePlugin;
    }

    /**
     * Validate that the free plugin is installed.
     *
     * @param PluginInterface $freePlugin
     * @throws PluginNotInstalledException
     * @since 1.0.0
     */
    private function validateFreePluginInstalled(PluginInterface $freePlugin): void
    {
        if (!$freePlugin->isInstalled()) {
            throw new PluginNotInstalledException(['plugin_slug' => $freePlugin->getSlug()]);
        }
    }

    /**
     * Validate and activate the license for the pro plugin.
     *
     * @param string $licenseKey
     * @param int $downloadId
     * @throws LicenseException
     * @since 1.0.0
     */
    private function validateAndActivateLicense(string $licenseKey, int $downloadId): void
    {
        $this->licenseManagement->validateAndEnsureActiveLicense($licenseKey, $downloadId);
    }

    /**
     * Perform the actual upgrade from free to pro plugin.
     *
     * @param PluginInterface $freePlugin
     * @param PluginInterface $proPlugin
     * @param string $licenseKey
     * @throws PluginInstallException
     * @since 1.0.0
     */
    private function performUpgrade(PluginInterface $freePlugin, PluginInterface $proPlugin, string $licenseKey): void
    {
        $this->uninstallFreePlugin($freePlugin);
        $this->installProPlugin($proPlugin, $licenseKey);
        $this->updatePluginStatus($proPlugin);
    }

    /**
     * Uninstall the free plugin.
     *
     * @param PluginInterface $freePlugin
     * @since 1.0.0
     */
    private function uninstallFreePlugin(PluginInterface $freePlugin): void
    {
        $this->pluginLifecycle->uninstallPlugin($freePlugin->getPath());
        $this->pluginLifecycle->deletePlugin($freePlugin->getPath());
    }

    /**
     * Install the pro plugin.
     *
     * @param ProPluginInterface $proPlugin
     * @param string $licenseKey
     * @throws PluginInstallException
     * @since 1.0.0
     */
    private function installProPlugin(ProPluginInterface $proPlugin, string $licenseKey): void
    {
        $downloadId = $proPlugin->getDownloadId();
        $pluginInfo = $this->licenseManagement->getLastVersionInfo($licenseKey, $downloadId);
        $downloadUrl = $pluginInfo['download_link'];

        $this->pluginLifecycle->installPlugin($proPlugin->getSlug(), $downloadUrl);
    }

    /**
     * Update the plugin status after installation.
     *
     * @param PluginInterface $proPlugin
     * @since 1.0.0
     */
    private function updatePluginStatus(PluginInterface $proPlugin): void
    {
        $this->pluginStatusService->updatePluginStatus($proPlugin);
    }

    /**
     * Build the response array.
     *
     * @param ProPluginInterface $proPlugin
     * @return array{slug: string, installed: bool}
     * @since 1.0.0
     */
    private function buildResponse(ProPluginInterface $proPlugin): array
    {
        return [
            'slug' => $proPlugin->getSlug(),
            'installed' => $proPlugin->isInstalled(),
        ];
    }
}
