<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Asset\Contracts;

interface AssetManagerInterface
{
    /**
     * Get the full asset URL.
     *
     * @since 1.0.0
     * @param string $path The relative path to the asset.
     * @return string
     * @throws \InvalidArgumentException If the path is empty.
     */
    public function getAssetUrl(string $path): string;

    /**
     * Get the base URL of the assets.
     *
     * @since 1.0.0
     * @return string
     */
    public function getAssetBaseUrl(): string;

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
    ): void;

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
    ): void;

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
    ): void;
}
