<?php

/**
 * License info service interface.
 *
 * @package PublishPress\Hub\Infrastructure\Edd\Subscription\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Edd\Subscription\Contract;
defined( 'ABSPATH' ) || exit;

use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerInvalidResponseException;

interface LicenseInfoServiceInterface
{
    /**
     * Get the license information.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Whether to bypass cache and force license info retrieval.
     * @throws LicenseServerException
     * @throws LicenseServerInvalidResponseException
     * @return array<string, mixed> The license information including license status, expiration, etc.
     * @since 1.0.0
     */
    public function getLicenseInfo(string $licenseKey, int $downloadId, bool $force = false): array;
}
