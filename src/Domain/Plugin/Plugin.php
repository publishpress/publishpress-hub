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
     * The installation status of the plugin.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $isInstalled = false;

    /**
     * The activation status of the plugin.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $isActive = false;

    /**
     * The license status of the plugin.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $isLicensed = false;

    /**
     * The pro flag.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $isPro = false;

    public function __construct(
        string $name,
        string $slugFree,
        string $slugPro
    ) {
        $this->validateSlug($slugFree);
        $this->validateSlug($slugPro);

        $this->name = $name;
        $this->slugFree = $slugFree;
        $this->slugPro = $slugPro;
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
     * Check if the plugin is installed.
     *
     * @since 1.0.0
     * @return bool
     */
    public function isInstalled(): bool
    {
        return $this->isInstalled;
    }

    /**
     * Check if the plugin is active.
     *
     * @since 1.0.0
     * @return bool
     */
    public function isActive(): bool
    {
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
        return $this->isPro;
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

    public function register(string $version, string $filePath): void
    {
        $this->validateVersion($version);
        $this->validatePath($filePath);

        $this->version = $version;
        $this->filePath = $filePath;
        $this->isInstalled = true;
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
}
