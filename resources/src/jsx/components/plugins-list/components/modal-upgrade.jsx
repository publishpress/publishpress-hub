/**
 * Modal upgrade.
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

const ModalUpgradeComponent = ({
    onClose,
    onLicenseClick,
    onBuyClick,
    proDetailsUrl,
    changelogUrl,
    title,
}) => {
    return (
        <Modal
            title={title || __('Upgrade to Pro', 'publishpress-hub')}
            className='pp-hub-modal-upgrade'
            onRequestClose={() => onClose()}
        >
            <p>
                {__(
                    'Unlock the full potential of this plugin with the Pro version. Enjoy advanced features, priority support, and exclusive benefits designed to help you get the most out of your workflow.',
                    'publishpress-hub'
                )}
            </p>
            <div className='pp-hub-modal-inline-links'>
                <Button variant='link' href={proDetailsUrl}>
                    {__('Discover all Pro features', 'publishpress-hub')}
                </Button>
                <span>|</span>
                <Button variant='link' href={changelogUrl}>
                    {__('Changelog', 'publishpress-hub')}
                </Button>
            </div>
            <Button variant='secondary' icon='unlock' onClick={() => onLicenseClick()}>
                {__('Already have a license? Install Pro now', 'publishpress-hub')}
            </Button>
            <Button variant='highlight' icon='cart' onClick={() => onBuyClick()}>
                {__('Upgrade to Pro and boost your productivity', 'publishpress-hub')}
            </Button>
        </Modal>
    );
}

export const ModalUpgrade = memo(ModalUpgradeComponent);
