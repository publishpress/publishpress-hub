<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Asset;

use PublishPress\Hub\Infrastructure\Asset\Contracts\AssetManagerInterface;

class AssetManager implements AssetManagerInterface
{
    /**
     * Whether the environment is development.
     *
     * @var bool
     */
    private bool $isDevelopment = false;

    /**
     * The URL of the assets.
     *
     * @var string
     */
    private string $assetsUrl;

    /**
     * The version of the assets.
     *
     * @var string
     */
    private string $version;

    /**
     * Constructor.
     *
     * @since 1.0.0
     * @param string $assetsUrl The URL of the assets.
     * @param string $version The version of the assets.
     * @param bool $isDevelopment Whether the environment is development.
     */
    public function __construct(string $assetsUrl, string $version, bool $isDevelopment = false)
    {
        $this->assetsUrl = $assetsUrl;
        $this->version = $version;
        $this->isDevelopment = $isDevelopment;
    }

    /**
     * Get the base URL of the assets.
     *
     * @since 1.0.0
     * @return string
     */
    public function getAssetBaseUrl(): string
    {
        return rtrim($this->assetsUrl, '/') . '/';
    }

    /**
     * Get the full asset URL.
     *
     * @since 1.0.0
     * @param string $path The relative path to the asset.
     * @return string
     * @throws \InvalidArgumentException If the path is empty.
     */
    public function getAssetUrl(string $path): string
    {
        $baseUrl = $this->getAssetBaseUrl();

        if (empty($path)) {
            throw new \InvalidArgumentException('Path cannot be empty');
        }

        $path = ltrim($path, '/');
        $fileExtension = pathinfo($path, PATHINFO_EXTENSION);

        if (empty($fileExtension)) {
            throw new \InvalidArgumentException('File extension cannot be empty');
        }

        $path = str_replace('.' . $fileExtension, '', $path);

        $minifiableExtensions = ['js', 'css'];

        if (!$this->isDevelopment && in_array($fileExtension, $minifiableExtensions, true)) {
            $fileExtension = 'min.' . $fileExtension;
        }

        return $baseUrl . $path . '.' . $fileExtension;
    }

    /**
     * Enqueue a script.
     *
     * @since 1.0.0
     * @param string $handle The script handle.
     * @param string $path The relative path to the script file (without extension).
     * @param array $dependencies The script dependencies.
     * @param bool $inFooter Whether to enqueue the script in the footer.
     * @return void
     */
    public function enqueueScript(
        string $handle,
        string $path,
        array $dependencies = [],
        bool $inFooter = true
    ): void {
        wp_enqueue_script(
            $handle,
            $this->getAssetUrl($path),
            $dependencies,
            $this->version,
            $inFooter
        );
    }

    /**
     * Enqueue a style.
     *
     * @since 1.0.0
     * @param string $handle The style handle.
     * @param string $path The relative path to the style file (without extension).
     * @param array $dependencies The style dependencies.
     * @return void
     */
    public function enqueueStyle(
        string $handle,
        string $path,
        array $dependencies = []
    ): void {
        wp_enqueue_style(
            $handle,
            $this->getAssetUrl($path),
            $dependencies,
            $this->version
        );
    }

    /**
     * Localize a script.
     *
     * @since 1.0.0
     * @param string $handle The script handle.
     * @param string $name The name of the variable.
     * @param array $data The data to localize.
     * @return void
     */
    public function localizeScript(
        string $handle,
        string $name,
        array $data
    ): void {
        wp_localize_script($handle, $name, $data);
    }
}
