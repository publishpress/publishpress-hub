/**
 * Welcome page.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

// Use the React DOM that WordPress already loads instead of bundling a second copy.
import { createRoot } from '@wordpress/element';

import { WelcomePage } from './components/pages/welcome-page';
import { getCurrentTheme, setTheme } from './utils/themeController';

const welcomePageContainer = document.getElementById('publishpress-hub-welcome-page-container');

if (welcomePageContainer) {
    const root = createRoot(welcomePageContainer);
    root.render(<WelcomePage/>);

    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);
}

