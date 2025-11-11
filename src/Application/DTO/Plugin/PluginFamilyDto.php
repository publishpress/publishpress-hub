<?php

/**
 * Plugin Family Data Transfer Object for REST API responses.
 *
 * @package PublishPress\Hub\Application\DTO\Plugin
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\DTO\Plugin;

use PublishPress\Hub\Application\Contract\DtoInterface;

class PluginFamilyDto implements DtoInterface
{
    private string $name;
    private string $slug;
    private string $iconPath;
    private string $description;
    private string $changelogUrl;
    private string $freePluginName;
    private string $freePluginSlug;
    private ?string $freePluginVersion;
    private string $freePluginDetailsUrl;
    private bool $freePluginIsInstalled;
    private bool $freePluginIsActive;
    private ?string $freePluginPath;
    private string $proPluginName;
    private string $proPluginSlug;
    private ?string $proPluginVersion;
    private string $proPluginDetailsUrl;
    private bool $proPluginIsInstalled;
    private bool $proPluginIsLicensed;
    private bool $proPluginIsActive;
    private ?string $proPluginPath;
    private ?string $proPluginLicenseExpirationDate;
    private bool $hasAnyVersionInstalled;
    private bool $hasAnyVersionActive;
    private bool $hasConflictingInstallations;

    /**
     * Converts the plugin family data to an associative array for API responses.
     *
     * @since 1.0.0
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'slug' => $this->slug,
            'iconPath' => $this->iconPath,
            'description' => $this->description,
            'changelogUrl' => $this->changelogUrl,
            'hasAnyVersionInstalled' => $this->hasAnyVersionInstalled,
            'hasAnyVersionActive' => $this->hasAnyVersionActive,
            'hasConflictingInstallations' => $this->hasConflictingInstallations,
            'freePlugin' => [
                'name' => $this->freePluginName,
                'slug' => $this->freePluginSlug,
                'version' => $this->freePluginVersion,
                'detailsUrl' => $this->freePluginDetailsUrl,
                'isInstalled' => $this->freePluginIsInstalled,
                'isActive' => $this->freePluginIsActive,
                'path' => $this->freePluginPath,
            ],
            'proPlugin' => [
                'name' => $this->proPluginName,
                'slug' => $this->proPluginSlug,
                'version' => $this->proPluginVersion,
                'detailsUrl' => $this->proPluginDetailsUrl,
                'isInstalled' => $this->proPluginIsInstalled,
                'isActive' => $this->proPluginIsActive,
                'isLicensed' => $this->proPluginIsLicensed,
                'path' => $this->proPluginPath,
                'licenseExpirationDate' => $this->proPluginLicenseExpirationDate,
            ],
        ];
    }

    /**
     * @since 1.0.0
     */
    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setSlug(string $slug): self
    {
        $this->slug = $slug;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setIconPath(string $iconPath): self
    {
        $this->iconPath = $iconPath;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setChangelogUrl(string $changelogUrl): self
    {
        $this->changelogUrl = $changelogUrl;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setFreePluginName(string $freePluginName): self
    {
        $this->freePluginName = $freePluginName;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setFreePluginSlug(string $freePluginSlug): self
    {
        $this->freePluginSlug = $freePluginSlug;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setFreePluginVersion(?string $freePluginVersion): self
    {
        $this->freePluginVersion = $freePluginVersion;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setFreePluginDetailsUrl(string $freePluginDetailsUrl): self
    {
        $this->freePluginDetailsUrl = $freePluginDetailsUrl;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setFreePluginIsInstalled(bool $freePluginIsInstalled): self
    {
        $this->freePluginIsInstalled = $freePluginIsInstalled;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setFreePluginIsActive(bool $freePluginIsActive): self
    {
        $this->freePluginIsActive = $freePluginIsActive;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setFreePluginPath(?string $freePluginPath): self
    {
        $this->freePluginPath = $freePluginPath;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setProPluginName(string $proPluginName): self
    {
        $this->proPluginName = $proPluginName;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setProPluginSlug(string $proPluginSlug): self
    {
        $this->proPluginSlug = $proPluginSlug;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setProPluginVersion(?string $proPluginVersion): self
    {
        $this->proPluginVersion = $proPluginVersion;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setProPluginDetailsUrl(string $proPluginDetailsUrl): self
    {
        $this->proPluginDetailsUrl = $proPluginDetailsUrl;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setProPluginIsInstalled(bool $proPluginIsInstalled): self
    {
        $this->proPluginIsInstalled = $proPluginIsInstalled;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setProPluginIsActive(bool $proPluginIsActive): self
    {
        $this->proPluginIsActive = $proPluginIsActive;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setProPluginIsLicensed(bool $proPluginIsLicensed): self
    {
        $this->proPluginIsLicensed = $proPluginIsLicensed;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setProPluginPath(?string $proPluginPath): self
    {
        $this->proPluginPath = $proPluginPath;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setProPluginLicenseExpirationDate(?string $proPluginLicenseExpirationDate): self
    {
        $this->proPluginLicenseExpirationDate = $proPluginLicenseExpirationDate;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setIsAnyVersionInstalled(bool $hasAnyVersionInstalled): self
    {
        $this->hasAnyVersionInstalled = $hasAnyVersionInstalled;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setIsAnyVersionActive(bool $hasAnyVersionActive): self
    {
        $this->hasAnyVersionActive = $hasAnyVersionActive;
        return $this;
    }

    /**
     * @since 1.0.0
     */
    public function setHasConflictingInstallations(bool $hasConflictingInstallations): self
    {
        $this->hasConflictingInstallations = $hasConflictingInstallations;
        return $this;
    }
}
