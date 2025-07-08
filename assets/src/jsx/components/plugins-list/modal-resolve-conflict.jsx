import { memo } from '@wordpress/element';

import { __ } from '@publishpress/hub-i18n';

import { Button } from '../buttons/button';
import { Message } from '../message/message';
import { Modal } from '../modal';

const ModalResolveConflictComponent = ({
    onClose,
    onKeepFreePlugin,
    onKeepProPlugin,
    onCancel,
    title,
    message,
    children,
    error,
    pluginsFamily,
    buttonInProgress,
    selectedPluginForConflictResolution,
}) => {
    return (
        <Modal
            title={title || __('Resolve Conflict', 'publishpress-hub')}
            className='pp-hub-modal-resolve-conflict'
            onRequestClose={onClose}
        >
            <p>
                {message || __('A conflict has been detected between the following plugins. Please select the plugin you want to keep.', 'publishpress-hub')}

                <ul>
                    <li>
                        {pluginsFamily.freePlugin.name} ({pluginsFamily.freePlugin.version})
                    </li>
                    <li>
                        {pluginsFamily.proPlugin.name} ({pluginsFamily.proPlugin.version})
                    </li>
                </ul>
            </p>

            {children}

            {error && (
                <Message variant='error'>
                    {error.message}
                </Message>
            )}

                <Button
                    variant='primary'
                    onClick={onKeepProPlugin}
                    isLoading={buttonInProgress && selectedPluginForConflictResolution === 'pro'}
                    disabled={selectedPluginForConflictResolution === 'free'}
                >
                    {__('Keep the Pro version', 'publishpress-hub')}
                </Button>

                <Button
                    variant='secondary'
                    onClick={onKeepFreePlugin}
                    isLoading={buttonInProgress && selectedPluginForConflictResolution === 'free'}
                    disabled={selectedPluginForConflictResolution === 'pro'}
                >
                    {__('Keep the Free version', 'publishpress-hub')}
                </Button>

                <Button
                    variant='secondary'
                    icon='no'
                    onClick={onCancel}
                    disabled={buttonInProgress}
                >
                    {__('Cancel', 'publishpress-hub')}
                </Button>
        </Modal>
    );
}

export const ModalResolveConflict = memo(ModalResolveConflictComponent);
