import { createRoot } from 'react-dom/client';
import { PluginsDashboard } from './components/pages/plugins-dashboard';
import { store } from './stores/plugins-dashboard';

const pluginsDashboardContainer = document.getElementById('publishpress-hub-plugins-dashboard-container');

if (pluginsDashboardContainer) {
    const root = createRoot(pluginsDashboardContainer);
    root.render(<PluginsDashboard/>);
}
