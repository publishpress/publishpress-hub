/**
 * Settings page.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { createRoot } from 'react-dom/client';
import apiFetch from '@wordpress/api-fetch';

import { SettingsPage } from './components/pages/settings-page';
import { getCurrentTheme, setTheme } from './utils/themeController';

const { apiNonce } = window.ppHubSettingsPageConfig || {};

const settingsPageContainer = document.getElementById('publishpress-hub-settings-page-container');

if (settingsPageContainer) {
    if (apiNonce) {
        apiFetch.use(apiFetch.createNonceMiddleware(apiNonce));
    }

    const root = createRoot(settingsPageContainer);
    root.render(<SettingsPage/>);

    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);
}
