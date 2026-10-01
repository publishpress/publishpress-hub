/**
 * Warnings shown before a plugin can be deactivated.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.1.0
 */

import { __ } from '@publishpress-hub/i18n';
import { Message } from '../../message/message';

const getPluginWarning = (slug) => {
    switch (slug) {
        case 'statuses':
            return __('Deactivating PublishPress Statuses stops registering its custom post statuses. Content using those statuses may become unavailable, and parts of your site may stop working until the plugin is active again.', 'publishpress-hub');
        default:
            return __('Deactivating this plugin disables its features and may affect content or workflows that depend on it.', 'publishpress-hub');
    }
};

export const DeactivationWarning = ({ pluginFamily, isConflict = false, isUninstall = false }) => (
    <Message variant="warning">
        {isUninstall ? <>
            <p>{__('Uninstalling deletes the plugin files and may also delete its saved settings or data. Its features will no longer be available. Back up your site before continuing.', 'publishpress-hub')}</p>
            {pluginFamily.slug === 'statuses' && <p>{__('Without PublishPress Statuses, its custom post statuses are no longer registered. Content using those statuses may become unavailable, and parts of your site may stop working until the plugin is installed and active again.', 'publishpress-hub')}</p>}
        </> : <p>{getPluginWarning(pluginFamily.slug)}</p>}
        {isConflict && (
            <p>{__('Resolving this conflict can deactivate the plugin while switching versions. If the version you keep cannot be activated, the plugin may remain disabled. Check that it is active after resolving the conflict.', 'publishpress-hub')}</p>
        )}
    </Message>
);
