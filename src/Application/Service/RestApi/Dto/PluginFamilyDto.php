<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\RestApi\Dto;

use PublishPress\Hub\Application\Service\RestApi\Contracts\DtoInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginFamilyInterface;

/**
 * Plugin Family Data Transfer Object for REST API responses.
 *
 * @since 1.0.0
 */
class PluginFamilyDto implements DtoInterface
{
    /**
     * The name of the plugin family.
     *
     * @since 1.0.0
     * @var string
     */
    private string $name;

    /**
     * The slug of the plugin family.
     *
     * @since 1.0.0
     * @var string
     */
    private string $slug;

    /**
     * The icon path of the plugin family.
     *
     * @since 1.0.0
     * @var string
     */
    private string $iconPath;

    /**
     * The description of the plugin family.
     *
     * @since 1.0.0
     * @var string
     */
    private string $description;

    /**
     * The changelog URL of the plugin family.
     *
     * @since 1.0.0
     * @var string
     */
    private string $changelogUrl;

    /**
     * The name of the free plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $freePluginName;

    /**
     * The slug of the free plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $freePluginSlug;

    /**
     * The version of the free plugin.
     *
     * @since 1.0.0
     * @var string|null
     */
    private ?string $freePluginVersion;

    /**
     * The details URL of the free plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $freePluginDetailsUrl;

    /**
     * Whether the free plugin is installed.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $freePluginIsInstalled;

    /**
     * Whether the free plugin is active.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $freePluginIsActive;

    /**
     * The relative path to the free plugin.
     *
     * @since 1.0.0
     * @var string|null
     */
    private ?string $freePluginPath;

    /**
     * The name of the pro plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $proPluginName;

    /**
     * The slug of the pro plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $proPluginSlug;

    /**
     * The version of the pro plugin.
     *
     * @since 1.0.0
     * @var string|null
     */
    private ?string $proPluginVersion;

    /**
     * The details URL of the pro plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $proPluginDetailsUrl;

    /**
     * Whether the pro plugin is installed.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $proPluginIsInstalled;

    /**
     * Whether the pro plugin is licensed.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $proPluginIsLicensed;

    /**
     * Whether the pro plugin is active.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $proPluginIsActive;

    /**
     * The relative path to the pro plugin.
     *
     * @since 1.0.0
     * @var string|null
     */
    private ?string $proPluginPath;

    /**
     * Whether any version of the plugin family is installed.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $hasAnyVersionInstalled;

    /**
     * Whether any version of the plugin family is active.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $hasAnyVersionActive;

    /**
     * Whether the plugin family has conflicting installations.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $hasConflictingInstallations;

    /**
     * Convert to array for JSON serialization.
     *
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

    /**
     * Set the name of the plugin family.
     *
     * @param string $name
     * @return self
     */
    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Set the slug of the plugin family.
     *
     * @param string $slug
     * @return self
     */
    public function setSlug(string $slug): self
    {
        $this->slug = $slug;
        return $this;
    }

    /**
     * Set the icon path of the plugin family.
     *
     * @param string $iconPath
     * @return self
     */
    public function setIconPath(string $iconPath): self
    {
        $this->iconPath = $iconPath;
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
        $this->description = $description;
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
        $this->changelogUrl = $changelogUrl;
        return $this;
    }

    /**
     * Set the name of the free plugin.
     *
     * @param string $freePluginName
     * @return self
     */
    public function setFreePluginName(string $freePluginName): self
    {
        $this->freePluginName = $freePluginName;
        return $this;
    }

    /**
     * Set the slug of the free plugin.
     *
     * @param string $freePluginSlug
     * @return self
     */
    public function setFreePluginSlug(string $freePluginSlug): self
    {
        $this->freePluginSlug = $freePluginSlug;
        return $this;
    }

    /**
     * Set the version of the free plugin.
     *
     * @param string|null $freePluginVersion
     * @return self
     */
    public function setFreePluginVersion(?string $freePluginVersion): self
    {
        $this->freePluginVersion = $freePluginVersion;
        return $this;
    }

