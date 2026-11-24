<?php

/**
 * Pro plugin entity.
 *
 * @package PublishPress\Hub\Domain\Plugin\Entity
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Entity;

use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\ProPluginInterface;
use PublishPress\Hub\Domain\Plugin\ValueObject\PluginState;

\defined('ABSPATH') || exit;

/**
 * Pro plugin entity.
 * Uses composition with PluginState value object for better Clean Code practices.
 *
 * Business Rules:
 * - Pro plugins require a valid license key for updates
 * - Each pro plugin has a unique downloadId that identifies it in the EDD system
 * - Licensed status determines whether plugin can receive updates from license server
 *
 * @since 1.0.0
 */
class ProPlugin implements ProPluginInterface
{
    private PluginState $state;

    // Download ID uniquely identifies this product in the EDD Software Licensing system
    // This is required for license activation, version checks, and update downloads
    private int $downloadId = 0;

    /**
     * @param string $name The name of the plugin.
     * @param string $slug The slug of the plugin.
     * @param string $fileName The file name of the plugin.
     * @param string $detailsUrl The details URL of the plugin.
     * @param int $downloadId The download ID of the plugin.
     * @since 1.0.0
     */
    public function __construct(
        string $name,
        string $slug,
        string $fileName,
        string $detailsUrl,
        int $downloadId
    ) {
        $this->state = new PluginState($name, $slug, $fileName, $detailsUrl);
        $this->downloadId = $downloadId;
    }

    /**
     * Gets the name of the plugin.
     *
     * @return string The name of the plugin.
     * @since 1.0.0
     */
    public function getName(): string
    {
        return $this->state->getName();
    }

    /**
     * Gets the slug of the plugin.
     *
     * @return string The slug of the plugin.
     * @since 1.0.0
     */
    public function getSlug(): string
    {
        return $this->state->getSlug();
    }

    /**
     * Gets the version of the plugin.
     *
     * @return string The version of the plugin.
     * @since 1.0.0
     */
    public function getVersion(): string
    {
        return $this->state->getVersion();
    }

    /**
     * Gets the path of the plugin.
     *
     * @return string The path of the plugin.
     * @since 1.0.0
     */
    public function getPath(): string
    {
        return $this->state->getPath();
    }

    /**
     * Gets the file name of the plugin.
     *
     * @return string The file name of the plugin.
     * @since 1.0.0
     */
    public function getFileName(): string
    {
        return $this->state->getFileName();
    }

    /**
     * Gets the details URL of the plugin.
     *
     * @return string The details URL of the plugin.
     * @since 1.0.0
     */
    public function getDetailsUrl(): string
    {
        return $this->state->getDetailsUrl();
    }

    /**
     * Gets the family of the plugin.
     *
     * @return PluginFamilyInterface|null The family of the plugin.
     * @since 1.0.0
     */
    public function getFamily(): ?PluginFamilyInterface
    {
        return $this->state->getFamily();
    }

    /**
     * Gets the download ID of the plugin.
     *
     * @return int The download ID of the plugin.
     * @since 1.0.0
     */
    public function getDownloadId(): int
    {
        return $this->downloadId;
    }

    /**
     * Checks if the plugin is installed.
     *
     * @return bool True if the plugin is installed, false otherwise.
     * @since 1.0.0
     */
    public function isInstalled(): bool
    {
        return $this->state->isInstalled();
    }

    /**
     * Checks if the plugin is active.
     *
     * @return bool True if the plugin is active, false otherwise.
     * @since 1.0.0
     */
    public function isActive(): bool
    {
        return $this->state->isActive();
    }

    /**
     * Checks if the plugin is licensed.
     *
     * @return bool True if the plugin is licensed, false otherwise.
     * @since 1.0.0
     */
    public function isLicensed(): bool
    {
        // Returns whether plugin has a valid license key stored
        // This is critical for determining if plugin can receive updates
        // Note: This only checks if key exists, not if it's valid/active on server
        return $this->state->isLicensed();
    }

    /**
     * Sets the installed status of the plugin.
     *
     * @param bool $installed The installed status of the plugin.
     * @param string|null $version The version of the plugin.
     * @param string|null $filePath The file path of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setInstalled(bool $installed, ?string $version = null, ?string $filePath = null): self
    {
        // Update installation status with version and file path
        // Version is used for update checks to determine if newer version is available
        // FilePath is required for plugin activation/deactivation operations
        $this->state = $this->state->withInstalled($installed, $version, $filePath);
        return $this;
    }

    /**
     * Sets the active status of the plugin.
     *
     * @param bool $active The active status of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setActive(bool $active): self
    {
        $this->state = $this->state->withActive($active);
        return $this;
    }

    /**
     * Sets the licensed status of the plugin.
     *
     * @param bool $licensed The licensed status of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setLicensed(bool $licensed): self
    {
        // Update licensed status when license key is added or removed
        // Setting to true enables update checks from license server
        // Setting to false prevents unauthorized access to premium updates
        $this->state = $this->state->withLicensed($licensed);
        return $this;
    }

    /**
     * Sets the name of the plugin.
     *
     * @param string $name The name of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setName(string $name): self
    {
        $this->state = $this->state->withName($name);
        return $this;
    }

    /**
     * Sets the slug of the plugin.
     *
     * @param string $slug The slug of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setSlug(string $slug): self
    {
        $this->state = $this->state->withSlug($slug);
        return $this;
    }

    /**
     * Sets the file name of the plugin.
     *
     * @param string $fileName The file name of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setFileName(string $fileName): self
    {
        $this->state = $this->state->withFileName($fileName);
        return $this;
    }

    /**
     * Sets the details URL of the plugin.
     *
     * @param string $detailsUrl The details URL of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setDetailsUrl(string $detailsUrl): self
    {
        $this->state = $this->state->withDetailsUrl($detailsUrl);
        return $this;
    }

    /**
     * Sets the family of the plugin.
     *
     * @param PluginFamilyInterface $family The family of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setFamily(PluginFamilyInterface $family): self
    {
        $this->state = $this->state->withFamily($family);
        return $this;
    }

    /**
     * Sets the download ID of the plugin.
     *
     * @param int $downloadId The download ID of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setDownloadId(int $downloadId): self
    {
        $this->downloadId = $downloadId;
        return $this;
    }
}
