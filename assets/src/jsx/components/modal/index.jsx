import { Modal as WPModal } from '@wordpress/components';

import { memo } from '@wordpress/element';

import classNames from 'classnames';

const ModalComponent = ({ children, ...props }) => {

    const { className, ...rest } = props;

    const classes = classNames('pp-hub-modal', className);

    return <WPModal {...rest} className={classes}>{children}</WPModal>;
};

export const Modal = memo(ModalComponent);
