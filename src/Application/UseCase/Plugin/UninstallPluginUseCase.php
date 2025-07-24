<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Exception\PluginActivationException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginConflictingInstallationsException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotInstalledException;
use PublishPress\Hub\Infrastructure\WordPress\Plugin\WordPressPluginLifecycleAdapter;
use WP_REST_Request;

class UninstallPluginUseCase implements UseCaseInterface
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
     * @throws PluginActivationException
     * @throws PluginConflictingInstallationsException
     */
    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');

        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => $familySlug]);
        }

        if ($family->hasConflictingInstallations()) {
            throw new PluginConflictingInstallationsException(['family_slug' => $familySlug]);
        }

        if (!$family->hasAnyVersionInstalled()) {
            throw new PluginNotInstalledException(['family_slug' => $familySlug]);
        }

        $plugin = $family->getInstalledPlugin();

        try {
            $this->pluginLifecycle->uninstallPlugin($plugin->getPath());

            return [
                'slug' => $plugin->getSlug(),
            ];
        } catch (\Exception $e) {
            throw new PluginActivationException(
                [
                    'plugin_slug' => $plugin->getSlug(),
                    'error_message' => $e->getMessage(),
                ]
            );
        }
    }
}
