<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\RestApi\Dto;

use PublishPress\Hub\Application\Service\RestApi\Contracts\DtoInterface;

/**
 * Plugin Data Transfer Object for REST API responses.
 *
 * @since 1.0.0
 */
class PluginDto implements DtoInterface
{
    /**
     * The free slug of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $slugFree;

    /**
     * The pro slug of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $slugPro;

    /**
     * The name of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $name;

    /**
     * The version of the plugin.
     *
     * @since 1.0.0
     * @var string|null
     */
    private ?string $version;

    /**
     * Whether the plugin is installed.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $isInstalled;

    /**
     * Whether the plugin is active.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $isActive;

    /**
     * Whether the plugin is licensed.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $isLicensed;

    /**
     * Whether the plugin is pro.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $isPro;

    public function __construct(
        string $slugFree,
        string $slugPro,
        string $name,
        ?string $version,
        bool $isInstalled,
        bool $isActive,
        bool $isLicensed,
        bool $isPro
    ) {
        $this->slugFree = $slugFree;
        $this->slugPro = $slugPro;
        $this->name = $name;
        $this->version = $version;
        $this->isInstalled = $isInstalled;
        $this->isActive = $isActive;
        $this->isLicensed = $isLicensed;
        $this->isPro = $isPro;
    }

    /**
     * Convert to array for JSON serialization.
     *
     * @return array
     */
    public function toArray(): array
    {
        return [
            'slugFree' => $this->slugFree,
            'slugPro' => $this->slugPro,
            'name' => $this->name,
            'version' => $this->version,
            'isInstalled' => $this->isInstalled,
            'isActive' => $this->isActive,
            'isLicensed' => $this->isLicensed,
            'isPro' => $this->isPro,
        ];
    }
}
