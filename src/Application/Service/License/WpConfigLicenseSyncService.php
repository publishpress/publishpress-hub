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

use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;

\defined('ABSPATH') || exit;

class WpConfigLicenseSyncService
{
    private WpConfigLicenseReaderService $readerService;

    private LicensePersistenceInterface $licensePersistence;

    private PluginFamilyRepositoryInterface $pluginFamilyRepository;

    /**
     * @since 1.0.0
     */
    public function __construct(
        WpConfigLicenseReaderService $readerService,
        LicensePersistenceInterface $licensePersistence,
        PluginFamilyRepositoryInterface $pluginFamilyRepository
    ) {
        $this->readerService = $readerService;
        $this->licensePersistence = $licensePersistence;
        $this->pluginFamilyRepository = $pluginFamilyRepository;
    }

    /**
     * Sync license keys from constants to database.
     * Activates licenses from constants and deactivates ones that were from constants but no longer exist.
     *
     * @since 1.0.0
     */
    public function syncLicenseKeysFromConstants(): void
    {
        $constantLicenseKeys = $this->readerService->readLicenseKeysFromConstants();
        $families = $this->pluginFamilyRepository->getAllFamilies();

        foreach ($families as $family) {
            $downloadId = $family->getProPlugin()->getDownloadId();

            // Check if there's a license key from constant for this download ID
            if (isset($constantLicenseKeys[$downloadId])) {
                $licenseKey = $constantLicenseKeys[$downloadId];

                // Store/update the license key
                $this->licensePersistence->storeLicenseKey($downloadId, $licenseKey);

                // Activate the license
                $this->licensePersistence->storeLicenseStatus($downloadId, true);

                // Mark it as coming from constant
                $this->licensePersistence->markLicenseAsFromConstant($downloadId, true);
            } else {
                // No constant found - check if this license was previously from a constant
                if ($this->licensePersistence->isLicenseFromConstant($downloadId)) {
                    // It was from a constant but isn't anymore - deactivate it
                    $this->licensePersistence->storeLicenseStatus($downloadId, false);

                    // No longer from constant
                    $this->licensePersistence->markLicenseAsFromConstant($downloadId, false);
                }
                // If it wasn't from a constant, leave it alone (manual license)
            }
        }
    }
}
