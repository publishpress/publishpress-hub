<?php

/**
 * Plugin family entity.
 *
 * @package PublishPress\Hub\Domain\Plugin\Entity
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Entity;

use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginInterface;
use PublishPress\Hub\Domain\Plugin\Contract\ProPluginInterface;

class PluginFamily implements PluginFamilyInterface
{
    private string $name;

    private string $slug;

    private string $iconFileName;

    private ?string $description;

    private string $changelogUrl;

    private ?PluginInterface $freePlugin = null;

    private ?ProPluginInterface $proPlugin = null;

    /**
     * @param string $name The name of the plugin family.
     * @param string $slug The slug of the plugin family.
     * @param string $iconFileName The icon file name of the plugin family.
     * @param string|null $description The description of the plugin family.
     * @param string $changelogUrl The changelog URL of the plugin family.
     * @since 1.0.0
     */
    public function __construct(
        string $name,
        string $slug,
        string $iconFileName,
        ?string $description,
        string $changelogUrl
    ) {
        $this->name = $name;
        $this->slug = $slug;
        $this->iconFileName = $iconFileName;
        $this->description = $description;
        $this->changelogUrl = $changelogUrl;
    }

    /**
     * Gets the name of the plugin family.
     *
     * @return string The name of the plugin family.
     * @since 1.0.0
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Gets the slug of the plugin family.
     *
     * @return string The slug of the plugin family.
     * @since 1.0.0
     */
    public function getSlug(): string
    {
        return $this->slug;
    }

    /**
     * Gets the icon path of the plugin family.
     *
     * @return string The icon path of the plugin family.
     * @since 1.0.0
     */
    public function getIconPath(): string
    {
        return $this->iconFileName;
    }

    /**
     * Gets the description of the plugin family.
     *
     * @return string|null The description of the plugin family.
     * @since 1.0.0
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * Gets the changelog URL of the plugin family.
     *
     * @return string The changelog URL of the plugin family.
     * @since 1.0.0
     */
    public function getChangelogUrl(): string
    {
        return $this->changelogUrl;
    }

    /**
     * Gets the free plugin of the plugin family.
     *
     * @return PluginInterface The free plugin of the plugin family.
     * @since 1.0.0
     */
    public function getFreePlugin(): PluginInterface
    {
        if ($this->freePlugin === null) {
            throw new \RuntimeException(
                sprintf(
                    // translators: %s is the plugin family slug
                    esc_html__('Free plugin not set for plugin family: %s', 'publishpress-hub'),
                    esc_html($this->slug)
                )
            );
        }
        return $this->freePlugin;
    }

    /**
     * Gets the pro plugin of the plugin family.
     *
     * @return ProPluginInterface The pro plugin of the plugin family.
     * @since 1.0.0
     */
    public function getProPlugin(): ProPluginInterface
    {
        if ($this->proPlugin === null) {
            throw new \RuntimeException(
                sprintf(
                    // translators: %s is the plugin family slug
                    esc_html__('Pro plugin not set for plugin family: %s', 'publishpress-hub'),
                    esc_html($this->slug)
                )
            );
        }
        return $this->proPlugin;
    }

    /**
     * Checks if any version is installed.
     *
     * @return bool True if any version is installed, false otherwise.
     * @since 1.0.0
     */
    public function hasAnyVersionInstalled(): bool
    {
        return ($this->freePlugin && $this->freePlugin->isInstalled()) ||
               ($this->proPlugin && $this->proPlugin->isInstalled());
    }

    /**
     * Checks if any version is active.
     *
     * @return bool True if any version is active, false otherwise.
     * @since 1.0.0
     */
    public function hasAnyVersionActive(): bool
    {
        return ($this->freePlugin && $this->freePlugin->isActive()) ||
               ($this->proPlugin && $this->proPlugin->isActive());
    }

    /**
     * Checks if there are conflicting installations.
     *
     * @return bool True if there are conflicting installations, false otherwise.
     * @since 1.0.0
     */
    public function hasConflictingInstallations(): bool
    {
        return ($this->freePlugin && $this->freePlugin->isInstalled()) &&
               ($this->proPlugin && $this->proPlugin->isInstalled());
    }

    /**
     * Sets the icon path of the plugin family.
     *
     * @param string $iconPath The icon path of the plugin family.
     * @return self The plugin family.
     * @since 1.0.0
     */
    public function setIconPath(string $iconPath): self
    {
        $this->iconFileName = $iconPath;
        return $this;
    }

    /**
     * Sets the description of the plugin family.
     *
     * @param string $description The description of the plugin family.
     * @return self The plugin family.
     * @since 1.0.0
     */
    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }

    /**
     * Sets the changelog URL of the plugin family.
     *
     * @param string $changelogUrl The changelog URL of the plugin family.
     * @return self The plugin family.
     * @since 1.0.0
     */
    public function setChangelogUrl(string $changelogUrl): self
    {
        $this->changelogUrl = $changelogUrl;
        return $this;
    }

    /**
     * Sets the free plugin of the plugin family.
     *
     * @param PluginInterface $freePlugin The free plugin of the plugin family.
     * @return self The plugin family.
     * @since 1.0.0
     */
    public function setFreePlugin(PluginInterface $freePlugin): self
    {
        $this->freePlugin = $freePlugin;
        return $this;
    }

    /**
     * Sets the pro plugin of the plugin family.
     *
     * @param ProPluginInterface $proPlugin The pro plugin of the plugin family.
     * @return self The plugin family.
     * @since 1.0.0
     */
    public function setProPlugin(ProPluginInterface $proPlugin): self
    {
        $this->proPlugin = $proPlugin;
        return $this;
    }

    /**
     * Gets the installed plugin of the plugin family.
     *
     * @return PluginInterface|null The installed plugin of the plugin family.
     * @since 1.0.0
     */
    public function getInstalledPlugin(): ?PluginInterface
    {
        if ($this->freePlugin && $this->freePlugin->isInstalled()) {
            return $this->freePlugin;
        }

        if ($this->proPlugin && $this->proPlugin->isInstalled()) {
            return $this->proPlugin;
        }

        return null;
    }
}
