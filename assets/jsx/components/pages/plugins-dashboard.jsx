import { __ } from '@publishpress/hub-i18n';
import { AdminPageLayout } from '../admin-page';

export const PluginsDashboard = () => {
    return (
        <AdminPageLayout
            title={__('Plugins Dashboard', 'publishpress-hub')}
            logoUrl={window.publishpressHubDashboardConfig.logoUrl}
        >
            <div>
                <h1>Plugins Dashboard</h1>
            </div>
        </AdminPageLayout>
    )
};
