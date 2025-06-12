<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin;

use InvalidArgumentException;

/**
 * Plugin entity representing a registered plugin in the hub.
 */
class Plugin
{
    /**
     * The name of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $name;

    /**
     * The slug of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $slug;

    /**
     * The version of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $version;

    /**
     * The path of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $path;


    public function __construct(
        string $name,
        string $slug,
        string $version,
        string $path
    ) {
        $this->validateSlug($slug);
        $this->validateVersion($version);

        $this->name = $name;
        $this->slug = $slug;
        $this->version = $version;
        $this->path = $path;
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
     * Get the slug of the plugin.
     *
     * @since 1.0.0
     * @return string
     */
    public function getSlug(): string
    {
        return $this->slug;
    }

    /**
     * Get the version of the plugin.
     *
     * @since 1.0.0
     * @return string
     */
    public function getVersion(): string
    {
        return $this->version;
    }

    /**
     * Get the path of the plugin.
     *
     * @since 1.0.0
     * @return string
     */
    public function getPath(): string
    {
        return $this->path;
    }

    /**
     * Check if the plugin is newer than another plugin.
     *
     * @since 1.0.0
     * @param Plugin $other
     * @return bool
     */
    public function isNewerThan(Plugin $other): bool
    {
        return version_compare($this->version, $other->getVersion(), '>');
    }

    /**
     * Check if the plugin is the same as another plugin.
     *
     * @since 1.0.0
     * @param Plugin $other
     * @return bool
     */
    public function isSamePlugin(Plugin $other): bool
    {
        return $this->slug === $other->getSlug();
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
    }
}
