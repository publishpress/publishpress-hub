<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Entity\Traits;

use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;

/**
 * Trait containing common plugin state functionality.
 * Provides composition-based reuse instead of inheritance.
 *
 * @since 1.0.0
 */
trait PluginStateTrait
{
    protected string $name;
    protected string $slug;
    protected string $fileName;
    protected string $detailsUrl;
    protected ?PluginFamilyInterface $family = null;

    // State properties
    protected bool $installed = false;
    protected bool $active = false;
    protected bool $licensed = false;
    protected string $version = '';
    protected string $path = '';

    public function getName(): string
    {
        return $this->name;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function getVersion(): string
    {
        return $this->version;
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function getFileName(): string
    {
        return $this->fileName;
    }

    public function getDetailsUrl(): string
    {
        return $this->detailsUrl;
    }

    public function getFamily(): ?PluginFamilyInterface
    {
        return $this->family;
    }

    public function isInstalled(): bool
    {
        return $this->installed;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function isLicensed(): bool
    {
        return $this->licensed;
    }

    public function setInstalled(bool $installed, ?string $version = null, ?string $filePath = null): self
    {
        $this->installed = $installed;

        if ($version !== null) {
            $this->version = $version;
        }

        if ($filePath !== null) {
            $this->path = $filePath;
        }

        return $this;
    }

    public function setActive(bool $active): self
    {
        $this->active = $active;
        return $this;
    }

    public function setLicensed(bool $licensed): self
    {
        $this->licensed = $licensed;
        return $this;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;
        return $this;
    }

    public function setFileName(string $fileName): self
    {
        $this->fileName = $fileName;
        return $this;
    }

    public function setDetailsUrl(string $detailsUrl): self
    {
        $this->detailsUrl = $detailsUrl;
        return $this;
    }

    public function setFamily(PluginFamilyInterface $family): self
    {
        $this->family = $family;
        return $this;
    }

    protected function initializePluginState(
        string $name,
        string $slug,
        string $fileName,
        string $detailsUrl
    ): void {
        $this->name = $name;
        $this->slug = $slug;
        $this->fileName = $fileName;
        $this->detailsUrl = $detailsUrl;
        $this->path = $slug . '/' . $fileName;
    }
}
