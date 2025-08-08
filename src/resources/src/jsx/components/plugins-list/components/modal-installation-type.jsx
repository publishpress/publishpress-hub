/**
 * Modal installation type.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { memo } from '@wordpress/element';

import { __ } from '@publishpress-hub/i18n';

import { Button } from '../../buttons/button';
import { Modal } from '../../modal';

const ModalInstallationTypeComponent = ({
    onClose,
    onProClick,
    onFreeClick,
    freeDetailsUrl,
    proDetailsUrl,
    changelogUrl,
}) => {
    return (
        <Modal
            title={__('Install Plugin', 'publishpress-hub')}
            className='pp-hub-modal-installation-type'
            onRequestClose={() => onClose()}
        >
            <p>
                {__('Select how you would like to install this plugin. You can install the Pro version if you have a license, or the Free version to get started.', 'publishpress-hub')}
            </p>
            <div className='pp-hub-modal-inline-links'>
                <Button variant='link' href={freeDetailsUrl}>{__('Free Details', 'publishpress-hub')}</Button>
                <span>|</span>
                <Button variant='link' href={proDetailsUrl}>{__('Pro Details', 'publishpress-hub')}</Button>
                <span>|</span>
                <Button variant='link' href={changelogUrl}>{__('Changelogs', 'publishpress-hub')}</Button>
            </div>
            <Button variant='secondary' icon='unlock' onClick={() => onProClick()}>
                {__('I have a license, install the Pro version', 'publishpress-hub')}
            </Button>
            <Button variant='primary' icon='download' onClick={() => onFreeClick()}>
                {__('I don\'t have a license, install the Free version', 'publishpress-hub')}
            </Button>
        </Modal>
    );
}

export const ModalInstallationType = memo(ModalInstallationTypeComponent);
