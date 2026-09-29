<?php

/**
 * License deactivation service interface.
 *
 * @package PublishPress\Hub\Infrastructure\Edd\Subscription\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Edd\Subscription\Contract;

defined('ABSPATH') || exit;

use PublishPress\Hub\Domain\Plugin\Exception\LicenseDeactivationException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerInvalidResponseException;

interface LicenseDeactivationServiceInterface
{
    /**
     * Deactivate a license.
     *
     * @param string $licenseKey The license key to deactivate.
     * @param int $downloadId The download ID.
     * @throws LicenseDeactivationException
     * @throws LicenseServerInvalidResponseException
     * @return array<string, mixed> The deactivation response data.
     * @since 1.0.0
     */
    public function deactivateLicense(string $licenseKey, int $downloadId): array;
}
