import { memo, useState } from '@wordpress/element';
import { Modal, TextControl } from '@wordpress/components';

import { __ } from '@publishpress/hub-i18n';

import { Button } from '../buttons/button';

const ModalLicenseInputComponent = ({
    onClose,
    onActivate,
}) => {
    const [licenseKey, setLicenseKey] = useState('');

    return (
        <Modal
            title={__('Enter your license key', 'publishpress-hub')}
            onRequestClose={onClose}
        >
            <div className='pp-hub-modal pp-hub-modal-license-input'>
                <p>
                    {__('Enter your license key to activate the Pro version of this plugin. You can find your license key in your PublishPress account dashboard.', 'publishpress-hub')}
                </p>
                <p>
                    <Button variant='link' href='https://publishpress.com/subscriptions/' target='_blank' rel='noopener noreferrer'>
                        {__('Go to my profile to get the license key', 'publishpress-hub')}
                    </Button>
                </p>
                <TextControl
                    value={licenseKey}
                    className='pp-hub-text-control'
                    placeholder={__('Enter your license key here', 'publishpress-hub')}
                    onChange={(value) => setLicenseKey(value)}
                />
                <Button variant='primary' icon='check' isFullWidth onClick={() => onActivate(licenseKey)}>
                    {__('Activate and install the plugin', 'publishpress-hub')}
                </Button>
            </div>
        </Modal>
    );
}

export const ModalLicenseInput = memo(ModalLicenseInputComponent);
