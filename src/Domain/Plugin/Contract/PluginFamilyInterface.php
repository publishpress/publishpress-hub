<?php

/**
 * Plugin family interface.
 *
 * @package PublishPress\Hub\Domain\Plugin\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Contract;

\defined('ABSPATH') || exit;

interface PluginFamilyInterface
{
    /**
     * Gets the icon path.
     *
     * @return string The icon path.
     * @since 1.0.0
     */
    public function getIconPath(): string;

    /**
     * Gets the description.
     *
     * @return string|null The description.
     * @since 1.0.0
     */
    public function getDescription(): ?string;

    /**
     * Gets the changelog URL.
     *
     * @return string The changelog URL.
     * @since 1.0.0
     */
    public function getChangelogUrl(): string;

    /**
     * Gets the free plugin.
     *
     * @return PluginInterface The free plugin.
     * @since 1.0.0
     */
    public function getFreePlugin(): PluginInterface;

    /**
     * Gets the pro plugin.
     *
     * @return ProPluginInterface The pro plugin.
     * @since 1.0.0
     */
    public function getProPlugin(): ProPluginInterface;

    /**
     * Gets the name.
     *
     * @return string The name.
     * @since 1.0.0
     */
    public function getName(): string;

    /**
     * Gets the slug.
     *
     * @return string The slug.
     * @since 1.0.0
     */
    public function getSlug(): string;

    /**
     * Checks if any version is installed.
     *
     * @return bool True if any version is installed, false otherwise.
     * @since 1.0.0
     */
    public function hasAnyVersionInstalled(): bool;

    /**
     * Checks if any version is active.
     *
     * @return bool True if any version is active, false otherwise.
     * @since 1.0.0
     */
    public function hasAnyVersionActive(): bool;

    /**
     * Checks if there are conflicting installations.
     *
     * @return bool True if there are conflicting installations, false otherwise.
     * @since 1.0.0
     */
    public function hasConflictingInstallations(): bool;

    /**
     * Sets the icon path.
     *
     * @param string $iconPath The icon path.
     * @return self The plugin family.
     * @since 1.0.0
     */
    public function setIconPath(string $iconPath): self;

    /**
     * Sets the description.
     *
     * @param string $description The description.
     * @return self The plugin family.
     * @since 1.0.0
     */
    public function setChangelogUrl(string $changelogUrl): self;

    /**
     * Gets the installed plugin.
     *
     * @return PluginInterface|null The installed plugin.
     * @since 1.0.0
     */
    public function getInstalledPlugin(): ?PluginInterface;
}
