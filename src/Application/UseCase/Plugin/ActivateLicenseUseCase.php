<?php

/**
 * Use case for activating a license.
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
use PublishPress\Hub\Application\Service\License\ScheduledLicenseValidationService;
use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginInstallException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;
use WP_REST_Request;

class ActivateLicenseUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;

    private LicenseManagementService $licenseManagement;

    private ScheduledLicenseValidationService $licenseValidation;

    private PluginFamilyRepositoryInterface $pluginFamilyRepository;

    private LicensePersistenceInterface $licensePersistence;

    /**
     * @param PluginStatusService $pluginStatusService
     * @param LicenseManagementService $licenseManagement
     * @param ScheduledLicenseValidationService $licenseValidation
     * @param PluginFamilyRepositoryInterface $pluginFamilyRepository
     * @param LicensePersistenceInterface $licensePersistence
     * @since 1.0.0
     */
    public function __construct(
        PluginStatusService $pluginStatusService,
        LicenseManagementService $licenseManagement,
        ScheduledLicenseValidationService $licenseValidation,
        PluginFamilyRepositoryInterface $pluginFamilyRepository,
        LicensePersistenceInterface $licensePersistence
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->licenseManagement = $licenseManagement;
        $this->licenseValidation = $licenseValidation;
        $this->pluginFamilyRepository = $pluginFamilyRepository;
        $this->licensePersistence = $licensePersistence;
    }

    /**
     * Activates a license for a plugin family and updates plugin status.
     *
     * @param WP_REST_Request $request Request containing familySlug and licenseKey parameters.
     * @throws PluginNotFoundException
     * @throws LicenseInvalidException
     * @throws PluginAlreadyInstalledException
     * @throws PluginInstallException
     * @throws LicenseException
     * @return array<string, mixed> The response data with plugin slug and license status.
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');
        $licenseKey = $request->get_param('licenseKey');
        $applyToAll = (bool) $request->get_param('applyToAll');

        // Get family with updated status to ensure we have current information
        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => esc_html($familySlug)]);
        }

        $plugin = $family->getProPlugin();
        $downloadId = $plugin->getDownloadId();

        $this->guardAgainstWpConfigLicense($downloadId, $plugin->getSlug());
        $this->licenseManagement->activateAndStoreLicense($licenseKey, $downloadId);
        $this->reuseLicenseKeyForAllPlugins($licenseKey, $family, $applyToAll);
        $this->pluginStatusService->updatePluginStatus($plugin);

        // Trigger immediate license validation to check expiration status
        // This ensures the UI shows current license status (expired/active)
        // without waiting for the next scheduled validation.
        $this->licenseValidation->validateAllLicenses();

        return [
            'slug' => esc_html($plugin->getSlug()),
            'licensed' => $plugin->isLicensed(),
        ];
    }

    /**
     * Reuse a license key for all plugin families.
     *
     * @param string $licenseKey The license key.
     * @param PluginFamilyInterface $currentFamily The family already activated through the API.
     * @param bool $applyToAll Whether to reuse the key for every family.
     * @since 1.0.0
     */
    private function reuseLicenseKeyForAllPlugins(
        string $licenseKey,
        PluginFamilyInterface $currentFamily,
        bool $applyToAll
    ): void {
        if (!$applyToAll) {
            return;
        }

        $currentDownloadId = $currentFamily->getProPlugin()->getDownloadId();

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

    /**
     * Prevent editing licenses managed in wp-config.php.
     *
     * @param int $downloadId The download ID.
     * @param string $pluginSlug The plugin slug.
     * @throws LicenseInvalidException
     * @since 1.0.0
     */
    private function guardAgainstWpConfigLicense(int $downloadId, string $pluginSlug): void
    {
        if (!$this->licensePersistence->isLicenseFromConstant($downloadId)) {
            return;
        }

        throw new LicenseInvalidException([
            'plugin_slug' => esc_html($pluginSlug),
            'error_message' => esc_html__(
                'This license key is managed in wp-config.php and cannot be edited from the Hub.',
                'publishpress-hub'
            ),
        ]);
    }
}
