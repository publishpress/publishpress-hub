<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Asset\Contract;

/**
 * @since 1.0.0
 */
interface AssetServiceInterface
{
    /**
     * @since 1.0.0
     * @throws \InvalidArgumentException If the path is empty.
     */
    public function getPluginAssetUrl(string $relativePath): string;

    /**
     * @since 1.0.0
     */
    public function getPluginAssetsBaseUrl(): string;

    /**
     * @since 1.0.0
     */
    public function enqueueScript(
        string $scriptHandle,
        string $scriptRelativePath,
        array $dependencies = [],
        bool $inFooter = true
    ): void;

    /**
     * @since 1.0.0
     */
    public function enqueueStyle(
        string $styleHandle,
        string $styleRelativePath,
        array $dependencies = []
    ): void;

    /**
     * @since 1.0.0
     */
    public function localizeScript(
        string $scriptHandle,
        string $variableName,
        array $data
    ): void;
}
