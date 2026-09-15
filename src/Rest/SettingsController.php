<?php

/**
 * Settings REST controller.
 *
 * @package PublishPress\Hub\Rest
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Rest;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Service\Access\HubAccessService;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Application\UseCase\Settings\ClearDebugLogUseCase;
use PublishPress\Hub\Application\UseCase\Settings\GetDebugLogUseCase;
use PublishPress\Hub\Application\UseCase\Settings\GetDiagnosticsSettingsUseCase;
use PublishPress\Hub\Application\UseCase\Settings\GetSiteHealthReportUseCase;
use PublishPress\Hub\Application\UseCase\Settings\UpdateDiagnosticsSettingsUseCase;
use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiServiceInterface;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

class SettingsController implements BootableInterface
{
    use BootableTrait;

    private string $restApiNamespace;

    private RestApiServiceInterface $restApiService;

    private GetDiagnosticsSettingsUseCase $getDiagnosticsSettingsUseCase;

    private UpdateDiagnosticsSettingsUseCase $updateDiagnosticsSettingsUseCase;

    private GetDebugLogUseCase $getDebugLogUseCase;

    private ClearDebugLogUseCase $clearDebugLogUseCase;

    private GetSiteHealthReportUseCase $getSiteHealthReportUseCase;

    /**
     * @param string $restApiNamespace
     * @param RestApiServiceInterface $restApiService
     * @param GetDiagnosticsSettingsUseCase $getDiagnosticsSettingsUseCase
     * @param UpdateDiagnosticsSettingsUseCase $updateDiagnosticsSettingsUseCase
     * @param GetDebugLogUseCase $getDebugLogUseCase
     * @param ClearDebugLogUseCase $clearDebugLogUseCase
     * @param GetSiteHealthReportUseCase $getSiteHealthReportUseCase
     * @since 1.0.0
     */
    public function __construct(
        string $restApiNamespace,
        RestApiServiceInterface $restApiService,
        GetDiagnosticsSettingsUseCase $getDiagnosticsSettingsUseCase,
        UpdateDiagnosticsSettingsUseCase $updateDiagnosticsSettingsUseCase,
        GetDebugLogUseCase $getDebugLogUseCase,
        ClearDebugLogUseCase $clearDebugLogUseCase,
        GetSiteHealthReportUseCase $getSiteHealthReportUseCase
    ) {
        $this->restApiNamespace = $restApiNamespace;
        $this->restApiService = $restApiService;
        $this->getDiagnosticsSettingsUseCase = $getDiagnosticsSettingsUseCase;
        $this->updateDiagnosticsSettingsUseCase = $updateDiagnosticsSettingsUseCase;
        $this->getDebugLogUseCase = $getDebugLogUseCase;
        $this->clearDebugLogUseCase = $clearDebugLogUseCase;
        $this->getSiteHealthReportUseCase = $getSiteHealthReportUseCase;
    }

    /**
     * On load.
     *
     * @return void
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        $this->addRoutes();
    }

    /**
     * On init.
     *
     * @return void
     * @since 1.0.0
     */
    protected function onInit(): void
    {
        return;
    }

    /**
     * Registers all settings-related REST routes.
     *
     * @return void
     * @since 1.0.0
     */
    private function addRoutes(): void
    {
        // GET /settings/diagnostics
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/settings/diagnostics',
            WP_REST_Server::READABLE,
            $this->getDiagnosticsSettingsUseCase,
            [$this, 'checkPermissions']
        ));

        // POST /settings/diagnostics
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/settings/diagnostics',
            WP_REST_Server::CREATABLE,
            $this->updateDiagnosticsSettingsUseCase,
            [$this, 'checkPermissions'],
            [
                'debug_mode' => [
                    'required' => true,
                    'type' => 'boolean',
                    'sanitize_callback' => 'rest_sanitize_boolean',
                ],
            ]
        ));

        // GET /settings/debug-log
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/settings/debug-log',
            WP_REST_Server::READABLE,
            $this->getDebugLogUseCase,
            [$this, 'checkPermissions']
        ));

        // POST /settings/debug-log/clear
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/settings/debug-log/clear',
            WP_REST_Server::CREATABLE,
            $this->clearDebugLogUseCase,
            [$this, 'checkPermissions']
        ));

        // GET /settings/site-health-report
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/settings/site-health-report',
            WP_REST_Server::READABLE,
            $this->getSiteHealthReportUseCase,
            [$this, 'checkPermissions']
        ));
    }

    /**
     * Checks that the current user has permission to manage settings.
     *
     * @param WP_REST_Request $request
     * @return bool
     * @since 1.0.0
     */
    public function checkPermissions(WP_REST_Request $request): bool
    {
        return current_user_can(HubAccessService::CAPABILITY);
    }
}
