<?php

declare(strict_types=1);

namespace PublishPress\Hub\Presentation\Controller\RestApi;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Application\UseCase\Plugin\ListPluginsUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\InstallProPluginUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\InstallFreePluginUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\ChangePluginActivationUseCase;
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
    private string $restApiNamespace;

    public function __construct(
        RestApiServiceInterface $restApiService,
        ListPluginsUseCase $listPluginsUseCase,
        InstallFreePluginUseCase $installFreePluginUseCase,
        InstallProPluginUseCase $installProPluginUseCase,
        ChangePluginActivationUseCase $changePluginActivationUseCase,
        string $restApiNamespace
    ) {
        $this->restApiService = $restApiService;
        $this->listPluginsUseCase = $listPluginsUseCase;
        $this->installFreePluginUseCase = $installFreePluginUseCase;
        $this->installProPluginUseCase = $installProPluginUseCase;
        $this->changePluginActivationUseCase = $changePluginActivationUseCase;
        $this->restApiNamespace = $restApiNamespace;
    }

    protected function onLoad(): void
    {
        $this->addRoutes();
    }

    protected function onInit(): void
    {
    }

    private function addRoutes(): void
    {
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
    }

    public function checkPermissions(): bool
    {
        return $this->restApiService->checkPermissions('manage_options');
    }
}
