<?php

/**
 * Service for syncing license keys from WordPress constants to database.
 *
 * @package PublishPress\Hub\Application\Service\License
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\License;

use PublishPress\Hub\Application\Service\License\WpConfigLicenseReaderService;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;

class WpConfigLicenseSyncService
{
    private WpConfigLicenseReaderService $licenseReader;
    private LicensePersistenceInterface $licensePersistence;
    private PluginFamilyRepositoryInterface $pluginFamilyRepository;

    /**
     * @since 1.0.0
     */
    public function __construct(
        WpConfigLicenseReaderService $licenseReader,
        LicensePersistenceInterface $licensePersistence,
        PluginFamilyRepositoryInterface $pluginFamilyRepository
    ) {
        $this->licenseReader = $licenseReader;
        $this->licensePersistence = $licensePersistence;
        $this->pluginFamilyRepository = $pluginFamilyRepository;
    }

    /**
     * Sync license keys from constants to database.
     * Stores licenses without API validation and handles constant removal.
     *
     * @return void
     * @since 1.0.0
     */
    public function syncLicenseKeysFromConstants(): void
    {
        $constantsLicenseKeys = $this->licenseReader->readLicenseKeysFromConstants();
        $families = $this->pluginFamilyRepository->getAllFamilies();

        foreach ($families as $family) {
            $downloadId = $family->getProPlugin()->getDownloadId();

            if (isset($constantsLicenseKeys[$downloadId])) {
                // License key found in constants
                $constantLicenseKey = $constantsLicenseKeys[$downloadId];
                $storedLicenseKey = $this->licensePersistence->getLicenseKey($downloadId);

                // Check if different from stored value or not activated
                if ($storedLicenseKey !== $constantLicenseKey || !$this->licensePersistence->getLicenseStatus($downloadId)) {
                    // Store license key and mark as licensed (no API validation)
                    $this->licensePersistence->storeLicenseKey($downloadId, $constantLicenseKey);
                    $this->licensePersistence->storeLicenseStatus($downloadId, true);
                    $this->licensePersistence->markLicenseFromConstant($downloadId, true);
                } else {
                    // Ensure it's marked as from constant
                    $this->licensePersistence->markLicenseFromConstant($downloadId, true);
                }
            } else {
                // No constant found for this plugin
                // Check if license was previously from constant
                if ($this->licensePersistence->wasLicenseFromConstant($downloadId)) {
                    // Constant was removed - deactivate the license
                    $this->licensePersistence->storeLicenseStatus($downloadId, false);
                    $this->licensePersistence->markLicenseFromConstant($downloadId, false);
                }
            }
        }
    }
}

