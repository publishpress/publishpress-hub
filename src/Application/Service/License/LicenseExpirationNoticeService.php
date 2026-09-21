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
defined( 'ABSPATH' ) || exit;

use PublishPress\Hub\Application\Service\Access\HubAccessService;
use PublishPress\Hub\Application\Service\PluginStatus\PluginStatusService;
use PublishPress\Hub\Infrastructure\Hooks\AbstractHooks;

class LicenseExpirationNoticeService
{
    /**
     * Duration in seconds for which a dismissed notice stays hidden (1 month = 30 days).
     */
    private const DISMISSAL_DURATION = 30 * DAY_IN_SECONDS;

    /**
     * Query parameter name for dismissing notices.
     */
    public const DISMISS_PARAM = 'pp_hub_dismiss_license_notice';

    /**
     * Nonce action name for dismissing notices.
     */
    public const DISMISS_NONCE_ACTION = 'pp_hub_dismiss_license_notice';

    /**
     * User meta key for storing dismissal data.
     */
    public const DISMISS_META_KEY = 'pp_hub_license_notice_dismissed';

    /**
     * User meta key for storing dashboard notice dismissal data.
     */
    public const DASHBOARD_DISMISS_META_KEY = 'pp_hub_dashboard_license_notice_dismissed';

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
     * Initialize the service by hooking into admin_init and admin_notices.
     *
     * @since 1.0.0
     */
    public function init(): void
    {
        add_action(AbstractHooks::ACTION_ADMIN_INIT, [$this, 'handleDismissRequest']);
        add_action(AbstractHooks::ACTION_ADMIN_NOTICES, [$this, 'displayExpiredLicenseNotices']);
        add_action(AbstractHooks::ACTION_ADMIN_ENQUEUE_SCRIPTS, [$this, 'enqueueNoticeScript']);
        add_action('wp_ajax_pp_hub_dismiss_admin_license_notice', [$this, 'handleAjaxDismissRequest']);
    }

