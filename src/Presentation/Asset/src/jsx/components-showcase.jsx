import { createRoot } from 'react-dom/client';
import { ComponentsShowcase } from './components/pages/components-showcase';

const componentsShowcaseContainer = document.getElementById('publishpress-hub-components-showcase-container');

if (componentsShowcaseContainer) {
    const root = createRoot(componentsShowcaseContainer);
    root.render(<ComponentsShowcase/>);
}
