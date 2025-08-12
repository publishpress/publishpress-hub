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

use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginInstallException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Application\Service\License\LicenseManagementService;
use WP_REST_Request;

class ActivateLicenseUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;

    private LicenseManagementService $licenseManagement;

    /**
     * @since 1.0.0
     */
    public function __construct(
        PluginStatusService $pluginStatusService,
        LicenseManagementService $licenseManagement
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->licenseManagement = $licenseManagement;
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

        // Get family with updated status to ensure we have current information
        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => esc_html($familySlug)]);
        }

        $plugin = $family->getProPlugin();
        $downloadId = $plugin->getDownloadId();

        $this->licenseManagement->activateAndStoreLicense($licenseKey, $downloadId);
        $this->pluginStatusService->updatePluginStatus($plugin);

        return [
            'slug' => esc_html($plugin->getSlug()),
            'licensed' => $plugin->isLicensed(),
        ];
    }
}
