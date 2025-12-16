<?php

/**
 * Use case for listing plugins.
 *
 * @package PublishPress\Hub\Application\UseCase\Plugin
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\UseCase\Plugin;

use PublishPress\Hub\Application\DTO\Plugin\PluginFamilyDto;
use PublishPress\Hub\Application\Service\License\Contract\LicenseManagementServiceInterface;
use PublishPress\Hub\Application\Service\License\LicenseStatusStorageService;
use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\ProPluginInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;
use WP_REST_Request;

class ListPluginsUseCase implements UseCaseInterface
{
    private PluginStatusService $pluginStatusService;

    private LicensePersistenceInterface $licensePersistence;

    private LicenseManagementServiceInterface $licenseManagement;

    private LicenseStatusStorageService $licenseStatusStorage;

    /**
     * @since 1.0.0
     */
    public function __construct(
        PluginStatusService $pluginStatusService,
        LicensePersistenceInterface $licensePersistence,
        LicenseManagementServiceInterface $licenseManagement,
        LicenseStatusStorageService $licenseStatusStorage
    ) {
        $this->pluginStatusService = $pluginStatusService;
        $this->licensePersistence = $licensePersistence;
        $this->licenseManagement = $licenseManagement;
        $this->licenseStatusStorage = $licenseStatusStorage;
    }

    /**
     * Lists plugins.
     *
     * @param WP_REST_Request $request Request containing familySlug parameter.
     * @return array<string, mixed> The response data with plugin slug and installation status.
     * @since 1.0.0
     */
    public function execute(WP_REST_Request $request): array
    {
        $families = $this->pluginStatusService->getAllPluginFamiliesWithUpdatedStatus();

        $plugins = [];

        /** @var PluginFamilyInterface $family */
        foreach ($families as $family) {
            $freePlugin = $family->getFreePlugin();
            $proPlugin = $family->getProPlugin();

            $dto = new PluginFamilyDto();
            $dto->setName(esc_html($family->getName()))
                ->setSlug(esc_html($family->getSlug()))
                ->setIconPath(esc_html($family->getIconPath()))
                ->setDescription(esc_html($family->getDescription()))
                ->setChangelogUrl(esc_html($family->getChangelogUrl()))
                ->setFreePluginName(esc_html($freePlugin->getName()))
                ->setFreePluginSlug(esc_html($freePlugin->getSlug()))
                ->setFreePluginVersion(esc_html($freePlugin->getVersion()))
                ->setFreePluginDetailsUrl(esc_html($freePlugin->getDetailsUrl()))
                ->setFreePluginIsInstalled($freePlugin->isInstalled())
                ->setFreePluginIsActive($freePlugin->isActive())
                ->setFreePluginPath(esc_html($freePlugin->getPath()))
                ->setProPluginName(esc_html($proPlugin->getName()))
                ->setProPluginSlug(esc_html($proPlugin->getSlug()))
                ->setProPluginVersion(esc_html($proPlugin->getVersion()))
                ->setProPluginDetailsUrl(esc_html($proPlugin->getDetailsUrl()))
                ->setProPluginIsInstalled($proPlugin->isInstalled())
                ->setProPluginIsActive($proPlugin->isActive())
                ->setProPluginIsLicensed($proPlugin->isLicensed())
                ->setProPluginPath(esc_html($proPlugin->getPath()))
                ->setIsAnyVersionInstalled($family->hasAnyVersionInstalled())
                ->setIsAnyVersionActive($family->hasAnyVersionActive())
                ->setHasConflictingInstallations($family->hasConflictingInstallations());

            $expirationDate = $this->getLicenseExpirationDate($proPlugin);
            $dto->setProPluginLicenseExpirationDate($expirationDate);

            // Check for plugin updates
            $updateInfo = $this->getPluginUpdateInfo($family, $request);
            $dto->setHasUpdate($updateInfo['hasUpdate'])
                ->setAvailableVersion($updateInfo['availableVersion']);

            $pluginData = $dto->toArray();

            $licenseKey = $this->getLicenseKey($proPlugin);
            // Never expose raw license keys to the client (prevents accidental disclosure via XSS/logging).
            $pluginData['proPlugin']['licenseKey'] = '';
            $pluginData['proPlugin']['hasLicenseKey'] = !empty($licenseKey);
            $pluginData['proPlugin']['licenseKeyMasked'] = !empty($licenseKey)
                ? $this->maskLicenseKey($licenseKey)
                : '';

            // Format expiration date for display using WordPress date format
            if (!empty($expirationDate)) {
                $pluginData['proPlugin']['licenseExpirationDateFormatted'] = $this->formatExpirationDate($expirationDate);
                $pluginData['proPlugin']['daysUntilExpiration'] = $this->getDaysUntilExpiration($expirationDate);
            }

            // Check if license is expired
            $isExpired = $this->isLicenseExpired($proPlugin);
            $pluginData['proPlugin']['isExpired'] = $isExpired;

            $plugins[] = $pluginData;
        }

        return [
            'success' => true,
            'plugins' => $plugins,
        ];
    }

    /**
     * Gets the license key for a given plugin.
     *
     * @param ProPluginInterface $proPlugin The plugin.
     * @return string The license key.
     * @since 1.0.0
     */
    private function getLicenseKey(ProPluginInterface $proPlugin): string
    {
        return $this->licensePersistence->getLicenseKey($proPlugin->getDownloadId()) ?? '';
    }

    /**
     * Gets the license expiration date for a given plugin.
     *
     * @param ProPluginInterface $proPlugin The plugin.
     * @return string|null The expiration date in ISO format (YYYY-MM-DD) or null.
     * @since 1.0.0
     */
    private function getLicenseExpirationDate(ProPluginInterface $proPlugin): ?string
    {
        return $this->licenseManagement->getStoredLicenseExpirationDate($proPlugin->getDownloadId());
    }

    /**
     * Formats the expiration date using WordPress date format.
     *
     * @param string $expirationDate The expiration date in ISO format (YYYY-MM-DD).
     * @return string The formatted date.
     * @since 1.0.0
     */
    private function formatExpirationDate(string $expirationDate): string
    {
        $timestamp = strtotime($expirationDate);

        if ($timestamp === false) {
            return $expirationDate;
        }

        return date_i18n(get_option('date_format'), $timestamp);
    }

    /**
     * Gets the number of days until the expiration date.
     *
     * @param string $expirationDate The expiration date in ISO format (YYYY-MM-DD).
     * @return int The number of days until the expiration date.
     * @since 1.0.0
     */
    private function getDaysUntilExpiration(string $expirationDate): int
    {
        $timestamp = strtotime($expirationDate);
        if ($timestamp === false) {
            return 0;
        }

        $timezone = function_exists('wp_timezone')
            ? wp_timezone()
            : new \DateTimeZone((string) date_default_timezone_get());

        $today = (new \DateTimeImmutable('now', $timezone))->setTime(0, 0, 0, 0);
        $expiresAt = (new \DateTimeImmutable($expirationDate, $timezone))->setTime(0, 0, 0, 0);

        $diff = $today->diff($expiresAt);
        $days = (int) $diff->days;

        return $diff->invert === 1 ? -$days : $days;
    }

    /**
     * Gets plugin update information.
     *
     * @param PluginFamilyInterface $family The plugin family.
     * @param WP_REST_Request $request The REST request object.
     * @return array<string, mixed> Update information with hasUpdate and availableVersion.
     * @since 1.0.0
     */
    private function getPluginUpdateInfo(PluginFamilyInterface $family, WP_REST_Request $request): array
    {
        if (!function_exists('get_plugin_updates')) {
            require_once ABSPATH . 'wp-admin/includes/update.php';
        }

        // Force refresh update cache if requested
        $forceCheck = $request->get_param('force-check');
        if ($forceCheck === '1' || $forceCheck === 1) {
            // Clear the main update transient
            delete_site_transient('update_plugins');

            // Clear any EDD-specific update transients
            // EDD plugins store update info with various transient keys
            global $wpdb;
            $edd_patterns = [
                '_site_transient_edd_sl_%',
                '_site_transient_edd_api_request_%',
                '_transient_edd_sl_%',
                '_transient_edd_api_request_%',
                '_site_transient_timeout_edd_sl_%',
                '_site_transient_timeout_edd_api_request_%',
                '_transient_timeout_edd_sl_%',
                '_transient_timeout_edd_api_request_%',
            ];

            if (is_multisite()) {
                foreach ($edd_patterns as $pattern) {
                    $wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.NoCaching
                        $wpdb->prepare(
                            "DELETE FROM {$wpdb->sitemeta} WHERE meta_key LIKE %s",
                            $pattern
                        )
                    );
                }
            } else {
                foreach ($edd_patterns as $pattern) {
                    $wpdb->query( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.NoCaching
                        $wpdb->prepare(
                            "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s",
                            $pattern
                        )
                    );
                }
            }

            // Force immediate update check by using set_site_transient with a very short timeout
            // This tricks WordPress into thinking the cache is expired
            set_site_transient('update_plugins', (object) ['last_checked' => 0], 1);

            // Call wp_update_plugins to trigger the update check
            // Note: This is still asynchronous, but clearing EDD transients should help
            if (function_exists('wp_update_plugins')) {
                wp_update_plugins();
            }
        }

        $updates = get_plugin_updates();

        if (empty($updates)) {
            return [
                'hasUpdate' => false,
                'availableVersion' => null,
            ];
        }

        // Determine which plugin is installed (free or pro)
        $installedPlugin = $family->getInstalledPlugin();

        if (!$installedPlugin) {
            return [
                'hasUpdate' => false,
                'availableVersion' => null,
            ];
        }

        $pluginPath = $installedPlugin->getPath();

        // Check if this plugin has an update available
        if (!isset($updates[$pluginPath])) {
            return [
                'hasUpdate' => false,
                'availableVersion' => null,
            ];
        }

        $update = $updates[$pluginPath];

        return [
            'hasUpdate' => true,
            'availableVersion' => $update->update->new_version ?? null,
        ];
    }

    /**
     * Check if license is expired.
     *
     * @param ProPluginInterface $proPlugin The plugin.
     * @return bool True if license is expired, false otherwise.
     * @since 1.0.0
     */
    private function isLicenseExpired(ProPluginInterface $proPlugin): bool
    {
        $downloadId = $proPlugin->getDownloadId();

        // First check stored expiration status
        $storedStatus = $this->licenseStatusStorage->getLicenseExpirationStatus($downloadId);

        if ($storedStatus !== null && isset($storedStatus['isExpired'])) {
            return (bool) $storedStatus['isExpired'];
        }

        // Fallback to calculating from expiration date
        $expirationDate = $this->getLicenseExpirationDate($proPlugin);

        // If no expiration date, it's likely a lifetime license - never expired
        if (empty($expirationDate)) {
            return false;
        }

        $daysUntilExpiration = $this->getDaysUntilExpiration($expirationDate);

        return $daysUntilExpiration < 0;
    }

    /**
     * Mask a license key for safe client display.
     *
     * @param string $licenseKey The raw license key.
     * @param int $visibleSuffix The number of visible characters at the end.
     * @return string The masked license key.
     * @since 1.0.0
     */
    private function maskLicenseKey(string $licenseKey, int $visibleSuffix = 5): string
    {
        $licenseKey = trim($licenseKey);

        if ($licenseKey === '') {
            return '';
        }

        $length = strlen($licenseKey);
        if ($length <= $visibleSuffix) {
            return str_repeat('*', $length);
        }

        return str_repeat('*', max(0, $length - $visibleSuffix)) . substr($licenseKey, -$visibleSuffix);
    }
}
