/**
 * Modal license input.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { memo, useState, useCallback, useRef, useEffect } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';

import { __ } from '@publishpress-hub/i18n';

import { Button } from '../../buttons/button';
import { Message } from '../../message/message';
import { Modal } from '../../modal';
import { LicenseKeyControl } from './license-key-control';

const ModalLicenseInputComponent = ({
    onClose,
    onActivate,
    onUseExistingLicense,
    error,
    buttonInProgress,
    title,
    buttonLabel,
    showApplyToAll = false,
    hasExistingLicense = false,
}) => {
    const [licenseKey, setLicenseKey] = useState('');
    const [applyToAll, setApplyToAll] = useState(false);
    const [activationAttempted, setActivationAttempted] = useState(false);

    const setFocusRef = useRef(null);
    const handleFocusReady = useCallback((setFocus) => {
        setFocusRef.current = setFocus;
    }, []);

    const handleActivate = useCallback(() => {
        setActivationAttempted(true);
        onActivate(licenseKey, applyToAll);
    }, [onActivate, licenseKey, applyToAll]);

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
            <p>
                {__('Enter your license key to activate the Pro version of this plugin. You can find your license key in your PublishPress account dashboard.', 'publishpress-hub')}
            </p>
            <div className='pp-hub-modal-inline-links'>
                <Button variant='link' href='https://publishpress.com/dashboard/?active_tab=licenses' target='_blank' rel='noopener noreferrer'>
                    {__('Go to the dashboard to get your license key', 'publishpress-hub')}
                </Button>
            </div>

            <LicenseKeyControl
                value={licenseKey}
                label={__('License key', 'publishpress-hub')}
                className='pp-hub-text-control pp-hub-license-input'
                placeholder={__('Enter your license key here', 'publishpress-hub')}
                onChange={(value) => setLicenseKey(value)}
                autoFocus={true}
                onEnterKeyDown={handleActivate}
                onFocusReady={handleFocusReady}
            />
            {showApplyToAll && (
                <CheckboxControl
                    label={__('Use this license key for all PublishPress plugins', 'publishpress-hub')}
                    checked={applyToAll}
                    onChange={(value) => setApplyToAll(value)}
                />
            )}

            {error && (
                <Message variant='error'>
                    {error.message}
                </Message>
            )}

            {hasExistingLicense && onUseExistingLicense && (
                <Button variant='secondary' icon='check' onClick={() => onUseExistingLicense()} isLoading={buttonInProgress}>
                    {__('Use existing license key', 'publishpress-hub')}
                </Button>
            )}

            <Button variant='primary' icon='check' onClick={handleActivate} isLoading={buttonInProgress}>
                {buttonLabel || __('Activate and install the plugin', 'publishpress-hub')}
            </Button>
        </Modal>
    );
}

export const ModalLicenseInput = memo(ModalLicenseInputComponent);
