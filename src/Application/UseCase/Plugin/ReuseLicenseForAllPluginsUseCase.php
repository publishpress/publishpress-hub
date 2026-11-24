<?php

/**
 * Use case for reusing an existing license for all plugins.
 *
 * @package PublishPress\Hub\Application\UseCase\Plugin
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\Service\License\LicenseManagementService;
use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;
use WP_REST_Request;

\defined('ABSPATH') || exit;

class ReuseLicenseForAllPluginsUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;

    private PluginFamilyRepositoryInterface $pluginFamilyRepository;

    private LicensePersistenceInterface $licensePersistence;

    private LicenseManagementService $licenseManagement;

    /**
     * @param PluginStatusService $pluginStatusService
     * @param PluginFamilyRepositoryInterface $pluginFamilyRepository
     * @param LicensePersistenceInterface $licensePersistence
     * @param LicenseManagementService $licenseManagement
     * @since 1.0.0
     */
    public function __construct(
        PluginStatusService $pluginStatusService,
        PluginFamilyRepositoryInterface $pluginFamilyRepository,
        LicensePersistenceInterface $licensePersistence,
        LicenseManagementService $licenseManagement
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->pluginFamilyRepository = $pluginFamilyRepository;
        $this->licensePersistence = $licensePersistence;
        $this->licenseManagement = $licenseManagement;
    }

    /**
     * Reuses the current plugin family's license key for all plugin families.
     *
     * @param WP_REST_Request $request Request containing familySlug parameter.
     * @return array<string, mixed>
     * @throws PluginNotFoundException
     * @throws LicenseInvalidException
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');
        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => esc_html($familySlug)]);
        }

        $currentDownloadId = $family->getProPlugin()->getDownloadId();
        $licenseKey = $this->licensePersistence->getLicenseKey($currentDownloadId);

        if (empty($licenseKey)) {
            throw new LicenseInvalidException([
                'family_slug' => esc_html($familySlug),
                'error_message' => esc_html__(
                    'No existing license key was found for this plugin.',
                    'publishpress-hub'
                ),
            ]);
        }

        $licenseResults = $this->licenseManagement->activateLicenseForFamilies(
            $licenseKey,
            $this->pluginFamilyRepository->getAllFamilies(),
            $currentDownloadId
        );

        return [
            'reused' => true,
            'updatedCount' => count(array_filter($licenseResults, static fn(array $result): bool => $result['success'])),
            'licenseResults' => $licenseResults,
        ];
    }
}
