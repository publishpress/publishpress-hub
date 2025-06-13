import { createRoot } from 'react-dom/client';
import Dashboard from './components/Dashboard';

const dashboardContainer = document.getElementById('publishpress-hub-dashboard-container');

if (dashboardContainer) {
    const root = createRoot(dashboardContainer);
    root.render(<Dashboard />);
}
