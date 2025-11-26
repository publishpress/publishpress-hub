<?php

/**
 * License validation bootstrap service.
 *
 * @package PublishPress\Hub\Application\Service\License
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\License;

use PublishPress\Hub\Application\Contract\BootableInterface;
use PublishPress\Hub\Application\Service\License\ScheduledLicenseValidationService;
use PublishPress\Hub\Application\Traits\BootableTrait;
use PublishPress\Hub\Infrastructure\Hooks\Contract\HooksServiceInterface;
use PublishPress\Hub\Infrastructure\License\Handler\LicenseValidationActionHandler;

class LicenseValidationBootstrapService implements BootableInterface
{
    use BootableTrait;

    private const ACTION_HOOK = 'publishpress_hub_validate_licenses';

    private ScheduledLicenseValidationService $scheduledLicenseValidationService;
    private LicenseValidationActionHandler $licenseValidationActionHandler;
    private LicenseExpirationNoticeService $licenseExpirationNoticeService;
    private HooksServiceInterface $hooksService;

    /**
     * @param ScheduledLicenseValidationService $scheduledLicenseValidationService
     * @param LicenseValidationActionHandler $licenseValidationActionHandler
     * @param LicenseExpirationNoticeService $licenseExpirationNoticeService
     * @param HooksServiceInterface $hooksService
     * @since 1.0.0
     */
    public function __construct(
        ScheduledLicenseValidationService $scheduledLicenseValidationService,
        LicenseValidationActionHandler $licenseValidationActionHandler,
        LicenseExpirationNoticeService $licenseExpirationNoticeService,
        HooksServiceInterface $hooksService
    ) {
        $this->scheduledLicenseValidationService = $scheduledLicenseValidationService;
        $this->licenseValidationActionHandler = $licenseValidationActionHandler;
        $this->licenseExpirationNoticeService = $licenseExpirationNoticeService;
        $this->hooksService = $hooksService;
    }

    /**
     * @since 1.0.0
     */
    protected function onLoad(): void
    {
        // Initialize notice service
        $this->licenseExpirationNoticeService->init();
    }

    /**
     * @since 1.0.0
     */
    protected function onInit(): void
    {
        // Register action handler for Actions Scheduler
        if (function_exists('as_schedule_recurring_action')) {
            $this->hooksService->addAction(
                self::ACTION_HOOK,
                [$this->licenseValidationActionHandler, 'handle']
            );

            // Schedule validation if not already scheduled
            if (!function_exists('as_has_scheduled_action') || !as_has_scheduled_action(self::ACTION_HOOK)) {
                $this->scheduledLicenseValidationService->scheduleValidation();
            }
        }
    }
}

