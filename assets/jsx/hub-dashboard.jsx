import { createRoot } from 'react-dom/client';
import { PluginsDashboard } from './components/PluginsDashboard';

const dashboardContainer = document.getElementById('publishpress-hub-dashboard-container');

if (dashboardContainer) {
    const root = createRoot(dashboardContainer);
    root.render(<PluginsDashboard />);
}
