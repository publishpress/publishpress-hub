<?php

/**
 * Per plugin license persistence service.
 *
 * @package PublishPress\Hub\Infrastructure\License
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Infrastructure\License;
defined( 'ABSPATH' ) || exit;

use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyRepositoryInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicenseOptionHandlerInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;
use PublishPress\Hub\Infrastructure\License\Handlers\SerializedObjectHandler;
use PublishPress\Hub\Infrastructure\WP\Options\Contract\WPOptionsAdapterInterface;

class PerPluginLicensePersistenceService implements LicensePersistenceInterface
{
    private WPOptionsAdapterInterface $optionsAdapter;

    private PluginFamilyRepositoryInterface $pluginFamilyRepository;

    /**
     * @var array<string, LicenseOptionHandlerInterface>
     */
    private array $licenseOptionHandlers;

    public function __construct(
        WPOptionsAdapterInterface $optionsAdapter,
        PluginFamilyRepositoryInterface $pluginFamilyRepository
    ) {
        $this->optionsAdapter = $optionsAdapter;
        $this->pluginFamilyRepository = $pluginFamilyRepository;
    }

    /**
     * Store a license key for a specific download ID.
     *
     * @param int $downloadId The download ID to associate with the license key.
     * @param string $licenseKey The license key to store.
     * @since 1.0.0
     */
    public function storeLicenseKey(int $downloadId, string $licenseKey): void
    {
        $handler = $this->getHandlerByDownloadId($downloadId);

        if (empty($handler)) {
            return;
        }

        $handler->storeLicenseKey($downloadId, $licenseKey);
    }

    /**
     * Store the license status for a specific download ID.
     *
     * @param int $downloadId The download ID to associate with the license status.
     * @param bool $isLicenseValid The license status to store.
     * @since 1.0.0
     */
    public function storeLicenseStatus(int $downloadId, bool $isLicenseValid): void
    {
        $handler = $this->getHandlerByDownloadId($downloadId);

        if (empty($handler)) {
            return;
        }

        $handler->storeLicenseStatus($downloadId, $isLicenseValid);
    }

    /**
     * Retrieve a license key for a specific download ID.
     *
     * @param int $downloadId The download ID to look up.
     * @return string|null The license key if found, null otherwise.
     * @since 1.0.0
     */
    public function getLicenseKey(int $downloadId): ?string
    {
        $handler = $this->getHandlerByDownloadId($downloadId);

        if (empty($handler)) {
            return null;
        }

        return $handler->getLicenseKey($downloadId);
    }

    /**
     * Get the license status for a specific download ID.
     *
     * @param int $downloadId The download ID to look up.
     * @return bool The license status.
     * @since 1.0.0
     */
    public function getLicenseStatus(int $downloadId): bool
    {
        $handler = $this->getHandlerByDownloadId($downloadId);

        if (empty($handler)) {
            return false;
        }

        return $handler->getLicenseStatus($downloadId);
    }

    /**
     * Remove a license key for a specific download ID.
     *
     * @param int $downloadId The download ID to remove the license key for.
     * @since 1.0.0
     */
    public function removeLicense(int $downloadId): void
    {
        $handler = $this->getHandlerByDownloadId($downloadId);

        if (empty($handler)) {
            return;
        }

        $handler->remove($downloadId);
    }

    /**
     * Check if a license key exists for a specific download ID.
     *
     * @param int $downloadId The download ID to check.
     * @return bool True if a license key exists, false otherwise.
     * @since 1.0.0
     */
    public function hasLicenseKey(int $downloadId): bool
    {
        $handler = $this->getHandlerByDownloadId($downloadId);

        if (empty($handler)) {
            return false;
        }

        return $handler->getLicenseKey($downloadId) !== null;
    }

    /**
     * Find all download IDs that use the specified license key.
     *
     * @param string $licenseKey The license key to search for.
     * @return int[] Array of download IDs that use this license key.
     * @since 1.0.0
     */
    public function getDownloadIdsUsingLicenseKey(string $licenseKey): array
    {
        $handlersList = array_keys($this->getHandlersList());

        $downloadIds = [];

        foreach ($handlersList as $familySlug) {
            $handler = $this->getHandlerByFamilySlug($familySlug);
            $downloadId = $this->pluginFamilyRepository->findFamilyBySlug($familySlug)->getProPlugin()->getDownloadId();

            if (empty($handler)) {
                continue;
            }

            $handlerLicenseKey = $handler->getLicenseKey($downloadId);

            if ($handlerLicenseKey === $licenseKey) {
                $downloadIds[] = $downloadId;
            }
        }

        return $downloadIds;
    }

    /**
     * Store the license expiration date.
     * The expiration date is stored by license key, so it can be reused across plugins using the same key.
     *
     * @param int $downloadId The download ID.
     * @param string|null $expirationDate The expiration date in ISO format (YYYY-MM-DD) or null.
     * @since 1.0.0
     */
    public function storeLicenseExpirationDate(int $downloadId, ?string $expirationDate): void
    {
        $licenseKey = $this->getLicenseKey($downloadId);

        if ($licenseKey !== null) {
            $this->storeLicenseExpirationDateByKey($licenseKey, $expirationDate);
        }

        // Also store by download ID for backward compatibility
        $handler = $this->getHandlerByDownloadId($downloadId);

        if (empty($handler)) {
            return;
        }

        $handler->storeLicenseExpirationDate($downloadId, $expirationDate);
    }

    /**
     * Get the license expiration date.
     * The expiration date is retrieved by license key, so it's shared across plugins using the same key.
     *
     * @param int $downloadId The download ID.
     * @return string|null The expiration date in ISO format (YYYY-MM-DD) or null.
     * @since 1.0.0
     */
    public function getLicenseExpirationDate(int $downloadId): ?string
    {
        $licenseKey = $this->getLicenseKey($downloadId);

        if ($licenseKey !== null) {
            $expirationDate = $this->getLicenseExpirationDateByKey($licenseKey);
            if ($expirationDate !== null) {
                return $expirationDate;
            }
        }

        // Fallback to download ID for backward compatibility
        $handler = $this->getHandlerByDownloadId($downloadId);

        if (empty($handler)) {
            return null;
        }

        return $handler->getLicenseExpirationDate($downloadId);
    }

    /**
     * Store the license expiration date for a specific license key.
     * This allows the expiration date to be shared across all plugins using the same license key.
     *
     * @param string $licenseKey The license key to associate with the expiration date.
     * @param string|null $expirationDate The expiration date in ISO format (YYYY-MM-DD) or null.
     * @since 1.0.0
     */
    public function storeLicenseExpirationDateByKey(string $licenseKey, ?string $expirationDate): void
    {
        // Store in a dedicated option that supports multiple license keys
        // This fixes the bug where SerializedObjectHandler was overwriting the single expiration field
        $optionName = 'publishpress_hub_license_expirations';
        $expirations = $this->optionsAdapter->getOption($optionName, []);

        if (!is_array($expirations)) {
            $expirations = [];
        }

        $licenseKeyHash = md5($licenseKey);

        if ($expirationDate === null) {
            unset($expirations[$licenseKeyHash]);
        } else {
            $expirations[$licenseKeyHash] = $expirationDate;
        }

        $this->optionsAdapter->updateOption($optionName, $expirations);
    }

    /**
     * Retrieve the license expiration date for a specific license key.
     *
     * @param string $licenseKey The license key to look up.
     * @return string|null The expiration date in ISO format (YYYY-MM-DD) if found, null otherwise.
     * @since 1.0.0
     */
    public function getLicenseExpirationDateByKey(string $licenseKey): ?string
    {
        // Retrieve from the dedicated option that supports multiple license keys
        $optionName = 'publishpress_hub_license_expirations';
        $expirations = $this->optionsAdapter->getOption($optionName, []);

        if (!is_array($expirations)) {
            $expirations = [];
        }

        $licenseKeyHash = md5($licenseKey);
        $expiration = $expirations[$licenseKeyHash] ?? null;

        return $expiration;
    }

    /**
     * Mark a license as coming from a constant or not.
     *
     * @param int $downloadId The download ID.
     * @param bool $isFromConstant Whether the license comes from a constant.
     * @since 1.0.0
     */
    public function markLicenseAsFromConstant(int $downloadId, bool $isFromConstant): void
    {
        $optionKey = 'publishpress_hub_license_source_' . $downloadId;
        $this->optionsAdapter->updateOption($optionKey, $isFromConstant ? 'constant' : 'manual');
    }

    /**
     * Check if a license comes from a constant.
     *
     * @param int $downloadId The download ID.
     * @return bool True if the license comes from a constant, false otherwise.
     * @since 1.0.0
     */
    public function isLicenseFromConstant(int $downloadId): bool
    {
        $optionKey = 'publishpress_hub_license_source_' . $downloadId;
        $source = $this->optionsAdapter->getOption($optionKey);
        return $source === 'constant';
    }

    /**
     * Get the plugin family slug by download ID.
     *
     * @param int $downloadId The download ID to get the plugin family slug for.
     * @return string|null The plugin family slug if found, null otherwise.
     * @since 1.0.0
     */
    private function getPluginFamilySlugByDownloadId(int $downloadId): ?string
    {
        $family = $this->pluginFamilyRepository->findFamilyByDownloadId($downloadId);

        if (empty($family)) {
            return null;
        }

        return $family->getSlug();
    }

    /**
     * Get the list of handlers.
     *
     * @return array<string, array<string, string>> The list of handlers.
     * @since 1.0.0
     */
    private function getHandlersList(): array
    {
        return require __DIR__ . '/handlers-family-map.php';
    }

    /**
     * Get the handler for a specific download ID.
     *
     * @param int $downloadId The download ID to get the handler for.
     * @return LicenseOptionHandlerInterface|null The handler if found, null otherwise.
     * @since 1.0.0
     */
    private function getHandlerByDownloadId(int $downloadId): ?LicenseOptionHandlerInterface
    {
        $familySlug = $this->getPluginFamilySlugByDownloadId($downloadId);

        if (empty($familySlug)) {
            return null;
        }

        return $this->getHandlerByFamilySlug($familySlug);
    }

    private function getHandlerByFamilySlug(string $familySlug): ?LicenseOptionHandlerInterface
    {
        if (isset($this->licenseOptionHandlers[$familySlug]) && ! empty($this->licenseOptionHandlers[$familySlug])) {
            return $this->licenseOptionHandlers[$familySlug];
        }

        $handlerData = $this->getHandlersList()[$familySlug] ?? null;

        if (empty($handlerData)) {
            return null;
        }

        $handlerClass = $handlerData[0];
        $handlerOptions = array_slice($handlerData, 1);

        $this->licenseOptionHandlers[$familySlug] = new $handlerClass($this->optionsAdapter, ...$handlerOptions);

        return $this->licenseOptionHandlers[$familySlug];
    }
}
