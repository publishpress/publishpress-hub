<?php

/**
 * With context interface.
 *
 * @package PublishPress\Hub\Domain\Exception\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Domain\Exception\Contract;

use Exception;

interface WithContextInterface
{
    /**
     * Gets the context of the exception.
     *
     * @return array<string, mixed> The context of the exception.
     * @since 1.0.0
     */
    public function getContext(): array;

    /**
     * Checks if the exception has context.
     *
     * @return bool True if the exception has context, false otherwise.
     * @since 1.0.0
     */
    public function hasContext(): bool;

    /**
     * Gets the message of the exception.
     *
     * @return string The message of the exception.
     * @since 1.0.0
     */
    public function getMessage();

    /**
     * Gets the code of the exception.
     *
     * @return int|string The code of the exception.
     * @since 1.0.0
     */
    public function getCode();
}
