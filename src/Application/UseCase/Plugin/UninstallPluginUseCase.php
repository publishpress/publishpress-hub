<?php

/**
 * Use case for uninstalling a plugin.
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

    /**
     * @since 1.0.0
     */
    public function __construct(
        PluginStatusService $pluginStatusService,
        WordPressPluginLifecycleAdapter $pluginLifecycle
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->pluginLifecycle = $pluginLifecycle;
    }

    /**
     * Uninstalls a plugin.
     *
     * @param WP_REST_Request $request Request containing familySlug parameter.
     * @throws PluginNotFoundException
     * @throws PluginActivationException
     * @throws PluginFreeProConflictException
     * @throws PluginNotInstalledException
     * @return array<string, mixed> The response data with plugin slug.
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');

        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => esc_html($familySlug)]);
        }

        if ($family->hasConflictingInstallations()) {
            throw new PluginFreeProConflictException(['family_slug' => esc_html($familySlug)]);
        }

        if (!$family->hasAnyVersionInstalled()) {
            throw new PluginNotInstalledException(['family_slug' => esc_html($familySlug)]);
        }

        $plugin = $family->getInstalledPlugin();

        $this->pluginLifecycle->uninstallPlugin($plugin->getPath());
        $this->pluginLifecycle->deletePlugin($plugin->getPath());

        return [
            'slug' => esc_html($plugin->getSlug()),
        ];
    }
}
