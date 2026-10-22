/**
 * AI Connections React page entry point.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

import { createRoot } from 'react-dom/client';
import apiFetch from '@wordpress/api-fetch';
import { McpPage } from './components/pages/mcp-page';
import { getCurrentTheme, setTheme } from './utils/themeController';

const container = document.getElementById('publishpress-hub-mcp-page-container');
if (container) {
    const { apiNonce } = window.ppHubMcpConfig || {};
    if (apiNonce) apiFetch.use(apiFetch.createNonceMiddleware(apiNonce));
    createRoot(container).render(<McpPage />);
    setTheme(getCurrentTheme());
}
