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
     * @throws PluginFreeProConflictException
     */
    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');

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

        $this->pluginLifecycle->uninstallPlugin($plugin->getPath());
        $this->pluginLifecycle->deletePlugin($plugin->getPath());

        return [
            'slug' => $plugin->getSlug(),
        ];
    }
}
