<?php

/**
 * License status storage service.
 *
 * @package PublishPress\Hub\Application\Service\License
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\License;
defined( 'ABSPATH' ) || exit;

use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;

class LicenseStatusStorageService
{
    private const OPTION_NAME = 'publishpress_hub_license_expiration_status';

    private WPOptionsAdapterInterface $optionsAdapter;

    /**
     * @param WPOptionsAdapterInterface $optionsAdapter
     * @since 1.0.0
     */
    public function __construct(WPOptionsAdapterInterface $optionsAdapter)
    {
        $this->optionsAdapter = $optionsAdapter;
    }

    /**
     * Store license expiration status for a download ID.
     *
     * @param int $downloadId The download ID.
     * @param bool $isExpired Whether the license is expired.
     * @param string|null $expirationDate The expiration date in ISO format (YYYY-MM-DD) or null.
     * @since 1.0.0
     */
    public function storeLicenseExpirationStatus(int $downloadId, bool $isExpired, ?string $expirationDate): void
    {
        $statuses = $this->getAllStatuses();
        $statuses[$downloadId] = [
            'isExpired' => $isExpired,
            'expirationDate' => $expirationDate,
        ];
        $this->optionsAdapter->updateOption(self::OPTION_NAME, $statuses);
    }

    /**
     * Get license expiration status for a download ID.
     *
     * @param int $downloadId The download ID.
     * @return array<string, mixed>|null Returns ['isExpired' => bool, 'expirationDate' => string|null] or null if not found.
     * @since 1.0.0
     */
    public function getLicenseExpirationStatus(int $downloadId): ?array
    {
        $statuses = $this->getAllStatuses();

        if (!isset($statuses[$downloadId])) {
            return null;
        }

        return $statuses[$downloadId];
    }

    /**
     * Get all expired licenses.
     *
     * @return array<int, array<string, mixed>> Array of expired license data keyed by download ID.
     * @since 1.0.0
     */
    public function getAllExpiredLicenses(): array
    {
        $statuses = $this->getAllStatuses();
        $expired = [];

        foreach ($statuses as $downloadId => $status) {
            if (isset($status['isExpired']) && $status['isExpired'] === true) {
                $expired[$downloadId] = $status;
            }
        }

        return $expired;
    }

    /**
     * Clear license expiration status for a download ID.
     *
     * @param int $downloadId The download ID.
     * @since 1.0.0
     */
    public function clearLicenseExpirationStatus(int $downloadId): void
    {
        $statuses = $this->getAllStatuses();

        if (isset($statuses[$downloadId])) {
            unset($statuses[$downloadId]);
            $this->optionsAdapter->updateOption(self::OPTION_NAME, $statuses);
        }
    }

    /**
     * Get all license expiration statuses.
     *
     * @return array<int, array<string, mixed>>
     * @since 1.0.0
     */
    private function getAllStatuses(): array
    {
        $statuses = $this->optionsAdapter->getOption(self::OPTION_NAME);

        if (!is_array($statuses)) {
            return [];
        }

        return $statuses;
    }
}
