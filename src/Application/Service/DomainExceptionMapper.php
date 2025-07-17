<?php

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service;

use PublishPress\Hub\Application\Service\Contracts\DomainExceptionMapperInterface;
use PublishPress\Hub\Domain\Exception\DomainException;
use PublishPress\Hub\Domain\Exception\License\LicenseDisabledException;
use PublishPress\Hub\Domain\Exception\License\LicenseExpiredException;
use PublishPress\Hub\Domain\Exception\License\LicenseInvalidException;
use PublishPress\Hub\Domain\Exception\License\LicenseInvalidItemIdException;
use PublishPress\Hub\Domain\Exception\License\LicenseInvalidItemNameException;
use PublishPress\Hub\Domain\Exception\License\LicenseKeyMismatchException;
use PublishPress\Hub\Domain\Exception\License\LicenseMissingException;
use PublishPress\Hub\Domain\Exception\License\LicenseMissingUrlException;
use PublishPress\Hub\Domain\Exception\License\LicenseNoActivationsLeftException;
use PublishPress\Hub\Domain\Exception\License\LicenseNotActivableException;
use PublishPress\Hub\Domain\Exception\License\LicenseSiteInactiveException;

/**
 * Maps domain exceptions to HTTP responses.
 *
 * @since 1.0.0
 */
class DomainExceptionMapper implements DomainExceptionMapperInterface
{
    /**
     * Map a domain exception to HTTP status code.
     *
     * @since 1.0.0
     * @param DomainException $exception
     * @return int
     */
    public function mapToHttpStatusCode(DomainException $exception): int
    {
        // License-related exceptions with specific HTTP status codes
        if ($exception instanceof LicenseExpiredException) {
            return 400; // Bad Request - License expired
        }

        if ($exception instanceof LicenseDisabledException) {
            return 400; // Bad Request - License revoked
        }

        if ($exception instanceof LicenseInvalidException) {
            return 400; // Bad Request - Invalid license key
        }

        if ($exception instanceof LicenseMissingException) {
            return 400; // Bad Request - Missing license key
        }

        if ($exception instanceof LicenseKeyMismatchException) {
            return 400; // Bad Request - License key doesn't match
        }

        if ($exception instanceof LicenseSiteInactiveException) {
            return 400; // Bad Request - Site inactive for license
        }

        if ($exception instanceof LicenseNotActivableException) {
            return 400; // Bad Request - License cannot be activated
        }

        if ($exception instanceof LicenseNoActivationsLeftException) {
            return 400; // Bad Request - No activations remaining
        }

        if ($exception instanceof LicenseInvalidItemIdException) {
            return 400; // Bad Request - Invalid item ID
        }

        if ($exception instanceof LicenseInvalidItemNameException) {
            return 400; // Bad Request - Invalid item name
        }

        if ($exception instanceof LicenseMissingUrlException) {
            return 400; // Bad Request - Missing license URL
        }

        // Default to 422 (Unprocessable Entity) for other domain exceptions
        return 422;
    }

    /**
     * Map a domain exception to error metadata.
     *
     * @since 1.0.0
     * @param DomainException $exception
     * @return array
     */
    public function mapToErrorMetadata(DomainException $exception): array
    {
        $metadata = [
            'error_code' => $this->getErrorCode($exception),
            'message' => $this->getEnhancedMessage($exception),
        ];

        // Add context if available
        if ($this->hasContext($exception)) {
            $metadata['context'] = $this->getContext($exception);
        }

        // Add specific metadata for license exceptions
        if ($exception instanceof LicenseExpiredException) {
            $metadata['license_status'] = 'expired';
        } elseif ($exception instanceof LicenseDisabledException) {
            $metadata['license_status'] = 'disabled';
        } elseif ($exception instanceof LicenseInvalidException) {
            $metadata['license_status'] = 'invalid';
        } elseif ($exception instanceof LicenseMissingException) {
            $metadata['license_status'] = 'missing';
        } elseif ($exception instanceof LicenseKeyMismatchException) {
            $metadata['license_status'] = 'key_mismatch';
        } elseif ($exception instanceof LicenseSiteInactiveException) {
            $metadata['license_status'] = 'site_inactive';
        } elseif ($exception instanceof LicenseNotActivableException) {
            $metadata['license_status'] = 'not_activable';
        } elseif ($exception instanceof LicenseNoActivationsLeftException) {
            $metadata['license_status'] = 'no_activations_left';
        } elseif ($exception instanceof LicenseInvalidItemIdException) {
            $metadata['license_status'] = 'invalid_item_id';
        } elseif ($exception instanceof LicenseInvalidItemNameException) {
            $metadata['license_status'] = 'invalid_item_name';
        } elseif ($exception instanceof LicenseMissingUrlException) {
            $metadata['license_status'] = 'missing_url';
        }

        return $metadata;
    }

