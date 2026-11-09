/**
 * Components showcase.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

// Use the React DOM that WordPress already loads instead of bundling a second copy.
import { createRoot } from '@wordpress/element';
import { ComponentsShowcase } from './components/pages/components-showcase';

const componentsShowcaseContainer = document.getElementById('publishpress-hub-components-showcase-container');

if (componentsShowcaseContainer) {
    const root = createRoot(componentsShowcaseContainer);
    root.render(<ComponentsShowcase/>);
}
