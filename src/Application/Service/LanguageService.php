<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;
use PublishPress\Hub\Application\Hooks as ApplicationHooks;
use PublishPress\Hub\Infrastructure\Asset\AssetManager;

/**
 * Language service.
 *
 * @since 1.0.0
 */
class LanguageService implements ServiceInterface
{
    /**
     * The asset manager.
     *
     * @since 1.0.0
     */
    private AssetManager $assetManager;

    /**
     * Whether the service is initialized.
     *
     * @since 1.0.0
     */
    private bool $initialized = false;

    /**
     * The text domain.
     *
     * @since 1.0.0
     */
    private string $textDomain = 'publishpress-hub';

    /**
     * Constructor.
     *
     * @since 1.0.0
     * @param AssetManager $assetManager The asset manager.
     * @param string $textDomain The text domain.
     */
    public function __construct(AssetManager $assetManager, string $textDomain)
    {
        $this->assetManager = $assetManager;
        $this->textDomain = $textDomain;
    }

    /**
     * Initialize the service.
     *
     * @since 1.0.0
     */
    public function initialize(): self
    {
        if ($this->initialized) {
            return $this;
        }

        $this->initialized = true;

        $this->registerHooks();

        return $this;
    }

    /**
     * Check if the service is initialized.
     *
     * @since 1.0.0
     * @return bool
     */
    public function isInitialized(): bool
    {
        return $this->initialized;
    }

    /**
     * Register the hooks.
     *
     * @since 1.0.0
     */
    private function registerHooks(): void
    {
        add_action(ApplicationHooks::ACTION_INIT, [$this, 'loadTextdomain']);
        add_action(ApplicationHooks::ACTION_ENQUEUE_SCRIPTS, [$this, 'enqueueScripts'], 5);
    }

    /**
     * Load the textdomain.
     *
     * @since 1.0.0
     */
    public function loadTextdomain(): void
    {
        load_plugin_textdomain($this->textDomain, false, PUBLISHPRESS_HUB_LANGUAGES_PATH);
    }

    /**
     * Enqueue the scripts.
     *
     * @since 1.0.0
     */
    public function enqueueScripts(string $hookSuffix): void
    {
        $this->assetManager->enqueueScript(
            'publishpress-hub-i18n',
            'dist/js/i18n',
            [
                'wp-i18n',
            ],
            true
        );

        $json = $this->getLocalizedTranslations();

        $this->assetManager->localizeScript(
            'publishpress-hub-i18n',
            'publishpressHubI18nConfig',
            [
                'data' => $json,
            ]
        );
    }

    /**
     * Get the localized translations from the JSON file and
     * return it as an array.
     *
     * @since 1.0.0
     * @return array
     */
    private function getLocalizedTranslations(): array
    {
        $currentLocale = $this->getLocale();
        $jsonPath = PUBLISHPRESS_HUB_LANGUAGES_PATH . '/' . $this->textDomain . '-' . $currentLocale . '.json';

        if (! file_exists($jsonPath)) {
            return [];
        }

        // phpcs:ignore WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown
        $json = file_get_contents($jsonPath);
        return json_decode($json, true);
    }

    /**
     * Get the current locale.
     *
     * @since 1.0.0
     * @return string
     */
    private function getLocale(): string
    {
        return get_user_locale();
    }
}
