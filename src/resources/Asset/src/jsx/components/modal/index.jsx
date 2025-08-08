/**
 * Modal.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\modal
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

import { Modal as WPModal } from '@wordpress/components';

import { memo } from '@wordpress/element';

import classNames from 'classnames';

const ModalComponent = ({ children, ...props }) => {

    const { className, ...rest } = props;

    const classes = classNames('pp-hub-modal', className);

    return <WPModal {...rest} className={classes}>{children}</WPModal>;
};

export const Modal = memo(ModalComponent);
