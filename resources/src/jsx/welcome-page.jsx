/**
 * Welcome page.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { createRoot } from 'react-dom/client';

import { WelcomePage } from './components/pages/welcome-page';
import { getCurrentTheme, setTheme } from './utils/themeController';

const welcomePageContainer = document.getElementById('publishpress-hub-welcome-page-container');

if (welcomePageContainer) {
    const root = createRoot(welcomePageContainer);
    root.render(<WelcomePage/>);

    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);
}

