<?php

/**
 * License status validator.
 *
 * @package PublishPress\Hub\Infrastructure\Edd\Subscription
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Edd\Subscription;

use PublishPress\Hub\Domain\Plugin\Exception\LicenseDisabledException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseExpiredException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidItemIdException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseInvalidItemNameException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseKeyMismatchException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseMissingException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseMissingUrlException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseNoActivationsLeftException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseNotActivableException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseSiteInactiveException;
use PublishPress\Hub\Domain\Plugin\Exception\UnknownLicenseServerException;

class LicenseStatusValidator
{
    /**
     * Assert the license status or throw an exception.
     *
     * @param string $license The license status.
     * @param array<string> $acceptableResults The acceptable results.
     * @param string $operation The operation context.
     * @throws LicenseMissingException
     * @throws LicenseMissingUrlException
     * @throws LicenseNotActivableException
     * @throws LicenseDisabledException
     * @throws LicenseNoActivationsLeftException
     * @throws LicenseExpiredException
     * @throws LicenseKeyMismatchException
     * @throws LicenseInvalidItemIdException
     * @throws LicenseInvalidItemNameException
     * @throws LicenseSiteInactiveException
     * @throws LicenseInvalidException
     * @throws UnknownLicenseServerException
     * @return void
     * @since 1.0.0
     */
    public function assertLicenseStatusOrThrow(
        string $license,
        array $acceptableResults,
        string $operation = ''
    ): void {
        // Early return if license status matches expected results
        // This allows callers to define what statuses are acceptable for their specific operation
        if (in_array($license, $acceptableResults, true)) {
            return;
        }

        // Build exception context to help identify where the error occurred
        $context = [];

        if ($operation) {
            $context['operation'] = esc_html($operation);
        }

        // Map EDD license status codes to domain-specific exceptions
        // These status codes come from EDD Software Licensing API responses
        // and represent different business constraints and error conditions
        // phpcs:disable WordPress.Security.EscapeOutput.ExceptionNotEscaped
        switch ($license) {
            case 'missing':
                // License key was not provided in the API request
                throw new LicenseMissingException($context);
            case 'missing_url':
                // Site URL was not provided in the API request (required for site-specific activation)
                throw new LicenseMissingUrlException($context);
            case 'license_not_activable':
                // License exists but cannot be activated (e.g., draft status in EDD)
                throw new LicenseNotActivableException($context);
            case 'disabled':
                // License was manually disabled by store administrator
                throw new LicenseDisabledException($context);
            case 'no_activations_left':
                // All available site activations for this license have been used
                throw new LicenseNoActivationsLeftException($context);
            case 'expired':
                // License subscription has expired and is no longer valid
                throw new LicenseExpiredException($context);
            case 'key_mismatch':
                // Provided license key doesn't match the one stored for this site
                throw new LicenseKeyMismatchException($context);
            case 'invalid_item_id':
                // Download ID doesn't match the product associated with this license
                throw new LicenseInvalidItemIdException($context);
            case 'item_name_mismatch':
                // Product name doesn't match the one associated with this license
                throw new LicenseInvalidItemNameException($context);
            case 'site_inactive':
                // This site was previously activated but is now inactive (deactivated)
                throw new LicenseSiteInactiveException($context);
            case 'invalid':
                // License key doesn't exist in the EDD system
                throw new LicenseInvalidException($context);
            default:
                // Received an unexpected status code from EDD API
                // This may indicate API changes or network issues
                throw new UnknownLicenseServerException($context);
        }
        // phpcs:enable WordPress.Security.EscapeOutput.ExceptionNotEscaped
    }
}

