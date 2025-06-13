<?php

declare(strict_types=1);

namespace PublishPress\Hub\Tests\Unit\Infrastructure\Container\TestDoubles;

use PublishPress\Hub\Application\Service\Contracts\ServiceInterface;

/**
 * Test service double for testing purposes.
 *
 * @since 1.0.0
 */
class TestService implements ServiceInterface
{
    /**
     * Whether the service has been initialized.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $initialized = false;

    /**
     * Whether the service has been started.
     *
     * @since 1.0.0
     * @var bool
     */
    private bool $started = false;

    /**
     * Initialize the service.
     *
     * @since 1.0.0
     * @return self
     */
    public function initialize(): self
    {
        $this->initialized = true;
        return $this;
    }

    /**
     * Start the service.
     *
     * @since 1.0.0
     */
    public function start(): void
    {
        $this->started = true;
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
     * Check if the service is started.
     *
     * @since 1.0.0
     * @return bool
     */
    public function isStarted(): bool
    {
        return $this->started;
    }
}
