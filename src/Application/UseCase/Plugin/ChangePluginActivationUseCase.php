<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Exception\PluginActivationException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginFreeProConflictException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotInstalledException;
use PublishPress\Hub\Infrastructure\WordPress\Plugin\WordPressPluginLifecycleAdapter;
use WP_REST_Request;

class ChangePluginActivationUseCase implements UseCaseInterface
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
     * @throws PluginFreeProConflictException
     */
    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');
        $action = $request->get_param('action');

        // Get family with updated status to ensure we have current information
        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => $familySlug]);
        }

        if ($family->hasConflictingInstallations()) {
            throw new PluginFreeProConflictException(['family_slug' => $familySlug]);
        }

        if (!$family->hasAnyVersionInstalled()) {
            throw new PluginNotInstalledException(['family_slug' => $familySlug]);
        }

        $plugin = $family->getInstalledPlugin();

        if (!$plugin) {
            throw new PluginNotFoundException(['family_slug' => $familySlug]);
        }

        if ($action === 'activate') {
            $this->pluginLifecycle->activatePlugin($plugin->getPath());
            $plugin->setActive(true);
        } else {
            $this->pluginLifecycle->deactivatePlugin($plugin->getPath());
            $plugin->setActive(false);
        }

        return [
            'slug' => $plugin->getSlug(),
            'active' => $plugin->isActive(),
        ];
    }
}
