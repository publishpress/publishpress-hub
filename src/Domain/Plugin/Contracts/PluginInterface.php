<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Contracts;

interface PluginInterface
{
    public function getName(): string;

    public function getSlugFree(): string;

    public function getSlugPro(): string;

    public function getVersion(): ?string;

    public function getPath(): ?string;

    public function getIconFile(): ?string;

    public function getDescription(): ?string;

    public function getPluginFileNameFree(): string;

    public function getPluginFileNamePro(): string;

    public function isInstalled(): bool;

    public function isActive(): bool;

    public function isLicensed(): bool;

    public function isPro(): bool;

    public function isNewerThan(PluginInterface $other): bool;

    public function isSamePlugin(PluginInterface $other): bool;

    public function register(string $version, string $filePath, $isPro = false): void;

    public function clearCache(): void;
}
