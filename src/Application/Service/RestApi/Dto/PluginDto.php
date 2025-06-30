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

    /**
     * The icon file of the plugin.
     *
     * @since 1.0.0
     * @var string|null
     */
    private ?string $iconFile;

    /**
     * The description of the plugin.
     *
     * @since 1.0.0
     * @var string|null
     */
    private ?string $description;

    /**
     * The EDD item ID of the plugin.
     *
     * @since 1.0.0
     * @var int
     */
    private int $eddItemId;

    /**
     * The free details URL of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $freeDetailsUrl;

    /**
     * The pro details URL of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $proDetailsUrl;

    /**
     * The changelog URL of the plugin.
     *
     * @since 1.0.0
     * @var string
     */
    private string $changelogUrl;

    public function __construct(
        string $slugFree,
        string $slugPro,
        string $name,
        int $eddItemId = null,
        bool $isInstalled,
        bool $isActive,
        bool $isLicensed,
        bool $isPro,
        ?string $version,
        ?string $iconFile = null,
        ?string $description = null,
        string $freeDetailsUrl,
        string $proDetailsUrl,
        string $changelogUrl
    ) {
        $this->slugFree = $slugFree;
        $this->slugPro = $slugPro;
        $this->name = $name;
        $this->eddItemId = $eddItemId;
        $this->isInstalled = $isInstalled;
        $this->isActive = $isActive;
        $this->isLicensed = $isLicensed;
        $this->isPro = $isPro;
        $this->version = $version;
        $this->iconFile = $iconFile;
        $this->description = $description;
        $this->freeDetailsUrl = $freeDetailsUrl;
        $this->proDetailsUrl = $proDetailsUrl;
        $this->changelogUrl = $changelogUrl;
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
            'eddItemId' => $this->eddItemId,
            'version' => $this->version,
            'isInstalled' => $this->isInstalled,
            'isActive' => $this->isActive,
            'isLicensed' => $this->isLicensed,
            'isPro' => $this->isPro,
            'iconFile' => $this->iconFile,
            'description' => $this->description,
            'freeDetailsUrl' => $this->freeDetailsUrl,
            'proDetailsUrl' => $this->proDetailsUrl,
            'changelogUrl' => $this->changelogUrl,
        ];
    }
}
