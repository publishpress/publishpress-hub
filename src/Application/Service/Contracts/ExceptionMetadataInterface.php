<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Contracts;

/**
 * Interface for exception metadata.
 *
 * @since 1.0.0
 */
interface ExceptionMetadataInterface
{
    /**
     * Get the error metadata of the exception.
     *
     * @since 1.0.0
     * @return array
     */
    public function getErrorMetadata(): array;
}
