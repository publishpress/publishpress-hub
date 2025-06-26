<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\RestApi;

use PublishPress\Hub\Application\Service\Contracts\ExceptionMetadataInterface;
use PublishPress\Hub\Application\Service\Contracts\HttpExceptionInterface;
use PublishPress\Hub\Application\Service\Exception\ServiceException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginAlreadyInstalledException;
use PublishPress\Hub\Domain\Plugin\Exception\PluginNotFoundException;
use Throwable;
use WP_Error;

/**
 * Map service exceptions to WP_Error objects.
 *
 * @since 1.0.0
 */
class ExceptionResponseMapper
{
    /**
     * Map a service exception to a WP_Error object.
     *
     * @param ServiceException $exception The exception to map.
     * @return WP_Error The mapped WP_Error object.
     * @since 1.0.0
     */
    public function mapToWpError(Throwable $exception): WP_Error
    {
        $errorData = [
            'status' => 500,
        ];

        if ($exception instanceof PluginNotFoundException) {
            return new WP_Error(
                'plugin_not_found',
                $exception->getMessage(),
                [
                    'status' => 404,
                ]
            );
        }

        if ($exception instanceof PluginAlreadyInstalledException) {
            return new WP_Error(
                'plugin_already_installed',
                $exception->getMessage(),
                [
                    'status' => 400,
                ]
            );
        }

        if ($exception instanceof HttpExceptionInterface) {
            if ($exception instanceof ExceptionMetadataInterface) {
                $errorData['metadata'] = $exception->getErrorMetadata();
            }

            $errorData['status'] = $exception->getHttpStatusCode();

            return new WP_Error(
                $exception->getErrorCode(),
                $exception->getMessage(),
                $errorData
            );
        }

        return new WP_Error(
            'unknown_error',
            $exception->getMessage(),
            $errorData
        );
    }
}
