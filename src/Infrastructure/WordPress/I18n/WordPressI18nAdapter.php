<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WordPress\I18n;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Asset\Contract\AssetServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;
use PublishPress\Hub\Infrastructure\I18n\Contract\I18nServiceInterface;

/**
 * TODO: Make this class reusable for other plugins, after the free plugin also has the Hub as requirement.
 */
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
    private string $scriptPath;

    /**
     * @since 1.0.0
     */
    private string $languagesPath;

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
        string $scriptPath,
        string $languagesPath,
        HooksServiceInterface $hooksService,
        AssetServiceInterface $assetService
    ) {
        $this->textDomain = $textDomain;
        $this->scriptPath = $scriptPath;
        $this->languagesPath = $languagesPath;
        $this->hooksService = $hooksService;
        $this->assetService = $assetService;
    }

    protected function onLoad(): void
    {
        $this->hooksService->addAction(
            AbstractHooks::ACTION_ADMIN_ENQUEUE_SCRIPTS,
            [$this, 'enqueueTranslationsScript'],
            5
        );
    }

    protected function onInit(): void
    {
        $this->loadTextDomain();
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
        $pluginRelativePath = basename(dirname($this->languagesPath)) . '/' . basename($this->languagesPath);

        load_plugin_textdomain(
            $this->textDomain,
            false,
            $pluginRelativePath
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
    public function getUserLocale(): string
    {
        return get_user_locale();
    }

    /**
     * @since 1.0.0
     */
    public function enqueueTranslationsScript(): void
    {
        $handle = $this->textDomain . '-i18n';

        $this->assetService->registerScript(
            $handle,
            $this->scriptPath,
            [
                'wp-i18n',
            ],
            true
        );

        $json = $this->getLocalizedTranslations();

        $variableName = $this->getVariableNameFromTextDomain();

        $this->assetService->localizeScript(
            $handle,
            $variableName,
            [
                'data' => $json,
            ]
        );
    }

    private function getVariableNameFromTextDomain(): string
    {
        return preg_replace_callback(
            '/-([a-z])/',
            function ($matches) {
                return strtoupper($matches[1]);
            },
            $this->textDomain . 'I18n'
        );
    }

    /**
     * Get the localized translations from the JSON file and
     * return it as an array.
     *
     * @since 1.0.0
     */
    private function getLocalizedTranslations(): array
    {
        $currentLocale = $this->getUserLocale();

        $jsonPath = $this->languagesPath . $this->textDomain . '-' . $currentLocale . '.json';

        if (! file_exists($jsonPath)) {
            return [];
        }

        // phpcs:ignore WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown
        $json = file_get_contents($jsonPath);
        return json_decode($json, true);
    }
}
