<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\I18n;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Asset\Contract\AssetServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;
use PublishPress\Hub\Infrastructure\I18n\Contract\I18nServiceInterface;

class WordPressI18nAdapter implements I18nServiceInterface, BootableInterface
{
    use BootableTrait;

    /**
     * @since 1.0.0
     */
    private string $textDomain;

    /**
     * @since 1.0.0
     */
    private string $pluginPath;

    /**
     * @since 1.0.0
     */
    private string $languagePath;

    /**
     * @since 1.0.0
     */
    private HooksServiceInterface $hooksService;

    /**
     * @since 1.0.0
     */
    private I18nServiceInterface $i18nService;

    /**
     * @since 1.0.0
     */
    private AssetServiceInterface $assetService;

    /**
     * @since 1.0.0
     */
    public function __construct(
        string $textDomain,
        string $pluginPath,
        string $languagePath,
        HooksServiceInterface $hooksService,
        AssetServiceInterface $assetService
    ) {
        $this->textDomain = $textDomain;
        $this->pluginPath = $pluginPath;
        $this->languagePath = $languagePath;
        $this->hooksService = $hooksService;
        $this->assetService = $assetService;
    }

    public function onLoad(): void
    {
        $this->hooksService->addAction(AbstractHooks::ACTION_INIT, [$this, 'loadTextDomain']);
    }

    public function onInit(): void
    {
    }

    /**
     * @since 1.0.0
     */
    public function getTextDomain(): string
    {
        return $this->textDomain;
    }

    /**
     * @since 1.0.0
     */
    public function loadTextDomain(): void
    {
        $pluginRelativePath = basename(dirname($this->pluginPath));

        load_plugin_textdomain(
            $this->textDomain,
            false,
            $pluginRelativePath . '/' . $this->languagePath
        );
    }

    /**
     * @since 1.0.0
     */
    public function getLocale(): string
    {
        return get_locale();
    }

    /**
     * @since 1.0.0
     */
    public function enqueueTranslationsScript(string $handle, string $scriptPath): void
    {
        $this->assetService->enqueueScript(
            $handle,
            $scriptPath,
            [],
            true
        );
    }
}
