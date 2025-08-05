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

class ResolveConflictUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;
    private WordPressPluginLifecycleAdapter $pluginLifecycle;

    public function __construct(
        PluginStatusService $pluginStatusService,
        WordPressPluginLifecycleAdapter $pluginLifecycle
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->pluginLifecycle = $pluginLifecycle;
    }

    /**
     * @throws PluginNotFoundException
     * @throws PluginNotInstalledException
     * @throws PluginInstallException
     */
    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');
        $pluginTypeToKeep = $request->get_param('pluginToKeep');

        // Get family with updated status to ensure we have current information
        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => esc_html($familySlug)]);
        }

        if (!$family->hasConflictingInstallations()) {
            throw new PluginNotInstalledException(['family_slug' => esc_html($familySlug)]);
        }

        if ($pluginTypeToKeep === 'free') {
            $pluginToUninstall = $family->getProPlugin();
            $pluginToKeep = $family->getFreePlugin();
        } else {
            $pluginToUninstall = $family->getFreePlugin();
            $pluginToKeep = $family->getProPlugin();
        }

        if (! $pluginToUninstall->isInstalled()) {
            throw new PluginNotInstalledException(['plugin_slug' => esc_html($pluginToUninstall->getSlug())]);
        }

        $pluginToUninstallSlug = $pluginToUninstall->getSlug();
        $pluginToUninstallPath = $pluginToUninstall->getPath();

        $this->pluginLifecycle->deactivatePlugin($pluginToUninstallPath);
        $this->pluginLifecycle->uninstallPlugin($pluginToUninstallPath);
        $this->pluginLifecycle->deletePlugin($pluginToUninstallPath);

        // Update plugin status after installation to reflect current state
        $this->pluginStatusService->updatePluginStatus($pluginToKeep);

        return [
            'slug' => esc_html($pluginToUninstallSlug),
            'installed' => $pluginToKeep->isInstalled(),
        ];
    }
}
