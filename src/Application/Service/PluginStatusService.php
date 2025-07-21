<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Domain\Plugin\Contract\PluginInterface;
use PublishPress\Hub\Infrastructure\WordPress\Plugin\WordPressPluginStatusAdapter;

/**
 * Application service for managing plugin status.
 * Orchestrates between domain entities and infrastructure services.
 *
 * @since 1.0.0
 */
class PluginStatusService
{
    private WordPressPluginStatusAdapter $pluginChecker;

    public function __construct(WordPressPluginStatusAdapter $pluginChecker)
    {
        $this->pluginChecker = $pluginChecker;
    }

    /**
     * Refresh the plugin's status from WordPress.
     */
    public function refreshPluginStatus(PluginInterface $plugin): PluginInterface
    {
        $isInstalled = $this->pluginChecker->checkIfPluginIsInstalled($plugin);

        if ($isInstalled) {
            $version = $this->pluginChecker->getPluginVersion($plugin);
            $filePath = $this->pluginChecker->getPluginFilePath($plugin);
            $isActive = $this->pluginChecker->checkIfPluginIsActive($plugin);

            $plugin->setInstalled(true, $version, $filePath);
            $plugin->setActive($isActive);
        } else {
            $plugin->setInstalled(false);
            $plugin->setActive(false);
        }

        return $plugin;
    }

    /**
     * Check if a plugin is installed without updating the domain entity.
     */
    public function isPluginInstalled(PluginInterface $plugin): bool
    {
        return $this->pluginChecker->checkIfPluginIsInstalled($plugin);
    }

    /**
     * Check if a plugin is active without updating the domain entity.
     */
    public function isPluginActive(PluginInterface $plugin): bool
    {
        return $this->pluginChecker->checkIfPluginIsActive($plugin);
    }

    /**
     * Get the actual version of a plugin from WordPress.
     */
    public function getPluginVersion(PluginInterface $plugin): ?string
    {
        return $this->pluginChecker->getPluginVersion($plugin);
    }
}
