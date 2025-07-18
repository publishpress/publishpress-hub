<?php

declare(strict_types=1);

namespace PublishPress\Hub\Presentation\Controller;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Application\DTO\Plugin\PluginListRequest;
use PublishPress\Hub\Application\DTO\Plugin\PluginInstallRequest;
use PublishPress\Hub\Application\UseCase\Plugin\ListPluginsUseCase;
use PublishPress\Hub\Application\UseCase\Plugin\InstallPluginUseCase;
use PublishPress\Hub\Infrastructure\RestApi\Contract\RestApiServiceInterface;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRoute;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestRequest;
use PublishPress\Hub\Infrastructure\RestApi\Entity\RestResponse;
use WP_REST_Server;

class PluginApiController implements BootableInterface
{
    use BootableTrait;

    private RestApiServiceInterface $restApiService;
    private ListPluginsUseCase $listPluginsUseCase;
    private InstallPluginUseCase $installPluginUseCase;

    public function __construct(
        RestApiServiceInterface $restApiService,
        ListPluginsUseCase $listPluginsUseCase,
        InstallPluginUseCase $installPluginUseCase
    ) {
        $this->restApiService = $restApiService;
        $this->listPluginsUseCase = $listPluginsUseCase;
        $this->installPluginUseCase = $installPluginUseCase;
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
        // GET /wp-json/publishpress-hub/v1/plugins
        $this->restApiService->addRoute(new RestRoute(
            'publishpress-hub/v1',
            '/plugins',
            WP_REST_Server::READABLE,
            [$this, 'listPlugins'],
            [$this, 'checkPermissions']
        ));

        // POST /wp-json/publishpress-hub/v1/plugins/{slug}/install/{type}
        $this->restApiService->addRoute(new RestRoute(
            'publishpress-hub/v1',
            '/plugins/(?P<slug>[a-zA-Z0-9-]+)/install/(?P<type>free|pro)',
            WP_REST_Server::CREATABLE,
            [$this, 'installPlugin'],
            [$this, 'checkPermissions']
        ));
    }

    public function checkPermissions(): bool
    {
        return $this->restApiService->checkPermissions('manage_options');
    }

    public function listPlugins(RestRequest $request): RestResponse
    {
        try {
            $data = $this->restApiService->getRequestData($request);
            $listRequest = PluginListRequest::fromArray($data);

            $response = $this->listPluginsUseCase->execute($listRequest);

            return $this->restApiService->createResponse($response->toArray());
        } catch (\Exception $e) {
            return $this->restApiService->createErrorResponse(
                $e->getMessage(),
                400
            );
        }
    }

    public function installPlugin(RestRequest $request): RestResponse
    {
        try {
            $slug = $this->restApiService->getRequestParam($request, 'slug');
            $type = $this->restApiService->getRequestParam($request, 'type', 'free');

            $installRequest = new PluginInstallRequest($slug, $type);
            $response = $this->installPluginUseCase->execute($installRequest);

            $status = $response->isSuccess() ? 200 : 400;

            return $this->restApiService->createResponse(
                $response->toArray(),
                $status
            );
        } catch (\Exception $e) {
            return $this->restApiService->createErrorResponse(
                $e->getMessage(),
                400
            );
        }
    }
}
