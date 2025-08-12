<?php

/**
 * Plugin interface.
 *
 * @package PublishPress\Hub\Domain\Plugin\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Contract;

/**
 * @since 1.0.0
 */
interface PluginInterface
{
    /**
     * Gets the name of the plugin.
     *
     * @return string The name of the plugin.
     * @since 1.0.0
     */
    public function getName(): string;

    /**
     * Gets the slug of the plugin.
     *
     * @return string The slug of the plugin.
     * @since 1.0.0
     */
    public function getSlug(): string;

    /**
     * Gets the version of the plugin.
     *
     * @return string The version of the plugin.
     * @since 1.0.0
     */
    public function getVersion(): string;

    /**
     * Gets the path of the plugin.
     *
     * @return string The path of the plugin.
     * @since 1.0.0
     */
    public function getPath(): string;

    /**
     * Gets the file name of the plugin.
     *
     * @return string The file name of the plugin.
     * @since 1.0.0
     */
    public function getFileName(): string;

    /**
     * Gets the details URL of the plugin.
     *
     * @return string The details URL of the plugin.
     * @since 1.0.0
     */
    public function getDetailsUrl(): string;

    /**
     * Gets the family of the plugin.
     *
     * @return PluginFamilyInterface|null The family of the plugin.
     * @since 1.0.0
     */
    public function getFamily(): ?PluginFamilyInterface;

    /**
     * Checks if the plugin is installed.
     *
     * @return bool True if the plugin is installed, false otherwise.
     * @since 1.0.0
     */
    public function isInstalled(): bool;

    /**
     * Checks if the plugin is active.
     *
     * @return bool True if the plugin is active, false otherwise.
     * @since 1.0.0
     */
    public function isActive(): bool;

    /**
     * Checks if the plugin is licensed.
     *
     * @return bool True if the plugin is licensed, false otherwise.
     * @since 1.0.0
     */
    public function isLicensed(): bool;

    /**
     * Sets the installed status of the plugin.
     *
     * @param bool $installed The installed status of the plugin.
     * @param string|null $version The version of the plugin.
     * @param string|null $filePath The file path of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setInstalled(bool $installed, ?string $version = null, ?string $filePath = null): self;

    /**
     * Sets the active status of the plugin.
     *
     * @param bool $active The active status of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setActive(bool $active): self;

    /**
     * Sets the licensed status of the plugin.
     *
     * @param bool $licensed The licensed status of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setLicensed(bool $licensed): self;

    /**
     * Sets the name of the plugin.
     *
     * @param string $name The name of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setName(string $name): self;

    /**
     * Sets the slug of the plugin.
     *
     * @param string $slug The slug of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setSlug(string $slug): self;

    /**
     * Sets the file name of the plugin.
     *
     * @param string $fileName The file name of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setFileName(string $fileName): self;

    /**
     * Sets the details URL of the plugin.
     *
     * @param string $detailsUrl The details URL of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setDetailsUrl(string $detailsUrl): self;

    /**
     * Sets the family of the plugin.
     *
     * @param PluginFamilyInterface $family The family of the plugin.
     * @return self The plugin.
     * @since 1.0.0
     */
    public function setFamily(PluginFamilyInterface $family): self;
}