    /**
     * Get the error code from the exception.
     *
     * @since 1.0.0
     * @param DomainException $exception
     * @return string
     */
    private function getErrorCode(DomainException $exception): string
    {
        // Map specific exception types to error codes
        if ($exception instanceof LicenseExpiredException) {
            return 'license_expired';
        }

        if ($exception instanceof LicenseDisabledException) {
            return 'license_disabled';
        }

        if ($exception instanceof LicenseInvalidException) {
            return 'license_invalid';
        }

        if ($exception instanceof LicenseMissingException) {
            return 'license_missing';
        }

        if ($exception instanceof LicenseKeyMismatchException) {
            return 'license_key_mismatch';
        }

        if ($exception instanceof LicenseSiteInactiveException) {
            return 'license_site_inactive';
        }

        if ($exception instanceof LicenseNotActivableException) {
            return 'license_not_activable';
        }

        if ($exception instanceof LicenseNoActivationsLeftException) {
            return 'license_no_activations_left';
        }

        if ($exception instanceof LicenseInvalidItemIdException) {
            return 'license_invalid_item_id';
        }

        if ($exception instanceof LicenseInvalidItemNameException) {
            return 'license_invalid_item_name';
        }

        if ($exception instanceof LicenseMissingUrlException) {
            return 'license_missing_url';
        }

        // Default to class name without namespace for unknown exceptions
        $className = (new \ReflectionClass($exception))->getShortName();
        return strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $className));
    }

    /**
     * Get enhanced message with context if available.
     *
     * @since 1.0.0
     * @param DomainException $exception
     * @return string
     */
    private function getEnhancedMessage(DomainException $exception): string
    {
        $baseMessage = $exception->getMessage();

        // Add context information for specific exceptions
        if ($exception instanceof LicenseExpiredException) {
            $context = $this->getContext($exception);
            if (!empty($context)) {
                $details = [];
                if (isset($context['license_key'])) {
                    $details[] = 'License: ' . substr($context['license_key'], 0, 8) . '...';
                }
                if (isset($context['expiry_date'])) {
                    $details[] = 'Expired: ' . $context['expiry_date'];
                }
                if (!empty($details)) {
                    $baseMessage .= ' (' . implode(', ', $details) . ')';
                }
            }
        }

        return $baseMessage;
    }

        /**
     * Check if an exception has context capability.
     *
     * @since 1.0.0
     * @param DomainException $exception
     * @return bool
     */
    private function hasContext(DomainException $exception): bool
    {
        if (method_exists($exception, 'hasContext')) {
            /** @var callable $hasContext */
            $hasContext = [$exception, 'hasContext'];
            return $hasContext();
        }

        return false;
    }

    /**
     * Get context from an exception if available.
     *
     * @since 1.0.0
     * @param DomainException $exception
     * @return array
     */
    private function getContext(DomainException $exception): array
    {
        if (method_exists($exception, 'getContext')) {
            /** @var callable $getContext */
            $getContext = [$exception, 'getContext'];
            return $getContext();
        }

        return [];
    }
}
