<?php

/**
 * Interface for components that need to be loaded and initialized in a controlled manner.
 *
 * @package PublishPress\Hub\Application\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Contract;

\defined('ABSPATH') || exit;

interface BootableInterface
{
    /**
     * Checks if the component has been loaded.
     *
     * @since 1.0.0
     */
    public function isLoaded(): bool;

    /**
     * Checks if the component has been initialized.
     *
     * @since 1.0.0
     */
    public function isInitialized(): bool;

    /**
     * Loads the component resources and dependencies.
     *
     * @since 1.0.0
     */
    public function load(): void;

    /**
     * Initializes the component and makes it ready for use.
     *
     * @since 1.0.0
     */
    public function init(): void;
}
