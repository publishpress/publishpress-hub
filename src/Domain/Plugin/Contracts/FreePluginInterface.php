<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin\Contracts;


/**
 * Interface for a plugin.
 *
 * @since 1.0.0
 */
interface FreePluginInterface
{
    /**
     * Get the name of the plugin.
     *
     * @return string
     */
    public function getName(): string;

    /**
     * Get the slug of the plugin.
     *
     * @return string
     */
    public function getSlug(): string;

    /**
     * Get the version of the plugin.
     *
     * @return string|null
     */
    public function getVersion(): ?string;

    /**
     * Get the path of the plugin.
     *
     * @return string|null
     */
    public function getPath(): ?string;

    /**
     * Get the plugin file name of the plugin.
     *
     * @return string
     */
    public function getPluginFileName(): string;

    /**
     * Get the details URL of the plugin.
     *
     * @return string
     */
    public function getDetailsUrl(): string;

    /**
     * Get the plugin family this free plugin belongs to.
     *
     * @return PluginFamilyInterface|null
     */
    public function getFamily(): ?PluginFamilyInterface;

    /**
     * Check if the plugin is installed.
     *
     * @param bool $forceCheck
     * @return bool|null
     */
    public function isInstalled(bool $forceCheck = false): ?bool;

    /**
     * Check if the plugin is active.
     *
     * @param bool $forceCheck
     * @return bool
     */
    public function isActive(bool $forceCheck = false): bool;

    /**
     * Set the plugin as installed.
     *
     * @param string $version
     * @param string $filePath
     * @return self
     */
    public function setInstalled(string $version, string $filePath): self;

    /**
     * Set the name of the plugin.
     *
     * @param string $name
     * @return self
     */
    public function setName(string $name): self;

    /**
     * Set the slug of the plugin.
     *
     * @param string $slug
     * @return self
     */
    public function setSlug(string $slug): self;

    /**
     * Set the plugin file name of the plugin.
     *
     * @param string $pluginFileName
     * @return self
     */
    public function setPluginFileName(string $pluginFileName): self;

    /**
     * Set the details URL of the plugin.
     *
     * @param string $detailsUrl
     * @return self
     */
    public function setDetailsUrl(string $detailsUrl): self;

    /**
     * Set the plugin family.
     *
     * @param PluginFamilyInterface $family
     * @return self
     */
    public function setFamily(PluginFamilyInterface $family): self;
}
