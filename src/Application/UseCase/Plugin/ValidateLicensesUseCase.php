<?php

/**
 * Use case for validating licenses.
 *
 * @package PublishPress\Hub\Application\UseCase\Plugin
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\Service\License\ScheduledLicenseValidationService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use WP_REST_Request;

class ValidateLicensesUseCase implements UseCaseInterface
{
    private ScheduledLicenseValidationService $scheduledLicenseValidationService;
    private ListPluginsUseCase $listPluginsUseCase;

    /**
     * @param ScheduledLicenseValidationService $scheduledLicenseValidationService
     * @param ListPluginsUseCase $listPluginsUseCase
     * @since 1.0.0
     */
    public function __construct(
        ScheduledLicenseValidationService $scheduledLicenseValidationService,
        ListPluginsUseCase $listPluginsUseCase
    ) {
        $this->scheduledLicenseValidationService = $scheduledLicenseValidationService;
        $this->listPluginsUseCase = $listPluginsUseCase;
    }

    /**
     * Validates all licenses and returns updated plugin list.
     *
     * @param WP_REST_Request $request The REST request.
     * @return array<string, mixed> The response data with updated plugin list.
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        // Trigger validation
        $this->scheduledLicenseValidationService->validateAllLicenses();

        // Return updated plugin list
        return $this->listPluginsUseCase->execute($request);
    }
}

