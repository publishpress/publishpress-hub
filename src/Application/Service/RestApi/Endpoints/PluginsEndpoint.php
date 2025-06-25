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

use Plugin_Upgrader;
use PublishPress\Hub\Application\Service\RestApi\Contracts\EndpointInterface;
use PublishPress\Hub\Application\Service\RestApi\Contracts\PluginMapperInterface;
use PublishPress\Hub\Application\Service\RestApi\QuietUpgradeSkin;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginRepositoryInterface;
use PublishPress\Hub\Domain\Plugin\Contracts\PluginInterface;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;
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

        register_rest_route($namespace, $this->route . '/(?P<plugin_slug>[a-zA-Z0-9_-]+)/install-free', [
            [
                'methods' => 'POST',
                'callback' => [$this, 'installPluginFree'],
                'permission_callback' => [$this, 'checkInstallPermissions'],
                'args' => [
                    'plugin_slug' => [
                        'type' => 'string',
                        'required' => true,
                        'description' => 'The slug of the plugin to install.',
                        'validate_callback' => function($param, $request, $key) {
                            return !empty($param) && preg_match('/^[a-zA-Z0-9_-]+$/', $param);
                        },
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
            $plugins = $this->pluginRepository->getAllPlugins();
            $plugins = $this->pluginMapper->toDtoArray($plugins);
            $plugins = $this->pluginMapper->toSerializableArray($plugins);

            return new WP_REST_Response([
                'success' => true,
                'data' => (array) $plugins,
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

    /**
     * Install a free plugin.
     *
     * @since 1.0.0
     * @param WP_REST_Request $request The REST request
     * @return WP_REST_Response|WP_Error
     */
    public function installPluginFree(WP_REST_Request $request)
    {
        try {
            $pluginSlug = $request->get_param('plugin_slug');
            $plugin = $this->getPluginBySlug($pluginSlug);

            if ($plugin->isInstalled()) {
                throw new PluginAlreadyInstalledException($pluginSlug);
            }

            if (!function_exists('plugins_api')) {
                require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
            }

            if (!function_exists('get_file_description')) {
                require_once ABSPATH . 'wp-admin/includes/file.php';
            }

            if (!function_exists('got_url_rewrite')) {
                require_once ABSPATH . 'wp-admin/includes/misc.php';
            }

            if (!function_exists('get_plugin_data')) {
                require_once ABSPATH . 'wp-admin/includes/plugin.php';
            }

            if (!class_exists('WP_Upgrader')) {
                require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
            }

            $api = plugins_api('plugin_information', [
                'slug' => $pluginSlug,
                'fields' => [
                    'downloadlink' => true,
                ],
            ]);

            // Start output buffering to catch any remaining HTML output
            ob_start();

            $skin = new QuietUpgradeSkin();
            $upgrader = new Plugin_Upgrader($skin);

            $install = $upgrader->install($api->download_link);

            // Clean any buffered output
            ob_end_clean();

            if (is_wp_error($install)) {
                throw new \Exception($install->get_error_message());
            }

            return new WP_REST_Response([
                'success' => true,
                'data' => ['plugin_slug' => $pluginSlug],
            ], 200);

            return new WP_REST_Response([
                'success' => false,
                'message' => 'Plugin installation not yet implemented',
                'data' => ['plugin_slug' => $pluginSlug],
            ], 501); // 501 Not Implemented
        } catch (PluginNotFoundException $e) {
            return new WP_Error(
                'plugin_not_found',
                $e->getMessage(),
                ['status' => 404]
            );
        } catch (PluginAlreadyInstalledException $e) {
            return new WP_Error(
                'plugin_already_installed',
                $e->getMessage(),
                ['status' => 400]
            );
        } catch (\Exception $e) {
            return new WP_Error(
                'plugin_install_error',
                'Failed to install plugin: ' . $e->getMessage(),
                ['status' => 500]
            );
        }
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
}
