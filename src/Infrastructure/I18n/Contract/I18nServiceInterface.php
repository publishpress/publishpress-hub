<?php

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\I18n\Contract;

interface I18nServiceInterface
{
    /**
     * Load the plugin text domain
     *
     * @since 1.0.0
     */
    public function loadTextDomain(): void;

    /**
     * Get the current WordPress locale
     *
     * @since 1.0.0
     */
    public function getLocale(): string;

    /**
     * Enqueue a JavaScript file with translation data
     *
     * @since 1.0.0
     */
    public function enqueueTranslationsScript(string $handle, string $scriptPath): void;

    /**
     * Get the text domain
     *
     * @since 1.0.0
     */
    public function getTextDomain(): string;
}
