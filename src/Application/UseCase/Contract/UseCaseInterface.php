<?php

/**
 * Interface for use cases.
 *
 * @package PublishPress\Hub\Application\UseCase\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Contract;

use WP_REST_Request;

\defined('ABSPATH') || exit;

interface UseCaseInterface
{
    /**
     * Executes the use case.
     *
     * @param WP_REST_Request $request The request object.
     * @return array<string, mixed> The response data.
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array;
}
