<?php

/**
 * Plugins REST API endpoint.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\RestApi\Endpoints;

use PublishPress\Hub\Application\Service\RestApi\Contracts\EndpointInterface;
use PublishPress\Hub\Application\Service\RestApi\Contracts\PluginMapperInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginRepositoryInterface;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

/**
 * Plugins endpoint for REST API.
 *
 * This endpoint handles plugin-related operations through the REST API
 * following Domain Driven Development principles.
 *
 * @since 1.0.0
 */
class PluginsEndpoint implements EndpointInterface
{
    /**
     * The endpoint route.
     *
     * @since 1.0.0
     * @var string
     */
    private string $route = '/plugins';

    /**
     * The plugin repository.
     *
     * @since 1.0.0
     * @var PluginRepositoryInterface
     */
    private PluginRepositoryInterface $pluginRepository;

    /**
     * The plugin mapper.
     *
     * @since 1.0.0
     * @var PluginMapperInterface
     */
    private PluginMapperInterface $pluginMapper;

    /**
     * Constructor.
     *
     * @since 1.0.0
     * @param PluginRepositoryInterface $pluginRepository The plugin repository
     */
    public function __construct(
        PluginRepositoryInterface $pluginRepository,
        PluginMapperInterface $pluginMapper
    ) {
        $this->pluginRepository = $pluginRepository;
        $this->pluginMapper = $pluginMapper;
    }

    /**
     * Register the endpoint with WordPress REST API.
     *
     * @since 1.0.0
     * @param string $namespace The API namespace
     * @return void
     */
    public function register(string $namespace): void
    {
        register_rest_route($namespace, $this->route, [
            [
                'methods' => 'GET',
                'callback' => [$this, 'getPlugins'],
                'permission_callback' => [$this, 'checkPermissions'],
            ],
        ]);
    }

    /**
     * Get the endpoint route.
     *
     * @since 1.0.0
     * @return string
     */
    public function getRoute(): string
    {
        return $this->route;
    }

    /**
     * Get all registered plugins.
     *
     * @since 1.0.0
     * @param WP_REST_Request $request The REST request
     * @return WP_REST_Response|WP_Error
     */
    public function getPlugins(WP_REST_Request $request)
    {
        try {
            $plugins = $this->pluginRepository->getAllPlugins();
            $plugins = $this->pluginMapper->toDtoArray($plugins);

            return new WP_REST_Response([
                'success' => true,
                'data' => $plugins,
            ], 200);
        } catch (\Exception $e) {
            return new WP_Error(
                'plugins_fetch_error',
                'Failed to fetch plugins: ' . $e->getMessage(),
                ['status' => 500]
            );
        }
    }

    /**
     * Check if the current user has permission to access the endpoint.
     *
     * @since 1.0.0
     * @param WP_REST_Request $request The REST request
     * @return bool
     */
    public function checkPermissions(WP_REST_Request $request): bool
    {
        return current_user_can('manage_options');
    }
}
