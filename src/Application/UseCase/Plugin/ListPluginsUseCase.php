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

defined('ABSPATH') || exit;

use PublishPress\Hub\Application\DTO\Plugin\PluginFamilyDto;
use PublishPress\Hub\Application\Service\License\Contract\LicenseManagementServiceInterface;
use PublishPress\Hub\Application\Service\License\LicenseStatusStorageService;
use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Application\UseCase\Contract\UseCaseInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginInterface;
use PublishPress\Hub\Domain\Plugin\Contract\PluginFamilyInterface;
use PublishPress\Hub\Domain\Plugin\Contract\ProPluginInterface;
use PublishPress\Hub\Infrastructure\License\Contract\LicensePersistenceInterface;
use WP_REST_Request;

class ListPluginsUseCase implements UseCaseInterface
{
    private const UPDATE_INFO_EMPTY = [
        'hasUpdate' => false,
        'availableVersion' => null,
    ];

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

        if (!function_exists('get_plugin_updates')) {
            require_once ABSPATH . 'wp-admin/includes/update.php';
        }

        // Clear update caches once per request, not once per plugin family.
        if ($this->isForceCheck($request)) {
            $this->clearUpdateCaches();
        }

        $updates = get_plugin_updates();

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
            $updateInfo = $this->getPluginUpdateInfo($family, $updates, $request);
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
            $pluginData['proPlugin']['isLicenseKeyFromConstant'] =
                $this->licensePersistence->isLicenseFromConstant($proPlugin->getDownloadId());

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
        $downloadId = $proPlugin->getDownloadId();

        return $this->licenseManagement->getStoredLicenseExpirationDate($downloadId);
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
     * Whether the request asks to bypass cached update data.
     *
     * @param WP_REST_Request $request The REST request object.
     * @return bool
     * @since 1.1.0
     */
    private function isForceCheck(WP_REST_Request $request): bool
    {
        $forceCheck = $request->get_param('force-check');

        return $forceCheck === '1' || $forceCheck === 1;
    }

