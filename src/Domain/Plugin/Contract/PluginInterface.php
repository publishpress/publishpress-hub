<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Contract;

/**
 * @since 1.0.0
 */
interface PluginInterface
{
    public function getName(): string;

    public function getSlug(): string;

    public function getVersion(): string;

    public function getPath(): string;

    public function getFileName(): string;

    public function getDetailsUrl(): string;

    public function getFamily(): ?PluginFamilyInterface;

    public function isInstalled(): bool;

    public function isActive(): bool;

    public function isLicensed(): bool;

    public function setInstalled(bool $installed, ?string $version = null, ?string $filePath = null): self;

    public function setActive(bool $active): self;

    public function setLicensed(bool $licensed): self;

    public function setName(string $name): self;

    public function setSlug(string $slug): self;

    public function setFileName(string $fileName): self;

    public function setDetailsUrl(string $detailsUrl): self;

    public function setFamily(PluginFamilyInterface $family): self;
}
