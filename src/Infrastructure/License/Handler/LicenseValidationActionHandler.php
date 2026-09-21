<?php

/**
 * License validation action handler.
 *
 * @package PublishPress\Hub\Infrastructure\License\Handler
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\License\Handler;
defined( 'ABSPATH' ) || exit;

use PublishPress\Hub\Application\Service\License\ScheduledLicenseValidationService;

class LicenseValidationActionHandler
{
    private ScheduledLicenseValidationService $scheduledLicenseValidationService;

    /**
     * @param ScheduledLicenseValidationService $scheduledLicenseValidationService
     * @since 1.0.0
     */
    public function __construct(ScheduledLicenseValidationService $scheduledLicenseValidationService)
    {
        $this->scheduledLicenseValidationService = $scheduledLicenseValidationService;
    }

    /**
     * Handle the license validation action.
     *
     * @since 1.0.0
     */
    public function handle(): void
    {
        $this->scheduledLicenseValidationService->validateAllLicenses();
    }
}
