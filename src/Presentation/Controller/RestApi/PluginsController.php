<?php

declare(strict_types=1);

namespace PublishPress\Hub\Presentation\Controller\RestApi;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Application\UseCase\Plugin\ListPluginsUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\InstallPluginUseCase;
use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiServiceInterface;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use WP_REST_Server;

class PluginsController implements BootableInterface
{
    use BootableTrait;

    private RestApiServiceInterface $restApiService;
    private ListPluginsUseCase $listPluginsUseCase;
    private InstallPluginUseCase $installPluginUseCase;
    private string $restApiNamespace;

    public function __construct(
        RestApiServiceInterface $restApiService,
        ListPluginsUseCase $listPluginsUseCase,
        InstallPluginUseCase $installPluginUseCase,
        string $restApiNamespace
    ) {
        $this->restApiService = $restApiService;
        $this->listPluginsUseCase = $listPluginsUseCase;
        $this->installPluginUseCase = $installPluginUseCase;
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

        // POST /plugins/install/{familySlug}/{pluginType}
        $this->restApiService->addRoute(new RestRoute(
            $this->restApiNamespace,
            '/plugins/(?P<familySlug>[a-zA-Z0-9-]+)/install/(?P<pluginType>(free|pro))',
            WP_REST_Server::CREATABLE,
            $this->installPluginUseCase,
            [$this, 'checkPermissions']
        ));
    }

    public function checkPermissions(): bool
    {
        return $this->restApiService->checkPermissions('manage_options');
    }
}
