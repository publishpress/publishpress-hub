<?php

/**
 * Statistics service interface.
 *
 * @package PublishPress\Hub\Application\Service\Statistics\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Statistics\Contract;
defined( 'ABSPATH' ) || exit;

interface StatisticsServiceInterface
{
    /**
     * Filter HTTP request arguments to add statistics data to EDD API requests.
     *
     * @param array<string, mixed> $args The request arguments.
     * @param string $url The request URL.
     * @return array<string, mixed> The filtered request arguments.
     * @since 1.0.0
     */
    public function filterHttpRequestArgs(array $args, string $url): array;
}
