import { memo, useState, useCallback } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

import { __ } from '@publishpress-hub/i18n';

import { Button } from '../../buttons/button';
import { Message } from '../../message/message';
import { Modal } from '../../modal';

const ModalLicenseManagementComponent = ({
    onClose,
    onActivate,
    error,
    buttonInProgress,
}) => {
    const [licenseKey, setLicenseKey] = useState('');
    const [currentAction, setCurrentAction] = useState(licenseKey === '' ? 'edit' : 'view');

    const getObfuscatedLicenseKey = useCallback((licenseKey) => {
        return licenseKey.replace(/./g, '*').slice(0, 4) + '...' + licenseKey.slice(-4);
    }, [licenseKey]);

    return (
        <Modal
            title={__('Manage your license', 'publishpress-hub')}
            className='pp-hub-modal-license-input'
            onRequestClose={() => onClose()}
        >
            {currentAction === 'edit' && (
                <>
                    <p>
                        {__('Enter your license key to activate the Pro version of this plugin. You can find your license key in your PublishPress account dashboard.', 'publishpress-hub')}
                    </p>
                    <div className='pp-hub-modal-inline-links'>
                        <Button variant='link' href='https://publishpress.com/subscriptions/' target='_blank' rel='noopener noreferrer'>
                            {__('Go to my profile to get the license key', 'publishpress-hub')}
                        </Button>
                    </div>

                    <TextControl
                        value={licenseKey}
                        className='pp-hub-text-control pp-hub-license-input'
                        placeholder={__('Enter your license key here', 'publishpress-hub')}
                        onChange={(value) => setLicenseKey(value)}
                    />
                </>
            )}

            {currentAction === 'view' && (
                <p>
                    {__('Your license key is: ', 'publishpress-hub')} {getObfuscatedLicenseKey(licenseKey)}
                </p>
            )}

            {error && (
                <Message variant='error'>
                    {error.message}
                </Message>
            )}

            <Button variant='primary' icon='check' onClick={() => onActivate(licenseKey)} isLoading={buttonInProgress}>
                {__('OK', 'publishpress-hub')}
            </Button>
        </Modal>
    );
}

export const ModalLicenseManagement = memo(ModalLicenseManagementComponent);
