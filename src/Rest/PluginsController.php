<?php

/**
 * Plugins controller.
 *
 * @package PublishPress\Hub\Rest
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Rest;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Service\Access\HubAccessService;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Application\UseCase\Plugin\ListPluginsUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\InstallProPluginUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\InstallFreePluginUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\ChangePluginActivationUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\UninstallPluginUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\UpgradePluginUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\UpdatePluginUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\ResolveConflictUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\DeactivateLicenseUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\ActivateLicenseUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\ValidateLicensesUseCase;
use PublishPress\Hub\Application\Service\License\LicenseExpirationNoticeService;
use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiServiceInterface;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;

class PluginsController implements BootableInterface
{
    use BootableTrait;

    private RestApiServiceInterface $restApiService;
    private ListPluginsUseCase $listPluginsUseCase;
    private InstallFreePluginUseCase $installFreePluginUseCase;
    private InstallProPluginUseCase $installProPluginUseCase;
    private ChangePluginActivationUseCase $changePluginActivationUseCase;
    private UninstallPluginUseCase $uninstallPluginUseCase;
    private UpgradePluginUseCase $upgradePluginUseCase;
    private UpdatePluginUseCase $updatePluginUseCase;
    private ResolveConflictUseCase $resolveConflictUseCase;
    private DeactivateLicenseUseCase $deactivateLicenseUseCase;
    private ActivateLicenseUseCase $activateLicenseUseCase;
    private ValidateLicensesUseCase $validateLicensesUseCase;
    private LicenseExpirationNoticeService $licenseExpirationNoticeService;
    private string $restApiNamespace;

    /**
     * @param string $restApiNamespace
     * @param RestApiServiceInterface $restApiService
     * @param ListPluginsUseCase $listPluginsUseCase
     * @param InstallFreePluginUseCase $installFreePluginUseCase
     * @param InstallProPluginUseCase $installProPluginUseCase
     * @param ChangePluginActivationUseCase $changePluginActivationUseCase
     * @param UninstallPluginUseCase $uninstallPluginUseCase
     * @param UpgradePluginUseCase $upgradePluginUseCase
     * @param UpdatePluginUseCase $updatePluginUseCase
     * @param ResolveConflictUseCase $resolveConflictUseCase
     * @param DeactivateLicenseUseCase $deactivateLicenseUseCase
     * @param ActivateLicenseUseCase $activateLicenseUseCase
     * @param ValidateLicensesUseCase $validateLicensesUseCase
     * @param LicenseExpirationNoticeService $licenseExpirationNoticeService
     * @since 1.0.0
     */
    public function __construct(
        string $restApiNamespace,
        RestApiServiceInterface $restApiService,
        ListPluginsUseCase $listPluginsUseCase,
        InstallFreePluginUseCase $installFreePluginUseCase,
        InstallProPluginUseCase $installProPluginUseCase,
        ChangePluginActivationUseCase $changePluginActivationUseCase,
        UninstallPluginUseCase $uninstallPluginUseCase,
        UpgradePluginUseCase $upgradePluginUseCase,
        UpdatePluginUseCase $updatePluginUseCase,
        ResolveConflictUseCase $resolveConflictUseCase,
        DeactivateLicenseUseCase $deactivateLicenseUseCase,
        ActivateLicenseUseCase $activateLicenseUseCase,
        ValidateLicensesUseCase $validateLicensesUseCase,
        LicenseExpirationNoticeService $licenseExpirationNoticeService
    ) {
        $this->restApiService = $restApiService;
        $this->listPluginsUseCase = $listPluginsUseCase;
        $this->installFreePluginUseCase = $installFreePluginUseCase;
        $this->installProPluginUseCase = $installProPluginUseCase;
        $this->changePluginActivationUseCase = $changePluginActivationUseCase;
        $this->uninstallPluginUseCase = $uninstallPluginUseCase;
        $this->upgradePluginUseCase = $upgradePluginUseCase;
        $this->updatePluginUseCase = $updatePluginUseCase;
        $this->resolveConflictUseCase = $resolveConflictUseCase;
        $this->restApiNamespace = $restApiNamespace;
        $this->deactivateLicenseUseCase = $deactivateLicenseUseCase;
        $this->activateLicenseUseCase = $activateLicenseUseCase;
        $this->validateLicensesUseCase = $validateLicensesUseCase;
        $this->licenseExpirationNoticeService = $licenseExpirationNoticeService;
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
     * Get the familySlug argument definition.
     *
     * @return array<string, mixed> The argument definition.
     * @since 1.0.0
     */
    private function getFamilySlugArg(): array
    {
        return [
            'required' => true,
            'type' => 'string',
            'sanitize_callback' => 'sanitize_key',
            'validate_callback' => function ($param) {
                return preg_match('/^[a-zA-Z0-9-]+$/', $param) === 1;
            },
        ];
    }

    /**
     * Add routes.
     *
     * @return void
     * @since 1.0.0
     */
    private function addRoutes(): void
    {
        // phpcs:disable Squiz.PHP.CommentedOutCode.Found

        // GET /plugins
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins',
            WP_REST_Server::READABLE,
            $this->listPluginsUseCase,
            [$this, 'checkPermissions'],
            [
                'force-check' => [
                    'required' => false,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                    'validate_callback' => function ($param) {
                        return $param === null || $param === '' || $param === '1' || $param === 1;
                    },
                ],
            ]
        ));

        // POST /plugins/install/{familySlug}/free
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/install/free',
            WP_REST_Server::CREATABLE,
            $this->installFreePluginUseCase,
            [HubAccessService::class, 'canInstallPlugins'],
            [
                'familySlug' => $this->getFamilySlugArg(),
            ]
        ));

        // POST /plugins/install/{familySlug}/pro
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/install/pro',
            WP_REST_Server::CREATABLE,
            $this->installProPluginUseCase,
            [HubAccessService::class, 'canInstallPlugins'],
            [
                'familySlug' => $this->getFamilySlugArg(),
                'licenseKey' => [
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                    'validate_callback' => function ($param) {
                        return !empty($param) && is_string($param);
                    },
                ],
            ]
        ));

        // POST /plugins/{familySlug}/(activate|deactivate)
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/(?P<action>activate|deactivate)',
            WP_REST_Server::CREATABLE,
            $this->changePluginActivationUseCase,
            [HubAccessService::class, 'canActivatePlugins'],
            [
                'familySlug' => $this->getFamilySlugArg(),
                'action' => [
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_key',
                    'validate_callback' => function ($param) {
                        return in_array($param, ['activate', 'deactivate'], true);
                    },
                ],
            ]
        ));

        // POST /plugins/{familySlug}/uninstall
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/uninstall',
            WP_REST_Server::CREATABLE,
            $this->uninstallPluginUseCase,
            [HubAccessService::class, 'canDeletePlugins'],
            [
                'familySlug' => $this->getFamilySlugArg(),
            ]
        ));

        // POST /plugins/{familySlug}/upgrade
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/upgrade',
            WP_REST_Server::CREATABLE,
            $this->upgradePluginUseCase,
            [HubAccessService::class, 'canUpgradePlugins'],
            [
                'familySlug' => $this->getFamilySlugArg(),
                'licenseKey' => [
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                    'validate_callback' => function ($param) {
                        return !empty($param) && is_string($param);
                    },
                ],
            ]
        ));

        // POST /plugins/{familySlug}/update
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/update',
            WP_REST_Server::CREATABLE,
            $this->updatePluginUseCase,
            [HubAccessService::class, 'canUpdatePlugins'],
            [
                'familySlug' => $this->getFamilySlugArg(),
            ]
        ));

        // POST /plugins/{familySlug}/resolve-conflict
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/resolve-conflict',
            WP_REST_Server::CREATABLE,
            $this->resolveConflictUseCase,
            [HubAccessService::class, 'canResolvePluginConflict'],
            [
                'familySlug' => $this->getFamilySlugArg(),
                'pluginToKeep' => [
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_key',
                    'validate_callback' => function ($param) {
                        return in_array($param, ['free', 'pro'], true);
                    },
                ],
            ]
        ));

        // POST /plugins/{familySlug}/deactivate-license
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/deactivate-license',
            WP_REST_Server::CREATABLE,
            $this->deactivateLicenseUseCase,
            [$this, 'checkPermissions'],
            [
                'familySlug' => $this->getFamilySlugArg(),
            ]
        ));

        // POST /plugins/{familySlug}/activate-license
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/activate-license',
            WP_REST_Server::CREATABLE,
            $this->activateLicenseUseCase,
            [$this, 'checkPermissions'],
            [
                'familySlug' => $this->getFamilySlugArg(),
                'licenseKey' => [
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                    'validate_callback' => function ($param) {
                        return !empty($param) && is_string($param);
                    },
                ],
            ]
        ));

        // POST /plugins/validate-licenses
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/validate-licenses',
            WP_REST_Server::CREATABLE,
            $this->validateLicensesUseCase,
            [$this, 'checkPermissions'],
            [
                'force-check' => [
                    'required' => false,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                    'validate_callback' => function ($param) {
                        return $param === null || $param === '' || $param === '1' || $param === 1;
                    },
                ],
            ]
        ));

        // POST /license-notices/dismiss
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/license-notices/dismiss',
            WP_REST_Server::CREATABLE,
            [$this, 'dismissLicenseNotice'],
            [$this, 'checkPermissions'],
            [
                'noticeType' => [
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_key',
                    'validate_callback' => function ($param) {
                        return in_array($param, ['expired', 'expiring'], true);
                    },
                ],
            ]
        ));

        // GET /license-notices/dismissal-status
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/license-notices/dismissal-status',
            WP_REST_Server::READABLE,
            [$this, 'getDismissalStatus'],
            [$this, 'checkPermissions'],
            []
        ));

        // phpcs:enable Squiz.PHP.CommentedOutCode.Found
    }

    /**
     * Check permissions.
     *
     * @return bool
     * @since 1.0.0
     */
    public function checkPermissions(): bool
    {
        return HubAccessService::canManageHub();
    }

    /**
     * Dismiss a license notice.
     *
     * @param WP_REST_Request $request The request.
     * @return array<string, mixed>
     * @since 1.0.0
     */
    public function dismissLicenseNotice(WP_REST_Request $request): array
    {
        $noticeType = $request->get_param('noticeType');

        $this->licenseExpirationNoticeService->dismissDashboardNotice($noticeType);

        return [
            'dismissed' => true,
            'noticeType' => $noticeType,
        ];
    }

    /**
     * Get dismissal status for license notices.
     *
     * @param WP_REST_Request $request The request.
     * @return array<string, mixed>
     * @since 1.0.0
     */
    public function getDismissalStatus(WP_REST_Request $request): array
    {
        $status = $this->licenseExpirationNoticeService->getDashboardNoticeDismissalStatus();

        return [
            'dismissalStatus' => $status,
        ];
    }
}
