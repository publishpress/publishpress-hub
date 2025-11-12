/**
 * Modal plugin info.
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
import { Message } from '../../message/message';
import { Modal } from '../../modal';

const ModalPluginInfoComponent = ({
    onClose,
    onUpdate,
    onCheckForUpdates,
    error,
    buttonInProgress,
    pluginFamily,
    title,
}) => {
    const installedPlugin = pluginFamily.freePlugin.isInstalled
        ? pluginFamily.freePlugin
        : pluginFamily.proPlugin;

    const currentVersion = installedPlugin.version || __('Unknown', 'publishpress-hub');
    const hasUpdate = pluginFamily.hasUpdate || false;
    const availableVersion = pluginFamily.availableVersion || null;
    const isInstalled = pluginFamily.hasAnyVersionInstalled || false;

    return (
        <Modal
            title={title || __('Plugin Information', 'publishpress-hub')}
            className='pp-hub-modal-plugin-info'
            onRequestClose={() => onClose()}
        >
            <div className='pp-hub-modal-plugin-info-content'>
                <div className='pp-hub-modal-plugin-info-field'>
                    <strong>{__('Name:', 'publishpress-hub')}</strong>
                    <span>{pluginFamily.name}</span>
                </div>

                {pluginFamily.description && (
                    <div className='pp-hub-modal-plugin-info-field'>
                        <strong>{__('Description:', 'publishpress-hub')}</strong>
                        <p>{pluginFamily.description}</p>
                    </div>
                )}

                <div className='pp-hub-modal-plugin-info-field'>
                    <strong>{__('Current Version:', 'publishpress-hub')}</strong>
                    <span>{currentVersion}</span>
                </div>

                {hasUpdate && availableVersion && (
                    <div className='pp-hub-modal-plugin-info-field'>
                        <strong>{__('Available Version:', 'publishpress-hub')}</strong>
                        <span>{availableVersion}</span>
                    </div>
                )}
            </div>

            {error && (
                <Message variant='error'>
                    {error.message}
                </Message>
            )}

            {hasUpdate && onUpdate && (
                <Button
                    variant='primary'
                    icon='update'
                    onClick={() => onUpdate(pluginFamily)}
                    isLoading={buttonInProgress}
                >
                    {__('Update Plugin', 'publishpress-hub')}
                </Button>
            )}

            {!hasUpdate && isInstalled && onCheckForUpdates && (
                <Button
                    variant='secondary'
                    icon='update'
                    onClick={() => onCheckForUpdates()}
                    isLoading={buttonInProgress}
                >
                    {__('Check for Updates', 'publishpress-hub')}
                </Button>
            )}
        </Modal>
    );
};

export const ModalPluginInfo = memo(ModalPluginInfoComponent);

