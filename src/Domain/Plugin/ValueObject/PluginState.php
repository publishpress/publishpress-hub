<?php

/**
 * Plugin state value object
 *
 * @package PublishPress\Hub\Domain\Plugin\ValueObject
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\ValueObject;
defined( 'ABSPATH' ) || exit;

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

    /**
     * @param string $name
     * @param string $slug
     * @param string $fileName
     * @param string $detailsUrl
     * @param mixed $family
     * @param bool $installed
     * @param bool $active
     * @param bool $licensed
     * @param string $version
     * @param string $path
     */
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

    /**
     * Get the name of the plugin.
     *
     * @return string The name of the plugin.
     * @since 1.0.0
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Get the slug of the plugin.
     *
     * @return string The slug of the plugin.
     * @since 1.0.0
     */
    public function getSlug(): string
    {
        return $this->slug;
    }

    /**
     * Get the version of the plugin.
     *
     * @return string The version of the plugin.
     * @since 1.0.0
     */
    public function getVersion(): string
    {
        return $this->version;
    }

    /**
     * Get the path of the plugin.
     *
     * @return string The path of the plugin.
     * @since 1.0.0
     */
    public function getPath(): string
    {
        return $this->path;
    }

    /**
     * Get the file name of the plugin.
     *
     * @return string The file name of the plugin.
     * @since 1.0.0
     */
    public function getFileName(): string
    {
        return $this->fileName;
    }

    /**
     * Get the details URL of the plugin.
     *
     * @return string The details URL of the plugin.
     * @since 1.0.0
     */
    public function getDetailsUrl(): string
    {
        return $this->detailsUrl;
    }

    /**
     * Get the family of the plugin.
     *
     * @return PluginFamilyInterface|null The family of the plugin, or null if not set.
     * @since 1.0.0
     */
    public function getFamily(): ?PluginFamilyInterface
    {
        return $this->family;
    }

    /**
     * Check if the plugin is installed.
     *
     * @return bool True if the plugin is installed, false otherwise.
     * @since 1.0.0
     */
    public function isInstalled(): bool
    {
        return $this->installed;
    }

    /**
     * Check if the plugin is active.
     *
     * @return bool True if the plugin is active, false otherwise.
     * @since 1.0.0
     */
    public function isActive(): bool
    {
        return $this->active;
    }

    /**
     * Check if the plugin is licensed.
     *
     * @return bool True if the plugin is licensed, false otherwise.
     * @since 1.0.0
     */
    public function isLicensed(): bool
    {
        return $this->licensed;
    }

    /**
     * Create a new instance with the installed state set to the given value.
     *
     * @param bool $installed The new installed state.
     * @param string|null $version The new version.
     * @param string|null $filePath The new file path.
     * @return self A new instance with the installed state set to the given value.
     * @since 1.0.0
     */
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

    /**
     * Create a new instance with the active state set to the given value.
     *
     * @param bool $active The new active state.
     * @return self A new instance with the active state set to the given value.
     * @since 1.0.0
     */
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

    /**
     * Create a new instance with the licensed state set to the given value.
     *
     * @param bool $licensed The new licensed state.
     * @return self A new instance with the licensed state set to the given value.
     * @since 1.0.0
     */
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

    /**
     * Create a new instance with the name set to the given value.
     *
     * @param string $name The new name.
     * @return self A new instance with the name set to the given value.
     * @since 1.0.0
     */
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

    /**
     * Create a new instance with the slug set to the given value.
     *
     * @param string $slug The new slug.
     * @return self A new instance with the slug set to the given value.
     * @since 1.0.0
     */
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
            "{$slug}/{$this->fileName}"
        );
    }

    /**
     * Create a new instance with the file name set to the given value.
     *
     * @param string $fileName The new file name.
     * @return self A new instance with the file name set to the given value.
     * @since 1.0.0
     */
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
            "{$this->slug}/$fileName"
        );
    }

    /**
     * Create a new instance with the details URL set to the given value.
     *
     * @param string $detailsUrl The new details URL.
     * @return self A new instance with the details URL set to the given value.
     * @since 1.0.0
     */
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

    /**
     * Create a new instance with the family set to the given value.
     *
     * @param PluginFamilyInterface $family The new family.
     * @return self A new instance with the family set to the given value.
     * @since 1.0.0
     */
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