    /**
     * Display admin notices for expired licenses.
     *
     * Only displays to users with Hub access capability (administrators).
     * Does not display on the plugins list dashboard page.
     *
     * @since 1.0.0
     */
    public function displayExpiredLicenseNotices(): void
    {
        // Only show to administrators
        if (!current_user_can(HubAccessService::CAPABILITY)) {
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

        // Check if user has dismissed this notice
        if ($this->isNoticeDismissed()) {
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

        $nonce = wp_create_nonce('pp_hub_dismiss_admin_license_notice');

        printf(
            '<div class="notice notice-error is-dismissible pp-hub-admin-license-notice" data-nonce="%s"><p>%s</p></div>',
            esc_attr($nonce),
            wp_kses_post($message)
        );
    }

    /**
     * Get expired licenses formatted for notice display.
     *
     * @return array<int, array<string, string>> Array of expired license data with 'name', 'downloadId', and 'expirationDate'.
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
                    'expirationDate' => $expiredStatuses[$downloadId]['expirationDate'] ?? '',
                ];
            }
        }

        return $expiredLicenses;
    }

    /**
     * Handle GET request to dismiss the notice.
     *
     * @since 1.0.0
     */
    public function handleDismissRequest(): void
    {
        if (!isset($_GET[self::DISMISS_PARAM])) {
            return;
        }

        if (
            !isset($_GET['nonce'])
            || !wp_verify_nonce(sanitize_key($_GET['nonce']), self::DISMISS_NONCE_ACTION)
        ) {
            return;
        }

        if (!current_user_can(HubAccessService::CAPABILITY)) {
            return;
        }

        $this->setNoticeDismissed();

        // Redirect to clean URL without query parameters
        $redirectUrl = remove_query_arg([self::DISMISS_PARAM, 'nonce']);
        wp_safe_redirect($redirectUrl);
        exit;
    }

    /**
     * Check if the notice has been dismissed by the current user.
     *
     * @since 1.0.0
     */
    private function isNoticeDismissed(): bool
    {
        $userId = get_current_user_id();
        $dismissalData = get_user_meta($userId, self::DISMISS_META_KEY, true);

        if (!$dismissalData || !is_array($dismissalData)) {
            return false;
        }

        // Check if dismissal has expired (older than 1 month)
        $dismissedAt = $dismissalData['dismissed_at'] ?? 0;
        $expiresAt = $dismissedAt + self::DISMISSAL_DURATION;

        if (time() > $expiresAt) {
            $this->clearDismissedNotice();
            return false;
        }

        // Clear dismissal if expired licenses have changed
        $expiredLicenses = $this->getExpiredLicensesForNotice();
        $currentHash = $this->generateLicensesHash($expiredLicenses);
        $storedHash = $dismissalData['hash'] ?? '';

        if ($storedHash !== $currentHash) {
            $this->clearDismissedNotice();
            return false;
        }

        return true;
    }

    /**
     * Mark the notice as dismissed for the current user.
     *
     * Stores the dismissal with a timestamp and hash of expired licenses.
     * The dismissal will expire after DISMISSAL_DURATION (1 month).
     *
     * @since 1.0.0
     */
    private function setNoticeDismissed(): void
    {
        $userId = get_current_user_id();
        $expiredLicenses = $this->getExpiredLicensesForNotice();
        $hash = $this->generateLicensesHash($expiredLicenses);

        $dismissalData = [
            'hash' => $hash,
            'dismissed_at' => time(),
            'expires_at' => time() + self::DISMISSAL_DURATION
        ];

        update_user_meta($userId, self::DISMISS_META_KEY, $dismissalData);
    }

    /**
     * Clear dismissed notice state for the current user.
     *
     * @since 1.0.0
     */
    private function clearDismissedNotice(): void
    {
        $userId = get_current_user_id();
        delete_user_meta($userId, self::DISMISS_META_KEY);
    }

    /**
     * Generate a hash of expired licenses for comparison.
     *
     * Includes both download IDs and expiration dates to detect changes when licenses are renewed.
     *
     * @param array<int, array<string, string>> $licenses
     * @since 1.0.0
     */
    private function generateLicensesHash(array $licenses): string
    {
        $hashData = [];

        foreach ($licenses as $license) {
            $hashData[] = $license['downloadId'] . ':' . ($license['expirationDate'] ?? '');
        }

        sort($hashData);
        return md5(implode('|', $hashData));
    }

    /**
     * Enqueue script for handling admin notice dismissal.
     *
     * @since 1.0.0
     */
    public function enqueueNoticeScript(): void
    {
        // Only enqueue on pages where we show the notice
        if (!current_user_can(HubAccessService::CAPABILITY)) {
            return;
        }

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

        // Only enqueue if there are expired licenses to show
        $expiredLicenses = $this->getExpiredLicensesForNotice();
        if (empty($expiredLicenses) || $this->isNoticeDismissed()) {
            return;
        }

        wp_add_inline_script(
            'common',
            "
            jQuery(document).ready(function($) {
                $(document).on('click', '.pp-hub-admin-license-notice .notice-dismiss', function(e) {
                    var notice = $(this).closest('.pp-hub-admin-license-notice');
                    var nonce = notice.data('nonce');

                    $.post(ajaxurl, {
                        action: 'pp_hub_dismiss_admin_license_notice',
                        nonce: nonce
                    });
                });
            });
            "
        );
    }

    /**
     * Handle AJAX request to dismiss admin notice.
     *
     * @since 1.0.0
     */
    public function handleAjaxDismissRequest(): void
    {
        check_ajax_referer('pp_hub_dismiss_admin_license_notice', 'nonce');

        if (!current_user_can(HubAccessService::CAPABILITY)) {
            wp_send_json_error(['message' => 'Unauthorized'], 403);
            return;
        }

        $this->setNoticeDismissed();

        wp_send_json_success(['dismissed' => true]);
    }

    /**
     * Check if dashboard notice has been dismissed.
     *
     * @param string $noticeType The notice type ('expired' or 'expiring').
     * @since 1.0.0
     */
    public function isDashboardNoticeDismissed(string $noticeType): bool
    {
        $userId = get_current_user_id();
        $dismissalData = get_user_meta($userId, self::DASHBOARD_DISMISS_META_KEY, true);

        if (!$dismissalData || !is_array($dismissalData)) {
            return false;
        }

        if (!isset($dismissalData[$noticeType])) {
            return false;
        }

        $typeData = $dismissalData[$noticeType];

        // Check if dismissal has expired (older than 1 month)
        $dismissedAt = $typeData['dismissed_at'] ?? 0;
        $expiresAt = $dismissedAt + self::DISMISSAL_DURATION;

        if (time() > $expiresAt) {
            $this->clearDashboardDismissedNotice($noticeType);
            return false;
        }

        // Get current licenses for this notice type
        $currentLicenses = $this->getLicensesForNoticeType($noticeType);
        $currentHash = $this->generateLicensesHash($currentLicenses);
        $storedHash = $typeData['hash'] ?? '';

        if ($storedHash !== $currentHash) {
            $this->clearDashboardDismissedNotice($noticeType);
            return false;
        }

        return true;
    }

    /**
     * Dismiss dashboard notice.
     *
     * @param string $noticeType The notice type ('expired' or 'expiring').
     * @since 1.0.0
     */
    public function dismissDashboardNotice(string $noticeType): void
    {
        $userId = get_current_user_id();
        $dismissalData = get_user_meta($userId, self::DASHBOARD_DISMISS_META_KEY, true);

        if (!is_array($dismissalData)) {
            $dismissalData = [];
        }

        $currentLicenses = $this->getLicensesForNoticeType($noticeType);
        $hash = $this->generateLicensesHash($currentLicenses);

        $dismissalData[$noticeType] = [
            'hash' => $hash,
            'dismissed_at' => time(),
            'expires_at' => time() + self::DISMISSAL_DURATION
        ];

        update_user_meta($userId, self::DASHBOARD_DISMISS_META_KEY, $dismissalData);
    }

    /**
     * Clear dashboard dismissed notice for specific type.
     *
     * @param string $noticeType The notice type ('expired' or 'expiring').
     * @since 1.0.0
     */
    private function clearDashboardDismissedNotice(string $noticeType): void
    {
        $userId = get_current_user_id();
        $dismissalData = get_user_meta($userId, self::DASHBOARD_DISMISS_META_KEY, true);

        if (is_array($dismissalData) && isset($dismissalData[$noticeType])) {
            unset($dismissalData[$noticeType]);

            if (empty($dismissalData)) {
                delete_user_meta($userId, self::DASHBOARD_DISMISS_META_KEY);
            } else {
                update_user_meta($userId, self::DASHBOARD_DISMISS_META_KEY, $dismissalData);
            }
        }
    }

    /**
     * Get licenses for a specific notice type.
     *
     * @param string $noticeType The notice type ('expired' or 'expiring').
     * @return array<int, array<string, string>>
     * @since 1.0.0
     */
    private function getLicensesForNoticeType(string $noticeType): array
    {
        if ($noticeType === 'expired') {
            return $this->getExpiredLicensesForNotice();
        }

        // For 'expiring' notices, we would need to implement getExpiringLicensesForNotice
        // For now, we'll return an empty array as the frontend handles expiring logic
        return [];
    }

    /**
     * Get dashboard notice dismissal status.
     *
     * Returns an array with dismissal status for both expired and expiring notices.
     *
     * @return array<string, bool>
     * @since 1.0.0
     */
    public function getDashboardNoticeDismissalStatus(): array
    {
        return [
            'expired' => $this->isDashboardNoticeDismissed('expired'),
            'expiring' => $this->isDashboardNoticeDismissed('expiring'),
        ];
    }
}
