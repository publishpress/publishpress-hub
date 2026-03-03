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
import { TabPanel } from '@wordpress/components';

import { __ } from '@publishpress-hub/i18n';

import { AdminPageLayout } from '../admin-page';
import { DiagnosticsTab } from './settings/DiagnosticsTab';
import { DebugLogTab } from './settings/DebugLogTab';

const {
    logoUrl,
    debugModeEnabled,
} = window.ppHubSettingsPageConfig || {};

const buildTabs = () => {
    const tabs = [
        {
            name: 'diagnostics',
            title: __('Diagnostics', 'publishpress-hub'),
            className: 'pp-hub-settings-tab',
        },
    ];

    if (debugModeEnabled) {
        tabs.push({
            name: 'debug-log',
            title: __('Debug Log', 'publishpress-hub'),
            className: 'pp-hub-settings-tab',
        });
    }

    return tabs;
};

const renderTab = (tab) => {
    if (tab.name === 'debug-log') {
        return <DebugLogTab />;
    }

    return <DiagnosticsTab />;
};

const SettingsPageComponent = () => {
    const title = __('Settings', 'publishpress-hub');
    const tabs = buildTabs();

    return (
        <AdminPageLayout
            title={title}
            logoUrl={logoUrl}
        >
            <div className="pp-hub-settings-page">
                <TabPanel
                    className="pp-hub-settings-tabs"
                    tabs={tabs}
                    onSelect={() => {}}
                >
                    {renderTab}
                </TabPanel>
            </div>
        </AdminPageLayout>
    );
};

export const SettingsPage = memo(SettingsPageComponent);
