<?php

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Exception;

/**
 * Trait that provides context functionality for domain exceptions.
 *
 * @since 1.0.0
 */
trait ContextTrait
{
    /**
     * @var array
     */
    private $context = [];

    /**
     * Set context information.
     *
     * @since 1.0.0
     * @param array $context
     * @return void
     */
    protected function setContext(array $context): void
    {
        $this->context = $context;
    }

    /**
     * Get context information.
     *
     * @since 1.0.0
     * @return array
     */
    public function getContext(): array
    {
        return $this->context;
    }

    /**
     * Check if context is empty.
     *
     * @since 1.0.0
     * @return bool
     */
    public function hasContext(): bool
    {
        return !empty($this->context);
    }
}
