import { memo, useState } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

import { __ } from '@publishpress-hub/i18n';

import { Button } from '../../buttons/button';
import { Message } from '../../message/message';
import { Modal } from '../../modal';
import { useFocusOnAction } from '../hooks/use-focus-on-action';

const ModalLicenseInputComponent = ({
    onClose,
    onActivate,
    error,
    buttonInProgress,
}) => {
    const [licenseKey, setLicenseKey] = useState('');

    const textControlRef = useFocusOnAction();

    return (
        <Modal
            title={__('Enter your license key', 'publishpress-hub')}
            className='pp-hub-modal-license-input'
            onRequestClose={() => onClose()}
        >
            <p>
                {__('Enter your license key to activate the Pro version of this plugin. You can find your license key in your PublishPress account dashboard.', 'publishpress-hub')}
            </p>
            <div className='pp-hub-modal-inline-links'>
                <Button variant='link' href='https://publishpress.com/subscriptions/' target='_blank' rel='noopener noreferrer'>
                    {__('Go to my profile to get the license key', 'publishpress-hub')}
                </Button>
            </div>

            <div ref={textControlRef}>
                <TextControl
                    value={licenseKey}
                    className='pp-hub-text-control pp-hub-license-input'
                    placeholder={__('Enter your license key here', 'publishpress-hub')}
                    onChange={(value) => setLicenseKey(value)}
                />
            </div>

            {error && (
                <Message variant='error'>
                    {error.message}
                </Message>
            )}

            <Button variant='primary' icon='check' onClick={() => onActivate(licenseKey)} isLoading={buttonInProgress}>
                {__('Activate and install the plugin', 'publishpress-hub')}
            </Button>
        </Modal>
    );
}

export const ModalLicenseInput = memo(ModalLicenseInputComponent);
