/**
 * Settings page.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { memo } from '@wordpress/element';

import { __ } from '@publishpress-hub/i18n';

import { AdminPageLayout } from '../admin-page';

const {
    logoUrl,
} = window.ppHubSettingsPageConfig || {};

const SettingsPageComponent = () => {
    const title = __('Settings', 'publishpress-hub');

    return (
        <AdminPageLayout
            title={title}
            logoUrl={logoUrl}
        >
            <div className="pp-hub-settings-page">
                <div className="pp-hub-settings-page__container">
                    <div className="pp-hub-settings-page__content">
                        <p className="pp-hub-settings-page__message">
                            {__('Settings page content will be available here.', 'publishpress-hub')}
                        </p>
                    </div>
                </div>
            </div>
        </AdminPageLayout>
    );
};

export const SettingsPage = memo(SettingsPageComponent);
