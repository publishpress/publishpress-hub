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
use PublishPress\Hub\Application\Service\RestApi\Contracts\PluginFamilyDtoMapperInterface;
use PublishPress\Hub\Application\Service\RestApi\ExceptionResponseMapper;
use PublishPress\Hub\Domain\Plugin\Contracts\FreePluginInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Exception\PluginFamilyNotFoundException;
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
    private PluginFamilyRepositoryInterface $pluginFamilyRepository;

    /**
     * The plugin mapper.
     *
     * @since 1.0.0
     * @var PluginFamilyDtoMapperInterface
     */
    private PluginFamilyDtoMapperInterface $pluginFamilyDtoMapper;

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
     * @param PluginFamilyRepositoryInterface $pluginFamilyRepository The plugin family repository
     * @param PluginFamilyDtoMapperInterface $pluginFamilyDtoMapper The plugin family DTO mapper
     * @param PluginInstallationService $pluginInstallationService The plugin installation service
     * @param ExceptionResponseMapper $exceptionResponseMapper The exception response mapper
     */
    public function __construct(
        PluginFamilyRepositoryInterface $pluginFamilyRepository,
        PluginFamilyDtoMapperInterface $pluginFamilyDtoMapper,
        PluginInstallationService $pluginInstallationService,
        ExceptionResponseMapper $exceptionResponseMapper
    ) {
        $this->pluginFamilyRepository = $pluginFamilyRepository;
        $this->pluginFamilyDtoMapper = $pluginFamilyDtoMapper;
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
                'callback' => [$this, 'getPluginFamilies'],
                'permission_callback' => [$this, 'checkPermissions'],
            ],
        ]);

        $routeWithFamilySlug = $this->route . '/(?P<pluginFamily>[a-zA-Z0-9_-]+)';

        register_rest_route($namespace, $routeWithFamilySlug . '/install/(?P<plugin_type>free|pro)', [
            [
                'methods' => 'POST',
                'callback' => [$this, 'installPlugin'],
                'permission_callback' => [$this, 'checkInstallPermissions'],
                'args' => [
                    'pluginFamily' => [
                        'type' => 'string',
                        'required' => true,
                        'description' => 'The slug of the plugin family to install.',
                        'validate_callback' => [$this, 'validateSlugParam'],
                    ],
                    'plugin_type' => [
                        'type' => 'string',
                        'required' => true,
                        'description' => 'The type of plugin to install. Can be "free" or "pro".',
                        'validate_callback' => [$this, 'validatePluginTypeParam'],
                    ],
                    'license_key' => [
                        'type' => 'string',
                        'required' => false,
                        'description' => 'The license key to install the plugin.',
                        'validate_callback' => [$this, 'validateLicenseKeyParam'],
                    ],
                ],
            ],
        ]);

        register_rest_route($namespace, $routeWithFamilySlug . '/uninstall', [
            [
                'methods' => 'POST',
                'callback' => [$this, 'uninstallPlugin'],
                'permission_callback' => [$this, 'checkInstallPermissions'],
                'args' => [
                    'pluginFamily' => [
                        'type' => 'string',
                        'required' => true,
                        'description' => 'The slug of the plugin family to install.',
                        'validate_callback' => [$this, 'validateSlugParam'],
                    ],
                ],
            ],
        ]);

        register_rest_route($namespace, $routeWithFamilySlug . '/activate', [
            [
                'methods' => 'POST',
                'callback' => [$this, 'activatePlugin'],
                'permission_callback' => [$this, 'checkInstallPermissions'],
                'args' => [
                    'pluginFamily' => [
                        'type' => 'string',
                        'required' => true,
                        'description' => 'The slug of the plugin family to install.',
                        'validate_callback' => [$this, 'validateSlugParam'],
                    ],
                ],
            ],
        ]);

        register_rest_route($namespace, $routeWithFamilySlug . '/deactivate', [
            [
                'methods' => 'POST',
                'callback' => [$this, 'deactivatePlugin'],
                'permission_callback' => [$this, 'checkInstallPermissions'],
                'args' => [
                    'pluginFamily' => [
                        'type' => 'string',
                        'required' => true,
                        'description' => 'The slug of the plugin family to install.',
                        'validate_callback' => [$this, 'validateSlugParam'],
                    ],
                ],
            ],
        ]);

        register_rest_route($namespace, $routeWithFamilySlug . '/upgrade-to-pro', [
            [
                'methods' => 'POST',
                'callback' => [$this, 'upgradePluginToPro'],
                'permission_callback' => [$this, 'checkInstallPermissions'],
                'args' => [
                    'pluginFamily' => [
                        'type' => 'string',
                        'required' => true,
                        'description' => 'The slug of the plugin family to install.',
                        'validate_callback' => [$this, 'validateSlugParam'],
                    ],
                ],
            ],
        ]);

        register_rest_route($namespace, $routeWithFamilySlug . '/resolve-conflict', [
            [
                'methods' => 'POST',
                'callback' => [$this, 'resolveConflict'],
                'permission_callback' => [$this, 'checkInstallPermissions'],
                'args' => [
                    'pluginFamily' => [
                        'type' => 'string',
                        'required' => true,
                        'description' => 'The slug of the plugin family to resolve conflict.',
                        'validate_callback' => [$this, 'validateSlugParam'],
                    ],
                    'plugin_to_keep' => [
                        'type' => 'string',
                        'required' => true,
                        'description' => 'The plugin to keep. Can be "free" or "pro".',
                        'validate_callback' => [$this, 'validatePluginTypeParam'],
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
     * Get all registered plugin families.
     *
     * @since 1.0.0
     * @param WP_REST_Request $request The REST request
     * @return WP_REST_Response|WP_Error
     */
    public function getPluginFamilies(WP_REST_Request $request)
    {
        try {
            $pluginFamilies = $this->getAllPluginFamiliesSerializable();

            return new WP_REST_Response([
                'success' => true,
                'data' => (array) $pluginFamilies,
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
     * Install a plugin.
     *
     * @since 1.0.0
     * @param WP_REST_Request $request The REST request
     * @return WP_REST_Response|WP_Error
     */
    public function installPlugin(WP_REST_Request $request)
    {
        try {
            $pluginType = $request->get_param('plugin_type');

            if ($pluginType === 'free') {
                return $this->installFreePlugin($request);
            } else {
                return $this->installProPlugin($request);
            }
        } catch (Throwable $e) {
            return $this->exceptionResponseMapper->mapToWpError($e);
        }
    }

    /**
     * Uninstall a plugin.
     *
     * @since 1.0.0
     * @param WP_REST_Request $request The REST request
     * @return WP_REST_Response|WP_Error
     */
    public function uninstallPlugin(WP_REST_Request $request)
    {
        try {
            $pluginFamilySlug = $request->get_param('pluginFamily');

            $plugin = $this->getInstalledPluginByFamilySlug($pluginFamilySlug);

            $uninstalled = $this->pluginInstallationService->uninstallPlugin($plugin);

            if (!$uninstalled) {
                throw new PluginInstallationException('Failed to uninstall plugin');
            }

            return new WP_REST_Response([
                'success' => true,
                'data' => [
                    'pluginFamily' => $pluginFamilySlug,
                ],
            ], 200);
        } catch (Throwable $e) {
            return $this->exceptionResponseMapper->mapToWpError($e);
        }
    }

    /**
     * Activate a plugin.
     *
     * @since 1.0.0
     * @param WP_REST_Request $request The REST request
     * @return WP_REST_Response|WP_Error
     * @throws PluginInstallationException If plugin is not installed
     */
    public function activatePlugin(WP_REST_Request $request)
    {
        try {
            $pluginFamilySlug = $request->get_param('pluginFamily');

            $plugin = $this->getInstalledPluginByFamilySlug($pluginFamilySlug);

            $activated = $this->pluginInstallationService->activatePlugin($plugin);

            if (!$activated) {
                throw new PluginInstallationException('Failed to activate plugin');
            }

            return new WP_REST_Response([
                'success' => true,
                'data' => [
                    'pluginFamily' => $pluginFamilySlug,
                ],
            ], 200);
        } catch (Throwable $e) {
            return $this->exceptionResponseMapper->mapToWpError($e);
        }
    }

    /**
     * Deactivate a plugin.
     *
     * @since 1.0.0
     * @param WP_REST_Request $request The REST request
     * @return WP_REST_Response|WP_Error
     */
    public function deactivatePlugin(WP_REST_Request $request)
    {
        try {
            $pluginFamilySlug = $request->get_param('pluginFamily');

            $plugin = $this->getInstalledPluginByFamilySlug($pluginFamilySlug);

            $deactivated = $this->pluginInstallationService->deactivatePlugin($plugin);

            if (!$deactivated) {
                throw new PluginInstallationException('Failed to deactivate plugin');
            }

            return new WP_REST_Response([
                'success' => true,
                'data' => [
                    'pluginFamily' => $pluginFamilySlug,
                ],
            ], 200);
        } catch (Throwable $e) {
            return $this->exceptionResponseMapper->mapToWpError($e);
        }
    }

    /**
     * Upgrade a plugin to Pro.
     *
     * @since 1.0.0
     * @param WP_REST_Request $request The REST request
     * @return WP_REST_Response|WP_Error
     */
    public function upgradePluginToPro(WP_REST_Request $request)
    {
        try {
            $pluginFamilySlug = $request->get_param('pluginFamily');
            $licenseKey = $request->get_param('license_key');

            $plugin = $this->getPluginFamilyBySlug($pluginFamilySlug)->getFreePlugin();

            $upgraded = $this->pluginInstallationService->upgradePluginToPro($plugin, $licenseKey);

            if (!$upgraded) {
                throw new PluginInstallationException('Failed to upgrade plugin to Pro');
            }

            return new WP_REST_Response([
                'success' => true,
                'data' => [
                    'pluginFamily' => $pluginFamilySlug
                ],
            ], 200);
        } catch (Throwable $e) {
            return $this->exceptionResponseMapper->mapToWpError($e);
        }
    }

    /**
     * Resolve a conflict.
     *
     * @since 1.0.0
     * @param WP_REST_Request $request The REST request
     * @return WP_REST_Response|WP_Error
     */
    public function resolveConflict(WP_REST_Request $request)
    {
        try {
            $pluginFamilySlug = $request->get_param('pluginFamily');
            $pluginToKeep = $request->get_param('plugin_to_keep');

            $pluginFamily = $this->getPluginFamilyBySlug($pluginFamilySlug);

            $resolved = $this->pluginInstallationService->resolveConflict($pluginFamily, $pluginToKeep);

            if (!$resolved) {
                throw new PluginInstallationException('Failed to resolve conflict');
            }

            return new WP_REST_Response([
                'success' => true,
                'data' => [
                    'pluginFamily' => $pluginFamilySlug,
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

    /**
     * Validate the plugin type parameter.
     *
     * @since 1.0.0
     * @param string $param The parameter value
     * @param WP_REST_Request $request The REST request
     * @param string $key The parameter key
     * @return bool
     */
    public function validatePluginTypeParam(string $param, WP_REST_Request $request, string $key): bool
    {
        return !empty($param) && in_array($param, ['free', 'pro'], true);
    }

    /**
     * Install a free plugin.
     *
     * @since 1.0.0
     * @param WP_REST_Request $request The REST request
     * @return WP_REST_Response|WP_Error
     */
    private function installFreePlugin(WP_REST_Request $request)
    {
        try {
            $pluginFamilySlug = $request->get_param('pluginFamily');

            $pluginFamily = $this->getPluginFamilyBySlug($pluginFamilySlug);

            $installed = $this->pluginInstallationService->installFreePlugin($pluginFamily->getFreePlugin());

            if (!$installed) {
                throw new PluginInstallationException('Failed to install plugin');
            }

            return new WP_REST_Response([
                'success' => true,
                'data' => [
                'pluginFamily' => $pluginFamilySlug,
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
    private function installProPlugin(WP_REST_Request $request)
    {
        try {
            $pluginFamilySlug = $request->get_param('pluginFamily');
            $licenseKey = $request->get_param('license_key');

            $plugin = $this->getPluginFamilyBySlug($pluginFamilySlug)->getProPlugin();

            $installed = $this->pluginInstallationService->installProPlugin($plugin, $licenseKey);

            if (!$installed) {
                throw new PluginInstallationException('Failed to install plugin');
            }

            return new WP_REST_Response([
                'success' => true,
                'data' => [
                    'pluginFamily' => $pluginFamilySlug
                ],
            ], 200);
        } catch (Throwable $e) {
            return $this->exceptionResponseMapper->mapToWpError($e);
        }
    }

    /**
     * Get a plugin by family slug.
     *
     * @since 1.0.0
     * @param string $pluginFamilySlug
     * @return FreePluginInterface
     * @throws PluginFamilyNotFoundException
     * @throws PluginInstallationException If plugin is not installed
     */
    private function getInstalledPluginByFamilySlug(string $pluginFamilySlug): FreePluginInterface
    {
        $pluginFamily = $this->getPluginFamilyBySlug($pluginFamilySlug);

        if ($pluginFamily->getFreePlugin()->isInstalled()) {
            return $pluginFamily->getFreePlugin();
        } elseif ($pluginFamily->getProPlugin()->isInstalled()) {
            return $pluginFamily->getProPlugin();
        }

        throw new PluginInstallationException('Plugin is not installed');
    }

    /**
     * Get all plugin families in a serializable format.
     *
     * @since 1.0.0
     * @return array
     */
    private function getAllPluginFamiliesSerializable(): array
    {
        $pluginFamilies = $this->pluginFamilyRepository->getAllPluginFamilies();

        $pluginFamilies = $this->pluginFamilyDtoMapper->toDtoArray($pluginFamilies);
        $pluginFamilies = $this->pluginFamilyDtoMapper->toSerializableArray($pluginFamilies);

        return $pluginFamilies;
    }

    /**
     * Get plugin family by slug from repository.
     *
     * @since 1.0.0
     * @param string $slug The plugin family slug
     * @return PluginFamilyInterface The plugin family
     * @throws PluginFamilyNotFoundException If plugin is not found
     */
    private function getPluginFamilyBySlug(string $slug): PluginFamilyInterface
    {
        $pluginFamily = $this->pluginFamilyRepository->findByFamilySlug($slug);

        if (!$pluginFamily) {
            throw new PluginFamilyNotFoundException($slug);
        }

        return $pluginFamily;
    }
}
