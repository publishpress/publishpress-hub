<?php

/**
 * Trait for components that need to be loaded and initialized in a controlled manner.
 *
 * @package PublishPress\Hub\Application\Traits
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Traits;

use RuntimeException;

\defined('ABSPATH') || exit;

trait BootableTrait
{
    protected bool $loaded = false;

    protected bool $initialized = false;

    /**
     * Checks if the component has been loaded.
     *
     * @since 1.0.0
     */
    public function isLoaded(): bool
    {
        return $this->loaded;
    }

    /**
     * Checks if the component has been initialized.
     *
     * @since 1.0.0
     */
    public function isInitialized(): bool
    {
        return $this->initialized;
    }

    /**
     * Loads the component resources and dependencies.
     *
     * @since 1.0.0
     */
    public function load(): void
    {
        if ($this->isLoaded()) {
            return;
        }

        $this->onLoad();

        $this->loaded = true;
    }

    /**
     * Initializes the component and makes it ready for use.
     *
     * @throws RuntimeException If the component is not loaded.
     * @since 1.0.0
     */
    public function init(): void
    {
        if ($this->isInitialized()) {
            return;
        }

        if (!$this->isLoaded()) {
            throw new RuntimeException(
                esc_html__('Object must be loaded before initializing.', 'publishpress-hub')
            );
        }

        $this->onInit();

        $this->initialized = true;
    }

    /**
     * Loads the component resources and dependencies.
     *
     * @since 1.0.0
     */
    abstract protected function onLoad(): void;

    /**
     * Initializes the component and makes it ready for use.
     *
     * @since 1.0.0
     */
    abstract protected function onInit(): void;
}
