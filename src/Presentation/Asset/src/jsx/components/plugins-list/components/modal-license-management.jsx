import { memo, useState, useCallback, useRef, useEffect } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

import { __ } from '@publishpress-hub/i18n';

import { Button } from '../../buttons/button';
import { Message } from '../../message/message';
import { Modal } from '../../modal';
import { useFocusOnAction } from '../hooks/use-focus-on-action';

const ACTIONS = {
    EDIT: 'edit',
    VIEW: 'view',
};

const ModalLicenseManagementComponent = ({
    onClose,
    onActivate,
    onDeactivate,
    error,
    buttonInProgress,
    initialLicenseKey,
}) => {
    const [licenseKey, setLicenseKey] = useState(initialLicenseKey || '');
    const [currentAction, setCurrentAction] = useState(licenseKey === '' ? ACTIONS.EDIT : ACTIONS.VIEW);

    const textControlRef = useFocusOnAction(currentAction === ACTIONS.EDIT);

    const getObfuscatedLicenseKey = useCallback((licenseKey, length = 5) => {
        return licenseKey.replace(/./g, '*').slice(0, length) + licenseKey.slice(-length);
    }, []);

    return (
        <Modal
            title={__('Manage your license', 'publishpress-hub')}
            className='pp-hub-modal-license-input'
            onRequestClose={() => onClose()}
        >
            {currentAction === ACTIONS.EDIT && (
                <>
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
                            focusOnMount={true}
                        />
                    </div>
                </>
            )}

            {currentAction === ACTIONS.VIEW && (
                <>
                    <p>
                        {__('Your license key is: ', 'publishpress-hub')} {getObfuscatedLicenseKey(licenseKey)}
                    </p>
                </>
            )}

            {error && (
                <Message variant='error'>
                    {error.message}
                </Message>
            )}

            {currentAction === ACTIONS.EDIT && (
                <Button variant='primary' icon='check' onClick={() => onActivate(licenseKey)} isLoading={buttonInProgress}>
                    {__('Activate the license key for this site', 'publishpress-hub')}
                </Button>
            )}

            {currentAction === ACTIONS.VIEW && (
                <>
                    <Button variant='primary' icon='edit' onClick={() => setCurrentAction(ACTIONS.EDIT)} isLoading={buttonInProgress}>
                        {__('Edit the license key', 'publishpress-hub')}
                    </Button>
                    <Button variant='secondary' icon='trash' onClick={() => onDeactivate()} isLoading={buttonInProgress}>
                        {__('Deactivate the license key for this site', 'publishpress-hub')}
                    </Button>
                </>
            )}
        </Modal>
    );
}

export const ModalLicenseManagement = memo(ModalLicenseManagementComponent);
