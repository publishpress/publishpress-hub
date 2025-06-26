<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin;

use InvalidArgumentException;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginInterface;

/**
 * Plugin entity representing a registered plugin in the hub.
 */
class Plugin implements PluginInterface
{
    /**
     * The name of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $name;

    /**
     * The slug of the Free plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $slugFree;

    /**
     * The slug of the Pro plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $slugPro;

    /**
     * The plugin file name for the Free plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $pluginFileNameFree;

    /**
     * The plugin file name for the Pro plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $pluginFileNamePro;

    /**
     * The icon file of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $iconFile;

    /**
     * The description of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $description;

    /**
     * The EDD item ID for license validation.
     *
     * @since 1.0.0
     * @var int
     */
    private int $eddItemId;

    /**
     * The version of the plugin, if installed.
     *
     * @since 1.0.0
     * @var string
     */
    private ?string $version = null;

    /**
     * The path of the plugin file, if installed.
     *
     * @since 1.0.0
     * @var string
     */
    private ?string $filePath = null;

    /**
     * Cache for installation status check.
     *
     * @since 1.0.0
     * @var ?bool
     */
    private ?bool $installationStatusCache = null;

    /**
     * The activation status of the plugin.
     *
     * @since 1.0.0
     * @var ?bool
     */
    private ?bool $isActive = null;

    /**
     * The license status of the plugin.
     *
     * @since 1.0.0
     * @var ?bool
     */
    private ?bool $isLicensed = null;

    /**
     * Cache for pro status check.
     *
     * @since 1.0.0
     * @var ?bool
     */
    private ?bool $proStatusCache = null;

    /**
     * Constructor. Use the PluginBuilder instead.
     *
     * @since 1.0.0
     * @param string $name
     * @param string $slugFree
     * @param string $slugPro
     * @param string $pluginFileNameFree
     * @param string $pluginFileNamePro
     * @param int $eddItemId
     * @param string $iconFile
     * @param string $description
     */
    public function __construct(
        string $name,
        string $slugFree,
        string $slugPro,
        string $pluginFileNameFree,
        string $pluginFileNamePro,
        int $eddItemId,
        string $iconFile,
        string $description
    ) {
        $this->validateSlug($slugFree);
        $this->validateSlug($slugPro);
        $this->validatePluginFileName($pluginFileNameFree);

        $this->name = $name;
        $this->eddItemId = (int) $eddItemId;
        $this->slugFree = $slugFree;
        $this->slugPro = $slugPro;
        $this->pluginFileNameFree = $pluginFileNameFree;
        $this->pluginFileNamePro = $pluginFileNamePro;
        $this->iconFile = $iconFile;
        $this->description = $description;
    }

    /**
     * Create a Plugin instance from an array.
     *
     * @since 1.0.0
     * @param array $data The plugin data array
     * @return self
     */
    public static function fromArray(array $data): self
    {
        $requiredKeys = [
            'name',
            'slugFree',
            'slugPro',
            'pluginFileNameFree',
            'pluginFileNamePro',
            'eddItemId',
            'iconFile',
            'description',
        ];

        foreach ($requiredKeys as $key) {
            if (!isset($data[$key])) {
                throw new InvalidArgumentException(
                    sprintf('Missing required key: %s', $key)
                );
            }
        }

        $plugin = PluginBuilder::create($data['name'])
            ->withSlugFree($data['slugFree'])
            ->withSlugPro($data['slugPro'])
            ->withPluginFileNameFree($data['pluginFileNameFree'])
            ->withPluginFileNamePro($data['pluginFileNamePro'])
            ->withEddItemId($data['eddItemId'])
            ->withIconFile($data['iconFile'])
            ->withDescription($data['description'])
            ->build();

        return $plugin;
    }

    /**
     * Get the name of the plugin.
     *
     * @since 1.0.0
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * Get the slug of the Free plugin.
     *
     * @since 1.0.0
     * @return string
     */
    public function getSlugFree(): string
    {
        return $this->slugFree;
    }

    /**
     * Get the slug of the Pro plugin.
     *
     * @since 1.0.0
     * @return string
     */
    public function getSlugPro(): string
    {
        return $this->slugPro;
    }

    /**
     * Get the version of the plugin, if installed.
     *
     * @since 1.0.0
     * @return string|null
     */
    public function getVersion(): ?string
    {
        return $this->version;
    }

    /**
     * Get the path of the plugin file, if installed.
     *
     * @since 1.0.0
     * @return string|null
     */
    public function getPath(): ?string
    {
        return $this->filePath;
    }

    /**
     * Get the icon file of the plugin.
     *
     * @since 1.0.0
     * @return string|null
     */
    public function getIconFile(): ?string
    {
        return $this->iconFile;
    }

    /**
     * Get the description of the plugin.
     *
     * @since 1.0.0
     * @return string|null
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * Get the plugin file name.
     *
     * @since 1.0.0
     * @return string
     */
    public function getPluginFileNameFree(): string
    {
        return $this->pluginFileNameFree;
    }

    /**
     * Get the plugin file name for the Pro plugin.
     *
     * @since 1.0.0
     * @return string
     */
    public function getPluginFileNamePro(): string
    {
        return $this->pluginFileNamePro;
    }

    /**
     * Get the EDD item ID of the plugin.
     *
     * @since 1.0.0
     * @return int
     */
    public function getEddItemId(): int
    {
        return $this->eddItemId;
    }

