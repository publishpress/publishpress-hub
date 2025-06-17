import { __ } from '@publishpress/hub-i18n';
import { AdminPageContainer } from './AdminPageContainer';
import { AdminPageHeader } from './AdminPageHeader';

export const Dashboard = () => {
    return <AdminPageContainer
        title={__('Dashboard', 'publishpress-hub')}
        logoUrl={window.publishpressHubDashboardConfig.logoUrl}
    >

    </AdminPageContainer>;
};

export default Dashboard;
