<?php

/**
 * Service interface.
 *
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Contracts;

/**
 * Service interface.
 *
 * @since 1.0.0
 */
interface ServiceInterface
{
    /**
     * Initialize the service.
     *
     * @since 1.0.0
     * @return self
     */
    public function initialize(): self;

    /**
     * Check if the service is initialized.
     *
     * @since 1.0.0
     * @return bool
     */
    public function isInitialized(): bool;
}
