<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Entity;

use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginInterface;
use PublishPress\Hub\Domain\Plugin\ValueObject\PluginState;

/**
 * Free plugin entity.
 * Uses composition with PluginState value object for better Clean Code practices.
 *
 * @since 1.0.0
 */
class FreePlugin implements PluginInterface
{
    private PluginState $state;

    public function __construct(
        string $name,
        string $slug,
        string $fileName,
        string $detailsUrl
    ) {
        $this->state = new PluginState($name, $slug, $fileName, $detailsUrl);
    }

    public function getName(): string
    {
        return $this->state->getName();
    }

    public function getSlug(): string
    {
        return $this->state->getSlug();
    }

    public function getVersion(): string
    {
        return $this->state->getVersion();
    }

    public function getPath(): string
    {
        return $this->state->getPath();
    }

    public function getFileName(): string
    {
        return $this->state->getFileName();
    }

    public function getDetailsUrl(): string
    {
        return $this->state->getDetailsUrl();
    }

    public function getFamily(): ?PluginFamilyInterface
    {
        return $this->state->getFamily();
    }

    public function isInstalled(): bool
    {
        return $this->state->isInstalled();
    }

    public function isActive(): bool
    {
        return $this->state->isActive();
    }

    public function isLicensed(): bool
    {
        return $this->state->isLicensed();
    }

    public function setInstalled(bool $installed, ?string $version = null, ?string $filePath = null): self
    {
        $this->state = $this->state->withInstalled($installed, $version, $filePath);
        return $this;
    }

    public function setActive(bool $active): self
    {
        $this->state = $this->state->withActive($active);
        return $this;
    }

    public function setLicensed(bool $licensed): self
    {
        $this->state = $this->state->withLicensed($licensed);
        return $this;
    }

    public function setName(string $name): self
    {
        $this->state = $this->state->withName($name);
        return $this;
    }

    public function setSlug(string $slug): self
    {
        $this->state = $this->state->withSlug($slug);
        return $this;
    }

    public function setFileName(string $fileName): self
    {
        $this->state = $this->state->withFileName($fileName);
        return $this;
    }

    public function setDetailsUrl(string $detailsUrl): self
    {
        $this->state = $this->state->withDetailsUrl($detailsUrl);
        return $this;
    }

    public function setFamily(PluginFamilyInterface $family): self
    {
        $this->state = $this->state->withFamily($family);
        return $this;
    }
}
