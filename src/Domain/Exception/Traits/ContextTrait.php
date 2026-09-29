<?php

/**
 * Context trait.
 *
 * @package PublishPress\Hub\Domain\Exception\Traits
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Exception\Traits;

defined('ABSPATH') || exit;

/**
 * Trait that provides context functionality for domain exceptions.
 *
 * @since 1.0.0
 */
trait ContextTrait
{
    /**
     * The context of the exception.
     *
     * @var array<string, mixed>
     * @since 1.0.0
     */
    private $context = [];

    /**
     * Set context information.
     *
     * @since 1.0.0
     * @param array<string, mixed> $context The context of the exception.
     * @return void
     * @since 1.0.0
     */
    protected function setContext(array $context): void
    {
        $this->context = $context;
    }

    /**
     * Get context information.
     *
     * @since 1.0.0
     * @return array<string, mixed> The context of the exception.
     * @since 1.0.0
     */
    public function getContext(): array
    {
        return $this->context;
    }

    /**
     * Check if context is empty.
     *
     * @since 1.0.0
     * @return bool True if the exception has context, false otherwise.
     * @since 1.0.0
     */
    public function hasContext(): bool
    {
        return !empty($this->context);
    }
}
