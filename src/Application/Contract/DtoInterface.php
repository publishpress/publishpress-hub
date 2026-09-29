<?php

/**
 * Interface for Data Transfer Objects that can be converted to array representation.
 *
 * @package PublishPress\Hub\Application\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Contract;

defined('ABSPATH') || exit;

interface DtoInterface
{
    /**
     * Converts the DTO to an associative array representation.
     *
     * @since 1.0.0
     * @return array<string, mixed>
     */
    public function toArray(): array;
}
