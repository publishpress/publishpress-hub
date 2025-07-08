<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Contracts;

/**
 * Interface for a plugin family.
 *
 * @since 1.0.0
 */
interface PluginFamilyInterface
{
    /**
     * Get the icon file path of the plugin family.
     *
     * @return string
     */
    public function getIconPath(): string;

    /**
     * Get the description of the plugin family.
     *
     * @return string|null
     */
    public function getDescription(): ?string;

    /**
     * Get the changelog URL of the plugin family.
     *
     * @return string
     */
    public function getChangelogUrl(): string;

    /**
     * Get the installed plugins of the plugin family.
     * Having more than one installed is not the recommended practice,
     * but in case a site has multiple plugins from the same family,
     * this method will return all of them so we can take action.
     *
     * @since 1.0.0
     *
     * @return FreePluginInterface[]|null
     */
    public function getInstalledPlugins(): ?array;

    /**
     * Get the free plugin of the plugin family.
     *
     * @return FreePluginInterface
     */
    public function getFreePlugin(): FreePluginInterface;

    /**
     * Get the pro plugin of the plugin family.
     *
     * @return EddPluginInterface
     */
    public function getProPlugin(): EddPluginInterface;

    /**
     * Get the name of the plugin family.
     *
     * @return string
     */
    public function getName(): string;

    /**
     * Get the slug of the plugin family.
     *
     * @return string
     */
    public function getSlug(): string;

    /**
     * Check if any version of the plugin family is installed.
     *
     * @return bool
     */
    public function hasAnyVersionInstalled(): bool;

    /**
     * Check if any version of the plugin family is active.
     *
     * @return bool
     */
    public function hasAnyVersionActive(): bool;

    /**
     * Check if the plugin family has conflicting installations.
     *
     * @return bool
     */
    public function hasConflictingInstallations(): bool;

    /**
     * Set the icon file path of the plugin family.
     *
     * @param string $iconPath
     * @return self
     */
    public function setIconPath(string $iconPath): self;

    /**
     * Set the description of the plugin family.
     *
     * @param string $description
     * @return self
     */
    public function setDescription(string $description): self;

    /**
     * Set the changelog URL of the plugin family.
     *
     * @param string $changelogUrl
     * @return self
     */
    public function setChangelogUrl(string $changelogUrl): self;
}
