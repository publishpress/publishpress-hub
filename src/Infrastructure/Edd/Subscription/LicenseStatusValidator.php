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
        if (in_array($license, $acceptableResults, true)) {
            return;
        }

        $context = [];

        if ($operation) {
            $context['operation'] = esc_html($operation);
        }

        // phpcs:disable WordPress.Security.EscapeOutput.ExceptionNotEscaped
        switch ($license) {
            case 'missing':
                throw new LicenseMissingException($context);
            case 'missing_url':
                throw new LicenseMissingUrlException($context);
            case 'license_not_activable':
                throw new LicenseNotActivableException($context);
            case 'disabled':
                throw new LicenseDisabledException($context);
            case 'no_activations_left':
                throw new LicenseNoActivationsLeftException($context);
            case 'expired':
                throw new LicenseExpiredException($context);
            case 'key_mismatch':
                throw new LicenseKeyMismatchException($context);
            case 'invalid_item_id':
                throw new LicenseInvalidItemIdException($context);
            case 'item_name_mismatch':
                throw new LicenseInvalidItemNameException($context);
            case 'site_inactive':
                throw new LicenseSiteInactiveException($context);
            case 'invalid':
                throw new LicenseInvalidException($context);
            default:
                throw new UnknownLicenseServerException($context);
        }
        // phpcs:enable WordPress.Security.EscapeOutput.ExceptionNotEscaped
    }
}

