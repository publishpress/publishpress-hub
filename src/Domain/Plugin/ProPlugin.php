<?php

namespace PublishPress\Hub\Domain\Plugin;

use PublishPress\Hub\Domain\Plugin\Contracts\EddPluginInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\FreePluginInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginFamilyInterface;

class ProPlugin implements EddPluginInterface
{
    /**
     * The EDD item ID of the pro plugin.
     *
     * @var int
     */
    private int $eddItemId;

    /**
     * The slug of the free plugin.
     *
     * @var string
     */
    private string $freePluginSlug;

    /**
     * The plugin of the pro plugin.
     *
     * @var FreePluginInterface
     */
    private FreePluginInterface $plugin;

    /**
     * The constructor of the pro plugin.
     *
     * @param string $name
     * @param string $slug
     * @param string $pluginFileName
     * @param string $detailsUrl
     * @param int $eddItemId
     * @param string $freePluginSlug
     * @param PluginFamilyInterface|null $family
     */
    public function __construct(
        string $name,
        string $slug,
        string $pluginFileName,
        string $detailsUrl,
        int $eddItemId,
        string $freePluginSlug,
        ?PluginFamilyInterface $family = null
    ) {
        $this->setEddItemId($eddItemId);
        $this->plugin = new FreePlugin($name, $slug, $pluginFileName, $detailsUrl, $family);
        $this->setFreePluginSlug($freePluginSlug);
    }

    /**
     * Check if the pro plugin is licensed.
     *
     * @return bool
     */
    public function isLicensed(): bool
    {
        // TODO: Implement isLicensed() method.
        return false;
    }

    /**
     * Get the EDD item ID of the pro plugin.
     *
     * @return int
     */
    public function getEddItemId(): int
    {
        return $this->eddItemId;
    }

    /**
     * Get the slug of the free plugin.
     *
     * @return string
     */
    public function getFreePluginSlug(): string
    {
        return $this->freePluginSlug;
    }

    /**
     * Set the EDD item ID.
     *
     * @param int $eddItemId
     * @return self
     */
    public function setEddItemId(int $eddItemId): self
    {
        $this->eddItemId = (int) $eddItemId;

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
        $this->freePluginSlug = sanitize_key($freePluginSlug);

        return $this;
    }

    /**
     * Get the plugin name.
     *
     * @return string
     */
    public function getName(): string
    {
        return $this->plugin->getName();
    }

    /**
     * Get the plugin slug.
     *
     * @return string
     */
    public function getSlug(): string
    {
        return $this->plugin->getSlug();
    }

    /**
     * Get the plugin version.
     *
     * @return string|null
     */
    public function getVersion(): ?string
    {
        return $this->plugin->getVersion();
    }

    /**
     * Get the plugin path.
     *
     * @return string|null
     */
    public function getPath(): ?string
    {
        return $this->plugin->getPath();
    }

    /**
     * Get the plugin file name.
     *
     * @return string
     */
    public function getPluginFileName(): string
    {
        return $this->plugin->getPluginFileName();
    }

    /**
     * Get the plugin details URL.
     *
     * @return string
     */
    public function getDetailsUrl(): string
    {
        return $this->plugin->getDetailsUrl();
    }

    /**
     * Get the plugin family this pro plugin belongs to.
     *
     * @return PluginFamilyInterface|null
     */
    public function getFamily(): ?PluginFamilyInterface
    {
        return $this->plugin->getFamily();
    }

    /**
     * Check if the plugin is installed.
     *
     * @param bool $forceCheck
     * @return bool
     */
    public function isInstalled(bool $forceCheck = false): bool
    {
        return $this->plugin->isInstalled($forceCheck);
    }

    /**
     * Check if the plugin is active.
     *
     * @param bool $forceCheck
     * @return bool
     */
    public function isActive(bool $forceCheck = false): bool
    {
        return $this->plugin->isActive($forceCheck);
    }

    /**
     * Set the plugin as installed.
     *
     * @param string $version
     * @param string $filePath
     * @return self
     */
    public function setInstalled(string $version, string $filePath): self
    {
        return $this->plugin->setInstalled($version, $filePath);
    }

    /**
     * Set the plugin name.
     *
     * @param string $name
     * @return self
     */
    public function setName(string $name): self
    {
        return $this->plugin->setName($name);
    }

    /**
     * Set the plugin slug.
     *
     * @param string $slug
     * @return self
     */
    public function setSlug(string $slug): self
    {
        return $this->plugin->setSlug($slug);
    }

    /**
     * Set the plugin file name.
     *
     * @param string $pluginFileName
     * @return self
     */
    public function setPluginFileName(string $pluginFileName): self
    {
        return $this->plugin->setPluginFileName($pluginFileName);
    }

    /**
     * Set the plugin details URL.
     *
     * @param string $detailsUrl
     * @return self
     */
    public function setDetailsUrl(string $detailsUrl): self
    {
        return $this->plugin->setDetailsUrl($detailsUrl);
    }

    /**
     * Set the plugin family.
     *
     * @param PluginFamilyInterface $family
     * @return self
     */
    public function setFamily(PluginFamilyInterface $family): self
    {
        $this->plugin->setFamily($family);

        return $this;
    }
}
