/**
 * Modal license input.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { memo, useState, useCallback, useRef, useEffect } from '@wordpress/element';

import { __ } from '@publishpress-hub/i18n';

import { Button } from '../../buttons/button';
import { Message } from '../../message/message';
import { Modal } from '../../modal';
import { LicenseKeyControl } from './license-key-control';

const ModalLicenseInputComponent = ({
    onClose,
    onActivate,
    error,
    buttonInProgress,
    title,
    initialLicenseKey = '',
    isLicenseFromConstant = false,
    licenseKeyMasked = '',
}) => {
    const [licenseKey, setLicenseKey] = useState(initialLicenseKey);
    const [activationAttempted, setActivationAttempted] = useState(false);

    const setFocusRef = useRef(null);
    const handleFocusReady = useCallback((setFocus) => {
        setFocusRef.current = setFocus;
    }, []);

    // Update license key when initialLicenseKey prop changes
    useEffect(() => {
        if (initialLicenseKey) {
            setLicenseKey(initialLicenseKey);
        }
    }, [initialLicenseKey]);

    const handleActivate = useCallback(() => {
        setActivationAttempted(true);
        // Use initialLicenseKey if from constant, otherwise use state
        const keyToUse = isLicenseFromConstant ? initialLicenseKey : licenseKey;
        onActivate(keyToUse);
    }, [onActivate, licenseKey, initialLicenseKey, isLicenseFromConstant]);

    useEffect(() => {
        if (activationAttempted && error && setFocusRef.current) {
            setTimeout(() => {
                setFocusRef.current();
            }, 100);
        }
    }, [activationAttempted, error]);

    return (
        <Modal
            title={title || __('Enter your license key', 'publishpress-hub')}
            className='pp-hub-modal-license-input'
            onRequestClose={() => onClose()}
        >
            {isLicenseFromConstant ? (
                <>
                    <p>
                        {__('A license key has been configured for this plugin via wp-config.php constant.', 'publishpress-hub')}
                    </p>
                    <p>
                        {__('License key: ', 'publishpress-hub')} <strong>{licenseKeyMasked || __('(hidden)', 'publishpress-hub')}</strong>
                    </p>
                    {error && (
                        <Message variant='error'>
                            {error.message}
                        </Message>
                    )}
                    <Button variant='primary' icon='download' onClick={handleActivate} isLoading={buttonInProgress}>
                        {__('Install Pro version', 'publishpress-hub')}
                    </Button>
                </>
            ) : (
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

                    {error && (
                        <Message variant='error'>
                            {error.message}
                        </Message>
                    )}

                    <Button variant='primary' icon='check' onClick={handleActivate} isLoading={buttonInProgress}>
                        {__('Activate and install the plugin', 'publishpress-hub')}
                    </Button>
                </>
            )}
        </Modal>
    );
}

export const ModalLicenseInput = memo(ModalLicenseInputComponent);
