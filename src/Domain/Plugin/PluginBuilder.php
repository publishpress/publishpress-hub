<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Plugin;

use PublishPress\Hub\Domain\Plugin\Contracts\PluginInterface;

/**
 * Builder for creating Plugin instances.
 *
 * @since 1.0.0
 */
class PluginBuilder
{
    /**
     * The name of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $name;

    /**
     * The slug for the free version of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $slugFree;

    /**
     * The slug for the pro version of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $slugPro;

    /**
     * The plugin file name for the free version of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $pluginFileNameFree;

    /**
     * The plugin file name for the pro version of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $pluginFileNamePro;

    /**
     * The EDD item ID for the plugin.
     *
     * @since 1.0.0
     * @var int
     */
    private int $eddItemId;

    /**
     * The icon file for the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $iconFile;

    /**
     * The description for the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $description;

    /**
     * Create a new PluginBuilder instance.
     *
     * @since 1.0.0
     * @param string $name The name of the plugin
     * @return self
     */
    public static function create(string $name): self
    {
        $builder = new self();
        $builder->name = $name;
        return $builder;
    }

    /**
     * Set the slug for the free version of the plugin.
     *
     * @since 1.0.0
     * @param string $slugFree The slug for the free version of the plugin
     * @return self
     */
    public function withSlugFree(string $slugFree): self
    {
        $this->slugFree = $slugFree;
        return $this;
    }

    /**
     * Set the slug for the pro version of the plugin.
     *
     * @since 1.0.0
     * @param string $slugPro The slug for the pro version of the plugin
     * @return self
     */
    public function withSlugPro(string $slugPro): self
    {
        $this->slugPro = $slugPro;
        return $this;
    }

    /**
     * Set the plugin file name for the free version of the plugin.
     *
     * @since 1.0.0
     * @param string $pluginFileNameFree The plugin file name for the free version of the plugin
     * @return self
     */
    public function withPluginFileNameFree(string $pluginFileNameFree): self
    {
        $this->pluginFileNameFree = $pluginFileNameFree;
        return $this;
    }

    /**
     * Set the plugin file name for the pro version of the plugin.
     *
     * @since 1.0.0
     * @param string $pluginFileNamePro The plugin file name for the pro version of the plugin
     * @return self
     */
    public function withPluginFileNamePro(string $pluginFileNamePro): self
    {
        $this->pluginFileNamePro = $pluginFileNamePro;
        return $this;
    }

    /**
     * Set the EDD item ID for the plugin.
     *
     * @since 1.0.0
     * @param int $eddItemId The EDD item ID for the plugin
     * @return self
     */
    public function withEddItemId(int $eddItemId): self
    {
        $this->eddItemId = $eddItemId;
        return $this;
    }

    /**
     * Set the icon file for the plugin.
     *
     * @since 1.0.0
     * @param string $iconFile The icon file for the plugin
     * @return self
     */
    public function withIconFile(string $iconFile): self
    {
        $this->iconFile = $iconFile;
        return $this;
    }

    /**
     * Set the description for the plugin.
     *
     * @since 1.0.0
     * @param string $description The description for the plugin
     * @return self
     */
    public function withDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }

    /**
     * Build the Plugin instance.
     *
     * @since 1.0.0
     * @return PluginInterface
     */
    public function build(): PluginInterface
    {
        return new Plugin(
            $this->name,
            $this->slugFree,
            $this->slugPro,
            $this->pluginFileNameFree,
            $this->pluginFileNamePro,
            $this->eddItemId,
            $this->iconFile,
            $this->description
        );
    }
}
