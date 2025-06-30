import { memo, useState } from '@wordpress/element';
import { Modal, TextControl } from '@wordpress/components';

import { __ } from '@publishpress/hub-i18n';

import { Button } from '../buttons/button';
import { Message } from '../message/message';

const ModalConfirmationComponent = ({
    onClose,
    onConfirm,
    onCancel,
    title,
    message,
    children,
    error,
}) => {
    return (
        <Modal
            title={title || __('Confirmation', 'publishpress-hub')}
            onRequestClose={onClose}
        >
            <div className='pp-hub-modal pp-hub-modal-confirmation'>
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
                    <Button variant='primary' isFullWidth onClick={onConfirm}>
                        {__('Continue', 'publishpress-hub')}
                    </Button>
                    <Button variant='secondary' isFullWidth onClick={onCancel}>
                        {__('Cancel', 'publishpress-hub')}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export const ModalConfirmation = memo(ModalConfirmationComponent);
