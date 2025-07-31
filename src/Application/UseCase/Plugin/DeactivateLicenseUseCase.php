<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Exception\Contract\WithContextInterface;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginInstallException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Infrastructure\License\Contract\LicenseServiceInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;
use WP_REST_Request;

class DeactivateLicenseUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;

    private LicenseServiceInterface $licenseService;

    private LicensePersistenceInterface $licensePersistence;

    public function __construct(
        PluginStatusService $pluginStatusService,
        LicenseServiceInterface $licenseService,
        LicensePersistenceInterface $licensePersistence
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->licenseService = $licenseService;
        $this->licensePersistence = $licensePersistence;
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

        // Get family with updated status to ensure we have current information
        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => $familySlug]);
        }

        $plugin = $family->getProPlugin();

        try {
            $downloadId = $plugin->getDownloadId();
            $licenseKey = $this->licensePersistence->getLicenseKey($downloadId);

            $this->licenseService->deactivateLicense($licenseKey, $downloadId);
            $this->licensePersistence->removeLicenseKey($downloadId);

            // Update plugin status after license deactivation to reflect current state
            $this->pluginStatusService->updatePluginStatus($plugin);

            return [
                'slug' => $plugin->getSlug(),
                'licensed' => $plugin->isLicensed(),
            ];
        } catch (WithContextInterface $e) {
            throw new LicenseInvalidException(
                [
                    'plugin_slug' => $plugin->getSlug(),
                    'error_message' => $e->getMessage(),
                    'context' => $e->getContext(),
                ]
            );
        } catch (\Exception $e) {
            throw new PluginInstallException(
                [
                    'plugin_slug' => $plugin->getSlug(),
                    'error_message' => $e->getMessage()
                ]
            );
        }
    }
}
