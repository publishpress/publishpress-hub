<?php

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

    public function getName(): string
    {
        return $this->name;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function getIconPath(): string
    {
        return $this->iconFileName;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function getChangelogUrl(): string
    {
        return $this->changelogUrl;
    }

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

    public function hasAnyVersionInstalled(): bool
    {
        return ($this->freePlugin && $this->freePlugin->isInstalled()) ||
               ($this->proPlugin && $this->proPlugin->isInstalled());
    }

    public function hasAnyVersionActive(): bool
    {
        return ($this->freePlugin && $this->freePlugin->isActive()) ||
               ($this->proPlugin && $this->proPlugin->isActive());
    }

    public function hasConflictingInstallations(): bool
    {
        return ($this->freePlugin && $this->freePlugin->isInstalled()) &&
               ($this->proPlugin && $this->proPlugin->isInstalled());
    }

    public function setIconPath(string $iconPath): self
    {
        $this->iconFileName = $iconPath;
        return $this;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function setChangelogUrl(string $changelogUrl): self
    {
        $this->changelogUrl = $changelogUrl;
        return $this;
    }

    public function setFreePlugin(PluginInterface $freePlugin): self
    {
        $this->freePlugin = $freePlugin;
        return $this;
    }

    public function setProPlugin(ProPluginInterface $proPlugin): self
    {
        $this->proPlugin = $proPlugin;
        return $this;
    }

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
