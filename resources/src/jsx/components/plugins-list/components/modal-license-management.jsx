/**
 * Modal license management.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import {
    memo,
    useState,
    useCallback,
    useRef,
    useEffect
} from '@wordpress/element';

import { __ } from '@publishpress-hub/i18n';

import { Button } from '../../buttons/button';
import { Message } from '../../message/message';
import { Modal } from '../../modal';
import { LicenseKeyControl } from './license-key-control';

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
    initialLicenseKeyMasked,
    hasLicenseKey,
    title,
}) => {
    const [licenseKey, setLicenseKey] = useState('');
    const [currentAction, setCurrentAction] = useState(hasLicenseKey ? ACTIONS.VIEW : ACTIONS.EDIT);
    const [activationAttempted, setActivationAttempted] = useState(false);
    const setFocusRef = useRef(null);

    const handleFocusReady = useCallback((setFocus) => {
        setFocusRef.current = setFocus;
    }, []);

    const handleActivate = useCallback(() => {
        setActivationAttempted(true);
        onActivate(licenseKey);
    }, [onActivate, licenseKey]);

    const handleSwitchToEdit = useCallback(() => {
        setLicenseKey('');
        setCurrentAction(ACTIONS.EDIT);
        // Focus the input after switching to edit mode
        setTimeout(() => {
            if (setFocusRef.current) {
                setFocusRef.current();
            }
        }, 100);
    }, []);

    useEffect(() => {
        if (activationAttempted && error && setFocusRef.current) {
            setTimeout(() => {
                setFocusRef.current();
            }, 100);
        }
    }, [activationAttempted, error]);

    return (
        <Modal
            title={title || __('Manage your license', 'publishpress-hub')}
            className='pp-hub-modal-license-input'
            onRequestClose={() => onClose()}
        >
            {currentAction === ACTIONS.EDIT && (
                <>
                    <p>
                        {__('Enter your license key to activate the Pro version of this plugin. You can find your license key in your PublishPress account dashboard.', 'publishpress-hub')}
                    </p>
                    <div className='pp-hub-modal-inline-links'>
                        <Button variant='link' href='https://publishpress.com/dashboard/?active_tab=licenses' target='_blank' rel='noopener noreferrer'>
                            {__('Go to my profile to get the license key', 'publishpress-hub')}
                        </Button>
                    </div>

                    <LicenseKeyControl
                        value={licenseKey}
                        className='pp-hub-text-control pp-hub-license-input'
                        placeholder={__('Enter your license key here', 'publishpress-hub')}
                        onChange={(value) => setLicenseKey(value)}
                        autoFocus={true}
                        onEnterKeyDown={handleActivate}
                        onFocusReady={handleFocusReady}
                    />
                </>
            )}

            {currentAction === ACTIONS.VIEW && (
                <>
                    <p>
                        {__('Your license key is: ', 'publishpress-hub')}
                        <span className='pp-hub-license-key-masked'>
                            {initialLicenseKeyMasked || __('(hidden)', 'publishpress-hub')}
                        </span>
                    </p>
                </>
            )}

            {error && (
                <Message variant='error'>
                    {error.message}
                </Message>
            )}

            {currentAction === ACTIONS.EDIT && (
                <Button variant='primary' icon='check' onClick={handleActivate} isLoading={buttonInProgress}>
                    {__('Activate the license key for this site', 'publishpress-hub')}
                </Button>
            )}

            {currentAction === ACTIONS.VIEW && (
                <>
                    <Button variant='primary' icon='edit' onClick={handleSwitchToEdit} isLoading={buttonInProgress}>
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
