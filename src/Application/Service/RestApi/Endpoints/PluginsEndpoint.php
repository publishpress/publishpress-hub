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

use PublishPress\Hub\Application\Service\Exception\FetchingPluginInformationException;
use PublishPress\Hub\Application\Service\Exception\PluginInstallationException;
use PublishPress\Hub\Application\Service\PluginInstallationService;
use PublishPress\Hub\Application\Service\RestApi\Contracts\EndpointInterface;
use PublishPress\Hub\Application\Service\RestApi\Contracts\PluginMapperInterface;
use PublishPress\Hub\Application\Service\RestApi\ExceptionResponseMapper;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginInterface;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use Throwable;
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
     * The plugin installation service.
     *
     * @since 1.0.0
     * @var PluginInstallationService
     */
    private PluginInstallationService $pluginInstallationService;

    /**
     * The exception response mapper.
     *
     * @since 1.0.0
     * @var ExceptionResponseMapper
     */
    private ExceptionResponseMapper $exceptionResponseMapper;

    /**
     * Constructor.
     *
     * @since 1.0.0
     * @param PluginRepositoryInterface $pluginRepository The plugin repository
     * @param PluginMapperInterface $pluginMapper The plugin mapper
     * @param PluginInstallationService $pluginInstallationService The plugin installation service
     * @param ExceptionResponseMapper $exceptionResponseMapper The exception response mapper
     */
    public function __construct(
        PluginRepositoryInterface $pluginRepository,
        PluginMapperInterface $pluginMapper,
        PluginInstallationService $pluginInstallationService,
        ExceptionResponseMapper $exceptionResponseMapper
    ) {
        $this->pluginRepository = $pluginRepository;
        $this->pluginMapper = $pluginMapper;
        $this->pluginInstallationService = $pluginInstallationService;
        $this->exceptionResponseMapper = $exceptionResponseMapper;
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

        register_rest_route($namespace, $this->route . '/(?P<plugin_slug>[a-zA-Z0-9_-]+)/install/free', [
            [
                'methods' => 'POST',
                'callback' => [$this, 'installFreePlugin'],
                'permission_callback' => [$this, 'checkInstallPermissions'],
                'args' => [
                    'plugin_slug' => [
                        'type' => 'string',
                        'required' => true,
                        'description' => 'The slug of the plugin to install.',
                        'validate_callback' => [$this, 'validateSlugParam'],
                    ],
                ],
            ],
        ]);

        register_rest_route($namespace, $this->route . '/(?P<plugin_slug>[a-zA-Z0-9_-]+)/install/pro', [
            [
                'methods' => 'POST',
                'callback' => [$this, 'installProPlugin'],
                'permission_callback' => [$this, 'checkInstallPermissions'],
                'args' => [
                    'plugin_slug' => [
                        'type' => 'string',
                        'required' => true,
                        'description' => 'The slug of the plugin to install.',
                        'validate_callback' => [$this, 'validateSlugParam'],
                    ],
                    'license_key' => [
                        'type' => 'string',
                        'required' => true,
                        'description' => 'The license key to install the plugin.',
                        'validate_callback' => [$this, 'validateLicenseKeyParam'],
                    ],
                ],
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
            $plugins = $this->getAllPluginsSerializable();

            return new WP_REST_Response([
                'success' => true,
                'data' => (array) $plugins,
            ], 200);
        } catch (Throwable $e) {
            return $this->exceptionResponseMapper->mapToWpError(
                new FetchingPluginInformationException('Failed to fetch plugins: ' . $e->getMessage())
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

    /**
     * Install a free plugin.
     *
     * @since 1.0.0
     * @param WP_REST_Request $request The REST request
     * @return WP_REST_Response|WP_Error
     */
    public function installFreePlugin(WP_REST_Request $request)
    {
        try {
            $pluginSlug = $request->get_param('plugin_slug');
            $plugin = $this->getPluginBySlug($pluginSlug);

            $installed = $this->pluginInstallationService->installFreePlugin($plugin);

            if (!$installed) {
                throw new PluginInstallationException('Failed to install plugin');
            }

            $plugin->clearCache();

            $plugins = $this->getAllPluginsSerializable();

            return new WP_REST_Response([
                'success' => true,
                'data' => [
                    'plugin_slug' => $pluginSlug,
                    'plugins' => (array) $plugins,
                ],
            ], 200);
        } catch (Throwable $e) {
            return $this->exceptionResponseMapper->mapToWpError($e);
        }
    }

    /**
     * Install a pro plugin.
     *
     * @since 1.0.0
     * @param WP_REST_Request $request The REST request
     * @return WP_REST_Response|WP_Error
     */
    public function installProPlugin(WP_REST_Request $request)
    {
        try {
            $pluginSlug = $request->get_param('plugin_slug');
            $licenseKey = $request->get_param('license_key');

            $plugin = $this->getPluginBySlug($pluginSlug);

            $installed = $this->pluginInstallationService->installProPlugin($plugin, $licenseKey);

            if (!$installed) {
                throw new PluginInstallationException('Failed to install plugin');
            }

            $plugin->clearCache();

            $plugins = $this->getAllPluginsSerializable();

            return new WP_REST_Response([
                'success' => true,
                'data' => [
                    'plugin_slug' => $pluginSlug,
                    'plugins' => (array) $plugins,
                ],
            ], 200);
        } catch (Throwable $e) {
            return $this->exceptionResponseMapper->mapToWpError($e);
        }
    }

    /**
     * Check if the current user has permission to install a plugin.
     *
     * @since 1.0.0
     * @param WP_REST_Request $request The REST request
     * @return bool
     */
    public function checkInstallPermissions(WP_REST_Request $request): bool
    {
        return current_user_can('install_plugins');
    }

    /**
     * Get all plugins in a serializable format.
     *
     * @since 1.0.0
     * @return array
     */
    private function getAllPluginsSerializable(): array
    {
        $plugins = $this->pluginRepository->getAllPlugins();
        $plugins = $this->pluginMapper->toDtoArray($plugins);
        $plugins = $this->pluginMapper->toSerializableArray($plugins);

        return $plugins;
    }

    /**
     * Get plugin by slug from repository.
     *
     * @since 1.0.0
     * @param string $slug The plugin slug
     * @return PluginInterface The plugin
     * @throws PluginNotFoundException If plugin is not found
     */
    private function getPluginBySlug(string $slug): PluginInterface
    {
        $plugin = $this->pluginRepository->findBySlug($slug);

        if (!$plugin) {
            throw new PluginNotFoundException($slug);
        }

        return $plugin;
    }

    /**
     * Validate the slug parameter.
     *
     * @since 1.0.0
     * @param string $param The parameter value
     * @param WP_REST_Request $request The REST request
     * @param string $key The parameter key
     * @return bool
     */
    public function validateSlugParam(string $param, WP_REST_Request $request, string $key): bool
    {
        return !empty($param) && preg_match('/^[a-zA-Z0-9_-]+$/', $param);
    }

    /**
     * Validate the license key parameter.
     *
     * @since 1.0.0
     * @param string $param The parameter value
     * @param WP_REST_Request $request The REST request
     * @param string $key The parameter key
     * @return bool
     */
    public function validateLicenseKeyParam(string $param, WP_REST_Request $request, string $key): bool
    {
        return !empty($param) && preg_match('/^[a-zA-Z0-9_-]+$/', $param);
    }
}
