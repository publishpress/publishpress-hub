<?php

/**
 * Authenticated REST endpoints for the React AI Connections page.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Rest;

defined('ABSPATH') || exit;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Service\Access\HubAccessService;
use PublishPress\Hub\Application\Service\Mcp\McpAdapterInstallationService;
use PublishPress\Hub\Application\Service\Mcp\McpSetupService;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiServiceInterface;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use RuntimeException;
use WP_REST_Request;
use WP_REST_Server;

class McpController implements BootableInterface
{
    use BootableTrait;

    private string $restApiNamespace;

    private RestApiServiceInterface $restApiService;

    private McpSetupService $setupService;

    private McpAdapterInstallationService $installationService;

    /**
     * @param string $restApiNamespace Shared Hub namespace.
     * @param RestApiServiceInterface $restApiService Shared REST registration and responses.
     * @param McpSetupService $setupService Connection state and preferences.
     * @param McpAdapterInstallationService $installationService Official adapter installer.
     * @since 1.2.0
     */
    public function __construct(
        string $restApiNamespace,
        RestApiServiceInterface $restApiService,
        McpSetupService $setupService,
        McpAdapterInstallationService $installationService
    ) {
        $this->restApiNamespace = $restApiNamespace;
        $this->restApiService = $restApiService;
        $this->setupService = $setupService;
        $this->installationService = $installationService;
    }

    /**
     * @return void
     * @since 1.2.0
     */
    protected function onLoad(): void
    {
        $this->addRoutes();
    }

    /**
     * Register authenticated routes through Hub's shared REST service.
     *
     * @return void
     * @since 1.2.0
     */
    private function addRoutes(): void
    {
        $filters = [
            'plugin' => ['type' => 'string', 'default' => '', 'sanitize_callback' => 'sanitize_key'],
            'search' => ['type' => 'string', 'default' => '', 'sanitize_callback' => 'sanitize_text_field'],
            'behavior' => ['type' => 'string', 'default' => '', 'enum' => ['', 'read', 'write', 'destructive']],
            'action_page' => ['type' => 'integer', 'minimum' => 1, 'default' => 1],
        ];
        $actionNames = [
            'type' => 'array',
            'items' => ['type' => 'string'],
            'default' => [],
            'validate_callback' => static function ($value): bool {
                return is_array($value) && array_values($value) === $value
                    && count(array_filter($value, 'is_string')) === count($value);
            },
        ];
        $settings = [
            'enabled' => ['type' => 'boolean', 'required' => true],
            'writesEnabled' => ['type' => 'boolean', 'required' => true],
            'selectedActions' => $actionNames,
            'displayedActions' => $actionNames,
            'client' => ['type' => 'string', 'enum' => ['assistant', 'manual']],
            'setupComplete' => ['type' => 'boolean'],
            'reviewActions' => ['type' => 'boolean', 'default' => false],
        ];
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/mcp/connection',
            WP_REST_Server::READABLE,
            [$this, 'getState'],
            [$this, 'checkPermissions'],
            $filters
        ));
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/mcp/connection',
            WP_REST_Server::CREATABLE,
            [$this, 'save'],
            [$this, 'checkPermissions'],
            array_merge($filters, $settings)
        ));
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/mcp/adapter',
            WP_REST_Server::CREATABLE,
            [$this, 'installAdapter'],
            [$this, 'checkInstallPermissions']
        ));
    }

    /**
     * @return void
     * @since 1.2.0
     */
    protected function onInit(): void
    {
    }

    /**
     * @param WP_REST_Request $request REST request.
     * @return bool
     * @since 1.2.0
     */
    public function checkPermissions(WP_REST_Request $request): bool
    {
        return HubAccessService::canManageMcp();
    }

    /**
     * @param WP_REST_Request $request REST request.
     * @return bool
     * @since 1.2.0
     */
    public function checkInstallPermissions(WP_REST_Request $request): bool
    {
        return $this->checkPermissions($request) && current_user_can('activate_plugins')
            && (file_exists(WP_PLUGIN_DIR . '/' . McpAdapterInstallationService::PLUGIN_FILE)
                || (current_user_can('install_plugins') && wp_is_file_mod_allowed('plugins')));
    }

    /**
     * @param WP_REST_Request $request Validated action filters.
     * @return array<string, mixed>
     * @since 1.2.0
     */
    public function getState(WP_REST_Request $request): array
    {
        return ['state' => $this->setupService->getState($request->get_params())];
    }

    /**
     * @param WP_REST_Request $request Validated exposure settings and preferences.
     * @return array<string, mixed>
     * @since 1.2.0
     */
    public function save(WP_REST_Request $request): array
    {
        return $this->setupService->save($request->get_params());
    }

    /**
     * Activate the adapter. The client fetches fresh state on a new WordPress request.
     *
     * @param WP_REST_Request $request Authorized install request.
     * @return array<string, mixed>
     * @since 1.2.0
     */
    public function installAdapter(WP_REST_Request $request): array
    {
        if (!$this->installationService->install()) {
            throw new RuntimeException(__('MCP Adapter could not be installed or activated. Use the plugin page or contact your host.', 'publishpress-hub'));
        }
        return ['message' => __('MCP Adapter activated.', 'publishpress-hub')];
    }
}
