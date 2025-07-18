<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\ValueObject;

use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;

/**
 * Value object representing plugin state.
 * Provides true composition and immutability.
 *
 * @since 1.0.0
 */
class PluginState
{
    private string $name;
    private string $slug;
    private string $fileName;
    private string $detailsUrl;
    private ?PluginFamilyInterface $family;

    // State properties
    private bool $installed;
    private bool $active;
    private bool $licensed;
    private string $version;
    private string $path;

    public function __construct(
        string $name,
        string $slug,
        string $fileName,
        string $detailsUrl,
        ?PluginFamilyInterface $family = null,
        bool $installed = false,
        bool $active = false,
        bool $licensed = false,
        string $version = '',
        string $path = ''
    ) {
        $this->name = $name;
        $this->slug = $slug;
        $this->fileName = $fileName;
        $this->detailsUrl = $detailsUrl;
        $this->family = $family;
        $this->installed = $installed;
        $this->active = $active;
        $this->licensed = $licensed;
        $this->version = $version;
        $this->path = $path ?: $slug . '/' . $fileName;
    }

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

    // Immutable setters that return new instances
    public function withInstalled(bool $installed, ?string $version = null, ?string $filePath = null): self
    {
        return new self(
            $this->name,
            $this->slug,
            $this->fileName,
            $this->detailsUrl,
            $this->family,
            $installed,
            $this->active,
            $this->licensed,
            $version ?? $this->version,
            $filePath ?? $this->path
        );
    }

    public function withActive(bool $active): self
    {
        return new self(
            $this->name,
            $this->slug,
            $this->fileName,
            $this->detailsUrl,
            $this->family,
            $this->installed,
            $active,
            $this->licensed,
            $this->version,
            $this->path
        );
    }

    public function withLicensed(bool $licensed): self
    {
        return new self(
            $this->name,
            $this->slug,
            $this->fileName,
            $this->detailsUrl,
            $this->family,
            $this->installed,
            $this->active,
            $licensed,
            $this->version,
            $this->path
        );
    }

    public function withName(string $name): self
    {
        return new self(
            $name,
            $this->slug,
            $this->fileName,
            $this->detailsUrl,
            $this->family,
            $this->installed,
            $this->active,
            $this->licensed,
            $this->version,
            $this->path
        );
    }

    public function withSlug(string $slug): self
    {
        return new self(
            $this->name,
            $slug,
            $this->fileName,
            $this->detailsUrl,
            $this->family,
            $this->installed,
            $this->active,
            $this->licensed,
            $this->version,
            $slug . '/' . $this->fileName
        );
    }

    public function withFileName(string $fileName): self
    {
        return new self(
            $this->name,
            $this->slug,
            $fileName,
            $this->detailsUrl,
            $this->family,
            $this->installed,
            $this->active,
            $this->licensed,
            $this->version,
            $this->slug . '/' . $fileName
        );
    }

    public function withDetailsUrl(string $detailsUrl): self
    {
        return new self(
            $this->name,
            $this->slug,
            $this->fileName,
            $detailsUrl,
            $this->family,
            $this->installed,
            $this->active,
            $this->licensed,
            $this->version,
            $this->path
        );
    }

    public function withFamily(PluginFamilyInterface $family): self
    {
        return new self(
            $this->name,
            $this->slug,
            $this->fileName,
            $this->detailsUrl,
            $family,
            $this->installed,
            $this->active,
            $this->licensed,
            $this->version,
            $this->path
        );
    }
}
