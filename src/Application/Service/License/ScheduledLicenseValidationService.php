<?php

/**
 * Scheduled license validation service.
 *
 * @package PublishPress\Hub\Application\Service\License
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\License;

use PublishPress\Hub\Application\Service\License\Contract\LicenseManagementServiceInterface;
use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Domain\Plugin\Contract\ProPluginInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;
use PublishPress\Hub\Infrastructure\Logger\Contract\LoggerInterface;
use PublishPress\Hub\Infrastructure\Logger\Logger;

\defined('ABSPATH') || exit;

class ScheduledLicenseValidationService
{
    private const ACTION_HOOK = 'publishpress_hub_validate_licenses';

    private LicenseManagementServiceInterface $licenseManagement;
    private LicenseStatusStorageService $licenseStatusStorage;
    private PluginStatusService $pluginStatusService;
    private LicensePersistenceInterface $licensePersistence;
    private LoggerInterface $logger;
    private int $defaultIntervalSeconds;

    /**
     * @param LicenseManagementServiceInterface $licenseManagement
     * @param LicenseStatusStorageService $licenseStatusStorage
     * @param PluginStatusService $pluginStatusService
     * @param LicensePersistenceInterface $licensePersistence
     * @param LoggerInterface $logger
     * @param int $defaultIntervalSeconds
     * @since 1.0.0
     */
    public function __construct(
        LicenseManagementServiceInterface $licenseManagement,
        LicenseStatusStorageService $licenseStatusStorage,
        PluginStatusService $pluginStatusService,
        LicensePersistenceInterface $licensePersistence,
        LoggerInterface $logger,
        int $defaultIntervalSeconds
    ) {
        $this->licenseManagement = $licenseManagement;
        $this->licenseStatusStorage = $licenseStatusStorage;
        $this->pluginStatusService = $pluginStatusService;
        $this->licensePersistence = $licensePersistence;
        $this->logger = $logger;
        $this->defaultIntervalSeconds = $defaultIntervalSeconds;
    }

    /**
     * Schedule recurring license validation.
     *
     * @param int|null $intervalSeconds The interval in seconds. If null, uses default.
     * @since 1.0.0
     */
    public function scheduleValidation(?int $intervalSeconds = null): void
    {
        if (!function_exists('as_schedule_recurring_action')) {
            $this->logger->log('Actions Scheduler is not available');
            return;
        }

        $interval = $intervalSeconds ?? $this->defaultIntervalSeconds;

        // Unschedule any existing actions first
        $this->unscheduleValidation();

        // Schedule recurring action
        as_schedule_recurring_action(
            time(),
            $interval,
            self::ACTION_HOOK
        );

        $this->logger->log(
            sprintf(
                'Scheduled license validation to run every %d seconds',
                $interval
            )
        );
    }

    /**
     * Unschedule license validation.
     *
     * @since 1.0.0
     */
    public function unscheduleValidation(): void
    {
        if (!function_exists('as_unschedule_all_actions')) {
            return;
        }

        as_unschedule_all_actions(self::ACTION_HOOK);
    }

    /**
     * Validate all installed licenses, or an explicitly supplied set of families.
     *
     * This method makes one API request per license key (bulk checking not supported yet).
     *
     * @param \PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface[]|null $families Limit immediate validation to affected families.
     * @since 1.0.0
     */
    public function validateAllLicenses(?array $families = null): void
    {
        $this->logger->log('Starting scheduled license validation');

        try {
            // Retrieve all plugin families with their current installation/activation status
            // This ensures we only validate licenses for plugins that are actually installed
            $families = $families ?? $this->pluginStatusService->getAllPluginFamiliesWithUpdatedStatus();

            $validatedCount = 0;
            $errorCount = 0;

            foreach ($families as $family) {
                $proPlugin = $family->getProPlugin();
                $downloadId = $proPlugin->getDownloadId();

                // Installation and key presence gate requests; expired keys may have been renewed.
                if (!$proPlugin->isInstalled()) {
                    continue;
                }
                $licenseKey = $this->licensePersistence->getLicenseKey($downloadId);

                // A saved key is required even when its previous status was invalid.
                if (empty($licenseKey)) {
                    continue;
                }

                try {
                    // Force fresh API call to get latest license status from EDD server
                    // This bypasses cache to ensure scheduled validation uses real-time data
                    $licenseInfo = $this->licenseManagement->getLicenseInfo($licenseKey, $downloadId, true);

                    // Parse expiration date from API response
                    // EDD can return various formats: timestamp, date string, 'lifetime', 'never', or empty
                    $expirationDate = null;
                    $isLifetime = false;
                    if (isset($licenseInfo['expires'])) {
                        $expiresValue = $licenseInfo['expires'];

                        // Detect lifetime licenses (no expiration)
                        // EDD uses different values to indicate lifetime: empty, 'lifetime', or 'never'
                        if (empty($expiresValue) || $expiresValue === 'lifetime' || $expiresValue === 'never') {
                            $isLifetime = true;
                            $expirationDate = null;
                        } else {
                            // Convert whatever format EDD sends to ISO format (YYYY-MM-DD)
                            $expirationDate = $this->convertExpirationToIsoFormat($expiresValue);
                        }
                    }

                    // Calculate if license has expired by comparing dates at midnight
                    // Using midnight comparison ensures consistent day-level expiration
                    // Match dashboard day-level comparisons in the site's timezone.
                    $isExpired = ($licenseInfo['license'] ?? '') === 'expired'
                        || ($licenseInfo['error'] ?? '') === 'expired';
                    if (!$isLifetime && $expirationDate !== null) {
                        // Normalize both dates to midnight to compare days, not times
                        $timezone = function_exists('wp_timezone')
                            ? wp_timezone()
                            : new \DateTimeZone(date_default_timezone_get());
                        $today = new \DateTimeImmutable('now', $timezone);
                        $today = $today->setTime(0, 0, 0, 0);
                        $expiration = new \DateTimeImmutable($expirationDate, $timezone);
                        $expiration = $expiration->setTime(0, 0, 0, 0);

                        // License is expired if expiration date is in the past
                        $isExpired = $isExpired || $expiration < $today;
                    }

                    // Store expiration status locally for quick access by UI
                    // This allows the dashboard to show expiration warnings without API calls
                    $this->licenseStatusStorage->storeLicenseExpirationStatus(
                        $downloadId,
                        $isExpired,
                        $expirationDate
                    );

                    // Persist expiration date to WordPress options for permanent storage
                    // Lifetime licenses store null to indicate no expiration
                    if ($isLifetime) {
                        // Clear any previously stored expiration date for lifetime licenses
                        // This handles case where license was upgraded from annual to lifetime
                        $this->licensePersistence->storeLicenseExpirationDate($downloadId, null);
                    } elseif ($expirationDate !== null) {
                        $this->licensePersistence->storeLicenseExpirationDate($downloadId, $expirationDate);
                    }

                    $validatedCount++;
                } catch (\Exception $e) {
                    $errorCount++;
                    $this->logger->log(
                        sprintf(
                            'Failed to validate license for download ID %d: %s',
                            $downloadId,
                            $e->getMessage()
                        ),
                        $e
                    );
                    // Continue with next license even if one fails
                    // This ensures one problematic license doesn't block validation of others
                }
            }

            $this->logger->log(
                sprintf(
                    'License validation completed: %d validated, %d errors',
                    $validatedCount,
                    $errorCount
                )
            );
        } catch (\Exception $e) {
            $this->logger->log(
                sprintf(
                    'License validation failed: %s',
                    $e->getMessage()
                ),
                $e
            );
        }
    }

    /**
     * Convert expiration date from API format to ISO format (YYYY-MM-DD).
     *
     * @param mixed $expires The expiration value from API (could be timestamp, date string, or 'lifetime')
     * @return string|null The expiration date in ISO format or null if lifetime/invalid
     * @since 1.0.0
     */
    private function convertExpirationToIsoFormat($expires): ?string
    {
        // Handle lifetime licenses or invalid values
        if (empty($expires) || $expires === 'lifetime' || $expires === 'never') {
            return null;
        }

        // Handle numeric Unix timestamps from EDD
        // EDD typically sends timestamps for expiration dates
        if (is_numeric($expires)) {
            $timestamp = (int) $expires;

            // Validate timestamp is in reasonable range
            // Reject timestamps before 1970 or after 2038 (32-bit Unix timestamp limit)
            if ($timestamp > 0 && $timestamp < 2147483647) {
                // Use gmdate for UTC consistency across servers
                return gmdate('Y-m-d', $timestamp);
            }
        }

        // Handle date strings (fallback for non-standard EDD responses)
        // EDD might send dates as "2025-12-31" or "December 31, 2025"
        if (is_string($expires)) {
            $timestamp = strtotime($expires);
            if ($timestamp !== false && $timestamp > 0) {
                return gmdate('Y-m-d', $timestamp);
            }
        }

        // Return null if format is unrecognized
        // Caller should handle this as invalid expiration data
        return null;
    }
}
