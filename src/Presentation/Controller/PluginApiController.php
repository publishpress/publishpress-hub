<?php

declare(strict_types=1);

namespace PublishPress\Hub\Presentation\Controller;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Application\DTO\Plugin\PluginInstallRequest;
use PublishPress\Hub\Application\UseCase\Plugin\ListPluginsUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\InstallPluginUseCase;
use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiServiceInterface;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

class PluginApiController implements BootableInterface
{
    use BootableTrait;

    private RestApiServiceInterface $restApiService;
    private ListPluginsUseCase $listPluginsUseCase;
    private InstallPluginUseCase $installPluginUseCase;
    private string $pluginApiBasePath;

    public function __construct(
        RestApiServiceInterface $restApiService,
        ListPluginsUseCase $listPluginsUseCase,
        InstallPluginUseCase $installPluginUseCase,
        string $pluginApiBasePath
    ) {
        $this->restApiService = $restApiService;
        $this->listPluginsUseCase = $listPluginsUseCase;
        $this->installPluginUseCase = $installPluginUseCase;
        $this->pluginApiBasePath = $pluginApiBasePath;
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
            $this->pluginApiBasePath,
            '/plugins',
            WP_REST_Server::READABLE,
            [$this, 'listPlugins'],
            [$this, 'checkPermissions']
        ));
    }

    public function checkPermissions(): bool
    {
        return $this->restApiService->checkPermissions('manage_options');
    }

    public function listPlugins(WP_REST_Request $request): WP_REST_Response
    {
        try {
            $response = $this->listPluginsUseCase->execute();

            return $this->restApiService->createResponse($response);
        } catch (\Exception $e) {
            return $this->restApiService->createErrorResponse(
                $e->getMessage(),
                400
            );
        }
    }
}
