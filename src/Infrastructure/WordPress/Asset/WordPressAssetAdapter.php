<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\Asset;

use InvalidArgumentException;
use PublishPress\Hub\Infrastructure\Asset\Contract\AssetServiceInterface;

class WordPressAssetAdapter implements AssetServiceInterface
{
    /**
     * @since 1.0.0
     */
    private string $assetBaseUrl;

    /**
     * @since 1.0.0
     */
    private bool $scriptDebug = false;

    /**
     * @since 1.0.0
     */
    private string $version;

    /**
     * @since 1.0.0
     */
    public function __construct(string $assetBaseUrl, string $version, bool $scriptDebug = false)
    {
        $this->assetBaseUrl = $assetBaseUrl;
        $this->version = $version;
        $this->scriptDebug = $scriptDebug;
    }

    /**
     * @since 1.0.0
     * @throws InvalidArgumentException If the path is empty.
     */
    public function getPluginAssetUrl(string $relativePath): string
    {
        $baseUrl = $this->getPluginAssetsBaseUrl();

        if (empty($relativePath)) {
            throw new InvalidArgumentException(
                __('Path cannot be empty', 'publishpress-hub')
            );
        }

        $relativePath = ltrim($relativePath, '/');
        $fileExtension = pathinfo($relativePath, PATHINFO_EXTENSION);

        if (empty($fileExtension)) {
            throw new InvalidArgumentException(
                __('File extension cannot be empty', 'publishpress-hub')
            );
        }

        $relativePath = str_replace('.' . $fileExtension, '', $relativePath);

        $minifiableExtensions = ['js', 'css'];

        if (!$this->scriptDebug && in_array($fileExtension, $minifiableExtensions, true)) {
            $fileExtension = 'min.' . $fileExtension;
        }

        return $baseUrl . $relativePath . '.' . $fileExtension;
    }

    /**
     * @since 1.0.0
     */
    public function getPluginAssetsBaseUrl(): string
    {
        return rtrim($this->assetBaseUrl, '/') . '/';
    }

    /**
     * @since 1.0.0
     */
    public function enqueueScript(
        string $scriptHandle,
        string $scriptRelativePath,
        array $dependencies = [],
        bool $inFooter = true
    ): void
    {
        wp_enqueue_script(
            $scriptHandle,
            $this->getPluginAssetUrl($scriptRelativePath),
            $dependencies,
            $this->version,
            $inFooter
        );
    }

    /**
     * @since 1.0.0
     */
    public function registerScript(
        string $scriptHandle,
        string $scriptRelativePath,
        array $dependencies = [],
        bool $inFooter = true
    ): void
    {
        wp_register_script(
            $scriptHandle,
            $this->getPluginAssetUrl($scriptRelativePath),
            $dependencies,
            $this->version,
            $inFooter
        );
    }

    /**
     * @since 1.0.0
     */
    public function enqueueStyle(
        string $styleHandle,
        string $styleRelativePath,
        array $dependencies = []
    ): void
    {
        wp_enqueue_style(
            $styleHandle,
            $this->getPluginAssetUrl($styleRelativePath),
            $dependencies,
            $this->version
        );
    }

    /**
     * @since 1.0.0
     */
    public function registerStyle(
        string $styleHandle,
        string $styleRelativePath,
        array $dependencies = []
    ): void
    {
        wp_register_style(
            $styleHandle,
            $this->getPluginAssetUrl($styleRelativePath),
            $dependencies,
            $this->version
        );
    }

    /**
     * @since 1.0.0
     */
    public function localizeScript(
        string $scriptHandle,
        string $variableName,
        array $data
    ): void
    {
        wp_localize_script($scriptHandle, $variableName, $data);
    }
}
