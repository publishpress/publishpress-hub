<?php

/**
 * Version check service interface.
 *
 * @package PublishPress\Hub\Infrastructure\Edd\Subscription\Contract
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\Edd\Subscription\Contract;

use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerException;
use PublishPress\Hub\Domain\Plugin\Exception\LicenseServerInvalidResponseException;

\defined('ABSPATH') || exit;

interface VersionCheckServiceInterface
{
    /**
     * Get the last version information.
     *
     * @param string $licenseKey The license key.
     * @param int $downloadId The download ID.
     * @param bool $force Whether to bypass cache and force version check.
     * @throws LicenseServerException
     * @throws LicenseServerInvalidResponseException
     * @return array<string, mixed> The version information including download_link, version, sections, etc.
     * @since 1.0.0
     */
    public function getLastVersionInfo(string $licenseKey, int $downloadId, bool $force = false): array;
}
