/**
 * Use license expiration warning hook.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { useEffect } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

import { __, sprintf } from '@publishpress-hub/i18n';

const DAYS_UNTIL_EXPIRATION = 30;

/**
 * Hook to check for licenses expiring within the specified days and display a warning notice.
 *
 * @param {Array} plugins The plugins array to check for expiring licenses.
 * @since 1.0.0
 */
export const useLicenseExpirationWarning = (plugins, daysUntilExpiration = DAYS_UNTIL_EXPIRATION) => {
    const { createNotice } = useDispatch('core/notices');

    useEffect(() => {
        if (!plugins || plugins.length === 0) {
            return;
        }

        const expiringPlugins = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const daysFromNow = new Date(today);
        daysFromNow.setDate(today.getDate() + daysUntilExpiration);

        plugins.forEach((plugin) => {
            if (
                plugin.proPlugin.isLicensed &&
                plugin.proPlugin.licenseExpirationDate
            ) {
                const expirationDate = new Date(plugin.proPlugin.licenseExpirationDate);
                expirationDate.setHours(0, 0, 0, 0);

                // Check if expiration date is within the specified days and not in the past
                if (
                    expirationDate >= today &&
                    expirationDate <= daysFromNow
                ) {
                    const daysUntilExpiration = Math.ceil(
                        (expirationDate - today) / (1000 * 60 * 60 * 24)
                    );
                    expiringPlugins.push({
                        name: plugin.proPlugin.name,
                        expirationDate: plugin.proPlugin.licenseExpirationDateFormatted || plugin.proPlugin.licenseExpirationDate,
                        daysUntilExpiration,
                    });
                }
            }
        });

        if (expiringPlugins.length > 0) {
            const expirationDates = expiringPlugins
                .map((p) => `${p.name} (${p.expirationDate})`)
                .join(', ');

            let baseMessage;
            if (expiringPlugins.length === 1) {
                const plugin = expiringPlugins[0];
                baseMessage = sprintf(
                    // translators: %1$s is the plugin name, %2$s is the expiration date, %3$d is the number of days
                    __('Warning: The license for %1$s expires on %2$s (%3$d days remaining).', 'publishpress-hub'),
                    plugin.name,
                    plugin.expirationDate,
                    plugin.daysUntilExpiration
                );
            } else {
                baseMessage = sprintf(
                    // translators: %1$d is the number of plugins, %2$d is the number of days, %3$s is the list of plugins and expiration dates
                    __('Warning: %1$d plugin(s) have licenses expiring within %2$d days: %3$s', 'publishpress-hub'),
                    expiringPlugins.length,
                    daysUntilExpiration,
                    expirationDates
                );
            }

            // Add renewal link
            const renewUrl = 'https://publishpress.com/dashboard/?active_tab=subscriptions';
            const renewLink = `<div class="pp-hub-renew-link"><a href="${renewUrl}" target="_blank" rel="noopener noreferrer" class="components-button pp-hub-button is-secondary has-text has-icon"><span class="dashicons dashicons-cart"></span> ${__('Renew now', 'publishpress-hub')}</a></div>`;

            // translators: %1$s is the base warning, %2$s is a renew link.
            const message = baseMessage + '<br/>' + renewLink;

            createNotice(
                'warning',
                message,
                {
                    id: 'pp-hub-license-expiration-warning',
                    isDismissible: true,
                    // Allow HTML for the renew link
                    __unstableHTML: true,
                }
            );
        }

    }, [plugins, createNotice, daysUntilExpiration]);
};

