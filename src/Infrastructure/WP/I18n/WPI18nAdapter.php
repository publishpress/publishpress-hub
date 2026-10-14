<?php

/**
 * WordPress i18n adapter.
 *
 * @package PublishPress\Hub\Infrastructure\WP\I18n
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\WP\I18n;

defined('ABSPATH') || exit;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Asset\Contract\AssetServiceInterface;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;
use PublishPress\Hub\Infrastructure\I18n\Contract\I18nServiceInterface;
use InvalidArgumentException;
use PublishPress\Hub\Infrastructure\WP\Filesystem\WPFileSystemAdapter;

/**
 * TODO: Make this class reusable for other plugins, after the free plugin also has the Hub as requirement.
 */
class WPI18nAdapter implements I18nServiceInterface, BootableInterface
{
    use BootableTrait;

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
    private AssetServiceInterface $assetService;

    private WPFileSystemAdapter $fileSystemAdapter;

    /**
     * @param string $textDomain The text domain.
     * @param string $scriptPath The script path.
     * @param string $languagesPath The languages path.
     * @param AssetServiceInterface $assetService The asset service.
     * @param WPFileSystemAdapter $fileSystemAdapter The file system adapter.
     * @since 1.0.0
     */
    public function __construct(
        string $textDomain,
        string $scriptPath,
        string $languagesPath,
        AssetServiceInterface $assetService,
        WPFileSystemAdapter $fileSystemAdapter
    ) {
        $this->textDomain = $textDomain;
        $this->scriptPath = $scriptPath;
        $this->languagesPath = $languagesPath;
        $this->assetService = $assetService;
        $this->fileSystemAdapter = $fileSystemAdapter;
    }

    /**
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        add_action(
            AbstractHooks::ACTION_ADMIN_ENQUEUE_SCRIPTS,
            [$this, 'enqueueTranslationsScript'],
            5
        );
    }

    /**
     * @since 1.0.0
     */
    protected function onInit(): void
    {
        $this->loadTextDomain();
    }

    /**
     * Get the text domain.
     *
     * @return string The text domain.
     * @since 1.0.0
     */
    public function getTextDomain(): string
    {
        return $this->textDomain;
    }

    /**
     * Load the text domain.
     *
     * @since 1.0.0
     */
    public function loadTextDomain(): void
    {
        $pluginRelativePath = basename(dirname($this->languagesPath)) . '/' . basename($this->languagesPath);

        // phpcs:ignore PluginCheck.CodeAnalysis.DiscouragedFunctions.load_plugin_textdomainFound
        load_plugin_textdomain(
            $this->textDomain,
            false,
            $pluginRelativePath
        );
    }

    /**
     * Enqueue the translations script.
     *
     * @since 1.0.0
     */
    public function enqueueTranslationsScript(): void
    {
        $handle = "{$this->textDomain}-i18n";

        $this->assetService->enqueueScript(
            $handle,
            $this->scriptPath,
            [
                'wp-i18n',
            ],
            true
        );

        $json = $this->getLocalizedTranslations();

        $variableName = $this->getVariableNameFromTextDomain();

        if (empty($variableName)) {
            return;
        }

        $this->assetService->localizeScript(
            $handle,
            $variableName,
            [
                'data' => $json,
            ]
        );
    }

    /**
     * Get the variable name from the text domain.
     *
     * @return string The variable name.
     * @since 1.0.0
     */
    private function getVariableNameFromTextDomain(): string
    {
        $variableName = preg_replace_callback(
            '/-([a-z])/',
            fn($matches) => strtoupper($matches[1]),
            "{$this->textDomain}I18n"
        );

        return $variableName ?? '';
    }

    /**
     * Get the localized translations from the JSON file and
     * return it as an array.
     *
     * @return array<string, mixed> The localized translations.
     * @since 1.0.0
     */
    private function getLocalizedTranslations(): array
    {
        $currentLocale = get_user_locale();

        $jsonPath = "{$this->languagesPath}{$this->textDomain}-{$currentLocale}.json";

        if (! file_exists($jsonPath)) {
            return [];
        }

        try {
            $json = $this->fileSystemAdapter->getContents($jsonPath);
        } catch (InvalidArgumentException $exception) {
            return [];
        }

        if (false === $json) {
            return [];
        }

        return json_decode($json, true);
    }
}
