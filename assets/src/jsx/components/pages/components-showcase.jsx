import { memo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';

import { AdminPageLayout } from '../admin-page';
import { Button } from '../buttons/button';
import { Badge } from '../badge/badge';

const {
    logoUrl,
} = window.ppHubComponentsShowcaseConfig;

const ComponentsShowcaseComponent = () => {
    return (
        <AdminPageLayout
            title={__('Components Showcase', 'publishpress-hub')}
            logoUrl={logoUrl}
        >
            <div className="pp-hub-components-showcase" style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: '#ffffff', padding: '20px' }}>
                <div className="pp-hub-components-showcase-header">
                    <h1>H1 component</h1>
                    <h2>H2 component</h2>
                    <h3>H3 component</h3>
                    <h4>H4 component</h4>
                    <h5>H5 component</h5>
                    <h6>H6 component</h6>
                </div>
                <hr />
                <div className="pp-hub-components-showcase-buttons" style={{ display: 'flex', gap: '10px' }}>
                    <Button>Default</Button>
                    <Button variant='primary'>Primary</Button>
                    <Button variant='secondary'>Secondary</Button>
                    <Button variant='tertiary'>Tertiary</Button>
                    <Button variant='highlight'>Highlight</Button>
                    <Button variant='link'>Link</Button>
                </div>
                <div className="pp-hub-components-showcase-buttons" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <Button disabled>Default</Button>
                    <Button disabled variant='primary'>Primary</Button>
                    <Button disabled variant='secondary'>Secondary</Button>
                    <Button disabled variant='tertiary'>Tertiary</Button>
                    <Button disabled variant='highlight'>Highlight</Button>
                    <Button disabled variant='link'>Link</Button>
                </div>
                <div className="pp-hub-components-showcase-badges" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <Badge>Default</Badge>
                    <Badge className='installing'>Installing</Badge>
                    <Badge className='not-installed'>Not Installed</Badge>
                    <Badge className='free'>Free</Badge>
                    <Badge className='licensed'>Licensed</Badge>
                    <Badge className='unlicensed'>Unlicensed</Badge>
                    <Badge className='uninstalling'>Uninstalling</Badge>
                </div>
            </div>
        </AdminPageLayout>
    );
};

export const ComponentsShowcase = memo(ComponentsShowcaseComponent);