    /**
     * Check if the plugin is installed.
     *
     * @since 1.0.0
     * @return bool
     */
    public function isInstalled(): bool
    {
        if ($this->installationStatusCache !== null) {
            return $this->installationStatusCache;
        }

        $slugFree = $this->getSlugFree();
        $slugPro = $this->getSlugPro();
        $pluginFileNameFree = $this->getPluginFileNameFree();
        $pluginFileNamePro = $this->getPluginFileNamePro();

        /*
         * TODO: Check if the plugin registered itself as installed (this is the preferred way,
         * since it make sure the plugin is found on non conventional paths).
         *
         * For now, we'll check if the plugin file exists in the plugin directory.
         */
        if (file_exists(WP_PLUGIN_DIR . '/' . $slugPro . '/' . $pluginFileNamePro)) {
            $this->installationStatusCache = true;
            $this->proStatusCache = true;
            return true;
        }

        if (file_exists(WP_PLUGIN_DIR . '/' . $slugFree . '/' . $pluginFileNameFree)) {
            $this->installationStatusCache = true;
            $this->proStatusCache = false;
            return true;
        }

        $this->installationStatusCache = false;
        $this->proStatusCache = false;
        return false;
    }

    /**
     * Check if the plugin is active.
     *
     * @since 1.0.0
     * @return bool
     */
    public function isActive(): bool
    {
        if ($this->isActive !== null) {
            return $this->isActive;
        }

        if (!$this->isInstalled()) {
            $this->isActive = false;
            return false;
        }

        if ($this->isPro()) {
            $this->isActive = is_plugin_active("{$this->slugPro}/{$this->pluginFileNamePro}");
        } else {
            $this->isActive = is_plugin_active("{$this->slugFree}/{$this->pluginFileNameFree}");
        }

        return $this->isActive;
    }

    /**
     * Check if the plugin is licensed.
     *
     * @since 1.0.0
     * @return bool
     */
    public function isLicensed(): bool
    {
        if ($this->isLicensed !== null) {
            return $this->isLicensed;
        }

        if (!$this->isInstalled()) {
            $this->isLicensed = false;
            return false;
        }

        // TODO: Implement actual license check
        $this->isLicensed = false;
        return $this->isLicensed;
    }

    /**
     * Check if the plugin is pro.
     *
     * @since 1.0.0
     * @return bool
     */
    public function isPro(): bool
    {
        if ($this->proStatusCache !== null) {
            return $this->proStatusCache;
        }

        if (!$this->isInstalled()) {
            $this->proStatusCache = false;
            return false;
        }

        // If installed but proStatusCache is still null, default to false
        $this->proStatusCache = false;
        return $this->proStatusCache;
    }

    /**
     * Check if the plugin is newer than another plugin.
     *
     * @since 1.0.0
     * @param PluginInterface $other
     * @return bool
     */
    public function isNewerThan(PluginInterface $other): bool
    {
        return version_compare($this->getVersion(), $other->getVersion(), '>');
    }

    /**
     * Check if the plugin is the same as another plugin.
     *
     * @since 1.0.0
     * @param PluginInterface $other
     * @return bool
     */
    public function isSamePlugin(PluginInterface $other): bool
    {
        return $this->slugFree === $other->getSlugFree() || $this->slugPro === $other->getSlugPro();
    }

    /**
     * Register the plugin.
     *
     * @since 1.0.0
     * @param string $version
     * @param string $filePath
     * @param bool $isPro
     */
    public function register(string $version, string $filePath, $isPro = false): void
    {
        $this->validateVersion($version);
        $this->validatePath($filePath);

        $this->version = $version;
        $this->filePath = $filePath;
        $this->installationStatusCache = true;
        $this->proStatusCache = (bool) $isPro;
    }

    /**
     * Unregister the plugin.
     *
     * @since 1.0.0
     */
    public function unregister(): void
    {
        $this->version = null;
        $this->filePath = null;
        $this->installationStatusCache = null;
        $this->proStatusCache = null;
        $this->isActive = null;
        $this->isLicensed = null;
    }

    /**
     * Clear the cache of the plugin.
     *
     * @since 1.0.0
     */
    public function clearCache(): void
    {
        $this->installationStatusCache = null;
        $this->proStatusCache = null;
        $this->isActive = null;
        $this->isLicensed = null;
    }

    /**
     * Validate the slug of the plugin.
     *
     * @since 1.0.0
     * @param string $slug
     */
    private function validateSlug(string $slug): void
    {
        if (empty($slug) || !preg_match('/^[a-z][a-z0-9-]*$/', $slug)) {
            throw new InvalidArgumentException('Invalid plugin slug');
        }
    }

    /**
     * Validate the version of the plugin.
     *
     * @since 1.0.0
     * @param string $version
     */
    private function validateVersion(string $version): void
    {
        if (empty($version)) {
            throw new InvalidArgumentException('Version cannot be empty');
        }

        if (!preg_match('/^\d+\.\d+\.\d+(-[a-z0-9\.]+)?$/', $version)) {
            throw new InvalidArgumentException('Invalid version format');
        }
    }

    private function validatePath(string $path): void
    {
        if (empty($path)) {
            throw new InvalidArgumentException('Path cannot be empty');
        }

        if (!file_exists($path)) {
            throw new InvalidArgumentException('Path does not exist');
        }

        $fileName = basename($path);

        if (!preg_match('/^[a-z0-9-]+\.php$/', $fileName)) {
            throw new InvalidArgumentException('Invalid file extension');
        }
    }

    private function validatePluginFileName(string $pluginFileName): void
    {
        if (empty($pluginFileName)) {
            throw new InvalidArgumentException('Plugin file name cannot be empty');
        }

        if (!preg_match('/^[a-zA-Z0-9-\.]+\.php$/', $pluginFileName)) {
            throw new InvalidArgumentException('Invalid plugin file name');
        }
    }
}
