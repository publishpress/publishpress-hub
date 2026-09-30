/**
 * Modal resolve conflict.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { memo } from '@wordpress/element';

import { __, sprintf } from '@publishpress-hub/i18n';

import { Button } from '../../buttons/button';
import { Message } from '../../message/message';
import { Modal } from '../../modal';
import { DeactivationWarning } from './deactivation-warning';

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
            title={title || __('Resolve Plugin Conflict', 'publishpress-hub')}
            className='pp-hub-modal-resolve-conflict'
            onRequestClose={() => onClose()}
        >
            <div>
                <p>
                    {message || __(
                        'We have detected both Free and Pro versions of this plugin installed. ' +
                        'To resolve this conflict, please choose which version you would like to keep. ' +
                        'The other version will be automatically uninstalled.',
                        'publishpress-hub'
                    )}
                </p>

                <ul className='pp-hub-list'>
                    <li>
                        {sprintf(
                            __('Free version: %s (%s)', 'publishpress-hub'),
                            pluginsFamily.freePlugin.name,
                            pluginsFamily.freePlugin.version
                        )}
                    </li>
                    <li>
                        {sprintf(
                            __('Pro version: %s (%s)', 'publishpress-hub'),
                            pluginsFamily.proPlugin.name,
                            pluginsFamily.proPlugin.version
                        )}
                    </li>
                </ul>
            </div>

            <DeactivationWarning pluginFamily={pluginsFamily} isConflict={true} />

            {children}

            {error && (
                <Message variant='error'>
                    {error.message}
                </Message>
            )}

                <Button
                    variant='primary'
                    onClick={() => onKeepProPlugin()}
                    isLoading={buttonInProgress && selectedPluginForConflictResolution === 'pro'}
                    disabled={selectedPluginForConflictResolution === 'free'}
                    icon='unlock'
                >
                    {__('Keep the Pro version (Recommended)', 'publishpress-hub')}
                </Button>

                <Button
                    variant='secondary'
                    onClick={() => onKeepFreePlugin()}
                    isLoading={buttonInProgress && selectedPluginForConflictResolution === 'free'}
                    disabled={selectedPluginForConflictResolution === 'pro'}
                    icon='yes'
                >
                    {__('Keep the Free version', 'publishpress-hub')}
                </Button>

                <Button
                    variant='secondary'
                    icon='no'
                    onClick={() => onCancel()}
                    disabled={buttonInProgress}
                >
                    {__('Cancel', 'publishpress-hub')}
                </Button>
        </Modal>
    );
}

export const ModalResolveConflict = memo(ModalResolveConflictComponent);
