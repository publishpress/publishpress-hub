<?php

/**
 * Use case for resolving conflicts.
 *
 * @package PublishPress\Hub\Application\UseCase\Plugin
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

defined('ABSPATH') || exit;

use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginInterface;
use PublishPress\Hub\Domain\Plugin\Exception\PluginInstallException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotInstalledException;
use PublishPress\Hub\Infrastructure\WP\Plugin\WPPluginLifecycleAdapter;
use WP_REST_Request;
use InvalidArgumentException;
use RuntimeException;

class ResolveConflictUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;
    private WPPluginLifecycleAdapter $pluginLifecycle;

    /**
     * @since 1.0.0
     */
    public function __construct(
        PluginStatusService $pluginStatusService,
        WPPluginLifecycleAdapter $pluginLifecycle
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->pluginLifecycle = $pluginLifecycle;
    }

    /**
     * Resolves a conflict by uninstalling the conflicting plugin
     * according to the pluginToKeep parameter selected by the user.
     *
     * @param WP_REST_Request $request Request containing familySlug and pluginToKeep parameters.
     * @throws PluginNotFoundException
     * @throws PluginNotInstalledException
     * @throws PluginInstallException
     * @return array<string, mixed> The response data with plugin slug and installation status.
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        $familySlug = $request->get_param('familySlug');
        $pluginTypeToKeep = $request->get_param('pluginToKeep');
        $phase = $request->get_param('phase') ?? 'activate';
        if (!in_array($pluginTypeToKeep, ['free', 'pro'], true) || !in_array($phase, ['activate', 'cleanup'], true)) {
            throw new InvalidArgumentException(esc_html__('Invalid conflict resolution request.', 'publishpress-hub'));
        }

        $family = $this->pluginStatusService->getPluginFamilyWithUpdatedStatus($familySlug);

        if (!$family) {
            throw new PluginNotFoundException(['family_slug' => esc_html($familySlug)]);
        }

        if (!$family->hasConflictingInstallations()) {
            throw new PluginNotInstalledException(['family_slug' => esc_html($familySlug)]);
        }

        $pluginToUninstall = $this->getPluginToUninstall($family, $pluginTypeToKeep);
        $pluginToKeep = $this->getPluginToKeep($family, $pluginTypeToKeep);

        if (! $pluginToUninstall->isInstalled()) {
            throw new PluginNotInstalledException(['plugin_slug' => esc_html($pluginToUninstall->getSlug())]);
        }

        $pluginToUninstallSlug = $pluginToUninstall->getSlug();
        $pluginToUninstallPath = $pluginToUninstall->getPath();
        $selectedPath = $pluginToKeep->getPath();

        if (!$pluginToKeep->isInstalled() || $selectedPath === $pluginToUninstallPath) {
            throw new RuntimeException(esc_html__('The selected plugin is not available for activation.', 'publishpress-hub'));
        }

        if ($phase === 'activate') {
            $this->pluginLifecycle->switchActivePlugin($pluginToUninstallPath, $selectedPath);
            return ['requiresCleanup' => true, 'active' => true];
        }

        if (!$this->pluginLifecycle->canRemoveConflictingPlugin($pluginToUninstallPath, $selectedPath)) {
            throw new RuntimeException(esc_html__(
                'Cleanup was stopped because the selected plugin is not active or the other version is still loaded. Neither copy was deleted.',
                'publishpress-hub'
            ));
        }

        // delete_plugins() runs the uninstall hook itself. Do not run it twice.
        if (!$this->pluginLifecycle->deletePlugin($pluginToUninstallPath)) {
            throw new RuntimeException(esc_html__(
                'The selected plugin is active, but the other version could not be removed. Please remove it from the Plugins screen.',
                'publishpress-hub'
            ));
        }

        $this->pluginStatusService->updatePluginStatus($pluginToKeep);
        if (!$pluginToKeep->isActive()) {
            throw new RuntimeException(esc_html__('The selected plugin is no longer active. Please reactivate it from the Plugins screen.', 'publishpress-hub'));
        }

        return [
            'slug' => esc_html($pluginToUninstallSlug),
            'installed' => $pluginToKeep->isInstalled(),
            'active' => $pluginToKeep->isActive(),
        ];
    }

    /**
     * Gets the plugin to uninstall.
     *
     * @param PluginFamilyInterface $family The family.
     * @param string $pluginTypeToKeep The type of plugin to keep.
     * @return PluginInterface The plugin to uninstall.
     * @since 1.0.0
     */
    private function getPluginToUninstall(PluginFamilyInterface $family, string $pluginTypeToKeep): PluginInterface
    {
        if ($pluginTypeToKeep === 'free') {
            return $family->getProPlugin();
        }

        return $family->getFreePlugin();
    }

    /**
     * Gets the plugin to keep.
     *
     * @param PluginFamilyInterface $family The family.
     * @param string $pluginTypeToKeep The type of plugin to keep.
     * @return PluginInterface The plugin to keep.
     * @since 1.0.0
     */
    private function getPluginToKeep(PluginFamilyInterface $family, string $pluginTypeToKeep): PluginInterface
    {
        if ($pluginTypeToKeep === 'free') {
            return $family->getFreePlugin();
        }

        return $family->getProPlugin();
    }
}
