<?php

/**
 * Use case for changing the activation status of a plugin.
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
use PublishPress\Hub\Domain\Plugin\Contract\PluginInterface;
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
     * Changes the activation status of a plugin.
     *
     * @param WP_REST_Request $request Request containing familySlug and action parameters.
     * @throws PluginNotFoundException
     * @throws PluginActivationException
     * @throws PluginFreeProConflictException
     * @throws PluginNotInstalledException
     * @return array<string, mixed> The response data with plugin slug and activation status.
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');
        $action = $request->get_param('action');

        $plugin = $this->getPlugin($familySlug);

        if (!$plugin) {
            throw new PluginNotFoundException(['family_slug' => esc_html($familySlug)]);
        }

        if ($action === 'activate') {
            $this->activatePlugin($plugin);
        }

        if ($action === 'deactivate') {
            $this->deactivatePlugin($plugin);
        }

        return [
            'slug' => esc_html($plugin->getSlug()),
            'active' => $plugin->isActive(),
        ];
    }

    /**
     * Gets the plugin for a given family slug.
     *
     * @param string $familySlug The slug of the family.
     * @return PluginInterface The plugin.
     * @since 1.0.0
     */
    private function getPlugin(string $familySlug): PluginInterface
    {
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

        return $family->getInstalledPlugin();
    }

    /**
     * Activates a plugin.
     *
     * @param PluginInterface $plugin The plugin to activate.
     * @since 1.0.0
     */
    private function activatePlugin(PluginInterface $plugin): void
    {
        $this->pluginLifecycle->activatePlugin($plugin->getPath());
        $plugin->setActive(true);
    }

    /**
     * Deactivates a plugin.
     *
     * @param PluginInterface $plugin The plugin to deactivate.
     * @since 1.0.0
     */
    private function deactivatePlugin(PluginInterface $plugin): void
    {
        $this->pluginLifecycle->deactivatePlugin($plugin->getPath());
        $plugin->setActive(false);
    }
}
