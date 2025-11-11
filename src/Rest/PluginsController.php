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
use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiServiceInterface;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use WP_REST_Server;

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
        ActivateLicenseUseCase $activateLicenseUseCase
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
            [$this, 'checkPermissions']
        ));

        // POST /plugins/install/{familySlug}/free
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/install/free',
            WP_REST_Server::CREATABLE,
            $this->installFreePluginUseCase,
            [$this, 'checkPermissions']
        ));

        // POST /plugins/install/{familySlug}/pro
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/install/pro',
            WP_REST_Server::CREATABLE,
            $this->installProPluginUseCase,
            [$this, 'checkPermissions']
        ));

        // POST /plugins/{familySlug}/(activate|deactivate)
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/(?P<action>activate|deactivate)',
            WP_REST_Server::CREATABLE,
            $this->changePluginActivationUseCase,
            [$this, 'checkPermissions']
        ));

        // POST /plugins/{familySlug}/uninstall
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/uninstall',
            WP_REST_Server::CREATABLE,
            $this->uninstallPluginUseCase,
            [$this, 'checkPermissions']
        ));

        // POST /plugins/{familySlug}/upgrade
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/upgrade',
            WP_REST_Server::CREATABLE,
            $this->upgradePluginUseCase,
            [$this, 'checkPermissions']
        ));

        // POST /plugins/{familySlug}/update
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/update',
            WP_REST_Server::CREATABLE,
            $this->updatePluginUseCase,
            [$this, 'checkPermissions']
        ));

        // POST /plugins/{familySlug}/resolve-conflict
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/resolve-conflict',
            WP_REST_Server::CREATABLE,
            $this->resolveConflictUseCase,
            [$this, 'checkPermissions']
        ));

        // POST /plugins/{familySlug}/deactivate-license
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/deactivate-license',
            WP_REST_Server::CREATABLE,
            $this->deactivateLicenseUseCase,
            [$this, 'checkPermissions']
        ));

        // POST /plugins/{familySlug}/activate-license
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/activate-license',
            WP_REST_Server::CREATABLE,
            $this->activateLicenseUseCase,
            [$this, 'checkPermissions']
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
        return $this->restApiService->checkPermissions('manage_options');
    }
}
