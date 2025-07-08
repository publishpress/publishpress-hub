<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin;

use PublishPress\Hub\Domain\Plugin\Contracts\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\EddPluginInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\FreePluginInterface;

class PluginFamily implements PluginFamilyInterface
{
    /**
     * The icon file path of the plugin family.
     *
     * @var string
     */
    private string $iconPath;

    /**
     * The description of the plugin family.
     *
     * @var string
     */
    private string $description;

    /**
     * The changelog URL of the plugin family.
     *
     * @var string
     */
    private string $changelogUrl;

    /**
     * The changelog URL of the plugin family.
     * The installed plugins of the plugin family.
     *
     * @var FreePluginInterface[]|null
     */
    private ?array $installedPlugins = null;

    /**
     * The free plugin of the plugin family.
     *
     * @var FreePluginInterface
     */
    private FreePluginInterface $freePlugin;

    /**
     * The pro plugin of the plugin family.
     *
     * @var EddPluginInterface
     */
    private EddPluginInterface $proPlugin;

    /**
     * The constructor of the plugin family.
     *
     * @param string $iconPath
     * @param string $description
     * @param string $changelogUrl
     */
    public function __construct(
        string $iconPath,
        string $description,
        string $changelogUrl
    ) {
        $this->setIconPath($iconPath);
        $this->setDescription($description);
        $this->setChangelogUrl($changelogUrl);
    }

    /**
     * Get the icon file path of the plugin family.
     *
     * @return string
     */
    public function getIconPath(): string
    {
        return $this->iconPath;
    }

    /**
     * Get the description of the plugin family.
     *
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * Get the changelog URL of the plugin family.
     *
     * @return string
     */
    public function getChangelogUrl(): string
    {
        return $this->changelogUrl;
    }

    /**
     * Get the installed plugins of the plugin family.
     *
     * @param bool $forceCheck
     * @return FreePluginInterface[]|null
     */
    public function getInstalledPlugins(bool $forceCheck = false): ?array
    {
        if (! is_null($this->installedPlugins) && ! $forceCheck) {
            return $this->installedPlugins;
        }

        $this->installedPlugins = [];

        if ($this->freePlugin->isInstalled($forceCheck)) {
            $this->installedPlugins[] = $this->freePlugin;
        }
        if ($this->proPlugin->isInstalled($forceCheck)) {
            $this->installedPlugins[] = $this->proPlugin;
        }

        // TODO: Check if we should also look for multiple versions of the same plugin.

        return $this->installedPlugins;
    }

    /**
     * Get the free plugin of the plugin family.
     *
     * @return FreePluginInterface
     */
    public function getFreePlugin(): FreePluginInterface
    {
        return $this->freePlugin;
    }

    /**
     * Get the pro plugin of the plugin family.
     *
     * @return EddPluginInterface
     */
    public function getProPlugin(): EddPluginInterface
    {
        return $this->proPlugin;
    }

    /**
     * Get the name of the plugin family.
     *
     * @return string
     */
    public function getName(): string
    {
        return $this->freePlugin->getName();
    }

    /**
     * Get the slug of the plugin family.
     *
     * @return string
     */
    public function getSlug(): string
    {
        return $this->freePlugin->getSlug();
    }

    /**
     * Check if any version of the plugin family is installed.
     *
     * @param bool $forceCheck
     * @return bool
     */
    public function hasAnyVersionInstalled(bool $forceCheck = false): bool
    {
        return count($this->getInstalledPlugins($forceCheck)) > 0;
    }

    /**
     * Check if any version of the plugin family is active.
     *
     * @param bool $forceCheck
     * @return bool
     */
    public function hasAnyVersionActive(bool $forceCheck = false): bool
    {
        return $this->proPlugin->isActive($forceCheck) || $this->freePlugin->isActive($forceCheck);
    }

    /**
     * Check if the plugin family has conflicting installations.
     *
     * @param bool $forceCheck
     * @return bool
     */
    public function hasConflictingInstallations(bool $forceCheck = false): bool
    {
        return count($this->getInstalledPlugins($forceCheck)) > 1;
    }

    /**
     * Set the icon file path of the plugin family.
     *
     * @param string $iconPath
     * @return self
     */
    public function setIconPath(string $iconPath): self
    {
        $this->iconPath = sanitize_text_field($iconPath);

        return $this;
    }

    /**
     * Set the description of the plugin family.
     *
     * @param string $description
     * @return self
     */
    public function setDescription(string $description): self
    {
        $this->description = sanitize_text_field($description);

        return $this;
    }

    /**
     * Set the changelog URL of the plugin family.
     *
     * @param string $changelogUrl
     * @return self
     */
    public function setChangelogUrl(string $changelogUrl): self
    {
        $this->changelogUrl = esc_url_raw($changelogUrl);

        return $this;
    }

    /**
     * Set the free plugin of the plugin family.
     *
     * @param FreePluginInterface $freePlugin
     * @return self
     */
    public function setFreePlugin(FreePluginInterface $freePlugin): self
    {
        $this->freePlugin = $freePlugin;

        return $this;
    }

    /**
     * Set the pro plugin of the plugin family.
     *
     * @param EddPluginInterface $proPlugin
     * @return self
     */
    public function setProPlugin(EddPluginInterface $proPlugin): self
    {
        $this->proPlugin = $proPlugin;

        return $this;
    }
}