    /**
     * Clears WordPress and EDD update caches and triggers a fresh update check.
     *
     * @return void
     * @since 1.1.0
     */
    private function clearUpdateCaches(): void
    {
        global $wpdb;

        // Clear the main update transient
        delete_site_transient('update_plugins');

        // EDD plugins store update info under several transient keys. WordPress has no
        // wildcard transient deletion API, so delete them with one query per table.
        $transientPrefixes = [
            '_transient_edd_sl_',
            '_transient_edd_api_request_',
            '_transient_timeout_edd_sl_',
            '_transient_timeout_edd_api_request_',
        ];
        $siteTransientPrefixes = [
            '_site_transient_edd_sl_',
            '_site_transient_edd_api_request_',
            '_site_transient_timeout_edd_sl_',
            '_site_transient_timeout_edd_api_request_',
        ];

        if (is_multisite()) {
            // Site transients live in sitemeta on multisite; regular transients stay in options.
            $this->deleteRowsByPrefix($wpdb->options, 'option_name', $transientPrefixes);
            $this->deleteRowsByPrefix($wpdb->sitemeta, 'meta_key', $siteTransientPrefixes);
        } else {
            $this->deleteRowsByPrefix(
                $wpdb->options,
                'option_name',
                array_merge($transientPrefixes, $siteTransientPrefixes)
            );
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

    /**
     * Deletes rows whose key starts with any of the given prefixes, in a single query.
     *
     * @param string $table Table name.
     * @param string $column Key column name.
     * @param string[] $prefixes Literal key prefixes.
     * @return void
     * @since 1.1.0
     */
    private function deleteRowsByPrefix(string $table, string $column, array $prefixes): void
    {
        global $wpdb;

        $patterns = array_map(
            static fn (string $prefix): string => $wpdb->esc_like($prefix) . '%',
            $prefixes
        );
        $conditions = implode(' OR ', array_fill(0, count($patterns), '%i LIKE %s'));
        $values = [$table];

        foreach ($patterns as $pattern) {
            $values[] = $column;
            $values[] = $pattern;
        }

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching, WordPress.DB.PreparedSQL.InterpolatedNotPrepared, WordPress.DB.PreparedSQLPlaceholders.ReplacementsWrongNumber -- Wildcard transient cleanup; placeholders are built to match $values.
        $wpdb->query($wpdb->prepare("DELETE FROM %i WHERE {$conditions}", $values));
    }

    /**
     * Gets plugin update information.
     *
     * @param PluginFamilyInterface $family The plugin family.
     * @param array<string, object> $updates Result of get_plugin_updates(), fetched once per request.
     * @param WP_REST_Request $request The REST request object.
     * @return array<string, mixed> Update information with hasUpdate and availableVersion.
     * @since 1.0.0
     */
    private function getPluginUpdateInfo(PluginFamilyInterface $family, array $updates, WP_REST_Request $request): array
    {
        // Determine which plugin is installed (free or pro)
        $installedPlugin = $family->getInstalledPlugin();

        if (!$installedPlugin) {
            return self::UPDATE_INFO_EMPTY;
        }

        $pluginPath = $installedPlugin->getPath();

        // Check if this plugin has an update available
        if (isset($updates[$pluginPath])) {
            $update = $updates[$pluginPath];

            return [
                'hasUpdate' => true,
                'availableVersion' => $this->getAvailableVersionFromWordPressUpdate($update),
            ];
        }

        return $this->getProPluginUpdateInfo($family, $installedPlugin, $request);
    }

    /**
     * Gets the available version from a WordPress plugin update object.
     *
     * @param mixed $update The WordPress update object.
     * @return string|null The available version.
     * @since 1.0.0
     */
    private function getAvailableVersionFromWordPressUpdate($update): ?string
    {
        if (isset($update->update->new_version)) {
            return (string) $update->update->new_version;
        }

        if (isset($update->new_version)) {
            return (string) $update->new_version;
        }

        return null;
    }

    /**
     * Gets Pro plugin update information directly from the license server.
     *
     * @param PluginFamilyInterface $family The plugin family.
     * @param PluginInterface $installedPlugin The installed plugin.
     * @param WP_REST_Request $request The REST request object.
     * @return array<string, mixed> Update information with hasUpdate and availableVersion.
     * @since 1.0.0
     */
    private function getProPluginUpdateInfo(
        PluginFamilyInterface $family,
        PluginInterface $installedPlugin,
        WP_REST_Request $request
    ): array {
        $proPlugin = $family->getProPlugin();

        if ($installedPlugin->getPath() !== $proPlugin->getPath()) {
            return self::UPDATE_INFO_EMPTY;
        }

        $licenseKey = $this->getLicenseKey($proPlugin);

        try {
            $versionInfo = $this->licenseManagement->getLastVersionInfo(
                $licenseKey,
                $proPlugin->getDownloadId(),
                $this->isForceCheck($request)
            );
        } catch (\Throwable $throwable) {
            return self::UPDATE_INFO_EMPTY;
        }

        $availableVersion = $this->getAvailableVersionFromVersionInfo($versionInfo);

        if (!$this->isNewerVersion($availableVersion, $installedPlugin->getVersion())) {
            return self::UPDATE_INFO_EMPTY;
        }

        return [
            'hasUpdate' => true,
            'availableVersion' => $availableVersion,
        ];
    }

    /**
     * Gets the available version from license server version information.
     *
     * @param array<string, mixed> $versionInfo The version information.
     * @return string|null The available version.
     * @since 1.0.0
     */
    private function getAvailableVersionFromVersionInfo(array $versionInfo): ?string
    {
        if (isset($versionInfo['version'])) {
            return (string) $versionInfo['version'];
        }

        if (isset($versionInfo['new_version'])) {
            return (string) $versionInfo['new_version'];
        }

        return null;
    }

    /**
     * Checks if an available version is newer than the installed version.
     *
     * @param string|null $availableVersion The available version.
     * @param string|null $installedVersion The installed version.
     * @return bool True if the available version is newer.
     * @since 1.0.0
     */
    private function isNewerVersion(?string $availableVersion, ?string $installedVersion): bool
    {
        if (empty($availableVersion) || empty($installedVersion)) {
            return false;
        }

        return version_compare($availableVersion, $installedVersion, '>');
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
