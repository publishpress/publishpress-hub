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
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Infrastructure\WP\Plugin\WPPluginLifecycleAdapter;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;
use WP_REST_Request;

class InstallProPluginUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;

    private WPPluginLifecycleAdapter $pluginLifecycle;

    private LicenseManagementService $licenseManagement;

    private PluginFamilyRepositoryInterface $pluginFamilyRepository;

    private LicensePersistenceInterface $licensePersistence;

    /**
     * @since 1.0.0
     */
    public function __construct(
        PluginStatusService $pluginStatusService,
        WPPluginLifecycleAdapter $pluginLifecycle,
        LicenseManagementService $licenseManagement,
        PluginFamilyRepositoryInterface $pluginFamilyRepository,
        LicensePersistenceInterface $licensePersistence
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->pluginLifecycle = $pluginLifecycle;
        $this->licenseManagement = $licenseManagement;
        $this->pluginFamilyRepository = $pluginFamilyRepository;
        $this->licensePersistence = $licensePersistence;
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

        $downloadId = $plugin->getDownloadId();
        $licenseKey = $this->getLicenseKeyFromRequest($request, $downloadId);
        $applyToAll = (bool) $request->get_param('applyToAll');

        if (!$licenseKey) {
            throw new LicenseInvalidException(['family_slug' => esc_html($familySlug)]);
        }

        $this->licenseManagement->validateAndEnsureActiveLicense($licenseKey, $downloadId);
        $this->reuseLicenseKeyForAllPlugins($licenseKey, $downloadId, $applyToAll);

        $pluginInfo = $this->licenseManagement->getLastVersionInfo($licenseKey, $downloadId);

        $downloadUrl = $pluginInfo['download_link'];

        $this->pluginLifecycle->installPlugin($plugin->getSlug(), $downloadUrl);
        $this->pluginStatusService->updatePluginStatus($plugin);

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

    /**
     * Gets the license key from the request or an existing plugin family.
     *
     * @param WP_REST_Request $request The REST request.
     * @param int $currentDownloadId The current plugin download ID.
     * @return string The license key.
     * @since 1.0.0
     */
    private function getLicenseKeyFromRequest(WP_REST_Request $request, int $currentDownloadId): string
    {
        if (!rest_sanitize_boolean($request->get_param('useExistingLicense'))) {
            return (string) $request->get_param('licenseKey');
        }

        return $this->getExistingLicenseKey($currentDownloadId);
    }

    /**
     * Gets an existing saved license key from another plugin family.
     *
     * @param int $currentDownloadId The current plugin download ID.
     * @return string The license key.
     * @since 1.0.0
     */
    private function getExistingLicenseKey(int $currentDownloadId): string
    {
        foreach ($this->pluginFamilyRepository->getAllFamilies() as $family) {
            $downloadId = $family->getProPlugin()->getDownloadId();

            if ($downloadId === $currentDownloadId) {
                continue;
            }

            $licenseKey = $this->licensePersistence->getLicenseKey($downloadId);

            if (!empty($licenseKey)) {
                return $licenseKey;
            }
        }

        return '';
    }

    /**
     * Reuses a license key for all plugin families.
     *
     * @param string $licenseKey The license key.
     * @param int $currentDownloadId The current plugin download ID.
     * @param bool $applyToAll Whether to reuse the key for every family.
     * @since 1.0.0
     */
    private function reuseLicenseKeyForAllPlugins(string $licenseKey, int $currentDownloadId, bool $applyToAll): void
    {
        if (!$applyToAll) {
            return;
        }

        foreach ($this->pluginFamilyRepository->getAllFamilies() as $family) {
            $downloadId = $family->getProPlugin()->getDownloadId();

            if ($downloadId === $currentDownloadId || $this->licensePersistence->isLicenseFromConstant($downloadId)) {
                continue;
            }

            $this->licensePersistence->storeLicenseKey($downloadId, $licenseKey);
            $this->licensePersistence->storeLicenseStatus($downloadId, true);
            $this->licensePersistence->markLicenseAsFromConstant($downloadId, false);
        }
    }
}