    /**
     * Set the details URL of the free plugin.
     *
     * @param string $freePluginDetailsUrl
     * @return self
     */
    public function setFreePluginDetailsUrl(string $freePluginDetailsUrl): self
    {
        $this->freePluginDetailsUrl = $freePluginDetailsUrl;
        return $this;
    }

    /**
     * Set whether the free plugin is installed.
     *
     * @param bool $freePluginIsInstalled
     * @return self
     */
    public function setFreePluginIsInstalled(bool $freePluginIsInstalled): self
    {
        $this->freePluginIsInstalled = $freePluginIsInstalled;
        return $this;
    }

    /**
     * Set whether the free plugin is active.
     *
     * @param bool $freePluginIsActive
     * @return self
     */
    public function setFreePluginIsActive(bool $freePluginIsActive): self
    {
        $this->freePluginIsActive = $freePluginIsActive;
        return $this;
    }

    /**
     * Set the path to the free plugin.
     *
     * @param string|null $freePluginPath
     * @return self
     */
    public function setFreePluginPath(?string $freePluginPath): self
    {
        $this->freePluginPath = $freePluginPath;
        return $this;
    }

    /**
     * Set the name of the pro plugin.
     *
     * @param string $proPluginName
     * @return self
     */
    public function setProPluginName(string $proPluginName): self
    {
        $this->proPluginName = $proPluginName;
        return $this;
    }

    /**
     * Set the slug of the pro plugin.
     *
     * @param string $proPluginSlug
     * @return self
     */
    public function setProPluginSlug(string $proPluginSlug): self
    {
        $this->proPluginSlug = $proPluginSlug;
        return $this;
    }

    /**
     * Set the version of the pro plugin.
     *
     * @param string|null $proPluginVersion
     * @return self
     */
    public function setProPluginVersion(?string $proPluginVersion): self
    {
        $this->proPluginVersion = $proPluginVersion;
        return $this;
    }

    /**
     * Set the details URL of the pro plugin.
     *
     * @param string $proPluginDetailsUrl
     * @return self
     */
    public function setProPluginDetailsUrl(string $proPluginDetailsUrl): self
    {
        $this->proPluginDetailsUrl = $proPluginDetailsUrl;
        return $this;
    }

    /**
     * Set whether the pro plugin is installed.
     *
     * @param bool $proPluginIsInstalled
     * @return self
     */
    public function setProPluginIsInstalled(bool $proPluginIsInstalled): self
    {
        $this->proPluginIsInstalled = $proPluginIsInstalled;
        return $this;
    }

    /**
     * Set whether the pro plugin is active.
     *
     * @param bool $proPluginIsActive
     * @return self
     */
    public function setProPluginIsActive(bool $proPluginIsActive): self
    {
        $this->proPluginIsActive = $proPluginIsActive;
        return $this;
    }

    /**
     * Set whether the pro plugin is licensed.
     *
     * @param bool $proPluginIsLicensed
     * @return self
     */
    public function setProPluginIsLicensed(bool $proPluginIsLicensed): self
    {
        $this->proPluginIsLicensed = $proPluginIsLicensed;
        return $this;
    }

    /**
     * Set the path to the pro plugin.
     *
     * @param string|null $proPluginPath
     * @return self
     */
    public function setProPluginPath(?string $proPluginPath): self
    {
        $this->proPluginPath = $proPluginPath;
        return $this;
    }

    /**
     * Set whether any version of the plugin family is installed.
     *
     * @param bool $hasAnyVersionInstalled
     * @return self
     */
    public function setIsAnyVersionInstalled(bool $hasAnyVersionInstalled): self
    {
        $this->hasAnyVersionInstalled = $hasAnyVersionInstalled;
        return $this;
    }

    /**
     * Set whether any version of the plugin family is active.
     *
     * @param bool $hasAnyVersionActive
     * @return self
     */
    public function setIsAnyVersionActive(bool $hasAnyVersionActive): self
    {
        $this->hasAnyVersionActive = $hasAnyVersionActive;
        return $this;
    }

    /**
     * Set whether the plugin family has conflicting installations.
     *
     * @param bool $hasConflictingInstallations
     * @return self
     */
    public function setHasConflictingInstallations(bool $hasConflictingInstallations): self
    {
        $this->hasConflictingInstallations = $hasConflictingInstallations;
        return $this;
    }
}
