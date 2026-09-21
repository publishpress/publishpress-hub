<?php

/**
 * Service for adding statistics data to EDD API requests.
 *
 * @package PublishPress\Hub\Application\Service\Statistics
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Statistics;
defined( 'ABSPATH' ) || exit;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Service\Statistics\Contract\StatisticsServiceInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;

class StatisticsService implements StatisticsServiceInterface, BootableInterface
{
    use BootableTrait;

    private string $eddSubscriptionApiUrl;

    private string $hubVersion;

    /**
     * EDD actions that should include statistics data.
     *
     * @var array<string>
     */
    private const EDD_ACTIONS = [
        'activate_license',
        'deactivate_license',
        'check_license',
        'get_version',
    ];

    /**
     * @param string $eddSubscriptionApiUrl The EDD subscription API URL.
     * @param string $hubVersion The Hub version.
     * @since 1.0.0
     */
    public function __construct(
        string $eddSubscriptionApiUrl,
        string $hubVersion
    ) {
        $this->eddSubscriptionApiUrl = $eddSubscriptionApiUrl;
        $this->hubVersion = $hubVersion;
    }

    /**
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        // phpcs:ignore WordPressVIPMinimum.Hooks.RestrictedHooks.http_request_args
        add_filter(
            'http_request_args',
            [$this, 'filterHttpRequestArgs'],
            10,
            2
        );
    }

    /**
     * @since 1.0.0
     */
    protected function onInit(): void
    {
    }

    /**
     * Filter HTTP request arguments to add statistics data to EDD API requests.
     *
     * This method hooks into WordPress's http_request_args filter to automatically
     * append Hub version information to all EDD API requests. This enables server-side
     * tracking of which Hub versions are making requests.
     *
     * @param array<string, mixed> $args The request arguments.
     * @param string $url The request URL.
     * @return array<string, mixed> The filtered request arguments.
     * @since 1.0.0
     */
    public function filterHttpRequestArgs(array $args, string $url): array
    {
        // Only process requests to our EDD API
        if (!$this->isEddApiRequest($url)) {
            return $args;
        }

        // Only process specific EDD actions
        if (!$this->isTrackedEddAction($args)) {
            return $args;
        }

        // Add api_data with hub_version to request body
        $args = $this->addStatisticsData($args);

        return $args;
    }

    /**
     * Check if the request is targeting the EDD API.
     *
     * @param string $url The request URL.
     * @return bool True if the request is to the EDD API.
     * @since 1.0.0
     */
    private function isEddApiRequest(string $url): bool
    {
        // Normalize URLs for comparison
        $normalizedUrl = untrailingslashit($url);
        $normalizedApiUrl = untrailingslashit($this->eddSubscriptionApiUrl);

        return strpos($normalizedUrl, $normalizedApiUrl) === 0;
    }

    /**
     * Check if the request contains a tracked EDD action.
     *
     * @param array<string, mixed> $args The request arguments.
     * @return bool True if the request contains a tracked EDD action.
     * @since 1.0.0
     */
    private function isTrackedEddAction(array $args): bool
    {
        if (!isset($args['body']) || !is_array($args['body'])) {
            return false;
        }

        $eddAction = $args['body']['edd_action'] ?? '';

        return in_array($eddAction, self::EDD_ACTIONS, true);
    }

    /**
     * Add statistics data to the request body.
     *
     * @param array<string, mixed> $args The request arguments.
     * @return array<string, mixed> The modified request arguments.
     * @since 1.0.0
     */
    private function addStatisticsData(array $args): array
    {
        if (!isset($args['body']) || !is_array($args['body'])) {
            return $args;
        }

        // Add or merge api_data with hub_version
        if (!isset($args['body']['api_data'])) {
            $args['body']['api_data'] = [];
        }

        // Ensure api_data is an array (it might be a string from another plugin)
        if (!is_array($args['body']['api_data'])) {
            $args['body']['api_data'] = [];
        }

        $args['body']['api_data']['hub_version'] = $this->hubVersion;

        return $args;
    }
}
