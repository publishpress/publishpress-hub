<?php

/**
 * WordPress asset adapter.
 *
 * @package PublishPress\Hub\Infrastructure\WP\Asset
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WP\Asset;

defined('ABSPATH') || exit;

use InvalidArgumentException;
use PublishPress\Hub\Infrastructure\Asset\Contract\AssetServiceInterface;

class WPAssetAdapter implements AssetServiceInterface
{
    private string $assetBaseUrl;

    private bool $scriptDebug = false;

    private string $version;

    /**
     * @param string $assetBaseUrl The asset base URL.
     * @param string $version The version.
     * @param bool $scriptDebug The script debug.
     * @since 1.0.0
     */
    public function __construct(string $assetBaseUrl, string $version, bool $scriptDebug = false)
    {
        $this->assetBaseUrl = $assetBaseUrl;
        $this->version = $version;
        $this->scriptDebug = $scriptDebug;
    }

    /**
     * Get a plugin asset URL.
     *
     * @param string $relativePath The relative path.
     * @throws InvalidArgumentException If the path is empty.
     * @return string The plugin asset URL.
     * @since 1.0.0
     */
    public function getPluginAssetUrl(string $relativePath): string
    {
        $baseUrl = $this->getPluginAssetsBaseUrl();

        if (empty($relativePath)) {
            throw new InvalidArgumentException(
                esc_html__('Path cannot be empty', 'publishpress-hub')
            );
        }

        $relativePath = ltrim($relativePath, '/');
        $fileExtension = pathinfo($relativePath, PATHINFO_EXTENSION);

        if (empty($fileExtension)) {
            throw new InvalidArgumentException(
                esc_html__('File extension cannot be empty', 'publishpress-hub')
            );
        }

        $relativePath = str_replace(".$fileExtension", '', $relativePath);

        $minifiableExtensions = ['js', 'css'];

        if (!$this->scriptDebug && in_array($fileExtension, $minifiableExtensions, true)) {
            $fileExtension = "min.$fileExtension";
        }

        return "$baseUrl$relativePath.$fileExtension";
    }

    /**
     * Get the plugin assets base URL.
     *
     * @return string The plugin assets base URL.
     * @since 1.0.0
     */
    public function getPluginAssetsBaseUrl(): string
    {
        return rtrim($this->assetBaseUrl, '/') . '/';
    }

    /**
     * Enqueue a script.
     *
     * @param string $scriptHandle The script handle.
     * @param string $scriptRelativePath The script relative path.
     * @param array<string, mixed> $dependencies The dependencies.
     * @param bool $inFooter The in footer.
     * @since 1.0.0
     */
    public function enqueueScript(
        string $scriptHandle,
        string $scriptRelativePath,
        array $dependencies = [],
        bool $inFooter = true
    ): void {
        wp_enqueue_script(
            $scriptHandle,
            $this->getPluginAssetUrl($scriptRelativePath),
            $dependencies,
            $this->version,
            $inFooter
        );
    }

    /**
     * Register a script.
     *
     * @param string $scriptHandle The script handle.
     * @param string $scriptRelativePath The script relative path.
     * @param array<string, mixed> $dependencies The dependencies.
     * @param bool $inFooter The in footer.
     * @since 1.0.0
     */
    public function registerScript(
        string $scriptHandle,
        string $scriptRelativePath,
        array $dependencies = [],
        bool $inFooter = true
    ): void {
        wp_register_script(
            $scriptHandle,
            $this->getPluginAssetUrl($scriptRelativePath),
            $dependencies,
            $this->version,
            $inFooter
        );
    }

    /**
     * Enqueue a style.
     *
     * @param string $styleHandle The style handle.
     * @param string $styleRelativePath The style relative path.
     * @param array<string, mixed> $dependencies The dependencies.
     * @since 1.0.0
     */
    public function enqueueStyle(
        string $styleHandle,
        string $styleRelativePath,
        array $dependencies = []
    ): void {
        wp_enqueue_style(
            $styleHandle,
            $this->getPluginAssetUrl($styleRelativePath),
            $dependencies,
            $this->version
        );
    }

    /**
     * Register a style.
     *
     * @param string $styleHandle The style handle.
     * @param string $styleRelativePath The style relative path.
     * @param array<string, mixed> $dependencies The dependencies.
     * @since 1.0.0
     */
    public function registerStyle(
        string $styleHandle,
        string $styleRelativePath,
        array $dependencies = []
    ): void {
        wp_register_style(
            $styleHandle,
            $this->getPluginAssetUrl($styleRelativePath),
            $dependencies,
            $this->version
        );
    }

    /**
     * Localize a script.
     *
     * @param string $scriptHandle The script handle.
     * @param string $variableName The variable name.
     * @param array<string, mixed> $data The data.
     * @since 1.0.0
     */
    public function localizeScript(
        string $scriptHandle,
        string $variableName,
        array $data
    ): void {
        wp_localize_script($scriptHandle, $variableName, $data);
    }
}
