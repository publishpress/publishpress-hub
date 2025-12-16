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
     * Validate all licenses.
     *
     * This method makes one API request per license key (bulk checking not supported yet).
     *
     * @since 1.0.0
     */
    public function validateAllLicenses(): void
    {
        $this->logger->log('Starting scheduled license validation');

        try {
            // Get all plugin families with updated status
            $families = $this->pluginStatusService->getAllPluginFamiliesWithUpdatedStatus();

            $validatedCount = 0;
            $errorCount = 0;

            foreach ($families as $family) {
                $proPlugin = $family->getProPlugin();

                // Only validate if plugin is installed and has a license key
                if (!$proPlugin->isInstalled() || !$proPlugin->isLicensed()) {
                    continue;
                }

                $downloadId = $proPlugin->getDownloadId();
                $licenseKey = $this->licensePersistence->getLicenseKey($downloadId);

                if (empty($licenseKey)) {
                    continue;
                }

                try {
                    // Make one API request per license key
                    $licenseInfo = $this->licenseManagement->getLicenseInfo($licenseKey, $downloadId, true);

                    // Extract expiration date from license info
                    $expirationDate = null;
                    $isLifetime = false;
                    if (isset($licenseInfo['expires'])) {
                        $expiresValue = $licenseInfo['expires'];
                        // Check if it's a lifetime license
                        if (empty($expiresValue) || $expiresValue === 'lifetime' || $expiresValue === 'never') {
                            $isLifetime = true;
                            $expirationDate = null;
                        } else {
                            $expirationDate = $this->convertExpirationToIsoFormat($expiresValue);
                        }
                    }

                    // Determine if license is expired
                    // Lifetime licenses are never expired
                    $isExpired = false;
                    if (!$isLifetime && $expirationDate !== null) {
                        $today = new \DateTimeImmutable();
                        $today = $today->setTime(0, 0, 0, 0);
                        $expiration = new \DateTimeImmutable($expirationDate);
                        $expiration = $expiration->setTime(0, 0, 0, 0);
                        $isExpired = $expiration < $today;
                    }

                    // Store expiration status
                    $this->licenseStatusStorage->storeLicenseExpirationStatus(
                        $downloadId,
                        $isExpired,
                        $expirationDate
                    );

                    // Update expiration date in persistence
                    // For lifetime licenses, clear any previously stored expiration date
                    if ($isLifetime) {
                        // Clear stored expiration date for lifetime licenses
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
                    // Continue with next license
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
        if (empty($expires) || $expires === 'lifetime' || $expires === 'never') {
            return null;
        }

        // If it's a numeric timestamp
        if (is_numeric($expires)) {
            $timestamp = (int) $expires;
            // Check if it's a valid timestamp (not year 1970 or before)
            if ($timestamp > 0 && $timestamp < 2147483647) {
                return gmdate('Y-m-d', $timestamp);
            }
        }

        // If it's already a date string, try to parse it
        if (is_string($expires)) {
            $timestamp = strtotime($expires);
            if ($timestamp !== false && $timestamp > 0) {
                return gmdate('Y-m-d', $timestamp);
            }
        }

        return null;
    }
}
