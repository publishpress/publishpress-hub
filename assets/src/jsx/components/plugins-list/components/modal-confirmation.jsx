import { memo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';

import { Button } from '../../buttons/button';
import { Message } from '../../message/message';
import { Modal } from '../../modal';

const ModalConfirmationComponent = ({
    onClose,
    onConfirm,
    onCancel,
    title,
    message,
    children,
    error,
    isDanger,
}) => {
    return (
        <Modal
            title={title || __('Confirmation', 'publishpress-hub')}
            className='pp-hub-modal-confirmation'
            onRequestClose={onClose}
        >
            <p>
                {message || __('Are you sure you want to continue?', 'publishpress-hub')}
            </p>

            {children}

            {error && (
                <Message variant='error'>
                    {error.message}
                </Message>
            )}

            <div className='pp-hub-modal-actions'>
                <Button variant={isDanger ? 'danger' : 'primary'} isFullWidth icon='yes' onClick={() => onConfirm()}>
                    {__('Continue', 'publishpress-hub')}
                </Button>
                <Button variant='secondary' isFullWidth icon='no' onClick={() => onCancel()}>
                    {__('Cancel', 'publishpress-hub')}
                </Button>
            </div>
        </Modal>
    );
}

export const ModalConfirmation = memo(ModalConfirmationComponent);
