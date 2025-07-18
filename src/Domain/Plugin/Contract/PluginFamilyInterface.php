<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Contract;

interface PluginFamilyInterface
{
    public function getIconPath(): string;

    public function getDescription(): ?string;

    public function getChangelogUrl(): string;

    public function getInstalledPlugins(): ?array;

    public function getFreePlugin(): PluginInterface;

    public function getProPlugin(): ProPluginInterface;

    public function getName(): string;

    public function getSlug(): string;

    public function hasAnyVersionInstalled(): bool;

    public function hasAnyVersionActive(): bool;

    public function hasConflictingInstallations(): bool;

    public function setIconPath(string $iconPath): self;

    public function setDescription(string $description): self;

    public function setChangelogUrl(string $changelogUrl): self;
}
