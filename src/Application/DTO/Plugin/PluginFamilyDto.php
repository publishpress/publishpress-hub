<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\DTO\Plugin;

use PublishPress\Hub\Application\Contract\DtoInterface;

/**
 * Plugin Family Data Transfer Object for REST API responses.
 *
 * @since 1.0.0
 */
class PluginFamilyDto implements DtoInterface
{
    /**
     * @since 1.0.0
     */
    private string $name;

    /**
     * @since 1.0.0
     */
    private string $slug;

    /**
     * @since 1.0.0
     */
    private string $iconPath;

    /**
     * @since 1.0.0
     */
    private string $description;

    /**
     * @since 1.0.0
     */
    private string $changelogUrl;

    /**
     * @since 1.0.0
     */
    private string $freePluginName;

    /**
     * @since 1.0.0
     */
    private string $freePluginSlug;

    /**
     * @since 1.0.0
     */
    private ?string $freePluginVersion;

    /**
     * @since 1.0.0
     */
    private string $freePluginDetailsUrl;

    /**
     * @since 1.0.0
     */
    private bool $freePluginIsInstalled;

    /**
     * @since 1.0.0
     */
    private bool $freePluginIsActive;

    /**
     * @since 1.0.0
     */
    private ?string $freePluginPath;

    /**
     * @since 1.0.0
     */
    private string $proPluginName;

    /**
     * @since 1.0.0
     */
    private string $proPluginSlug;

    /**
     * @since 1.0.0
     */
    private ?string $proPluginVersion;

    /**
     * @since 1.0.0
     */
    private string $proPluginDetailsUrl;

    /**
     * @since 1.0.0
     */
    private bool $proPluginIsInstalled;

    /**
     * @since 1.0.0
     */
    private bool $proPluginIsLicensed;

    /**
     * @since 1.0.0
     */
    private bool $proPluginIsActive;

    /**
     * @since 1.0.0
     */
    private ?string $proPluginPath;

    /**
     * @since 1.0.0
     */
    private bool $hasAnyVersionInstalled;

    /**
     * @since 1.0.0
     */
    private bool $hasAnyVersionActive;

    /**
     * @since 1.0.0
     */
    private bool $hasConflictingInstallations;

    /**
     * @return array
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
            ],
        ];
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

    public function setIconPath(string $iconPath): self
    {
        $this->iconPath = $iconPath;
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

    public function setFreePluginName(string $freePluginName): self
    {
        $this->freePluginName = $freePluginName;
        return $this;
    }

    public function setFreePluginSlug(string $freePluginSlug): self
    {
        $this->freePluginSlug = $freePluginSlug;
        return $this;
    }

    public function setFreePluginVersion(?string $freePluginVersion): self
    {
        $this->freePluginVersion = $freePluginVersion;
        return $this;
    }

    public function setFreePluginDetailsUrl(string $freePluginDetailsUrl): self
    {
        $this->freePluginDetailsUrl = $freePluginDetailsUrl;
        return $this;
    }

    public function setFreePluginIsInstalled(bool $freePluginIsInstalled): self
    {
        $this->freePluginIsInstalled = $freePluginIsInstalled;
        return $this;
    }

    public function setFreePluginIsActive(bool $freePluginIsActive): self
    {
        $this->freePluginIsActive = $freePluginIsActive;
        return $this;
    }

    public function setFreePluginPath(?string $freePluginPath): self
    {
        $this->freePluginPath = $freePluginPath;
        return $this;
    }

    public function setProPluginName(string $proPluginName): self
    {
        $this->proPluginName = $proPluginName;
        return $this;
    }

    public function setProPluginSlug(string $proPluginSlug): self
    {
        $this->proPluginSlug = $proPluginSlug;
        return $this;
    }

    public function setProPluginVersion(?string $proPluginVersion): self
    {
        $this->proPluginVersion = $proPluginVersion;
        return $this;
    }

    public function setProPluginDetailsUrl(string $proPluginDetailsUrl): self
    {
        $this->proPluginDetailsUrl = $proPluginDetailsUrl;
        return $this;
    }

    public function setProPluginIsInstalled(bool $proPluginIsInstalled): self
    {
        $this->proPluginIsInstalled = $proPluginIsInstalled;
        return $this;
    }

    public function setProPluginIsActive(bool $proPluginIsActive): self
    {
        $this->proPluginIsActive = $proPluginIsActive;
        return $this;
    }

    public function setProPluginIsLicensed(bool $proPluginIsLicensed): self
    {
        $this->proPluginIsLicensed = $proPluginIsLicensed;
        return $this;
    }

    public function setProPluginPath(?string $proPluginPath): self
    {
        $this->proPluginPath = $proPluginPath;
        return $this;
    }

    public function setIsAnyVersionInstalled(bool $hasAnyVersionInstalled): self
    {
        $this->hasAnyVersionInstalled = $hasAnyVersionInstalled;
        return $this;
    }

    public function setIsAnyVersionActive(bool $hasAnyVersionActive): self
    {
        $this->hasAnyVersionActive = $hasAnyVersionActive;
        return $this;
    }

    public function setHasConflictingInstallations(bool $hasConflictingInstallations): self
    {
        $this->hasConflictingInstallations = $hasConflictingInstallations;
        return $this;
    }
}
