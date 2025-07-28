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
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotInstalledException;
use PublishPress\Hub\Infrastructure\License\Contract\LicenseServiceInterface;
use PublishPress\Hub\Infrastructure\WordPress\Plugin\WordPressPluginLifecycleAdapter;
use WP_REST_Request;

class UpgradePluginUseCase implements UseCaseInterface
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
     * @throws PluginNotInstalledException
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

        if ($family->hasConflictingInstallations()) {
            throw new PluginAlreadyInstalledException(['family_slug' => $familySlug]);
        }

        $freePlugin = $family->getFreePlugin();

        if (!$freePlugin) {
            throw new PluginNotFoundException(['family_slug' => $familySlug, 'plugin_type' => 'free']);
        }

        if (! $freePlugin->isInstalled()) {
            throw new PluginNotInstalledException(['plugin_slug' => $freePlugin->getSlug()]);
        }

        $proPlugin = $family->getProPlugin();
        $downloadId = $proPlugin->getDownloadId();

        $this->licenseService->isLicenseValid($licenseKey, $downloadId);

        if (!$this->licenseService->isLicenseActive($licenseKey, $downloadId)) {
            $this->licenseService->activateLicense($licenseKey, $downloadId);
        }

        $this->pluginLifecycle->uninstallPlugin($freePlugin->getSlug());

        $pluginInfo = $this->licenseService->getLastVersionInfo($licenseKey, $downloadId);

        $downloadUrl = $pluginInfo['download_link'];

        $this->pluginLifecycle->installPlugin($proPlugin->getSlug(), $downloadUrl);

        // Update plugin status after installation to reflect current state
        $this->pluginStatusService->updatePluginStatus($proPlugin);

        return [
            'slug' => $proPlugin->getSlug(),
            'installed' => $proPlugin->isInstalled(),
        ];
    }
}
