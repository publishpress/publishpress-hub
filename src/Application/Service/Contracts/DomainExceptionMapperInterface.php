<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\Contracts;

use PublishPress\Hub\Domain\Exception\DomainException;

/**
 * Interface for mapping domain exceptions to HTTP responses.
 *
 * @since 1.0.0
 */
interface DomainExceptionMapperInterface
{
    /**
     * Map a domain exception to HTTP status code.
     *
     * @since 1.0.0
     * @param DomainException $exception
     * @return int
     */
    public function mapToHttpStatusCode(DomainException $exception): int;

    /**
     * Map a domain exception to error metadata.
     *
     * @since 1.0.0
     * @param DomainException $exception
     * @return array
     */
    public function mapToErrorMetadata(DomainException $exception): array;
}
