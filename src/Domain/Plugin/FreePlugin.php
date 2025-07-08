<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin;

use PublishPress\Hub\Domain\Plugin\Contracts\FreePluginInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginFamilyInterface;

class FreePlugin implements FreePluginInterface
{
    /**
     * The name of the free plugin.
     *
     * @var string
     */
    private string $name;

    /**
     * The slug of the free plugin.
     *
     * @var string
     */
    private string $slug;

    /**
     * The version of the free plugin.
     *
     * @var string|null
     */
    private ?string $version = null;

    /**
     * The path of the free plugin.
     *
     * @var string|null
     */
    private ?string $path = null;

    /**
     * The plugin file name of the free plugin.
     *
     * @var string
     */
    private string $pluginFileName;

    /**
     * The details URL of the free plugin.
     *
     * @var string
     */
    private string $detailsUrl;

    /**
     * The plugin family this plugin belongs to.
     *
     * @var PluginFamilyInterface|null
     */
    private ?PluginFamilyInterface $family = null;

    /**
     * The flag to check if the plugin is installed.
     *
     * @var bool|null
     */
    private ?bool $isInstalled = null;

    /**
     * The plugin directory.
     *
     * @var string
     */
    private string $pluginsDirectory;

    /**
     * The constructor of the free plugin.
     *
     * @param string $name
     * @param string $slug
     * @param string $pluginFileName
     * @param string $detailsUrl
     * @param PluginFamilyInterface|null $family
     * @param string|null $pluginsDirectory
     */
    public function __construct(
        string $name,
        string $slug,
        string $pluginFileName,
        string $detailsUrl,
        ?PluginFamilyInterface $family = null,
        ?string $pluginsDirectory = null
    ) {
        $this->setName($name);
        $this->setSlug($slug);
        $this->setPluginFileName($pluginFileName);
        $this->setDetailsUrl($detailsUrl);

        if ($family) {
            $this->setFamily($family);
        }

        if (null === $pluginsDirectory) {
            $pluginsDirectory = WP_PLUGIN_DIR;
        }

        $this->pluginsDirectory = $pluginsDirectory;
    }

    /**
     * Get the name of the plugin.
     *
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Get the slug of the plugin.
     *
     * @return string
     */
    public function getSlug(): string
    {
        return $this->slug;
    }

    /**
     * Get the version of the plugin.
     *
     * @return string|null
     */
    public function getVersion(): ?string
    {
        if ($this->version) {
            return $this->version;
        }

        if ($this->isInstalled()) {
            $pluginData = get_plugin_data(WP_PLUGIN_DIR . '/' . $this->getPath());
            $this->version = $pluginData['Version'] ?? null;
        }

        return $this->version;
    }

    /**
     * Get the path of the plugin. It returns the relative path by default,
     * and the absolute path if the $absolute parameter is true.
     *
     * @param bool $absolute
     * @return string|null
     */
    public function getPath(bool $absolute = false): ?string
    {
        if ($this->path) {
            return $this->path;
        }

        $relativePath = $this->slug . '/' . $this->pluginFileName;

        if ($absolute) {
            return $this->pluginsDirectory . '/' . $relativePath;
        }

        return $relativePath;
    }

    /**
     * Get the plugin file name of the plugin.
     *
     * @return string
     */
    public function getPluginFileName(): string
    {
        return $this->pluginFileName;
    }

    /**
     * Get the details URL of the plugin.
     *
     * @return string
     */
    public function getDetailsUrl(): string
    {
        return $this->detailsUrl;
    }

    /**
     * Get the plugin family this free plugin belongs to.
     *
     * @return PluginFamilyInterface|null
     */
    public function getFamily(): ?PluginFamilyInterface
    {
        return $this->family;
    }

    /**
     * Check if the plugin is installed.
     *
     * @param bool $forceCheck
     * @return bool|null
     */
    public function isInstalled(bool $forceCheck = false): ?bool
    {
        if ($this->isInstalled === null || $forceCheck) {
            $defaultInstallationPath = WP_PLUGIN_DIR . '/' . $this->getPath();
            global $wp_filesystem;

            if (empty($wp_filesystem)) {
                require_once(ABSPATH . '/wp-admin/includes/file.php');
                WP_Filesystem();
            }

            $this->isInstalled = $wp_filesystem->exists($defaultInstallationPath);
        }

        return $this->isInstalled;
    }

    /**
     * Check if the plugin is active.
     *
     * @param bool $forceCheck
     * @return bool
     */
    public function isActive(bool $forceCheck = false): bool
    {
        return is_plugin_active($this->getPath());
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
        $this->version = $version;
        $this->path = $filePath;

        return $this;
    }

    /**
     * Set the name of the plugin.
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
     * Set the slug of the plugin.
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
     * Set the plugin file name of the plugin.
     *
     * @param string $pluginFileName
     * @return self
     */
    public function setPluginFileName(string $pluginFileName): self
    {
        $this->pluginFileName = $pluginFileName;

        return $this;
    }

    /**
     * Set the details URL of the plugin.
     *
     * @param string $detailsUrl
     * @return self
     */
    public function setDetailsUrl(string $detailsUrl): self
    {
        $this->detailsUrl = $detailsUrl;

        return $this;
    }

    /**
     * Set the plugin family.
     *
     * @param PluginFamilyInterface $family
     * @return self
     */
    public function setFamily(PluginFamilyInterface $family): self
    {
        $this->family = $family;

        return $this;
    }
}
