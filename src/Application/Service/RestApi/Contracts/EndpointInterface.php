<?php

/**
 * Endpoint interface for REST API endpoints.
 *
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\RestApi\Contracts;

/**
 * Endpoint interface.
 *
 * @since 1.0.0
 */
interface EndpointInterface
{
    /**
     * Register the endpoint with WordPress REST API.
     *
     * @since 1.0.0
     * @param string $namespace The API namespace
     * @return void
     */
    public function register(string $namespace): void;

    /**
     * Get the endpoint route.
     *
     * @since 1.0.0
     * @return string
     */
    public function getRoute(): string;
}
