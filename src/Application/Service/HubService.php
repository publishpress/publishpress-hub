<?php declare(strict_types=1);
/**
 * Hub service for the PublishPress Hub library.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

namespace PublishPress\Hub\Application\Service;

/**
 * Application service for managing the PublishPress Hub library.
 *
 * This service coordinates domain operations and provides the main entry point
 * for the library functionality following DDD principles.
 *
 * @since 1.0.0
 */
class HubService
{
    /**
     * Whether the service has been initialized.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $initialized = false;

    /**
     * Constructor.
     *
     * @since 1.0.0
     */
    public function __construct()
    {

    }

    /**
     * Initialize the service.
     *
     * @since 1.0.0
     * @return self
     */
    public function initialize(): self
    {
        if ($this->initialized) {
            return $this;
        }

        // Merge additional config
        $this->initialized = true;

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
}
