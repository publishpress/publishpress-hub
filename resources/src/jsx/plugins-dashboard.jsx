/**
 * Plugins dashboard.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { createRoot } from 'react-dom/client';

import { PluginsDashboard } from './components/pages/plugins-dashboard';
import { store } from './stores/plugins-dashboard';
import { getCurrentTheme, setTheme } from './utils/themeController';

const pluginsDashboardContainer = document.getElementById('publishpress-hub-plugins-dashboard-container');

if (pluginsDashboardContainer) {
    const root = createRoot(pluginsDashboardContainer);
    root.render(<PluginsDashboard/>);

    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);
}
