import { __ } from '@publishpress/hub-i18n';
import { AdminPageContainer } from './AdminPage/AdminPageContainer';

export const PluginsDashboard = () => {
    return <AdminPageContainer
        title={__('Plugins Dashboard', 'publishpress-hub')}
        logoUrl={window.publishpressHubDashboardConfig.logoUrl}
    >

    </AdminPageContainer>;
};
