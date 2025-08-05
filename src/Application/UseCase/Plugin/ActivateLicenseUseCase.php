<?php

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

    public function __construct(
        PluginStatusService $pluginStatusService,
        LicenseManagementService $licenseManagement
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->licenseManagement = $licenseManagement;
    }

    /**
     * @throws PluginNotFoundException
     * @throws LicenseInvalidException
     * @throws PluginAlreadyInstalledException
     * @throws PluginInstallException
     * @throws LicenseException
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

        // Update plugin status after license activation to reflect current state
        $this->pluginStatusService->updatePluginStatus($plugin);

        return [
            'slug' => esc_html($plugin->getSlug()),
            'licensed' => $plugin->isLicensed(),
        ];
    }
}
