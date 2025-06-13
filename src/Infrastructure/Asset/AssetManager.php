<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Asset;

use PublishPress\Hub\Infrastructure\Asset\Contracts\AssetManagerInterface;

class AssetManager implements AssetManagerInterface
{
    /**
     * Get the appropriate file extension based on the environment.
     *
     * @since 1.0.0
     * @return string
     */
    public function getScriptFileExtension(): string
    {
        return $this->shouldUseUnminifiedFiles() ? '.js' : '.min.js';
    }

    /**
     * Get the appropriate file extension based on the environment.
     *
     * @since 1.0.0
     * @return string
     */
    public function getStyleFileExtension(): string
    {
        return $this->shouldUseUnminifiedFiles() ? '.css' : '.min.css';
    }

    /**
     * Get the full asset URL.
     *
     * @since 1.0.0
     * @param string $path The relative path to the asset.
     * @return string
     */
    public function getAssetUrl(string $path): string
    {
        return PUBLISHPRESS_HUB_URL . $path;
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
        $scriptPath = $path . $this->getScriptFileExtension();

        wp_enqueue_script(
            $handle,
            self::getAssetUrl($scriptPath),
            $dependencies,
            PUBLISHPRESS_HUB_VERSION,
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
        $stylePath = $path . self::getScriptFileExtension();

        wp_enqueue_style(
            $handle,
            $this->getAssetUrl($stylePath),
            $dependencies,
            PUBLISHPRESS_HUB_VERSION
        );
    }

    private function shouldUseUnminifiedFiles(): bool
    {
        return defined('SCRIPT_DEBUG') && SCRIPT_DEBUG;
    }
}
