<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;
use PublishPress\Hub\Application\Hooks as ApplicationHooks;

/**
 * Language service.
 *
 * @since 1.0.0
 */
class LanguageService implements ServiceInterface
{
    private bool $initialized = false;

    public function initialize(): self
    {
        if ($this->initialized) {
            return $this;
        }

        $this->initialized = true;

        $this->registerHooks();

        return $this;
    }

    public function isInitialized(): bool
    {
        return $this->initialized;
    }

    private function registerHooks(): void
    {
        add_action(ApplicationHooks::ACTION_INIT, [$this, 'loadTextdomain']);
    }

    public function loadTextdomain(): void
    {
        load_plugin_textdomain('publishpress-hub', false, PUBLISHPRESS_HUB_LANGUAGES_PATH);
    }
}
