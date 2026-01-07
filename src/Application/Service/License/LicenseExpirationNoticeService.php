<?php

/**
 * License expiration notice service.
 *
 * @package PublishPress\Hub\Application\Service\License
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

declare(strict_types=1);

namespace PublishPress\Hub\Application\Service\License;

use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;

class LicenseExpirationNoticeService
{
    private LicenseStatusStorageService $licenseStatusStorage;
    private PluginStatusService $pluginStatusService;

    /**
     * @param LicenseStatusStorageService $licenseStatusStorage
     * @param PluginStatusService $pluginStatusService
     * @since 1.0.0
     */
    public function __construct(
        LicenseStatusStorageService $licenseStatusStorage,
        PluginStatusService $pluginStatusService
    ) {
        $this->licenseStatusStorage = $licenseStatusStorage;
        $this->pluginStatusService = $pluginStatusService;
    }

    /**
     * Initialize the service by hooking into admin_notices.
     *
     * @since 1.0.0
     */
    public function init(): void
    {
        add_action('admin_notices', [$this, 'displayExpiredLicenseNotices']);
    }

    /**
     * Display admin notices for expired licenses.
     *
     * Only displays to users with manage_options capability (administrators).
     * Does not display on the plugins list dashboard page.
     *
     * @since 1.0.0
     */
    public function displayExpiredLicenseNotices(): void
    {
        // Only show to administrators
        if (!current_user_can('manage_options')) {
            return;
        }

        // Don't show on the plugins list dashboard page
        $screen = get_current_screen();
        if (
            $screen &&
            (
                $screen->id === 'publishpress_page_publishpress-hub-plugins-dashboard' ||
                $screen->id === 'toplevel_page_publishpress-hub'
            )
        ) {
            return;
        }

        $expiredLicenses = $this->getExpiredLicensesForNotice();

        if (empty($expiredLicenses)) {
            return;
        }

        $pluginsDashboardUrl = admin_url('admin.php?page=publishpress-hub-plugins-dashboard');

        if (count($expiredLicenses) === 1) {
            $plugin = $expiredLicenses[0];
            $message = sprintf(
                // translators: %1$s is the plugin name, %2$s is the link to plugins dashboard
                esc_html__('Warning: The license for %1$s has expired. %2$s', 'publishpress-hub'),
                '<strong>' . esc_html($plugin['name']) . '</strong>',
                '<a href="' . esc_url($pluginsDashboardUrl) . '">' . esc_html__('Manage licenses', 'publishpress-hub') . '</a>'
            );
        } else {
            $pluginNames = array_map(
                function ($plugin) {
                    return esc_html($plugin['name']);
                },
                $expiredLicenses
            );
            $message = sprintf(
                // translators: %1$d is the number of plugins, %2$s is the list of plugin names, %3$s is the link to plugins dashboard
                esc_html__('Warning: %1$d plugin(s) have expired licenses: %2$s. %3$s', 'publishpress-hub'),
                count($expiredLicenses),
                '<strong>' . implode(', ', $pluginNames) . '</strong>',
                '<a href="' . esc_url($pluginsDashboardUrl) . '">' . esc_html__('Manage licenses', 'publishpress-hub') . '</a>'
            );
        }

        printf(
            '<div class="notice notice-error is-dismissible"><p>%s</p></div>',
            wp_kses_post($message)
        );
    }

    /**
     * Get expired licenses formatted for notice display.
     *
     * @return array<int, array<string, string>> Array of expired license data with 'name' and 'downloadId'.
     * @since 1.0.0
     */
    public function getExpiredLicensesForNotice(): array
    {
        $expiredStatuses = $this->licenseStatusStorage->getAllExpiredLicenses();

        if (empty($expiredStatuses)) {
            return [];
        }

        // Get all plugin families to map download IDs to plugin names
        $families = $this->pluginStatusService->getAllPluginFamiliesWithUpdatedStatus();

        $expiredLicenses = [];

        foreach ($families as $family) {
            $proPlugin = $family->getProPlugin();
            $downloadId = $proPlugin->getDownloadId();

            if (isset($expiredStatuses[$downloadId])) {
                $expiredLicenses[] = [
                    'name' => $proPlugin->getName(),
                    'downloadId' => (string) $downloadId,
                ];
            }
        }

        return $expiredLicenses;
    }
}
