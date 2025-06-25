import { memo } from '@wordpress/element';
import { Modal } from '@wordpress/components';

import { __ } from '@publishpress/hub-i18n';

import { Button } from '../buttons/button';

const ModalInstallationTypeComponent = ({
    onClose,
}) => {
    return (
        <Modal
            title={__('Install Plugin', 'publishpress-hub')}
            onRequestClose={onClose}
        >
            <div className='pp-hub-modal-installation-type'>
                <p>
                    {__('Select how you would like to install this plugin. You can install the Pro version if you have a license, or the Free version to get started.', 'publishpress-hub')}
                </p>
                <Button variant='secondary' icon='unlock' isFullWidth onClick={() => {
                    onClose('pro');
                }}>
                    {__('I have a license, install the Pro version', 'publishpress-hub')}
                </Button>
                <Button variant='primary' icon='download' isFullWidth onClick={() => {
                    onClose('free')
                }}>
                    {__('I don\'t have a license, install the Free version', 'publishpress-hub')}
                </Button>
            </div>
        </Modal>
    );
}

export const ModalInstallationType = memo(ModalInstallationTypeComponent);
