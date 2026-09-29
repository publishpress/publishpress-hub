/**
 * Use license expiration warning hook.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { useEffect, useState, useCallback } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

import { __, sprintf } from '@publishpress-hub/i18n';

const DAYS_UNTIL_EXPIRATION = 30;

const RENEW_NOW_URL = 'https://publishpress.com/links/hub-renew-now';

const API_NAMESPACE = '/publishpress-hub/v1';

/**
 * Hook to check for licenses expiring within the specified days and expired licenses,
 * displaying appropriate warning notices.
 *
 * Uses the license status data from the new license services (isExpired, daysUntilExpiration).
 *
 * @param {Array} plugins The plugins array to check for expiring/expired licenses.
 * @param {number} daysUntilExpiration Number of days before expiration to show warning (default: 30).
 * @since 1.0.0
 */
export const useLicenseExpirationWarning = (plugins, daysUntilExpiration = DAYS_UNTIL_EXPIRATION) => {
    const { createNotice, removeNotice } = useDispatch('core/notices');
    const [dismissalStatus, setDismissalStatus] = useState({ expired: false, expiring: false });

    // Fetch dismissal status on mount
    useEffect(() => {
        const fetchDismissalStatus = async () => {
            try {
                const response = await apiFetch({
                    path: `${API_NAMESPACE}/license-notices/dismissal-status`,
                    method: 'GET',
                });
                setDismissalStatus(response.dismissalStatus || { expired: false, expiring: false });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error fetching dismissal status:', error);
            }
        };

        fetchDismissalStatus();
    }, []);

    // Handle notice dismissal
    const handleNoticeDismiss = useCallback(async (noticeType) => {
        try {
            await apiFetch({
                path: `${API_NAMESPACE}/license-notices/dismiss`,
                method: 'POST',
                data: { noticeType },
            });

            // Update local dismissal status
            setDismissalStatus(prev => ({
                ...prev,
                [noticeType]: true,
            }));
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error dismissing notice:', error);
        }
    }, []);

    useEffect(() => {
        if (!plugins || plugins.length === 0) {
            return;
        }

        const expiringPlugins = [];
        const expiredPlugins = [];

        plugins.forEach((plugin) => {
            // Check for expired licenses using the isExpired flag from license services
            // This takes priority over expiring licenses
            if (
                plugin.proPlugin.isInstalled &&
                plugin.proPlugin.isExpired &&
                plugin.proPlugin.detailsUrl
            ) {
                expiredPlugins.push({
                    name: plugin.proPlugin.name,
                    expirationDate: plugin.proPlugin.licenseExpirationDateFormatted || plugin.proPlugin.licenseExpirationDate || __('N/A', 'publishpress-hub'),
                    detailsUrl: plugin.proPlugin.detailsUrl,
                });
            }
            // Check for licenses expiring within the specified days
            // Use daysUntilExpiration from the plugin data (calculated by backend)
            // Only check if not already expired
            else if (
                plugin.proPlugin.isLicensed &&
                !plugin.proPlugin.isExpired &&
                plugin.proPlugin.daysUntilExpiration !== undefined &&
                plugin.proPlugin.daysUntilExpiration >= 0 &&
                plugin.proPlugin.daysUntilExpiration <= daysUntilExpiration
            ) {
                expiringPlugins.push({
                    name: plugin.proPlugin.name,
                    expirationDate: plugin.proPlugin.licenseExpirationDateFormatted || plugin.proPlugin.licenseExpirationDate,
                    daysUntilExpiration: plugin.proPlugin.daysUntilExpiration,
                    detailsUrl: plugin.proPlugin.detailsUrl,
                });
            }
        });

        // Remove existing notices first
        removeNotice('pp-hub-license-expiration-warning');
        removeNotice('pp-hub-license-expired-warning');

        // Display expired license notice (error level - highest priority)
        if (expiredPlugins.length > 0) {
            // Group plugins by expiration date
            const pluginsByDate = {};
            expiredPlugins.forEach((plugin) => {
                const date = plugin.expirationDate;
                if (!pluginsByDate[date]) {
                    pluginsByDate[date] = [];
                }
                pluginsByDate[date].push(plugin);
            });

            // Build message with grouped plugins
            const dateGroups = Object.keys(pluginsByDate).map((date) => {
                const plugins = pluginsByDate[date];
                const pluginNames = plugins.map((p) => `<strong>${p.name}</strong>`).join(', ');

                if (plugins.length === 1) {
                    return sprintf(
                        // translators: %1$s is the plugin name, %2$s is the expiration date
                        __('The license for %1$s expired on %2$s', 'publishpress-hub'),
                        pluginNames,
                        date
                    );
                } else {
                    return sprintf(
                        // translators: %1$s is the list of plugin names, %2$s is the expiration date
                        __('The licenses for %1$s expired on %2$s', 'publishpress-hub'),
                        pluginNames,
                        date
                    );
                }
            });

            const baseMessage = dateGroups.join('. ') + '.';

            // Add single renewal link (use dashboard subscriptions URL)
            const renewLink = `<a href="${RENEW_NOW_URL}" target="_blank" rel="noopener noreferrer" class="pp-hub-renew-link">${__('Renew now', 'publishpress-hub')}</a>`;

            const message = baseMessage + ' ' + renewLink;

            createNotice(
                'error',
                message,
                {
                    id: 'pp-hub-license-expired-warning',
                    isDismissible: false,
                    __unstableHTML: true,
                }
            );
        }

        // Display expiring license notice (warning level)
        if (expiringPlugins.length > 0 && !dismissalStatus.expiring) {
            // Group plugins by expiration date
            const pluginsByDate = {};
            expiringPlugins.forEach((plugin) => {
                const date = plugin.expirationDate;
                if (!pluginsByDate[date]) {
                    pluginsByDate[date] = [];
                }
                pluginsByDate[date].push(plugin);
            });

            // Build message with grouped plugins
            const dateGroups = Object.keys(pluginsByDate).map((date) => {
                const plugins = pluginsByDate[date];
                const pluginNames = plugins.map((p) => p.name).join(', ');
                const daysRemaining = plugins[0].daysUntilExpiration; // All plugins in group have same days remaining

                if (plugins.length === 1) {
                    return sprintf(
                        // translators: %1$s is the plugin name, %2$s is the expiration date, %3$d is the number of days
                        __('The license for %1$s expires on %2$s (%3$d days remaining)', 'publishpress-hub'),
                        pluginNames,
                        date,
                        daysRemaining
                    );
                } else {
                    return sprintf(
                        // translators: %1$s is the list of plugin names, %2$s is the expiration date, %3$d is the number of days
                        __('The licenses for %1$s expire on %2$s (%3$d days remaining)', 'publishpress-hub'),
                        pluginNames,
                        date,
                        daysRemaining
                    );
                }
            });

            const baseMessage = __('Warning:', 'publishpress-hub') + ' ' + dateGroups.join('. ') + '.';

            // Add single renewal link (use dashboard subscriptions URL)
            const renewLink = `<a href="${RENEW_NOW_URL}" target="_blank" rel="noopener noreferrer" class="pp-hub-renew-link">${__('Renew now', 'publishpress-hub')}</a>`;

            const message = baseMessage + '<br/>' + renewLink;

            createNotice(
                'warning',
                message,
                {
                    id: 'pp-hub-license-expiration-warning',
                    isDismissible: true,
                    __unstableHTML: true,
                    onDismiss: () => handleNoticeDismiss('expiring'),
                }
            );
        }

    }, [plugins, createNotice, removeNotice, daysUntilExpiration, dismissalStatus, handleNoticeDismiss]);
};
