<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Exception\Contract\WithContextInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginInstallException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Infrastructure\License\Contract\LicenseServiceInterface;
use PublishPress\Hub\Infrastructure\WordPress\Plugin\WordPressPluginLifecycleAdapter;
use WP_REST_Request;

class InstallProPluginUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;
    private WordPressPluginLifecycleAdapter $pluginLifecycle;
    private LicenseServiceInterface $licenseService;

    public function __construct(
        PluginStatusService $pluginStatusService,
        WordPressPluginLifecycleAdapter $pluginLifecycle,
        LicenseServiceInterface $licenseService
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->pluginLifecycle = $pluginLifecycle;
        $this->licenseService = $licenseService;
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
            throw new PluginNotFoundException(['family_slug' => $familySlug]);
        }

        if (!$licenseKey) {
            throw new LicenseInvalidException(['family_slug' => $familySlug]);
        }

        $plugin = $family->getProPlugin();

        if (!$plugin) {
            throw new PluginNotFoundException(['family_slug' => $familySlug, 'plugin_type' => 'pro']);
        }

        if ($plugin->isInstalled()) {
            throw new PluginAlreadyInstalledException(['plugin_slug' => $plugin->getSlug()]);
        }

        try {
            $downloadId = $plugin->getDownloadId();

            $this->licenseService->isLicenseValid($licenseKey, $downloadId);

            if (!$this->licenseService->isLicenseActive($licenseKey, $downloadId)) {
                $this->licenseService->activateLicense($licenseKey, $downloadId);
            }

            $pluginInfo = $this->licenseService->getLastVersionInfo($licenseKey, $downloadId);

            $downloadUrl = $pluginInfo['download_link'];

            $this->pluginLifecycle->installPlugin($plugin->getSlug(), $downloadUrl);

            // Update plugin status after installation to reflect current state
            $this->pluginStatusService->updatePluginStatus($plugin);

            return [
                'slug' => $plugin->getSlug(),
                'installed' => $plugin->isInstalled(),
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
