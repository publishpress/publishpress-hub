import { memo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';

import { Button } from '../buttons/button';
import { Modal } from '../modal';

const ModalUpgradeComponent = ({
    onClose,
    proDetailsUrl,
    changelogUrl,
}) => {
    return (
        <Modal
            title={__('Upgrade to Pro', 'publishpress-hub')}
            className='pp-hub-modal-upgrade'
            onRequestClose={onClose}
        >
            <p>
                {__('You can upgrade to the Pro version of this plugin to get access to all the features and benefits.', 'publishpress-hub')}
            </p>
            <div className='pp-hub-modal-inline-links'>
                <Button variant='link' href={proDetailsUrl}>{__('Read more about the Pro version', 'publishpress-hub')}</Button>
                <span>|</span>
                <Button variant='link' href={changelogUrl}>{__('View changelog', 'publishpress-hub')}</Button>
            </div>
            <Button variant='secondary' icon='unlock' onClick={() => {
                onClose('license');
            }}>
                {__('I have a license, install the Pro version', 'publishpress-hub')}
            </Button>
            <Button variant='highlight' icon='cart' onClick={() => {
                onClose('buy');
            }}>
                {__('I don\'t have a license, but I want to buy it', 'publishpress-hub')}
            </Button>
        </Modal>
    );
}

export const ModalUpgrade = memo(ModalUpgradeComponent);
