<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Service\Contracts\DomainExceptionMapperInterface;
use PublishPress\Hub\Domain\Exception\DomainException;
use WP_Error;

/**
 * Adapter for converting domain exceptions to WordPress WP_Error objects.
 *
 * @since 1.0.0
 */
class WordPressErrorAdapter
{
    /**
     * @var DomainExceptionMapperInterface
     */
    private $exceptionMapper;

    /**
     * Constructor.
     *
     * @since 1.0.0
     * @param DomainExceptionMapperInterface $exceptionMapper
     */
    public function __construct(DomainExceptionMapperInterface $exceptionMapper)
    {
        $this->exceptionMapper = $exceptionMapper;
    }

    /**
     * Convert a domain exception to a WP_Error object.
     *
     * @since 1.0.0
     * @param DomainException $exception
     * @return WP_Error
     */
    public function toWPError(DomainException $exception): WP_Error
    {
        $errorCode = $this->exceptionMapper->mapToErrorMetadata($exception)['error_code'];
        $message = $exception->getMessage();
        $httpStatusCode = $this->exceptionMapper->mapToHttpStatusCode($exception);

        $wpError = new WP_Error($errorCode, $message, [
            'status' => $httpStatusCode,
            'domain_exception' => $exception,
        ]);

        // Add additional metadata if available
        $metadata = $this->exceptionMapper->mapToErrorMetadata($exception);
        if (isset($metadata['license_status'])) {
            $wpError->add_data(['license_status' => $metadata['license_status']]);
        }

        return $wpError;
    }

    /**
     * Convert multiple domain exceptions to WP_Error objects.
     *
     * @since 1.0.0
     * @param DomainException[] $exceptions
     * @return WP_Error[]
     */
    public function toWPErrors(array $exceptions): array
    {
        return array_map([$this, 'toWPError'], $exceptions);
    }

    /**
     * Check if a WP_Error was created from a domain exception.
     *
     * @since 1.0.0
     * @param WP_Error $wpError
     * @return bool
     */
    public function isFromDomainException(WP_Error $wpError): bool
    {
        $data = $wpError->get_error_data();
        return isset($data['domain_exception']);
    }

    /**
     * Get the original domain exception from a WP_Error.
     *
     * @since 1.0.0
     * @param WP_Error $wpError
     * @return DomainException|null
     */
    public function getDomainException(WP_Error $wpError): ?DomainException
    {
        $data = $wpError->get_error_data();
        return $data['domain_exception'] ?? null;
    }
}
