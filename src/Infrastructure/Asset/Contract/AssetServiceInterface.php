<?php

/**
 * Asset service interface.
 *
 * @package PublishPress\Hub\Infrastructure\Asset\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Asset\Contract;
defined( 'ABSPATH' ) || exit;

/**
 * @since 1.0.0
 */
interface AssetServiceInterface
{
    /**
     * Get the URL of a plugin asset.
     *
     * @param string $relativePath The relative path to the asset.
     * @throws \InvalidArgumentException If the path is empty.
     * @return string The URL of the asset.
     * @since 1.0.0
     */
    public function getPluginAssetUrl(string $relativePath): string;

    /**
     * Get the base URL of plugin assets.
     *
     * @return string The base URL of plugin assets.
     * @since 1.0.0
     */
    public function getPluginAssetsBaseUrl(): string;

    /**
     * Enqueue a script.
     *
     * @param string $scriptHandle The handle of the script to enqueue.
     * @param string $scriptRelativePath The relative path to the script.
     * @param array<string> $dependencies An array of script handles this script depends on.
     * @param bool $inFooter Whether to enqueue the script in the footer.
     * @since 1.0.0
     */
    public function enqueueScript(
        string $scriptHandle,
        string $scriptRelativePath,
        array $dependencies = [],
        bool $inFooter = true
    ): void;

    /**
     * Register a script.
     *
     * @param string $scriptHandle The handle of the script to register.
     * @param string $scriptRelativePath The relative path to the script.
     * @param array<string> $dependencies An array of script handles this script depends on.
     * @param bool $inFooter Whether to enqueue the script in the footer.
     * @since 1.0.0
     */
    public function registerScript(
        string $scriptHandle,
        string $scriptRelativePath,
        array $dependencies = [],
        bool $inFooter = true
    ): void;

    /**
     * Enqueue a style.
     *
     * @param string $styleHandle The handle of the style to enqueue.
     * @param string $styleRelativePath The relative path to the style.
     * @param array<string> $dependencies An array of style handles this style depends on.
     * @since 1.0.0
     */
    public function enqueueStyle(
        string $styleHandle,
        string $styleRelativePath,
        array $dependencies = []
    ): void;

    /**
     * Register a style.
     *
     * @param string $styleHandle The handle of the style to register.
     * @param string $styleRelativePath The relative path to the style.
     * @param array<string> $dependencies An array of style handles this style depends on.
     * @since 1.0.0
     */
    public function registerStyle(
        string $styleHandle,
        string $styleRelativePath,
        array $dependencies = []
    ): void;

    /**
     * Localize a script.
     *
     * @param string $scriptHandle The handle of the script to localize.
     * @param string $variableName The name of the variable to localize.
     * @param array<string, mixed> $data The data to localize.
     * @since 1.0.0
     */
    public function localizeScript(
        string $scriptHandle,
        string $variableName,
        array $data
    ): void;
}
